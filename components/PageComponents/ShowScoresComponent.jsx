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
    },
    listItem: {
        backgroundColor: theme.palette.secondary.light,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),

    },
    optionDiv: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        fontSize: '1.5rem',
        color: theme.palette.primary.contrastText,
        textAlign: 'left'
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
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText
    },
    paperContainer: {
        padding: theme.spacing(3)
    },
    titleContainer: {
        padding: theme.spacing(2)
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
    alignItems='center'

    >
        {question && <Grid 
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
                        <UnderTitle>Correct answer(s)</UnderTitle>
                        {question && question.map((i, index) => {
                            return(
                            <div 
                            key={index}
                            >
                                {i.correctAnswers.map((j, index) => {
                            
                                    const filteredByKey = Object.fromEntries(
                                        Object.entries(i.options).filter(([key, value]) => key === j))
                                    const getValue = Object.values(filteredByKey)
                                    if(j === 'option_one'){
                                    return(
                                        <Grow 
                                        in={isPending === true}
                                        style={{ transformOrigin: '0 0 0' }}
                                        >
                                        <Paper 
                                        className={`${classOne} ${classes.optionDiv}`}
                                        key={index}>
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
                                            >
                                            <Paper className={`${classTwo} ${classes.optionDiv}`}
                                            key={index}>
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
                                        >
                                        <Paper className={`${classThree} ${classes.optionDiv}`}
                                        key={index}>
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
                                            >
                                            <Paper className={`${classFour} ${classes.optionDiv}`}
                                            key={index}>
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
                                    
                            })}
                            </div>
                            )
                        })
                        }
                        <ButtonComponent onClick={onClick} size={"large"}>Next</ButtonComponent>
                    </div>
                    
                </Paper>
                
            </Grid>}
       
        <Grid 
        className={classes.listContainer}
        item 
        xs={bPxs} 
        sm={bPsm}>
            <List>
            <Typography variant="h6">
            {title}
            </Typography> 
              {participants && participants.map((i, index) => {
                  return(

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
                  )
              })}
            </List>
        </Grid>
        
    </Grid>
        
    );
}

export default ShowScoresComponent;