import React from 'react';
//NEXT
import { useRouter } from 'next/router';
//YUP
import * as Yup from 'yup';
//UTILS
import { addParticipantToRunningQuiz } from '../../../utils/firebaseHelpers';
//COMPONENTS
import PageContainer from '../../../components/PageComponents/PageContainer';
import FormComponent from '../../../components/FormComponents/FormComponent';
import FormItem from '../../../components/FormComponents/FormItem';

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
        <PageContainer>
            <FormComponent
            initialValues={{nickname: '',}}
            schema={schema}
            onSubmit={values => onSubmit(values)}
            formTitle={"Add a nickname"}
            buttonText={"Join quiz!"}
            >
                <FormItem
                fieldName={"nickname"}
                placeholder={"Nickname"}
                labelText={"One last step: Enter your nickname:"}
                />
            </FormComponent>
        </PageContainer>
    );
}

export default RegisterParticipant;