import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table'
import { Typography, Button, Paper, CircularProgress } from '@material-ui/core';
import  Chart  from "react-apexcharts";

import { getAllBranches } from '../../actions/branches'
import { getAllEmployees } from '../../actions/posts'
import useStyles from './styles';
import './app.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import maleIcon from '../icons/man.png';
import femaleIcon from '../icons/female.png';

const Home = () => {
  const [males, setMales] = useState(0);
  const [females, setFemales] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalBranches, setTotalBranches] = useState(0);
  const [exEmployees, setExEmployees] = useState(0);
  const [permenant, setPermenant] = useState(0);
  const [terminal, setTerminal] = useState(0);
  const dispatch = useDispatch();

  const [branchName, setBranchName]= useState([]);
  const [numberOfEmployees, setNumberOfEmployees]= useState([]);

  const { allBranches } = useSelector((state) => state.home);
  const { allEmployees, isLoading } = useSelector((state) => state.home);

  const classes = useStyles();

  useEffect(() => {
    if(allBranches.length <= 0){
      dispatch(getAllBranches());
    }
  }, [allBranches]);

  useEffect(() => {
    if(allEmployees.length <= 0){
      dispatch(getAllEmployees())
    } 
  }, [allEmployees]);

  useEffect(() =>{
    if(allBranches.length > 0 && branchName.length <= 0){

      const branch=[];
      const branchNumbers=[];

      allBranches.forEach((element) => { 
        branch.push(element.branchName);
        branchNumbers.push(parseInt(element.employees.length-1));
        setTotalBranches(totalBranches+1)
      })
      setBranchName(branch);
      setNumberOfEmployees(branchNumbers);

    }
  },[allBranches])


  const updateValues = () => {
    setMales(m)
    setFemales(f)
    setTotal(t)
    setExEmployees(ex)
    setPermenant(p)
    setTerminal(ter)  
  }

  var m = 0;
  var f = 0;
  var ter = 0;
  var ex = 0;
  var p = 0;
  var t = 0;

  useEffect(() =>{
    if(allEmployees.length > 0 ){
        allEmployees.forEach((element) => {
          if(element.status === 'active') { 
            t++;
            if(element.contractType === 'permenant') { 
              p++;    
            } else if (element.contractType === 'terminal'){
              ter++;
            }
            if(element.gender === 'Male') {
              m++;
            } else if(element.gender === 'Female') {
              f++;
            }
        } else {
          ex++;
        }
      })
      updateValues()
    }
  },[allEmployees])

  return (
    <Paper style={{ backgroundColor: '#FFF8DC', padding: '20px', borderRadius: '15px' }} elevation={6}>
          {isLoading ? <CircularProgress /> : (

      <div className={classes.main}>
        <div className={classes.section1}> 
          <div className={classes.survey}>
            {/* <h3 className={classes.surveyH}>Survey results</h3>  */}
            <table className={classes.ratingTable}>
              <tr>
                <th>Branch Name</th>
                <th>Branch Rating</th>
              </tr>
              {allBranches?.map((branch) => (
              <tr>
                <td className={classes.ratingItems}> {branch.branchName} </td>
                <td className={classes.ratingStars}> 
                    {[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                      <p
                        key={index}
                        className={index <= branch.branchRating ? "rated" : "unRated"}>
                            <span >&#9733;</span></p>);
                      })}
                </td>
                {/* <td>{branch.branchRating} stars</td> */}
              </tr> 
              ))}
            </table>
          </div>
          <div className={classes.gender}>
            <Typography component="h1" variant="h6" color="primary" > <img src={maleIcon} width="30" height="30" />&nbsp; &nbsp; Males : {males}</Typography>
            <Typography component="h1" variant="h6" color="secondary"> <img src={femaleIcon} width="30" height="30" />&nbsp; &nbsp; Females : {females}</Typography>
          </div>
        </div>
        <div className={classes.section2}>
          <Chart 
            type="donut"
            width={600}
            height={450}
            series={ numberOfEmployees }                
            options={
              {
              title:{ text: 'Total ' + total} , 
              noData:{text:"Empty Data"},                        
              // colors:["#f90000","#f0f"],
              labels: branchName, 
            }}
            >
          </Chart>
        </div>
        <div className={classes.section3}>
          <div className={classes.section3Top}>
            <Typography className={classes.section3Top1} component="body" variant="body2" color="primary">M/E Ratio {allBranches.length} :{total}</Typography>
            <Typography className={classes.section3Top2} component="body" variant="body2" >Permanent : {permenant} </Typography>
            <Typography className={classes.section3Top3} component="body" variant="body2" color="secondary">Terminal : {terminal}</Typography>
          </div>
          <div className={classes.section3Bottom}>
            <button className={classes.section3Button1}>Ex Employees: {exEmployees} </button>
            <button className={classes.section3Button2}>Loans</button>
            <button className={classes.section3Button3}>Absent Rate</button>
          </div>
        </div>
      </div>
      )}
    </Paper>
  )
}

export default Home