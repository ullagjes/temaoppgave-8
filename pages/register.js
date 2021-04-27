import React from 'react';
import firebaseInstance from '../utils/firebase';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    email: Yup.string().required().min(8).label('Email'),
    password: Yup.string().required().min(8).label('Password'),
})

function register() {

    async function onSubmit(values){
        try {
            await firebaseInstance.auth().createUserWithEmailAndPassword(values.email, values.password)
            console.log('signed in!')
        } catch(error) {
            console.log('error')
        }
    }

    return (
        <>
            <h1>Test</h1>
            <Formik
            initialValues= {{
                email: '',
                password: '',
            }}
            validationSchema={validationSchema} 
            onSubmit={(values) => onSubmit(values)}
            >
                <Form>
                    <label htmlFor='email'>Email adress</label>
                    <Field name="email" type="email" placeholder="Email adress"/>
                    <ErrorMessage name="email" />
                    <label htmlFor='password'>Password</label>
                    <Field name="password" type="password"
                    />
                    <ErrorMessage name="password" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    );
}

export default register;