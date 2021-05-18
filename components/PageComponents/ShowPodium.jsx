import { Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles'
import { ButtonComponent, SubTitle, TextElement } from '../BaseComponents';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',

    },
    container: {
        width: '90vw',
        maxWidth: '720px',
        height: 'auto',
        maxHeight: '500px',
        textAlign: 'center',
        backgroundColor: theme.palette.primary.light,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(3),
    },

    podium: {
        width: '100%'
    },
    first: {
        height: 250,
        backgroundColor: 'gold',
    },
    second: {
        height: 200,
        backgroundColor: 'silver',
    },
    third: {
        height: 150,
        backgroundColor: '#cd7f32'
    }
}))


function ShowPodium({participants, onClick}) {
    const classes = useStyles();
    console.log('podium', participants)

    return (
        <>
        <>{participants.length === 0 ? <p>loading</p> : 
        <>
        {participants && <Container className={classes.root}>
            <SubTitle component={"h1"}>Podium</SubTitle>
            <ButtonComponent onClick={onClick}>End quiz</ButtonComponent>
            
                <Grid 
                className={classes.container}
                spacing={3}
                direction="row"
                justify="space-evenly"
                alignItems="flex-end"
                alignContent="flex-end"
                container>
                    {participants.length > 1 && <Grid item xs={3}>
                        <TextElement>{participants[1].id.toUpperCase()}</TextElement>
                        <Box className={`${classes.second} + ${classes.podium}`}></Box>               
                    </Grid>
                    }
                    <Grid item xs={3}>
                        <TextElement>{participants[0].id.toUpperCase()}</TextElement>
                        <Box className={`${classes.first} + ${classes.podium}`}></Box>                
                    </Grid>
                    
                    {participants.length > 2 && <Grid item xs={3}>
                        <TextElement>{participants[2].id.toUpperCase()}</TextElement>
                        <Box className={`${classes.third} + ${classes.podium}`}></Box>             
                    </Grid>}
            </Grid>
            
        </Container>}
        </>
        }</>
        </>
    );
}

export default ShowPodium;