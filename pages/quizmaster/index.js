import React from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { SubTitle, TextElement, UnderTitle } from '../../components/BaseComponents';
import PageContainer from '../../components/PageComponents/PageContainer';

import { useQuizMaster } from '../../context/quizMasterContext';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.transparent.main,
        width: '80vw',
        maxWidth: '720px',
        height: 'auto',
        border: theme.borders.medium,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: theme.spacing(2),
    },
    title: {
        color: 'black'
    }
}))

function quizMaster() {
    const classes = useStyles();
    const { userData, quizes } = useQuizMaster();
    const user = userData.uid

    return (
        <PageContainer user={user}>
            <Grid container>

                <Grid container item xs={12}>
                    <Paper className={classes.paper}>
                        <SubTitle component={"h1"} className={classes.title}>Welcome!</SubTitle>
                        <UnderTitle component={"p"}>To start your first quiz, press Create in the menu.</UnderTitle><br></br>
                        <UnderTitle component={"p"}>To edit or run a quiz already created, press Library in the menu.</UnderTitle>
                    </Paper>
                </Grid>
            </Grid>
        </PageContainer>
    );
}

export default quizMaster;