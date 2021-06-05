import { Typography } from "@material-ui/core";
import { TextField, Button, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { INITIAL_SIGNIN_STATE, SignInStatus } from "../utils/constants";

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
  failure: {
    marginTop: theme.spacing(5),
    color: theme.palette.error.main
  }
}));

export default function SignInForm({ handleUserSignIn }) {

  const [userData, setUserData] = useState(INITIAL_SIGNIN_STATE);
  const [loginStatus, setLoginStatus] = useState(SignInStatus.UNDEFINED);
  const classes = useStyles();

  const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
  const isValid = !!userData.email && validEmailRegex.test(userData.email) && !!userData.password;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    setLoginStatus(SignInStatus.UNDEFINED);
  }

  const handleSubmit = async () => {

    const isSuccess = await handleUserSignIn(userData);

    if (isSuccess) {
      setUserData(INITIAL_SIGNIN_STATE);
      setLoginStatus(SignInStatus.UNDEFINED);
    } else {
      setLoginStatus(SignInStatus.FAILED);
    }
  }

  return <div className={classes.root} >
    <Typography variant="h4">Sign-In</Typography>
    <form className={classes.form} noValidate autoComplete="off">
      <div>
        <TextField id="email" name="email" label="Email" type="email" onChange={handleChange} value={userData.email} fullWidth required />
      </div>
      <div>
        <TextField id="password" name="password" label="Password" onChange={handleChange} type="password" value={userData.password} fullWidth required />
      </div>
      <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit} disabled={!isValid}>Sign In</Button>
    </form>
    {loginStatus === SignInStatus.FAILED && <div className={classes.failure}>
      <Typography variant="h5">You have an issue with signin.</Typography>
      <Typography variant="subtitle1">Please recheck your email and password, then try again.</Typography>
    </div>
    }
  </div>;
}