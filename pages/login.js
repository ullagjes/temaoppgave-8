import React from 'react';
import firebaseInstance from '../utils/firebase';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().min(8).label('Email'),
    password: Yup.string().required().min(8).label('Password'),
})

function logIn() {

    const router = useRouter()

    async function onSubmit(values){
        try {
            await firebaseInstance.auth().signInWithEmailAndPassword(values.email, values.password)
            console.log('logged in!')
            router.push('/createquiz')
        } catch(error) {
            console.log('error')
        }
    }
    
    return (
        <>
        
        <h1>Log in</h1>
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