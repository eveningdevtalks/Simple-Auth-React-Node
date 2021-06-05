import { TextField, Button, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { INITIAL_SIGNUP_STATE, SignUpStatus } from "../utils/constants";


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
  },
  failure: {
    marginTop: theme.spacing(5),
    color: theme.palette.error.main
  }
}));

export default function SignUpForm({ handleUserSignUp }) {

  const [userData, setUserData] = useState(INITIAL_SIGNUP_STATE);
  const [signUpStatus, setSignUpStatus] = useState(SignUpStatus.UNDEFINED);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const classes = useStyles();

  const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
  const isValid = !!userData.email && validEmailRegex.test(userData.email) && !!userData.password && !!userData.name;

  const clearStates = () => {
    setSignUpStatus(SignUpStatus.UNDEFINED);
    setErrorMessage("");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    clearStates();
  }

  const handleGoToSignIn = () => {
    history.push('/signin');
    clearStates();
  }

  const handleSubmit = async () => {
    const res = await handleUserSignUp(userData);

    const { isSignUpSuccess, message } = res;

    if (isSignUpSuccess) {
      setUserData(INITIAL_SIGNUP_STATE);
      setSignUpStatus(SignUpStatus.SUCCESS);
      setErrorMessage("");
    } else {
      setSignUpStatus(SignUpStatus.FAILED);
      setErrorMessage(message);
    }
  }

  return <div className={classes.root} >
    <Typography variant="h4">Sign-Up</Typography>
    <form className={classes.form} noValidate autoComplete="off">
      <div>
        <TextField id="name" label="Name" name="name" onChange={handleChange} value={userData.name} fullWidth required />
      </div>
      <div>
        <TextField id="email" label="Email" type="email" name="email" onChange={handleChange} value={userData.email} fullWidth required />
      </div>
      <div>
        <TextField id="password" label="Password" type="password" name="password" onChange={handleChange} value={userData.password} fullWidth required />
      </div>
      <Button className={classes.button} variant="contained" color="primary" disabled={!isValid} onClick={handleSubmit}>Sign Up</Button>
    </form>
    {signUpStatus === SignUpStatus.SUCCESS && <div className={classes.success}>
      <Typography variant="h5">You have signed up successfully 🪐</Typography>
      <Typography variant="subtitle1">Please proceed to signin.</Typography>
      <Button variant="contained" color="secondary" className={classes.button} onClick={() => handleGoToSignIn()}>SignIn</Button>
    </div>
    }
    {signUpStatus === SignUpStatus.FAILED && <div className={classes.failure}>
      <Typography variant="h5">{errorMessage}</Typography>
      <Typography variant="subtitle1">Please recheck your email, then try again.</Typography>
    </div>
    }
  </div>
}