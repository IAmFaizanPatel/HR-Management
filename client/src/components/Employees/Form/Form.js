import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getAllBranches, updateBranch } from '../../../actions/branches'
import { createPost, updatePost } from '../../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ profilePic: '', fullName: '', gender: '', IdNumber: '', phoneNumber: '', nextOfKin: '', address: '', dob: '', qualifications: '', currency: '', monthlySalary: '',
  advanceSalary: '', allowances: [], leaveDays: [], category: '', employer: '', start: '', expiry: '', contracts: '', policeClearance: '', department: '', branch: '', designation: '', 
  notes: '', timesheets: [], status: ''});  
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const [branchName, setBranchName] = useState(''); 

    // const [likes, setLikes] = useState(?.likes);

  //file states 
  const [baseImage, setBaseImage] = useState('');
  const [baseContract, setBaseContract] = useState(''); 
  const [basePoliceC, setBasePoliceC] = useState('');
  const [baseQualifications, setBaseQualifications] = useState('');
  //show buttons states
  const [ showStatus, setShowStatus ] = useState(false); 
  const [ showContract, setShowContract ] = useState(false);
  const [ showClassification, setShowClassification ] = useState(false);
  const [ showGeneral, setShowGeneral ] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const { allBranches } = useSelector((state) => state.home);

  const clear = () => {
    setCurrentId(0);
    setPostData({ profilePic: '', fullName: '', gender: '', IdNumber: '', phoneNumber: '', nextOfKin: '', address: '', dob: '', qualifications: '', currency: '', monthlySalary: '',
                  advanceSalary: '', allowances: [], leaveDays: [], category: '', employer: '', start: '', expiry: '', contracts: '', policeClearance: '', department: '', branch: '', designation: '', 
                  notes: '', timesheets:[], status: '' });
    setBaseImage('')
    setBaseContract('')
    setBasePoliceC('')
    setBaseQualifications('')
    setShowStatus(false) 
    setShowContract(false) 
    setShowClassification(false) 
    setShowGeneral(false)
   };

  // const handleLike = async () => {
  //   dispatch(likeBranch(post._id));

  //   if (hasLikedPost) {
  //     setLikes(post.likes.filter((id) => id !== userId));
  //   } else {
  //     setLikes([...post.likes, userId]);
  //   }
  // };

  const designations = [ 'Finance Manager', 'Finance officer','Accountant', 'Accounts assistance', 'Accounts clerk', 'HR Manager', 'HR Assistant', 'Chief operations Officer', 'Operations manager', 'Business processes and development officer', 'Administration Manager', 'Administration Assistant', 'Logistics Manager', 'Logistics officer', 'Logistics Assistant', 'Welding supervisor', 'Welder assistants', 'Senior Plumber', 'Plumber assistants', 'Mechanic', 'Mechanic assistants', 'Warehouse Manager','Warehouse supervisor receiving & dispatch', 'Warehouse supervisor (ordery)', 'Factory Manager', 'Production manager', 'Machine Operators','Operator assistants', 'General hands', 'Sales Supervisor', 'Sales representative','Cashier', 'Marketing manager', 'Marketing assistants', 'Dispatch clerk','Backstore Supervisor', 'General hands','Procurement manager', 'Procurement officer','Procurement Assistant', 'Retail manager', 'Shop manager', 'Shop manager assistant']
  const departments = [ 'Finance' ,'HR', 'Operations', 'Administration', 'Logistics', 'Workshop', 'Warehouse', 'Production', 'Sales', 'Marketing', 'Dispatch', 'Backstore', 'Procurement', 'Retail Operations']


  var branchID = ''
  var bName = ''
  var bAdd = '' 
  var bManager = ''
  var NOE = ''
  var bRating = ''

  const helperSetID = async (e) => {
    const updatedNOE = parseInt(e.numberOfEmployees) + 1;
    branchID = e._id
    bName = e.branchName
    bAdd = e.branchAddress
    bManager = e.branchManager
    NOE = updatedNOE;
    bRating =  e.branchRating
  }

  useEffect(() =>{
    if(allBranches.length > 0 ){
      allBranches.forEach((element) => {  
        if(element.branchName === branchName){
          helperSetID(element)
        }

      })

    } 
  },[branchName])



  useEffect(() => {
    if(allBranches.length <= 0) {
      dispatch(getAllBranches())
    }
  }, [allBranches]);

  useEffect(() =>{
    if(postData.branch){
      setBranchName(postData.branch) 
    }
  }, [postData])

  useEffect(() => {
    // if (!post?.fullName) {}clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostData({ ...postData, profilePic: baseImage})
    if (currentId === 0) {
      dispatch(createPost({ ...postData }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData }));
      dispatch(updateBranch(branchID, {branchName: bName,  branchAddress: bAdd, branchManager: bManager, numberOfEmployees: NOE,  branchRating: bRating}));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In.
        </Typography>
      </Paper>
    );
  }

  const handleAddChipLeaveDays = (tag) => {
    setPostData({ ...postData, leaveDays: [...postData.leaveDays, tag] });
  };

  const handleDeleteChipLeaveDays = (chipToDelete) => {
    setPostData({ ...postData, leaveDays: postData.leaveDays.filter((tag) => tag !== chipToDelete) });
  };

  const handleAddChipAllowance = (tag) => {
    setPostData({ ...postData, allowances: [...postData.allowances, tag] });
  };

  const handleDeleteChipAllowance = (chipToDelete) => {
    setPostData({ ...postData, allowances: postData.allowances.filter((tag) => tag !== chipToDelete) });
  };

  // uploading files
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
    setPostData({ ...postData, profilePic: base64})
  };

  const uploadContract = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseContract(base64);
    setPostData({ ...postData, contracts: base64})
  }; 
  
  const uploadPoliceClearance = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBasePoliceC(base64);
    setPostData({ ...postData, policeClearance: base64})
  }; 

  const uploadQualifications = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseQualifications(base64);
    setPostData({ ...postData, qualifications: base64})
  }; 

  //converting to base 64 
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography style={{textDecoration: 'underline'}} variant="h6" className={classes.formHheader}>{currentId ? `Editing "${post?.fullName}"` : 'Adding an employee'}</Typography>

        {/* //general details  */}
        <div ><p className={classes.formHheader} > General details &nbsp; &nbsp;&nbsp;<button className={classes.showButton} type="button" onClick={() =>setShowGeneral(!showGeneral)}>Show/Hide</button> </p> </div>
        {showGeneral &&
          <div>
            <div>
              <h4>Profile Picture:</h4>
              <input
                className={classes.input}
                type="file"
                onChange={(e) => {
                  uploadImage(e);
                }}
              />
              {baseImage && <img src={baseImage} height="200px" /> }
            </div>
            <TextField name="fullName" variant="outlined" label="Fullname" fullWidth value={postData.fullName} onChange={(e) => setPostData({ ...postData, fullName: e.target.value })} />         
            <div>
              <label>Select Gender  &nbsp; &nbsp;</label>
              <select name="gender" className={classes.select} value={postData.gender} onChange={(e) => setPostData({ ...postData, gender: e.target.value })}>
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <TextField name="IdNumber" variant="outlined" label="ID number" fullWidth  value={postData.IdNumber} onChange={(e) => setPostData({ ...postData, IdNumber: e.target.value })} />
            <TextField name="phoneNumber" variant="outlined" label="Phone" fullWidth value={postData.phoneNumber} onChange={(e) => setPostData({ ...postData, phoneNumber: e.target.value })} />
            <TextField name="nextOfKin" variant="outlined" label="next of kin contact"  fullWidth value={postData.nextOfKin} onChange={(e) => setPostData({ ...postData, nextOfKin: e.target.value })} />
            <TextField name="address" variant="outlined" label="Address" fullWidth value={postData.address} onChange={(e) => setPostData({ ...postData, address: e.target.value })} />
            <div className="formSameLine"><p className={classes.formHheader}> D.O.B</p> 
            <TextField name="dob" variant="outlined" label="" value={postData.dob} type='date' onChange={(e) => setPostData({ ...postData, dob: e.target.value })} />
            </div>
            <div>
              <h4>Qualifications:</h4>
              <input
                className={classes.input}
                type="file"
                onChange={(e) => {
                  uploadQualifications(e);
                }}
              />
              {baseQualifications && <p className={classes.contractUploaded}>Qualifications uploaded</p> }
            </div>
          </div>
          }
          {/* // classifications */}
          <div ><p className={classes.formHheader}> Classification &nbsp; &nbsp;&nbsp;<button type="button" className={classes.showButton} onClick={() => {setShowClassification(!showClassification) 
            setShowGeneral(!showGeneral)}}>Show/Hide</button> </p> </div>
          { showClassification &&
            <div>
              <TextField name="monthlySalary" variant="outlined" label="Monthly salary" fullWidth value={postData.monthlySalary} onChange={(e) => setPostData({ ...postData, monthlySalary: e.target.value })} />
              <div>
                <label>Select Currency  &nbsp; &nbsp;</label>
                <select name="currency" className={classes.select} value={postData.currency} onChange={(e) => setPostData({ ...postData, currency: e.target.value })}>
                  <option value="">Currency</option>
                  <option value="Male">USD</option>
                  <option value="Female">RTGS</option>
                </select>
              </div><TextField name="advanceSalary" variant="outlined" label="Advance salary" fullWidth value={postData.advanceSalary} onChange={(e) => setPostData({ ...postData, advanceSalary: e.target.value })} />
              <div style={{ padding: '5px 0', width: '94%' }}>
                <ChipInput
                  name="allowances"
                  variant="outlined"
                  label="Allowances"
                  fullWidth
                  value={postData.allowances}
                  onAdd={(chip) => handleAddChipAllowance(chip)}
                  onDelete={(chip) => handleDeleteChipAllowance(chip)}
                />
              </div> 
              <div style={{ padding: '5px 0', width: '94%' }}>
                <ChipInput
                  name="leaveDays"
                  variant="outlined"
                  label="Leave days"
                  fullWidth
                  value={postData.leaveDays}
                  onAdd={(chip) => handleAddChipLeaveDays(chip)}
                  onDelete={(chip) => handleDeleteChipLeaveDays(chip)}
                />
              </div>
            </div>
          }

        {/* // contract details */}
        <div ><p className={classes.formHheader}> Contract details &nbsp; &nbsp;&nbsp;<button type="button" className={classes.showButton} onClick={() =>{setShowContract(!showContract)
        setShowClassification(!showClassification)}}>Show/Hide</button> </p> </div>
        { showContract &&
          <div>
          <div>
            <label> Category &nbsp;</label>
            <select name="category" className={classes.select} value={postData.category} onChange={(e) => setPostData({ ...postData, category: e.target.value })}>
              <option value="">Select Category</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          {/* <TextField name="employer" variant="outlined" label="Employer name" fullWidth multiline value={postData.employer} onChange={(e) => setPostData({ ...postData, employer: e.target.value })} /> */}
          <div>
            <label> Employer &nbsp;</label>
            <select name="employer" className={classes.select} value={postData.employer} onChange={(e) => setPostData({ ...postData, employer: e.target.value })}>
              <option value="">Select Employer</option>
              <option value="Lightgrove INV">Lightgrove INV</option>
              <option value="Tagoneswa INV">Tagoneswa INV</option>
            </select>
          </div>
          <div className="formSameLine"><p className={classes.formHheader}> Start</p>     
          <TextField name="start" variant="outlined" label=""   value={postData.start} type='date' onChange={(e) => setPostData({ ...postData, start: e.target.value })} />
          </div>

          <div className="formSameLine"><p className={classes.formHheader}> Expiry </p>     
          <TextField name="expiry" variant="outlined" label=""   value={postData.expiry} type='date' format="dd-MM-yyyy" onChange={(e) => setPostData({ ...postData, expiry: e.target.value })} />
          </div> 
            <div>
              <h4>Contract file:</h4>
              <input
                className={classes.input}
                type="file"
                onChange={(e) => {
                  uploadContract(e);
                }}
              />
              {baseContract && <p className={classes.contractUploaded}>contract uploaded</p> }
            </div>
            <div>
              <h4>Police clearance file:</h4>
              <input
                className={classes.input}
                type="file"
                onChange={(e) => {
                  uploadPoliceClearance(e);
                }}
              />
              {basePoliceC && <p className={classes.contractUploaded}>police clearance file uploaded</p> }
            </div>
         <div>
            <label> Department &nbsp;</label>
            <select name="department" className={classes.select} value={postData.department} onChange={(e) => setPostData({ ...postData, department: e.target.value })}>
              <option value="">Select Department</option>
                {departments.map((d) => (
                  <option value={d}>{d}</option>
                ))}
            </select>
          </div>
           <div>
            <label> Branch &nbsp;</label>
            <select name="branch" className={classes.select} value={postData.branch} onChange={(e) => {setPostData({ ...postData, branch: e.target.value })}}>
              <option value="">Select Branch</option>
            {allBranches?.map((branch) => (
                <option value={branch.branchName}>{branch.branchName}</option>
            ))}
            </select>
          </div>
           <div>
            <label> Designation &nbsp;</label>
            <select name="designation" className={classes.select} value={postData.designation} onChange={(e) => setPostData({ ...postData, designation: e.target.value })}>
              <option value="">Select Designation</option>
              {designations.map((designation) => (
                <option value="designation">{designation}</option>
              ))}
            </select>
          </div>
          <div>
            <label> Contract Type &nbsp;</label>
            <select name="contractType" className={classes.select} value={postData.contractType} onChange={(e) => setPostData({ ...postData, contractType: e.target.value })}>
              <option value="">Select option</option>
              <option value="permenant">permenant</option>
              <option value="terminal">terminal</option>
            </select>
          </div>
          <TextField name="notes" variant="outlined" multiline rows={4} label="Notes" fullWidth value={postData.notes} onChange={(e) => setPostData({ ...postData, notes: e.target.value })} />
            </div>}
          <div ><p className={classes.formHheader}> Status &nbsp; &nbsp;&nbsp;<button type="button" className={classes.showButton} onClick={() =>setShowStatus(!showStatus)}>Show/Hide</button> </p> </div>
           { showStatus &&
           <div>
            <label> Activity status &nbsp; </label>
            <select name="status" className={classes.select} value={postData.status} onChange={(e) => setPostData({ ...postData, status: e.target.value })}>
              <option value="">Select activity status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          }
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
