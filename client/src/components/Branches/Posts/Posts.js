import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { branches, isLoading } = useSelector((state) => state.branches);
  const classes = useStyles();

  if (!branches.length && !isLoading) return 'No Branches';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {branches?.map((branch) => (
          <Grid key={branch._id} item xs={12} sm={12} md={6} lg={3}>
            <Post branch={branch} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
