
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
  },
  formHeader: {
    color: '#2F4A60',
    padingLeft: '30px'
  },
  ratingH: {
    color: '#2F4A60',

  }, 
  starRating: {
    border: '2px ',
    borderRadius: '5px',
    padding: '5px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    borderColor: '#4E4F50'
  }
}));
