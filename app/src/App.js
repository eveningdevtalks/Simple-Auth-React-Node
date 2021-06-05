import { useEffect, useState } from 'react';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { orange, purple } from '@material-ui/core/colors';
import { Container, makeStyles } from '@material-ui/core';
import MainAppBar from './components/MainAppBar';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Home from './pages/Home';
import Auth from './pages/Auth';
import apiClient from './apiClient';
import {
  BrowserRouter as Router, Switch, Route, useHistory
} from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange['600'],
    },
    secondary: {
      main: purple[500],
    },
  },
});

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center'
  }
}));

export default function App() {

  const [user, setUser] = useState("");
  const [secretData, setSecretData] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const classes = useStyles();
  const history = useHistory();

  const handleUserSignIn = async (userData) => {

    let isSuccess = false;

    try {
      const { data } = await apiClient.post('auth/login', {
        ...userData
      });

      localStorage.setItem('token', data.refreshToken);

      setUser(data.user.name);
      setAccessToken(data.accessToken);

      isSuccess = true;

      history.push('/');

    } catch {
      isSuccess = false;
    }

    return isSuccess;
  };

  const handleSignOut = async () => {
    try {
      await apiClient.post('auth/logout', {}, {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });

      setUser("");

      localStorage.removeItem('token');
      setAccessToken("");
      setSecretData("");
    } catch (err) {
      console.log(err);
      setAccessToken("");
    }
  };

  const handleUserSignUp = async (userData) => {

    let isSignUpSuccess = false;
    let message = "";

    try {
      await apiClient.post('auth/register', {
        ...userData
      });

      isSignUpSuccess = true;

    } catch (err) {
      //error.response.data.message
      const { response: { data: { message: errorMessage } } } = err;
      isSignUpSuccess = false;
      message = errorMessage
    }

    return { isSignUpSuccess, message };
  }

  const handleGetSecretData = async () => {

    try {
      const { data } = await apiClient.get('starwars/quote', {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });

      setSecretData(data.message);
    } catch (err) {
      setSecretData("");
    }
  }

  useEffect(() => {
    async function fetchUser() {

      const token = localStorage.getItem('token');

      setInterval(async () => {
        if (token && accessToken) {
          try {
            await apiClient.post('auth/token/refresh', {}, {
              headers: {
                Authorization: 'Bearer ' + accessToken
              }
            });
          } catch (err) {
            localStorage.removeItem('token');
            setAccessToken("");
          }
        }
      }, 30 * 60 * 1000);
    }

    fetchUser();
  }, [accessToken]);

  useEffect(() => {

    async function fetchToken() {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const { data } = await apiClient.post('auth/login/token', {
            token
          });
          localStorage.setItem('token', data.refreshToken);

          setUser(data.user.name);
          setAccessToken(data.accessToken);
        } catch (err) {
          setUser("");
          setAccessToken("");
        }
      }
    }

    fetchToken();
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainAppBar user={user} signOut={handleSignOut} />
        <Container maxWidth="md" >
          <div className={classes.container}>
            <Switch>
              <Route path="/signin">
                <Auth>
                  <SignInForm handleUserSignIn={handleUserSignIn} />
                </Auth>
              </Route>
              <Route path="/signup">
                <Auth>
                  <SignUpForm handleUserSignUp={handleUserSignUp} />
                </Auth>
              </Route>
              <Route path="/">
                <Home user={user} secretData={secretData} handleGetSecretData={handleGetSecretData} />
              </Route>
            </Switch>
          </div>
        </Container>
      </ThemeProvider>
    </Router>
  );
}
