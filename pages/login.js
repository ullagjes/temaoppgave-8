import React from 'react';
//YUP
import * as Yup from 'yup'
//NEXT
import { useRouter } from 'next/router';
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
//UTILS
import firebaseInstance from '../utils/firebase';
//COMPONENTS
import PageContainer from '../components/PageComponents/PageContainer';
import { LinkComponent } from '../components/BaseComponents';
import FormComponent from '../components/FormComponents/FormComponent';
import FormItem from '../components/FormComponents/FormItem';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().min(8).label('Email'),
    password: Yup.string().required().min(8).label('Password'),
})

const useStyles = makeStyles((theme) => ({
    link: {
        color: theme.palette.text.main,
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
            router.push('/quizmaster')
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
                    placeholder={"Email adress"}
                    labelText={"Email adress"}
                />
                <FormItem
                    fieldName={"password"}
                    placeholder={"Password"}
                    labelText={"Password"}
                    fieldType={"password"}
                />
                <LinkComponent href='/register'>
                    <p className={classes.link}>New user? Register here.</p>
                </LinkComponent>
            </FormComponent>
        </PageContainer>
        </>
    );
}

export default logIn;