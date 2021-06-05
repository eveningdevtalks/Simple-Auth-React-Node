import { Button, fade, Snackbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import HomeImage from '../assets/home.svg';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    marginTop: theme.spacing(5),
  },
  hero: {
    width: '50%',
    marginTop: theme.spacing(3)
  },
  text: {
    color: fade(theme.palette.common.black, 0.75),
    marginBottom: theme.spacing(1)
  },
  secret: {
    backgroundColor: theme.palette.primary.light,
    marginTop: theme.spacing(5),
    borderRadius: theme.spacing(1),
    minHeight: '10ch',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginTop: theme.spacing(5)
  },
}));

export default function Home({ user }) {

  const classes = useStyles();
  const isLoggedIn = !!user.email;
  const [open, setOpen] = useState(false);
  const [secret, setSecret] = useState("a");

  const handleGetSecretData = () => {
    console.log('Hello');
    setOpen(true);
  }

  return <div className={classes.container}>
    <Typography className={classes.text} variant="h2">{isLoggedIn ? `Yo! Yo! Welcome ${user.name}` : 'You are still not logged dude!'}</Typography>
    <div>
      {isLoggedIn && <img src={HomeImage} className={classes.hero} alt="home" />}
    </div>
    <Button variant="contained" color="secondary" onClick={() => handleGetSecretData()} disabled={!!secret} className={classes.button}>Get Secret Data</Button>
    <Snackbar anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }} open={open} autoHideDuration={2000} message="You are not allowed mate!"></Snackbar>
    <div className={classes.secret}>
      <Typography variant="h5">Secret Code: {secret}</Typography>
    </div>
  </div>;
}