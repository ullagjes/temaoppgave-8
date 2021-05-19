import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import { SubTitle } from '../BaseComponents';

const useStyles = makeStyles((theme) => ({

    button: {
        width: '100%',
        padding: theme.spacing(4)
    },

    container: {
        marginTop: theme.spacing(5),
        width: '80vw',
        maxWidth: '720px',
        padding: theme.spacing(3),
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        border: '10px solid black'
    },
    

    iconContainer: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.spacing(2),
    },

    icon: {
        height: 80,
        width: 80,
        alignSelf: 'center'
    },

    one: {
        backgroundColor: theme.palette.primary.one,
    },
    two: {
        backgroundColor: theme.palette.primary.two,
    },
    three: {
        backgroundColor: theme.palette.primary.three,
    },
    four: {
        backgroundColor: theme.palette.primary.four,
    },

}))

function ShowParticipantOptions({ question, onClick }) {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            
            {question && question.map((i, index) => {
                return(
                    <>
                        
                        <Grid 
                        container 
                        key={index}
                        direction="column"
                        >   
                            <Grid 
                            className={`${classes.one} + ${classes.iconContainer}`}
                            item
                            xs={12}>
                                <Button
                                className={classes.button}
                                onClick={() => onClick('option_one')}>
                                <RadioButtonUncheckedIcon className={classes.icon}/>
                                </Button>
                            </Grid>
                            <Grid 
                            item
                            xs={12}
                            className={`${classes.two} + ${classes.iconContainer}`}>
                                <Button
                                className={classes.button}
                                onClick={() => onClick('option_two')}>
                                    <CheckBoxOutlineBlankIcon className={classes.icon} />
                                </Button>
                            </Grid>
                            {i.options.option_three && 
                            <Grid 
                            className={`${classes.three} + ${classes.iconContainer}`}
                            item
                            xs={12}>
                                <Button 
                                className={classes.button}
                                onClick={() => onClick('option_three')}>
                                    <StarBorderIcon className={classes.icon}/>
                                </Button>
                            </Grid>}
                            {i.options.option_four && 
                            <Grid 
                            className={`${classes.four} + ${classes.iconContainer}`}
                            item
                            xs={12}>
                                <Button 
                                className={classes.button}
                                onClick={() => onClick('option_four')}>
                                    <ChangeHistoryIcon className={classes.icon}/>
                                </Button>
                            </Grid>}
                        </Grid>
                    </>
                    )
                })
            }
        </Container>
    );
}

export default ShowParticipantOptions;

/*
titleContainer: {
        backgroundColor: theme.palette.secondary.main,
    },
{i.options.option_one}

                                    {i.options.option_two}
                                    {i.options.option_three}
{i.options.option_four}
*<Grid 
                            className={classes.titleContainer}
                            item 
                            xs={12}>
                                <SubTitle component={"h1"}>{i.title}</SubTitle>
                            </Grid> */