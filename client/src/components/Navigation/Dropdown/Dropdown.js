import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import useStyles from './styles';
import * as actionType from '../../../constants/actionTypes';
import './styles.css'
export default function MenuPopupState() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/auth');
    setUser(null);
    document.location.reload()
  };
  const classes = useStyles();

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button className={classes.dashboard} variant="contained" {...bindTrigger(popupState)}>
            <div className="container">
             <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </Button>
          <Menu {...bindMenu(popupState)} >
            <MenuItem className={classes.options} onClick={popupState.close} component={Link} to="/">Dashboard</MenuItem>
            <MenuItem className={classes.options} onClick={popupState.close} component={Link} to="/posts">Employees</MenuItem>
            <MenuItem className={classes.options} onClick={popupState.close} component={Link} to="/branches">Branches</MenuItem>
            <MenuItem className={classes.options} onClick={popupState.close} component={Link} to="/timesheets">Timesheets</MenuItem>
            <MenuItem className={classes.options} onClick={popupState.close} component={Link} to="/taxbrackets">Taxbrackets</MenuItem>
            <MenuItem className={classes.logout} onClick={logout} component={Link} to="/auth">Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}