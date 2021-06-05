import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  action: {
    color: theme.palette.common.black,
    borderColor: theme.palette.common.black,
    '&:not(:first-child)': {
      marginLeft: theme.spacing(2)
    }
  },
  home: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

export default function MainAppBar({ user, signOut }) {
  const classes = useStyles();
  const history = useHistory();

  const handleGoTo = (path) => {
    history.push(`/${path}`);
  }

  const handleSignOut = () => {
    signOut();
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.home} onClick={() => handleGoTo('')}>
            🚀 Evening Dev Talks
          </Typography>
          <div className={classes.grow} />
          <div>
            {!!user ?
              <Button className={classes.action} variant="outlined" onClick={handleSignOut}>SignOut</Button> :
              <>
                <Button className={classes.action} variant="outlined" onClick={() => handleGoTo('signin')}>SignIn</Button>
                <Button className={classes.action} variant="outlined" onClick={() => handleGoTo('signup')}>SignUp</Button>
              </>}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
