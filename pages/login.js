import React from 'react';
import firebaseInstance from '../utils/firebase';
import * as Yup from 'yup'
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';

import PageContainer from '../components/PageComponents/PageContainer';
import {LinkComponent } from '../components/BaseComponents';
import FormComponent from '../components/FormComponents/FormComponent';
import FormItem from '../components/FormComponents/FormItem';


const validationSchema = Yup.object().shape({
    email: Yup.string().required().min(8).label('Email'),
    password: Yup.string().required().min(8).label('Password'),
})

const useStyles = makeStyles((theme) => ({
    link: {
        color: theme.palette.secondary.contrastText,
        fontSize: '1.5rem',
        margin: theme.spacing(2),
        padding: theme.spacing(2),
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
            <FormComponent
            schema={validationSchema}
            initialValues={{
                email: '',
                password: '',
            }}
            onSubmit={(values) => onSubmit(values)}
            buttonText={"Submit"}
            formTitle={"Log in"}
            >
                <FormItem
                    fieldName={"email"}
                    placeHolder={"Email adress"}
                    labelText={"Email adress"}
                />
                <FormItem
                    fieldName={"password"}
                    placeHolder={"Password"}
                    labelText={"Password"}
                    fieldType={"password"}
                />
                <LinkComponent href='/register'>
                    <a className={classes.link}>New user? Register here.</a>
                </LinkComponent>
            </FormComponent>
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