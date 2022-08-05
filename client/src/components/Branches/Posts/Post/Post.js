import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';

const Post = ({ branch, setCurrentId }) => {
  const [showEmployees, setShowEmployees] = useState(false)
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { allEmployees, isLoading } = useSelector((state) => state.home);

  const switchMode = () => {
    setShowEmployees(!showEmployees);
  };

  const openPost = (e) => {

    history.push(`/branches/${branch._id}`);
  };

  // console.log(branch.employees.forEach(employee => allEmployees.filter((e) => employee._id === e._id)))

  return (
    <Card className={classes.card} raised elevation={6}>
        {(user) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(branch._id);
            }}
            style={{ color: 'black' }}
            size="small"
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
        )}

        <CardContent>
          <Typography variant="h6">{branch.branchName}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Address: {branch.branchAddress}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Manager: {branch.branchManager}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Number of Employees: {branch.employees.length !== 0 ? branch.employees.length-1 : 0} </Typography>
          {/* <Typography gutterBottom variant="body1" color="black" component="h2"> Designations: {branch.designations.map((allowance) => (
            <text variant="body1" style={{ textDecoration: 'none', color: 'grey' }}>
              {` ${allowance} `}
            </text>
            ))}
          </Typography> */}
          <Typography variant="body2" color="textSecondary" component="p">Branch Rating: {branch.branchRating}</Typography>
          {showEmployees && (
            <div>
              {branch.employees.map((employee) =>
              <>
                {(employee !== "") && (
                  <Typography variant="body2" color="textPrimary" component="p">{employee.fullName}</Typography> 
                )}
              </>
              )}
            </div>
          )}
          <button onClick={switchMode}> { showEmployees ? 'Hide' : 'Show employees' }</button>
        </CardContent>
      <CardActions className={classes.cardActions}>
      </CardActions>
    </Card>
  );
};

export default Post;
