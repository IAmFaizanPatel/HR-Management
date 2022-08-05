import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  mainContainer: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  [theme.breakpoints.down('sm')]: {
    appBar: {
      padding: '10px 20px',
    },
    heading: {
      display: 'none',
    },
    userName: {
      display: 'none',
    },
    image: {
      marginLeft: '5px',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '160px',
    },
  },
  actionDiv: {
    textAlign: 'center',
  },
  ratingTable: {
    // border: '1px solid',
    borderRadius: '20px',
    // padding: '30px',
    paddingTop: '20px',
    width: '95%',
    justifyContent: 'space-between'
  },
  ratingItems:{
    paddingLeft: '30px',
  },
  gender: {
    paddingTop: '50px',
    marginLeft: '10px',
  },
  section1: {
    borderRadius: '20px',
    margin: '30px',
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    maxHeight: '90%',
    justifyContent: 'space-between'
  },
    section2: {
    borderRadius: '20px',
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    maxHeight: '100%',
    justifyContent: 'center',
  },
  section3: {
    display: 'flex',
    flexDirection: 'column',
    width: '10%',
    maxHeight: '30%',
    justifyContent: 'space-between'
  },
  main : {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '100%',
  },
  survey: {
    backgroundColor: '#CF9FFF',
    borderRadius: '20px',
    paddingBottom: '7px',
    // paddingLeft: '20px',
    justifyContent: '',
  },
  surveyH: {
    // justifyContent: 'space-between',
    paddingLeft: '90px'
  },
  table: {
    marginTop: '50px',
    borderRadius: '20px',
  },
  ratingStars: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '30px',
    fontSize: '20px',
  },
  section3Top: {
    marginTop: '30px',
    backgroundColor: 'transparent'
  },
  section3Top1: {
    marginTop: '10px',
    backgroundColor: 'transparent'

  },
  section3Top2: {
    marginTop: '10px',
    color: 'green',
    backgroundColor: 'transparent'

  },
    section3Top3: {
    marginTop: '10px',
    backgroundColor: 'transparent'

  },  
  section3Bottom : {
    display: 'flex',
    flexDirection: 'column',
  }, 
  section3Button1: {
    backgroundColor: 'red',
    padding: '10px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    borderRadius: '20px',
    marginBottom: '10px',
  },
    section3Button2: {
    backgroundColor: 'orange',
    padding: '10px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    borderRadius: '20px',
    marginBottom: '10px',

  },
    section3Button3: {
    backgroundColor: 'pink',
    padding: '10px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    borderRadius: '20px',
    marginBottom: '10px',

  }
}));
