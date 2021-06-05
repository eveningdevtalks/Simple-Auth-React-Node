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
    backgroundColor: theme.palette.divider,
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

export default function Home({ user, handleGetSecretData, secretData }) {

  const classes = useStyles();
  const isLoggedIn = !!user;
  const [open, setOpen] = useState(false);

  const handleSecret = () => {
    if (isLoggedIn) {
      handleGetSecretData();
    } else {
      setOpen(true);
    }
  }

  return <div className={classes.container}>
    <Typography className={classes.text} variant="h2">{isLoggedIn ? `Yo! Yo! Welcome ${user}` : 'You are still not logged dude!'}</Typography>
    <div>
      {isLoggedIn && <img src={HomeImage} className={classes.hero} alt="home" />}
    </div>
    <Button variant="contained" color="secondary" onClick={() => handleSecret()} className={classes.button}>Get Secret Data</Button>
    <Snackbar anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }} open={open} autoHideDuration={2000} message="You are not allowed mate!"></Snackbar>
    {secretData && isLoggedIn && <div className={classes.secret}>
      <Typography variant="h5">{secretData}</Typography>
    </div>}
  </div>;
}