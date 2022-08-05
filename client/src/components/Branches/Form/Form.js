import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createBranch, updateBranch } from '../../../actions/branches';
import useStyles from './styles';
import './star.css'

const Form = ({ currentId, setCurrentId }) => {
  const [branchData, setBranchData] = useState({ branchName: '',  branchAddress: '', branchManager: '', numberOfEmployees: '',  branchRating: '', employees:['']});  
  // const [branchData, setBranchData] = useState({ branchName: '',  branchAddress: '', branchManager: '', numberOfEmployees: '', designations: [''], branchRating: ''});  
  const branch = useSelector((state) => (currentId ? state.branches.branches.find((message) => message._id === currentId) : null));
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setBranchData({ branchName: '',  branchAddress: '', branchManager: '', numberOfEmployees: '', branchRating: '', employees: [''] });
  // setBranchData({ branchName: '',  branchAddress: '', branchManager: '', numberOfEmployees: '', designations: [], branchRating: '' });
    setRating(0);
    
   };

  useEffect(() => {
    if (branch) {
      setBranchData(branch);
      setRating(branch.branchRating);
    }
  }, [branch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createBranch({ ...branchData, branchRating: rating }, history));
      clear();
    } else {
      dispatch(updateBranch(currentId, { ...branchData, branchRating: rating }));
      clear();
    }
  };

  const updateRating = (index) => {
    setRating(index);
  }

  const handleAddChip = (tag) => {
    setBranchData({ ...branchData, designations: [...branchData.designations, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setBranchData({ ...branchData, designations: branchData.designations.filter((tag) => tag !== chipToDelete) });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Sign in to create or edit branches
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6" className={classes.formHeader}>{currentId ? `Editing "${branch?.branchName}"` : 'Adding an branch'}</Typography>
        <TextField name="branchName" variant="outlined" label="Branch Name" fullWidth  value={branchData.branchName} onChange={(e) => setBranchData({ ...branchData, branchName: e.target.value })} />
        <TextField name="branchAddress" variant="outlined" label="Branch Address" fullWidth  value={branchData.branchAddress} onChange={(e) => setBranchData({ ...branchData, branchAddress: e.target.value })} />
        <TextField name="branchManager" variant="outlined" label="Branch Manager" fullWidth  value={branchData.branchManager} onChange={(e) => setBranchData({ ...branchData, branchManager: e.target.value })} />
        {/* <Typography name="numberOfEmployees" variant="outlined" label="Number of employees"   value={branchData.employees.length} /> */}
        {/* <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="designations"
            variant="outlined"
            label="Designations"
            fullWidth
            value={branchData.designations}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>          */}
        &nbsp; &nbsp; &nbsp; 
        <div className={classes.starRating}>
          <span className={classes.ratingH} >Branch Rating  &nbsp;  &nbsp; </span> 
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= rating ? "on" : "off"}
                onClick={() => updateRating(index) }
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
