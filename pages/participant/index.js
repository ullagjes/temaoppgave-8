import React from 'react';
//NEXT
import { useRouter } from 'next/router';
//YUP
import * as Yup from 'yup';
//UTILS
import { checkIfQuizExists } from '../../utils/firebaseHelpers';
//COMPONENTS
import PageContainer from '../../components/PageComponents/PageContainer';
import FormComponent from '../../components/FormComponents/FormComponent';
import FormItem from '../../components/FormComponents/FormItem';

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
        <PageContainer>
            <FormComponent
            initialValues={{pincode: '',}}
            schema={schema}
            onSubmit={values => onSubmit(values)}
            formTitle={"Welcome to KaShoot!"}
            buttonText={"Next"}
            >
                <FormItem 
                fieldName={"pincode"}
                placeholder={"000000"}
                labelText={"Use the pincode supplied by your quizmaster to join the quiz"}
                />
            </FormComponent>
        </PageContainer>
        
    );
}

export default Participant;
