import { Typography } from "@material-ui/core";
import { TextField, Button, makeStyles } from "@material-ui/core";
import { useState } from "react";

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
  }
}));

export default function SignInForm({ handleUserSignIn }) {

  const [userData, setUserData] = useState({ email: "", password: "" });
  const classes = useStyles();

  const validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
  const isValid = !!userData.email && validEmailRegex.test(userData.email) && !!userData.password;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleSubmit = () => {
    handleUserSignIn(userData);
  }

  return <div className={classes.root} >
    <Typography variant="h4">Sign-In</Typography>
    <form className={classes.form} noValidate autoComplete="off">
      <div>
        <TextField id="email" name="email" label="Email" type="email" onChange={handleChange} fullWidth required />
      </div>
      <div>
        <TextField id="password" name="password" label="Password" onChange={handleChange} type="password" fullWidth required />
      </div>
      <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit} disabled={!isValid}>Sign In</Button>
    </form>
  </div>;
}