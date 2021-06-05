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
import {
  BrowserRouter as Router, Switch, Route
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

  const ACCESS_TOKEN = "";

  const [user, setUser] = useState({});
  const classes = useStyles();

  const handleUserSignIn = async (user) => {
    setUser(user);
    localStorage.setItem('token', JSON.stringify(user));
  };

  const handleSignOut = async () => {
    setUser({});
    localStorage.removeItem('token');
  };

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem('token');

      if (token) {
        setUser({ ...JSON.parse(token) });
      }
    }

    fetchUser();
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
                  <SignUpForm />
                </Auth>
              </Route>
              <Route path="/">
                <Home user={user} />
              </Route>
            </Switch>
          </div>
        </Container>
      </ThemeProvider>
    </Router>
  );
}
