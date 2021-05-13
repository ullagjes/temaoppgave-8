import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { UnderTitle } from '../BaseComponents';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        maxWidth: '200px',
        textAlign: 'center',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
    }
}))


function ParticipantItem({participant}) {

    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.paper}>
                <UnderTitle>{participant.toUpperCase()}</UnderTitle>
            </Paper>
        </div>
    );
}

export default ParticipantItem;