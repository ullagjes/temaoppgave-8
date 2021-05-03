import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../context/authContext';
import { addQuestionToRunningQuiz, checkForQuizData } from '../../utils/firebaseHelpers';


function hostRunningQuiz() {

    const router = useRouter();
    const { id } = router.query
    const { user } = useAuth();

    const [quizData, setQuizData] = useState([])


    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [question, setQuestion] = useState('')
    
    useEffect(() => {
        if(user){
            getData(user.uid, id)
        }

    }, [user])

    useEffect(() => {
        setQuestion(quizData[currentQuestion])
    }, [quizData])

    useEffect(() => {
        console.log(question)
        if(question){addQuestionToRunningQuiz(id, question)}
    }, [question])




    async function getData(user, quizPin){
        const data = await checkForQuizData(user, quizPin)
        setQuizData(data)
    }

    function incrementCurrentQuestion(){
        setCurrentQuestion(currentQuestion + 1)
        setQuestion(quizData[currentQuestion])
    }

    function runQuestion(){
        if(currentQuestion !== 0){
            incrementCurrentQuestion()
        }
        
        addQuestionToRunningQuiz(id, question)        

    }

    return (
        <div>
            <p>{JSON.stringify(question)}</p>
            <button onClick={runQuestion}>Run question</button>
            <button onClick={incrementCurrentQuestion}>Next</button>
        </div>
    );
}

export default hostRunningQuiz;