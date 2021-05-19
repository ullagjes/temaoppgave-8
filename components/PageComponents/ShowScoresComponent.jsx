import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import Grow from '@material-ui/core/Grow';

import { ButtonComponent, UnderTitle } from '../BaseComponents';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        border: theme.borders.medium,
    },
    avatar: {
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
    },
    text: {
        color: theme.palette.secondary.contrastText,
    },
    gridContainer: {
        width: '90vw',
        maxWidth: '1200px',
        flexGrow: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        alignSelf: 'center'
    },
    icon: {
        height: 35,
        width: 35,
        marginRight: theme.spacing(3)
    },
    listContainer: {
        backgroundColor: theme.palette.secondary.main,
        overflow: 'hidden',
        flexGrow: 1,
        margin: theme.spacing(4),
        textAlign: 'center',
        padding: theme.spacing(3),
        color: theme.palette.secondary.contrastText,
        border: theme.borders.medium,
    },
    listItem: {
        backgroundColor: theme.palette.secondary.dark,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: '100%',

    },
    optionDiv: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: '1.5rem',
        color: theme.palette.text.main,
        textAlign: 'left',
        border: theme.borders.medium,
    },
    option_one: {
        backgroundColor: theme.palette.primary.one,
    },
    option_two: {
        backgroundColor: theme.palette.primary.two, 
    },
    option_three: {
        backgroundColor: theme.palette.primary.three,
    },
    option_four: {
        backgroundColor: theme.palette.primary.four,
    },
    paper: {
        maxWidth: '710px',
        paddingBottom: theme.spacing(2),
        margin: theme.spacing(4),
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: theme.palette.transparent.main,
        color: 'black',
        border: theme.borders.thick,
    },
    paperContainer: {
        padding: theme.spacing(3),
    },
    titleContainer: {
        padding: theme.spacing(2)
    },
    title: {
        color: 'black',
    },
}))

function ShowScoresComponent({
    title, 
    participants, 
    question, 
    isPending,
    bPxs,
    bPsm,
    onClick
}) {
    const classes = useStyles();
    const classOne = classes.option_one
    const classTwo = classes.option_two
    const classThree = classes.option_three
    const classFour = classes.option_four
    
    return (
       
    <Grid 
    className={classes.gridContainer}
    container 
    spacing={1}
    direction='row'
    justify="center"
    alignContent="flex-start"
    >
        {question && 
        <Grid 
        className={classes.paperContainer}
        item 
        xs={12} 
        sm={8}
        >
            <Paper 
            className={classes.paper}
            variant="outlined"
            square
            >
                <div className={classes.titleContainer}>
                    <UnderTitle component={"h1"} className={classes.title}>Correct answer(s)</UnderTitle>
                    {question && question.map((i, index) => {
                        return(
                            <div key={index}>
                            {i.correctAnswers.map((j, index) => {
                                const filteredByKey = Object.fromEntries(
                                    Object.entries(i.options).filter(([key, value]) => key === j))
                                const getValue = Object.values(filteredByKey)
                                
                                if(j === 'option_one'){
                                    return(
                                        <Grow 
                                        in={isPending === true}
                                        style={{ transformOrigin: '0 0 0' }}
                                        key={index}
                                        >
                                            <Paper 
                                            className={`${classOne} ${classes.optionDiv}`}
                                            >
                                                <>
                                                <RadioButtonUncheckedIcon className={classes.icon}/>
                                                    {getValue.map(k => {
                                                        return <p>{k}</p>
                                                        })
                                                    }
                                                </>
                                            </Paper> 
                                        </Grow>
                                    )}
                                    if(j === 'option_two'){
                                        return(
                                            <Grow 
                                            in={isPending === true}
                                            style={{ transformOrigin: '0 0 0' }}
                                            key={index}
                                            >
                                            <Paper className={`${classTwo} ${classes.optionDiv}`}
                                            >
                                                <>
                                                <CheckBoxOutlineBlankIcon className={classes.icon}/>
                                                {getValue.map(k => {
                                                    return <p>{k}</p>
                                                    })
                                                }
                                            </>
                                        </Paper>
                                        </Grow>
                                        )
                                    }

                                    if(j === 'option_three'){
                                        return(
                                            <Grow 
                                            mountOnEnter
                                            unmountOnExit
                                            in={isPending === true}
                                            style={{ transformOrigin: '0 0 0' }}
                                            key={index}
                                            >
                                            <Paper className={`${classThree} ${classes.optionDiv}`}
                                            >
                                                <>
                                                    <StarBorderIcon className={classes.icon}/>
                                                    {getValue.map(k => {
                                                        return <p>{k}</p>
                                                    })}
                                                </>
                                            </Paper>
                                            </Grow>
                                        )
                                    }

                                    if(j === 'option_four'){
                                        return(
                                            <Grow 
                                            in={isPending}
                                            style={{ transformOrigin: '0 0 0' }}
                                            key={index}
                                            >
                                            <Paper className={`${classFour} ${classes.optionDiv}`}
                                            >
                                            <>
                                            <ChangeHistoryIcon className={classes.icon}/>
                                                {getValue.map(k => {
                                                return <p>{k}</p>
                                                })}
                                            </>
                                            </Paper>
                                            </Grow>
                                        )
                                    }
                                })
                            }
                            </div>
                            )
                        })
                        }
                        <ButtonComponent className={classes.button} onClick={onClick} size={"large"}>Next</ButtonComponent>
                    </div>
                </Paper>
            </Grid>}
        
        <Grid 
        className={classes.listContainer}
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        item 
        xs={bPxs} 
        sm={bPsm}>

            <Grid item xs={12}>
                <Typography variant="h6" component={'h2'}>
                    {title}
                </Typography> 
            </Grid>
            
            <List>
                {participants && participants.map((i, index) => {
                  return(
                    <Grid item xs={12}>
                    <ListItem key={index} className={classes.listItem}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <FaceIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                            className={classes.text}
                            primary={`${i.id.toUpperCase()}: ${i.points}`}
                            />
                        </ListItem>
                    </Grid>
                  )
              })}
            </List>
        </Grid>
    </Grid>
    );
}

export default ShowScoresComponent;