import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../../context/authContext';
import { getQuestionData, updateQuestionData } from '../../../utils/firebaseHelpers';
import QuestionForm from '../../../components/FormComponents/QuestionForm';
import PageContainer from '../../../components/PageComponents/PageContainer';

function editQuestion() {
    const router = useRouter();
    const { id, dynamic } = router.query;
    const { user, loading, isAuthenticated } = useAuth();
    const [questionData, setQuestionData] = useState(null)

    useEffect(() => {
        if(user){
            getSelectedQuestionData(user.uid, id, dynamic)
        }
    }, [user])

    async function getSelectedQuestionData(user, quizPin, questionId){
        const questionCollection = await getQuestionData(user, quizPin, questionId)
        setQuestionData(questionCollection)
    }

    async function updateQuestion(values){
        await updateQuestionData(user.uid, id, dynamic, values)
        router.push(`/createquiz/${id}`)
    }

//===========================================AUTHENTICATION
    
    if(loading){
        return(
        <>Loading...</>
        );
    };
    
    if(isAuthenticated === false) {
        router.push('/login');
        return <>You aren't logged in.</>
    };

    return (
        <PageContainer user={user}>
            { questionData && <QuestionForm initialValues={{
                   title: questionData.title,
                    option_one: questionData.options.option_one,
                    option_two: questionData.options.option_two,
                    option_three: questionData.options.option_three,
                    option_four: questionData.options.option_four,
                    correctAnswers: [...questionData.correctAnswers]
                    }} 
                    onSubmit={updateQuestion}
            />} 
        </PageContainer>
    );
}

export default editQuestion;

/*

const questionCollection = await firebaseInstance
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('quizes')
        .doc(id)
        .collection('questions')
        .doc(dynamic)
        .get()
        .then((doc) => {
            if (doc.exists){
                return(doc.data())
            } else {
                console.log('does not exist')
            }
        })
*<QuestionForm initialValues={{
                    title: questionData.title,
                    option_one: questionData.option_one,
                    option_two: questionData.option_two,
                    option_three: questionData.option_three,
                    option_four: questionData.option_four,
                    correctAnswers: [],
                    }} 
                    updateQuestion={updateQuestion}
                    quizPin={id}
                    counter={0}
                />  */