import { TextField, Button, makeStyles, Typography } from "@material-ui/core";
import axios from 'axios';
import { useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    marginTop: theme.spacing(5)
  },

  form: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    marginTop: theme.spacing(2)
  },
  success: {
    marginTop: theme.spacing(5)
  }
}));

export default function SignUpForm() {

  const [userData, setUserData] = useState({ email: "", name: "", password: "" });
  const [isSignUpSuccess, setSignUpSuccess] = useState(false);
  const history = useHistory();

  const classes = useStyles();

  const isValid = !!userData.email && !!userData.name && !!userData.password;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleGoToSignIn = () => {
    history.push('/signin');
    setSignUpSuccess(false);
  }

  const handleSubmit = async () => {

    try {
      const authData = await axios.post('http://localhost:4041/api/auth/register', {
        ...userData
      });

      console.log(authData);

      if (authData.status === '201' && authData.data.message === "Ok") {
        setSignUpSuccess(true);
        console.log('here');
      } else {
        throw new Error();
      }

    } catch {
      setSignUpSuccess(false);
    }
  }

  return <div className={classes.root} >
    <Typography variant="h4">Sign-Up</Typography>
    <form className={classes.form} noValidate autoComplete="off">
      <div>
        <TextField id="name" label="Name" name="name" onChange={handleChange} fullWidth required />
      </div>
      <div>
        <TextField id="email" label="Email" type="email" name="email" onChange={handleChange} fullWidth required />
      </div>
      <div>
        <TextField id="password" label="Password" type="password" name="password" onChange={handleChange} fullWidth required />
      </div>
      <Button className={classes.button} variant="contained" color="primary" disabled={!isValid} onClick={handleSubmit}>Sign Up</Button>
    </form>
    {isSignUpSuccess && <div className={classes.success}>
      <Typography variant="h5">You have signed up successfully 🪐</Typography>
      <Typography variant="subtitle1">Please proceed to signin.</Typography>
      <Button variant="contained" color="secondary" className={classes.button} onClick={() => handleGoToSignIn()}>SignIn</Button>
    </div>
    }
  </div>
}