import React from 'react';
import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

import { UnderTitle} from '../BaseComponents';

const useStyles = makeStyles((theme) => ({
    grid: {
        padding: theme.spacing(1),
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        alignContent: 'flex-start',
    },
    paper: {
        backgroundColor: theme.palette.transparent.main,
        width: '90vw',
        maxWidth: '600px',
        height: 'auto',
        padding: theme.spacing(1),
        border: theme.borders.medium,
    },
    root: {
        flexGrow: 1,
    },
    submit: {
        width: '100%',
        padding: theme.spacing(2),
        marginTop: theme.spacing(3),
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary.contrastText,
    },
    title: {
        alignSelf: 'center',
        color: theme.palette.secondary.contrastText,
    }
}))


function FormComponent({ 
    children, 
    schema, 
    initialValues, 
    onSubmit, 
    buttonText, 
    formTitle 
}) {
    const classes = useStyles();

    return (
        <>
        <Grid 
        container 
        direction="column"
        justify="center"
        alignContent="center"
        className={classes.root}>
            <Grid item xs={12}>
                <UnderTitle component={"h2"} className={classes.title}>{formTitle}</UnderTitle>
            </Grid>
            <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={
                (values, { resetForm }) => {
                    onSubmit(values)
                    resetForm()
                }
            }
            >
                <Form className={classes.formContainer}>
                    <Paper className={classes.paper}>
                        <Grid 
                        container
                        direction="column"
                        spacing={3}
                        className={classes.grid}
                        > 
                        {children}
                        </Grid>
                        <Button type="submit" className={classes.submit}>{buttonText}</Button>
                    </Paper>       
                </Form>
            </Formik>
            </Grid>
        </>
    );
}

export default FormComponent;