import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';

import { ButtonComponent, UnderTitle, TextElement } from '../BaseComponents';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '1200px',
    alignSelf: 'center',
    margin: theme.spacing(3),
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    border: '10px solid black',
    padding: theme.spacing(3),
  },
  button: {
    border: '5px solid black',
    marginTop: theme.spacing(3),
  },
  titleContainer: {
      padding: theme.spacing(4),
      backgroundColor: 'white',
      border: theme.borders.medium,
  },
  title: {
    color: 'black',
  },
  optionContainer: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
  },
  one: {
    backgroundColor: theme.palette.primary.one,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(1),
    
    border: '5px solid black',
  },
  two: {
    backgroundColor: theme.palette.primary.two,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(1),
    border: '5px solid black',
  },
  three: {
    backgroundColor: theme.palette.primary.three,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    border: '5px solid black',
  },
  four: {
    backgroundColor: theme.palette.primary.four,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    border: '5px solid black',
  },
  icon: {
    marginRight: theme.spacing(4),
    height: 35,
    width: 35,
  }
  })
);

export function ShowOptionsComponent({
  title, 
  optionOne, 
  optionTwo, 
  optionThree, 
  optionFour, 
  onClick
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <Paper className={classes.titleContainer}>
              <UnderTitle component={'h1'} className={classes.title}>{title}</UnderTitle>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.one}>
            <div className={classes.optionContainer}>
                <RadioButtonUncheckedIcon className={classes.icon}/>
                <TextElement>{optionOne}</TextElement>
            </div>
            
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          
          <Paper className={classes.two}>
            <div className={classes.optionContainer}>
                <CheckBoxOutlineBlankIcon className={classes.icon}/>
                <TextElement>{optionTwo}</TextElement>
            </div>
          </Paper>
        </Grid>
        {optionThree && <Grid item xs={12} sm={6}>
          <Paper className={classes.three}>
            <div className={classes.optionContainer}>
                <StarBorderIcon className={classes.icon}/>
                <TextElement>{optionThree}</TextElement>
            </div>
          </Paper>
        </Grid>}
        {optionFour && <Grid item xs={12} sm={6}>
          <Paper className={classes.four}>
            <div className={classes.optionContainer}>
                <ChangeHistoryIcon className={classes.icon}/>
                <TextElement>{optionFour}</TextElement>
            </div>
          </Paper>
        </Grid>}
      </Grid>
      <ButtonComponent
      className={classes.button}
      onClick={onClick}
      size={'large'}
      >Show answer</ButtonComponent>
    </div>
  );
}
