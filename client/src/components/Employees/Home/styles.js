import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
    backgroundColor: 'rgb(255, 248, 220)',

  },
  pagination: {
    borderRadius: 4,
    marginBottom: '1rem',
    padding: '16px',
    backgroundColor: '#B0D2DA',

  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  searchButton: {
    backgroundColor: '#7DA1BF',
    color: 'white',
  },
}));
