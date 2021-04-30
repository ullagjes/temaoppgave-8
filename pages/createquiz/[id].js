import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../context/authContext';
import firebaseInstance from '../../utils/firebase';
import { checkForQuizData, checkForUserData } from '../../utils/firebaseHelpers';
import { useQuestion } from '../../context/questionContext';
import QuestionForm from '../../components/QuestionForm';


function createQuestions () {

    const { user } = useAuth();
    const { questions, removeQuestion } = useQuestion();
    const router = useRouter();
    const { id } = router.query

    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        if(user){
            console.log(user)
        }
    }, [user])

    function createNewQuestion(){
        setToggle(true)
    }
    
    return (
        <div>
            {user && JSON.stringify(user.uid)}
            {JSON.stringify(questions)}
            <br></br>
            <button onClick={createNewQuestion}>Add question</button>
            {toggle ? <QuestionForm initialValues={{
                            title: '',
                            option_one: '',
                            option_two: '',
                            option_three: '',
                            option_four: '',
                        }} /> : ''}
        </div>
    );
}

export default createQuestions;
