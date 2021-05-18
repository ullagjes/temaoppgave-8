import React from 'react';
import firebaseInstance from '../utils/firebase';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import PageContainer from '../components/PageComponents/PageContainer';
import { SubTitle } from '../components/BaseComponents';
import { Paper } from '@material-ui/core';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().min(8).label('Email'),
    password: Yup.string().required().min(8).label('Password'),
})

const useStyles = makeStyles((theme) => ({
    grid: {
        padding: theme.spacing(1),
    },
    errorMessage: {
        color: theme.palette.warning.contrastText,
        borderBottom: `2px solid ${theme.palette.warning.main}`,
        fontSize: '1rem',
        paddingLeft: theme.spacing(3)
    },
    field: {
        '&::placeholder': {
            color: theme.palette.primary.dark,
        },
        padding: theme.spacing(3),
        width: '100%',
        border: 'none',
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        color: '#fff',
        backgroundColor: theme.palette.primary.light,
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        alignContent: 'flex-start',
        
    },
    label: {
        padding: theme.spacing(3),
        fontSize: '.9rem',
    },
    paper: {
        backgroundColor: theme.palette.primary.light,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90vw',
        maxWidth: '420px',
        height: '250px',
        padding: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
    },
    submit: {
        width: '100%',
        padding: theme.spacing(2),
        marginTop: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        border: 'none',
    },
    title: {
        alignSelf: 'center',
    }
}))

function logIn() {

    const classes = useStyles();

    const router = useRouter();

    async function onSubmit(values){
        try {
            await firebaseInstance.auth().signInWithEmailAndPassword(values.email, values.password)
            console.log('logged in!')
            router.push('/quizmaster/profile')
        } catch(error) {
            console.log('error')
        }
    }
    
    return (
        <>
        <PageContainer>
                <Grid 
                container 
                direction="column"
                justify="center"
                alignContent="center"
                className={classes.root}>
                    <Grid item xs={12}>
                        <SubTitle component={"h1"} className={classes.title}>Log in</SubTitle>
                    </Grid>
                    <Grid item xs={12}>

                    <Formik
                    initialValues= {{
                    email: '',
                    password: '',
                    }}
                    
                    validationSchema={validationSchema} 
                    onSubmit={(values) => onSubmit(values)}
                    >
                    <Form className={classes.formContainer}>
                        <Paper className={classes.paper}>    
                        <Grid 
                        container
                        direction="column"
                        spacing={3}
                        className={classes.grid}
                        >
                            <Grid item xs={12}>

                                <Field 
                                className={classes.field}
                                name="email" 
                                type="email" 
                                placeholder="Email adress"/>
                                <label 
                                className={classes.label}
                                htmlFor='email'>Email adress</label>
                                <ErrorMessage name="email" 
                                component="div"
                                className={classes.errorMessage} />
                                
                            </Grid>
                            <Grid item xs={12}>
                                <Field 
                                className={classes.field}
                                name="password" 
                                type="password"
                                placeholder="Password"
                                />
                                <label
                                className={classes.label} 
                                htmlFor='password'>Password</label>
                                <ErrorMessage 
                                className={classes.errorMessage}
                                component="div"
                                name="password" />
                            </Grid>
                        </Grid>
                        <Button type="submit" className={classes.submit}>Submit</Button>
                    
                        </Paper>
                    </Form>
                </Formik>
                    </Grid>
                </Grid>
                
        </PageContainer>


        </>
    );
}

export default logIn;

/**<label htmlFor='firstName'>First name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
                <label htmlFor='lastName'>Last name</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null} */