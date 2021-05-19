import React from 'react';
//YUP
import * as Yup from 'yup'
//NEXT
import { useRouter } from 'next/router';
//UTILS
import { createUserInFirestore } from '../utils/firebaseHelpers';
import firebaseInstance from '../utils/firebase';
//COMPONENTS
import FormComponent from '../components/FormComponents/FormComponent';
import FormItem from '../components/FormComponents/FormItem';
import PageContainer from '../components/PageComponents/PageContainer';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().min(8).label('Email'),
    password: Yup.string().required().min(8).label('Password'),
})

function register() {
    const router = useRouter();

    async function onSubmit(values){
        try {
            await firebaseInstance.auth().createUserWithEmailAndPassword(values.email, values.password)
            firebaseInstance.auth().onAuthStateChanged((user) => {
                createUserInFirestore(user.uid)
                router.push('/login')
            })
            console.log('signed in!')
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
                formTitle={"Register new user"}
                buttonText={"Submit"}
                >
                    <FormItem
                    fieldName={"email"}
                    placeholer={"Email adress"}
                    labelText={"Email adress"}
                    />
                    <FormItem
                    fieldName={"password"}
                    placeholer={"password"}
                    labelText={"Choose a password (min. 8 characters)"}
                    fieldType={'password'}
                    />
                </FormComponent>
            </PageContainer>
        </>
    );
}

export default register;