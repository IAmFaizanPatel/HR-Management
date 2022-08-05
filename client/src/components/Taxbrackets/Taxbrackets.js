import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { Typography, Button, Paper, TextField } from '@material-ui/core';
import useStyles from './styles';

const Timesheets = () => {
  const [formData, setFormData] = useState({rangeStart: '', rangeEnd: '', nssa: '', zimdef: '', nec: '', paye: '', wcif: '', standardLevy: '', taxLevy: ''})
  const [displayData, setDisplayData] = useState(false)
  const classes = useStyles();
  const dispatch = useDispatch();


  const clear = () => {
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const confirmData = async (e) => {
    e.preventDefault();
    if(formData.rangeStart && formData.rangeEnd && formData.nssa && formData.zimdef && formData.nec && formData.paye && formData.wcif && formData.standardLevy && formData.taxLevy){
      setDisplayData(true)
    } else{
      alert("data missing")
    }
  };

  return (
      <>
        <Paper style={{ backgroundColor: '#FFF8DC', padding: '20px', borderRadius: '15px', marginTop: '20px' }} elevation={6}>
          <Typography component="h1" variant="h5"> Add tax bracket</Typography>
          <br></br>
          { !displayData && (
          <form>
            <TextField name="rangeStart" variant="outlined" label="Range start" value={formData.rangeStart} onChange={(e) => {setFormData({...formData, rangeStart: e.target.value}) }} />
             &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;  
            <TextField name="rangeEnd" variant="outlined" label="Range end" value={formData.rangeEnd} onChange={(e) => {setFormData({...formData, rangeEnd: e.target.value}) }}/>
            <br></br><br></br>
            <TextField name="nssa" variant="outlined" label="NSSA" value={formData.nssa}  onChange={(e) => {setFormData({...formData, nssa: e.target.value}) }}/> 
             &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;
            <TextField name="zimdef" variant="outlined" label="Zimdef" value={formData.zimdef} onChange={(e) => {setFormData({...formData, zimdef: e.target.value}) }} /> 
            &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;

            <TextField name="nec" variant="outlined" label="NEC" value={formData.nec} onChange={(e) => {setFormData({...formData, nec: e.target.value}) }}/> 
            &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;
            <TextField name="paye" variant="outlined" label="PAYE" value={formData.paye} onChange={(e) => {setFormData({...formData, paye: e.target.value}) }}/> 
            <br></br><br></br>
            <TextField name="wcif" variant="outlined" label="WCIF" value={formData.wcif} onChange={(e) => {setFormData({...formData, wcif: e.target.value}) }}/> 
             &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;
            <TextField name="standardLevy" variant="outlined" label="Standards Levy" value={formData.standardLevy} onChange={(e) => {setFormData({...formData, standardLevy: e.target.value}) }}/> 
            &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;

            <TextField name="taxLevy" variant="outlined" label="Tax Levy" value={formData.taxLevy} onChange={(e) => {setFormData({...formData, taxLevy: e.target.value}) }}/> 
            <br></br>
            <Button variant="contained" color="primary" className={classes.submit} onClick={confirmData} > Next </Button>
          </form>
          )}
          {displayData && (
          <form>
            <Typography variant="body1" color="textSecondary" component="h4">Start: {formData.rangeStart}</Typography>
            <Typography variant="body1" color="textSecondary" component="p">End: {formData.rangeEnd}</Typography>
            
            <Typography variant="body1" color="textSecondary" component="p">NSSA: {formData.nssa} %</Typography>
            <Typography variant="body1" color="textSecondary" component="p">Zimdef: {formData.zimdef} %</Typography>
            <Typography variant="body1" color="textSecondary" component="p">NEC: {formData.nec} %</Typography>
            <Typography variant="body1" color="textSecondary" component="p">PAYE: {formData.paye} %</Typography>
            <Typography variant="body1" color="textSecondary" component="p">WCIF: {formData.wcif} %</Typography>
            <Typography variant="body1" color="textSecondary" component="p">Standards Levy: {formData.standardLevy} %</Typography>
            <Typography variant="body1" color="textSecondary" component="p">Tax Levy: {formData.taxLevy} %</Typography>
            <Button variant="contained" color="primary" className={classes.submit} onClick={handleSubmit} > Create </Button>

          </form>
          )}
        </Paper>
      </>
    )
    // )
}

export default Timesheets