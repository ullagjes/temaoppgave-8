import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../context/authContext';
import { checkForQuizData, hideQuestions, showCurrentQuestion } from '../../utils/firebaseHelpers';
import firebaseInstance from '../../utils/firebase';

function hostRunningQuiz() {

    const router = useRouter();
    const { id } = router.query;
    const { user } = useAuth();

    const [quizRunning, setQuizRunning] = useState(true)
    const [quizData, setQuizData] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [question, setQuestion] = useState(null)
    
    const filter = quizData.filter(i => {
        return(i !== question)
    })

    useEffect(() => {
        if(user){
            getData(user.uid, id)
        }
    }, [user])

    useEffect(() => {
        setQuestion(quizData[currentQuestion])
    }, [quizData, currentQuestion])

    useEffect(() => {

        if(question !== undefined){
            if(question !== null && currentQuestion === 0){
                showFirstQ(id, question.id)
            }
            
            if(question !== null){
                toggleQuestionVisibility()
            }
        }
        
    }, [question])

    async function getData(user, quizPin){
        const data = await checkForQuizData(user, quizPin)
        setQuizData(data)
    }

    async function showFirstQ(quizPin, questionId){
        if(question !== undefined){
            await showCurrentQuestion(quizPin, questionId)
        }
    }

    async function toggleQuestionVisibility(){
        await showCurrentQuestion(id, question.id)
        await hideQuestions(id, filter)
    }

    async function nextQuestion(){
        if(currentQuestion + 1 === quizData.length){
            await hideQuestions(id, quizData)
            await showEndResults()
            setQuizRunning(false)
        } else {
            setCurrentQuestion(currentQuestion + 1)
        }
    }

    async function previousQuestion(){
        setCurrentQuestion(currentQuestion - 1)
    }

    async function showEndResults(){
        const quizDocument = firebaseInstance
        .firestore()
        .collection('running')
        .doc(id)
        
        await quizDocument.get()
        .then((doc) => {
            if(doc.exists){
                quizDocument.update({
                    isActive: false
                })
            }
        })
    }

    async function testValues(){
        console.log('all data:', quizData)
        console.log('current q:', currentQuestion)
        showFirstQ(id, question.id)
        const filter = quizData.filter(i => {
            return(i !== question)
        })

        console.log(filter)
    }

    return (
        <div>
            {quizRunning ? 
            <>
                <p>{JSON.stringify(question)}</p>
                {currentQuestion > 0 ? <button onClick={previousQuestion}>Previous question</button> : ''}
                <button onClick={nextQuestion}>Next question</button>
                <button onClick={testValues}>test</button>
            </>    
            : 
            <>
               <h2>Quiz over!</h2> 
               <h3>Scores:</h3>
               <button>End quiz</button>
               
            </>
            }
        </div>
    );
}

export default hostRunningQuiz;

/**useEffect(() => {
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

}*/
