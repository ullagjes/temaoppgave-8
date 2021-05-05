import React from 'react';

import { useRouter } from 'next/router';

import { Formik, Field, Form, ErrorMessage } from 'formik';

import * as Yup from 'yup';

import firebaseInstance from '../../utils/firebase';
import { checkIfQuizExists } from '../../utils/firebaseHelpers';

//const validationSchema = Yup.number().required('please add pincode').label('Pin code')

const schema = Yup.object().shape({
    pincode: Yup.string().required('Please add a pincode').label('Pincode'),
});

function Participant() {

    const router = useRouter();

    async function onSubmit(values){
        console.log(typeof values.pincode)
        const checked = checkIfQuizExists(values.pincode)
        if(checked){
            router.push(`/participant/register/${values.pincode}`)
        } else {
            alert('This quiz does not exist!')
        }
    }

    return (
        <main>
            <Formik
            initialValues={{
                pincode: '',
                }}
            validationSchema={schema}
            onSubmit={
                (values, { resetForm }) => {
                    onSubmit(values)
                }
            }
            >
                <Form>
                    <label htmlFor="pincode">Enter pincode here: </label>
                    <Field name="pincode" type="text" placeholder="00000"/>
                    <ErrorMessage name="pincode" />
                    <br></br>
                    
                    <button type="submit">Join quiz!</button>
                            
                </Form>
            </Formik>
        </main>
    );
}

export default Participant;

/*<Formik
                validationSchema={validationSchema}
                onSubmit={(values)=> console.log(values)}
            >
                <Form>
                    <label htmlFor="pincode">Enter pin code here</label>
                    <Field name="pincode" type="text" placeholder="000000" />
                    <ErrorMessage name="pincode" />
                    <label htmlFor="name">Enter pin code here</label>
                    <Field name="name" type="text" placeholder="name" />
                    <ErrorMessage name="name" />
                    <button type="submit">Done</button>
                </Form>

            </Formik>*/