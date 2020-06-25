import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const classes = useStyles();

  console.log(props)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
           <Link style={{textDecoration:"none", color: "white", letterSpacing: "3px"}} to="/">CHATBOX</Link> 
          </Typography>
          {props.authentication ?
          (<Button color="inherit" onClick={() => auth().signOut()}>Logout</Button>) : (
           <Link to="/login" style={{textDecoration:"none", color: "white"}}>
           <Button color="inherit">LogIn</Button> 
           </Link> 
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
