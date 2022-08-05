import React, { useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../../actions/posts';
// import CommentSection from './CommentSection';
import useStyles from './styles';

const base64 = require('base64topdf');

const Post = () => {
    // view pdf file
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [start, setStart] = useState('');
  const [expiry, setExpiry] = useState('');
  const [showTimeSheets, setShowTimeSheets] = useState(false)
  const [dob, setDOB] = useState('');
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  var s = ''
  var e = ''
  var d = ''

  useEffect(() => {
    dispatch(getPost(id));
    
  }, [id]);


  const updateValues = () => {
    setStart(s)
    setExpiry(e)
    setDOB(d)
  }

  const switchMode = () => {
    setShowTimeSheets(!showTimeSheets)
  };

  useEffect(() => {
    if (post) {
      // dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
      dispatch(getPostsBySearch({ search: 'none' }));
      if( post.start) s =  post.start.slice(0, -14)
      if( post.expiry) e =  post.expiry.slice(0, -14)
      if( post.DOB) e =  post.DOB.slice(0, -14)
      updateValues()
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ backgroundColor: '#D9E4EC', padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.imageSection}>
            <img className={classes.media} src={post.profilePic} alt={post.fullName} />
            {(post.status === 'active') &&
            <Typography variant="body1" style={{ color: 'green'}} component="h2">Status: {post.status}</Typography>
            }
            {(post.status === 'inactive') &&
            <Typography variant="body1" style={{ color: 'red'}} component="h2">Working Status: {post.status}</Typography>
            }
        </div>
        <div className={classes.section}>
          <Typography variant="h4" component="h2">General details</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography gutterBottom variant="body1" component="h2">Full Name: {post.fullName}</Typography>
          <Typography gutterBottom variant="body1" component="p">Gender: {post.gender}</Typography>
          <Typography gutterBottom variant="body1" component="p">ID Number: {post.IdNumber}</Typography>
          <Typography gutterBottom variant="body1" component="p">Phone Number: {post.phoneNumber}</Typography>
          <Typography gutterBottom variant="body1" component="p">Next of kin Number: {post.nextOfKin}</Typography>
          <Typography gutterBottom variant="body1" component="p">Address: {post.address}</Typography>
          <Typography gutterBottom variant="body1" component="p">D.O.B: {dob}</Typography>
          <div className="App">
            <a href={post.qualifications} target="_blank"> open qualifications file</a>
          </div>          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.section}>
          <Typography variant="h4" component="h2">Classifications</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1" component="h2">Monthy Salary: {post.monthlySalary}</Typography>
          <Typography variant="body1" component="h2">Advance Salary: {post.advanceSalary}</Typography>
          {post.allowances && (<Typography gutterBottom variant="body1" color="black" component="h2"> Allowances: {post.allowances.map((allowance) => (
            <text variant="body1" style={{ textDecoration: 'none', color: 'grey' }}>
              {` ${allowance} `}
            </text>
            ))}
          </Typography>)}
          
          {post.leaveDays && (<Typography gutterBottom variant="body1" color="black" component="h3"> Leave Days: {post.leaveDays.map((leaveDay) => (
            <text variant="body1" style={{ textDecoration: 'none', color: 'grey'}}>
            {` ${leaveDay} `}
            </text>
            ))}
          </Typography>)}
          <Typography variant="body1" component="h2">Currency: {post.currency}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h6" component="h2">TimeSheets &nbsp; &nbsp; <button onClick={switchMode}>  { showTimeSheets ? 'hide' : 'show' }</button></Typography>
          {post.timeSheets && (<Typography gutterBottom variant="body1" color="black" component="h3">{post.timeSheets.map((timeSheet) => (
            <div> 
              <Typography variant="body1" style={{ textDecoration: 'none', color: 'black'}}> Date: {` ${timeSheet.month} `} {` ${timeSheet.year} `} </Typography>
              { showTimeSheets && ( 
              <>  
                <Typography variant="body1" style={{ textDecoration: 'none', color: 'grey'}}> Leave days: {` ${timeSheet.leaveDays} `} </Typography>
                <Typography variant="body1" style={{ textDecoration: 'none', color: 'grey'}}> Days worked: {` ${timeSheet.numberOfDaysWorked} `}  </Typography>
                <Typography variant="body1" style={{ textDecoration: 'none', color: 'grey'}}> Hours worked: {` ${timeSheet.hoursWorked}`} </Typography>
                <Typography variant="body1" style={{ textDecoration: 'none', color: 'grey'}}> Number of absent days: {` ${timeSheet.absentDays} `} </Typography>
              </>
              )}
            </div>
            ))}
          </Typography>)}
          <Divider style={{ margin: '20px 0' }} />


        </div>
        <div className={classes.section}>
          <Typography variant="h4" component="h2">Contract Details</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1" component="h2">Category: {post.category}</Typography>
          <Typography variant="body1" component="h2">Employer: {post.employer}</Typography>
          <Typography variant="body1" component="h2">Contract start: {start}</Typography>
          <Typography variant="body1" component="h2">Contract expiry: {expiry}</Typography>
          <div className="App">
            <a href={post.contracts} target="_blank"> open contract file</a>
          </div>
          <div className="App">
            <a href={post.policeClearance} target="_blank"> open police clearance file</a>
          </div>
          <Typography variant="body1" component="h2">Departement: {post.department}</Typography>
          <Typography variant="body1" component="h2">Branch: {post.branch}</Typography>
          <Typography variant="body1" component="h2">Designation: {post.designation}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1" component="h2">Notes: {post.notes}</Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
          <Divider />
    </div>
    </Paper>
  );
};

export default Post;
