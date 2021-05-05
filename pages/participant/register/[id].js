import React from 'react';

import { useRouter } from 'next/router';

import { Formik, Field, Form, ErrorMessage } from 'formik';

import * as Yup from 'yup';

import { addParticipantToRunningQuiz } from '../../../utils/firebaseHelpers';

//const validationSchema = Yup.number().required('please add pincode').label('Pin code')

const schema = Yup.object().shape({
    nickname: Yup.string().required('Please enter nickname').label('Nickname'),
});

function RegisterParticipant() {

    const router = useRouter();
    const { id } = router.query;

    async function onSubmit(values){
        let checkNickname = await addParticipantToRunningQuiz(id, values.nickname.toLowerCase())
        if(checkNickname === false){
            alert('Nickname is already taken!')
        } else {
            router.push(`/participant/quiz/${id}/${values.nickname.toLowerCase()}`)
        }
    }

    return (
        <main>
            <Formik
            initialValues={{
                nickname: '',
                }}
            validationSchema={schema}
            onSubmit={
                (values, { resetForm }) => {
                    onSubmit(values)
                    resetForm()
                }
            }
            >
                <Form>
                    <label htmlFor="nickname">Enter your nickname here: </label>
                    <Field name="nickname" type="text" placeholder="Nickname"/>
                    <ErrorMessage name="nickname" />
                    <br></br>
                    
                    <button type="submit">Join quiz!</button>
                            
                </Form>
                
            </Formik>
            
            <button onClick={onSubmit}>test</button>
        </main>
    );
}

export default RegisterParticipant;