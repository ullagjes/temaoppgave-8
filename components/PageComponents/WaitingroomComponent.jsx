import React from 'react';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { ButtonComponent, UnderTitle, TextElement } from '../BaseComponents';
import ParticipantItem from './ParticipantItem';

const useStyles = makeStyles((theme) => ({
    participants: {
        margin: theme.spacing(4),
        padding: theme.spacing(4),
        backgroundColor: theme.palette.primary.light,
        width: '90%',
        maxWidth: '500px',
    },
    progress: {
        marginTop: theme.spacing(5),
    },
    title: {
        marginBottom: theme.spacing(3)
    },
    titleContainer: {
        margin: theme.spacing(2),
        textAlign: 'center',
    }
}))

function WaitingroomComponent({title, subTitle, participants, showProgress, onClick}) {

    const classes = useStyles();

    return (
        <div>
            <Container maxWidth="lg">
                <Grid 
                container
                direction="column"
                justify="center"
                alignItems="center"
                >
                    <Grid 
                    className={classes.titleContainer}
                    item xs={12}>
                        <UnderTitle
                        component={"h1"}
                        className={classes.title}
                        >{title}
                        </UnderTitle>
                        <TextElement>{subTitle}</TextElement>
                    </Grid>
                    {showProgress && 
                    <Grid 
                    className={classes.progress}
                    item xs={12}
                    >
                        <CircularProgress 
                        color="secondary"
                        size={70}
                        thickness={7}
                        />
                    </Grid>}
                    {participants && 
                    <Grid 
                    item xs={12}
                    >   
                        <Grid 
                        container
                        spacing={1}
                        justify="center"
                        alignItems="baseline"
                        className={classes.participants}
                        >
                        {participants.map((i, index) => {
                            return(
                                <Grid item key={index}>
                                    <ParticipantItem participant={i.id} />
                                </Grid>
                            )
                        })}
                        </Grid>
                    </Grid>
                    }
                    {onClick && <ButtonComponent size={'large'} onClick={onClick}>Start quiz!</ButtonComponent>}
                </Grid>
            </Container>
        </div>
    );
}

export default WaitingroomComponent;