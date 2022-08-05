import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Paper, TextField } from '@material-ui/core';
import useStyles from './styles';

import { getAllEmployees } from '../../actions/posts'
import { updatePostTimeSheets } from '../../actions/posts';

const Timesheets = () => {
  const [selectEmployee, setSelectEmployee] = useState(true)
  const [selectAddTimeSheet, setSelectAddTimeSheet] = useState(false)
  const [addData, setAddData ] = useState(false)
  const [displayData, setDisplayData ] = useState(false)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
  const [selectedEmployeeObject, setselectedEmployeeObject] = useState({})
  const [formData, setFormData] = useState({employeeId: '', employeeName: '', month: '', year: '', absentDays: '', leaveDays: '', numberOfDaysWorked: '', hoursWorked: '' });  
  const [postData, setPostData] = useState({ profilePic: '', fullName: '', gender: '', IdNumber: '', phoneNumber: '', nextOfKin: '', address: '', dob: '', qualifications: '', currency: '', monthlySalary: '',
  advanceSalary: '', allowances: [], leaveDays: [], category: '', employer: '', start: '', expiry: '', contracts: '', policeClearance: '', department: '', branch: '', designation: '', 
  notes: '', timeSheets: [], status: ''}); 

  const { allEmployees, isLoading } = useSelector((state) => state.home);
  const { post, posts } = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if(allEmployees.length <= 0){
      dispatch(getAllEmployees())
    } 
  }, [allEmployees]);

  const step1 = () => {
    setSelectEmployee(false)
    setSelectAddTimeSheet(true)
    setselectedEmployeeObject(allEmployees.filter((employee) => employee._id === selectedEmployeeId))

  }

  const step2 = () => {
    setSelectAddTimeSheet(false)
    setAddData(true)
    setFormData({...formData, employeeName: selectedEmployeeObject[0].fullName})
  }

  const step3 = async() => {
    setAddData(false)
    setDisplayData(true)
    alert('double check data before submitting')
    if(selectedEmployeeObject[0].timeSheets !== null){
      setPostData({profilePic: selectedEmployeeObject[0].profilePic, fullName: selectedEmployeeObject[0].fullName, gender: selectedEmployeeObject[0].gender, IdNumber: selectedEmployeeObject[0].IdNumber, phoneNumber: selectedEmployeeObject[0].phoneNumber, nextOfKin: selectedEmployeeObject[0].nextOfKin, address: selectedEmployeeObject[0].address, dob: selectedEmployeeObject[0].dob, qualifications: selectedEmployeeObject[0].qualifications, currency: selectedEmployeeObject[0].currency, monthlySalary: selectedEmployeeObject[0].monthlySalary,
        advanceSalary: selectedEmployeeObject[0].advanceSalary, allowances: selectedEmployeeObject[0].allowances, leaveDays: selectedEmployeeObject[0].leaveDays, category: selectedEmployeeObject[0].category, employer: selectedEmployeeObject[0].employer, start: selectedEmployeeObject[0].start, expiry: selectedEmployeeObject[0].expiry, contracts: selectedEmployeeObject[0].contracts, policeClearance: selectedEmployeeObject[0].policeClearance, department: selectedEmployeeObject[0].department, branch: selectedEmployeeObject[0].branch, designation: selectedEmployeeObject[0].designation, 
        notes: selectedEmployeeObject[0].notes, timeSheets: [...selectedEmployeeObject[0].timeSheets, formData], status: selectedEmployeeObject[0].status})
    } 
     else {
      setPostData({profilePic: selectedEmployeeObject[0].profilePic, fullName: selectedEmployeeObject[0].fullName, gender: selectedEmployeeObject[0].gender, IdNumber: selectedEmployeeObject[0].IdNumber, phoneNumber: selectedEmployeeObject[0].phoneNumber, nextOfKin: selectedEmployeeObject[0].nextOfKin, address: selectedEmployeeObject[0].address, dob: selectedEmployeeObject[0].dob, qualifications: selectedEmployeeObject[0].qualifications, currency: selectedEmployeeObject[0].currency, monthlySalary: selectedEmployeeObject[0].monthlySalary,
        advanceSalary: selectedEmployeeObject[0].advanceSalary, allowances: selectedEmployeeObject[0].allowances, leaveDays: selectedEmployeeObject[0].leaveDays, category: selectedEmployeeObject[0].category, employer: selectedEmployeeObject[0].employer, start: selectedEmployeeObject[0].start, expiry: selectedEmployeeObject[0].expiry, contracts: selectedEmployeeObject[0].contracts, policeClearance: selectedEmployeeObject[0].policeClearance, department: selectedEmployeeObject[0].department, branch: selectedEmployeeObject[0].branch, designation: selectedEmployeeObject[0].designation, 
        notes: selectedEmployeeObject[0].notes, timeSheets: [formData], status: selectedEmployeeObject[0].status})

      }
    }

  const clear = () => {
    setSelectEmployee(true);
    setSelectAddTimeSheet(false);
    setAddData(false);
    setDisplayData(false);
    setSelectedEmployeeId('');
    setselectedEmployeeObject({});
    setFormData({employeeId: '', employeeName: '', month: '', year: '', absentDays: '', leaveDays: '', numberOfDaysWorked: '', hoursWorked: '' });
    setPostData({ profilePic: '', fullName: '', gender: '', IdNumber: '', phoneNumber: '', nextOfKin: '', address: '', dob: '', qualifications: '', currency: '', monthlySalary: '',
  advanceSalary: '', allowances: [], leaveDays: [], category: '', employer: '', start: '', expiry: '', contracts: '', policeClearance: '', department: '', branch: '', designation: '', 
  notes: '', timeSheets: [], status: ''})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.employeeName && formData.employeeId && formData.month && formData.leaveDays && formData.numberOfDaysWorked && formData.hoursWorked){
      console.log('submit', postData.timeSheets)
      dispatch(updatePostTimeSheets(formData.employeeId, postData))
      clear()
    } else {
      alert('data missing')
    }
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augast', 'September', 'October', 'November', 'Decemeber']

  return (
    // isLoading ? <CircularProgress /> : (
      <>
        <Paper style={{ backgroundColor: '#FFF8DC', padding: '20px', borderRadius: '15px' }} elevation={6}>
        <Typography component="h1" variant="h5"> Add TimeSheet</Typography>
        {selectEmployee && (
            <form>
                <select onChange={(e) => {
                  setSelectedEmployeeId(e.target.value)
                  setFormData({...formData, employeeId: e.target.value}) }}>
                    <option value="">Select Employee</option>
                    {allEmployees.map((employee) =>
                        (employee.status !== 'inactive') && 
                        <option value={employee._id}> {employee.fullName} </option>
                    )}
                </select>
                &nbsp; &nbsp; &nbsp; 
                <Button variant="contained" color="primary" className={classes.submit} onClick={step1}> next </Button>
            </form>
        )}
        {selectAddTimeSheet && (
          <form>

            <select onChange={(e) => {
                  setFormData({...formData, month: e.target.value}) }}>
                <option>Select month</option>
                {months.map((month) =>
                <option value={month}>{month}</option>
                )}
            </select>
                &nbsp; &nbsp; &nbsp; 
            <input placeholder='year' onChange={(e) => {setFormData({...formData, year: e.target.value}) }}/>
                &nbsp; &nbsp; &nbsp; 
            <Button variant="contained" color="primary" className={classes.submit} onClick={step2}> next </Button>
          </form>
        )}
        {addData && (
            <form>
                <input placeholder='Absent Days' onChange={(e) => {setFormData({...formData, absentDays: e.target.value}) }}/>
                <input placeholder='Leave Days' onChange={(e) => {setFormData({...formData, leaveDays: e.target.value}) }}/>
                <input placeholder='Number of days worked' onChange={(e) => {setFormData({...formData, numberOfDaysWorked: e.target.value}) }}/>
                <input placeholder='hours worked'onChange={(e) => {setFormData({...formData, hoursWorked: e.target.value}) }}/>
                <Button variant="contained" color="primary" className={classes.submit} onClick={step3}> next </Button>
            </form>
        )}
        {displayData && (
          <>
            <Typography>Name: {formData.employeeName}</Typography>
            <Typography>Number of absent days: {formData.absentDays}</Typography>
            <Typography>Number of Leave days: {formData.leaveDays}</Typography>
            <Typography>Number of days worked: {formData.numberOfDaysWorked}</Typography>
            <Typography>Number of hours worked: {formData.hoursWorked}</Typography>
            <Typography>Number of hours worked: {formData.month}</Typography>
            <Typography>Number of hours worked: {formData.year}</Typography>
            <Button variant="contained" color="secondary" className={classes.submit} onClick={handleSubmit}> Submit </Button>
          </>
        )}
        </Paper>
      </>
    )
    // )
}

export default Timesheets