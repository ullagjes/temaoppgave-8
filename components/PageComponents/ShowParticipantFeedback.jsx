import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { TextElement, UnderTitle } from '../BaseComponents';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.secondary.light,
        height: '30vh',
        minHeight: '200px',
        width: '90vw',
        maxWidth: '720px',
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    title: {
        marginBottom: theme.spacing(4)
    },
}))

function ShowParticipantFeedback({ userFeedBack, userPoints }) {
    const classes = useStyles()
    return (
        <Paper className={classes.paper}>
            <UnderTitle component={"h1"} className={classes.title}>{userFeedBack}</UnderTitle>
            <TextElement>Your points so far: {userPoints}</TextElement>
        </Paper>
    );
}

export default ShowParticipantFeedback;