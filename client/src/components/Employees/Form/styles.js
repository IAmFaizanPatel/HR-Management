
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: 'rgb(255, 248, 220)'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor: '#2F4A60'
  },
  showButton: {
    fontSize: '12px',
    backgroundColor: '#7DA1BF',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '15px',
  },
  contractUploaded: {
    color: 'green',
    fontSize: '.5rem'
  },
  input: {
    backgroundColor: '#746C70',
    borderRadius: '10px',
    color: '#FFFFFF',
  }, 
  select: {
    backgroundColor: '#2F4A60',
    color: '#FFFFFF',
    margin: '10px',
  },
  formHheader: {
    color: '#2F4A60',
  },
}));
