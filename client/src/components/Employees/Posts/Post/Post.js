import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();
  const classes = useStyles();

  const openPost = (e) => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.profilePic || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.fullName} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
        </div>
        {(user) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
        )}
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="h6">{post.fullName}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">ID Number: {post.IdNumber}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Branch: {post.branch}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Designation: {post.designation}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Employer: {post.employer}</Typography>
          {/* <Typography variant="body2" color="textSecondary" component="h2">Allownces: {post.allowances.map((tag) => `${tag} `)}</Typography>         */}
          <Typography variant="body2" color="textPrimary" component="p" >Created: {moment(post.createdAt).fromNow()}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
      </CardActions>
    </Card>
  );
};

export default Post;
