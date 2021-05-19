import React, { 
    useEffect, 
    useState 
} from 'react';
//NEXT
import { useRouter } from 'next/router';
//CONTEXT
import { useAuth } from '../../../context/authContext';
//UTILS
import { getQuestionData, updateQuestionData } from '../../../utils/firebaseHelpers';
//COMPONENTS
import QuestionForm from '../../../components/FormComponents/QuestionForm';
import PageContainer from '../../../components/PageComponents/PageContainer';

//ALLOWS USER TO EDIT A SINGLE QUESTION

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

    //COLLECTS DATA FROM FIRESTORE
    //DATA IS USED AS INTIAL VALUES IN FORM
    async function getSelectedQuestionData(user, quizPin, questionId){
        const questionCollection = await getQuestionData(user, quizPin, questionId)
        setQuestionData(questionCollection)
    }

    //UPDATES FIRESTORE DATA
    async function updateQuestion(values){
        await updateQuestionData(user.uid, id, dynamic, values)
        router.push(`/createquiz/${id}`)
    }

    //AUTHENTICATION
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
            {questionData && 
            <QuestionForm 
            initialValues={{
                title: questionData.title,
                option_one: questionData.options.option_one,
                option_two: questionData.options.option_two,
                option_three: questionData.options.option_three,
                option_four: questionData.options.option_four,
                correctAnswers: [...questionData.correctAnswers]
                }} 
            onSubmit={updateQuestion}
            />
            } 
        </PageContainer>
    );
}

export default editQuestion;