import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import { UnderTitle } from '../BaseComponents';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 1,
    color: '#fff',
  },
  title: {
      backgroundColor: theme.palette.secondary.main,
      padding: theme.spacing(4),
      marginBottom: theme.spacing(4),
      opacity: '0.95',
  },
}));

function LockedScreenComponent({ screenLocked }) {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={screenLocked}>
            <Grid 
            container
            justify="center"
            alignItems="center"
            direction="column"
            className={classes.title}
            >   
                <UnderTitle  component="h1">Waiting for correct answer...</UnderTitle>
                <CircularProgress color="white" size={70} thickness={6} />
            </Grid>
                
        </Backdrop>
    );
}

export default LockedScreenComponent;