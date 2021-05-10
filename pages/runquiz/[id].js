import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../context/authContext';
import { 
    activateQuiz,
    checkForQuizData, 
    hideQuestions, 
    getAllParticipantScores, 
    resetQuiz,
    showCurrentQuestion 
} from '../../utils/firebaseHelpers';
import firebaseInstance from '../../utils/firebase';

//TODO: check firestore data for quizrunning instead of usestate

function hostRunningQuiz() {

    const router = useRouter();
    const { id } = router.query;
    const { user } = useAuth();

    //TOGGLES
    const [quizRunning, setQuizRunning] = useState(true)
    const [quizPending, setQuizPending] = useState(false)
    const [watingRoomAcitve, setWatingRoomActive] = useState(true)
    //DATA
    const [quizData, setQuizData] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [question, setQuestion] = useState(null)
    const [participantScores, setParticipantScores] = useState([])
    const [participants, setParticipants] = useState([])
    
    const filter = quizData.filter(i => {
        return(i !== question)
    })

    useEffect(() => {
        const participantCollection = firebaseInstance
        .firestore()
        .collection('running')
        .doc(id)
        .collection('participants')
        .where('isPlaying', '==', true)


        return participantCollection.onSnapshot((snapshot) => {
            let array = []
            snapshot.forEach(i => {
                array.push({
                    id: i.id,
                    ...i.data()
                })
            })
            setParticipants(array)
        })
    }, [quizData])

    useEffect(() => {
        if(user){
            getData(user.uid, id)
        }
    }, [user])

    useEffect(() => {
        if(quizData.length > 0){
            firebaseInstance
            .firestore()
            .collection('users')
            .doc(user.uid)
            .collection('quizes')
            .doc(id)
            .get()
            .then((doc) => {
                console.log(doc.data())
                if(doc.data().isActive){
                    console.log('active')
                    setQuizRunning(true)
                } else {
                     console.log('not active')
                }
                if(doc.data().isWaitingRoomActive === false){
                    setWatingRoomActive(false)
                    console.log('waitingroom is not active')
                } else {
                    console.log('waitingroom is active')
                }
            })
        } else {
            console.log('no data')
        }
    }, [quizData])

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

    async function startQuiz(){
        activateQuiz(user.uid, id)
        setWatingRoomActive(false)
        setQuizRunning(true)
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
        } else {
            setCurrentQuestion(currentQuestion + 1)
            setQuizAsPending()
        }
    }

    async function showScores(){
        const scoreData = await getAllParticipantScores(id)
        setParticipantScores(scoreData)

        if(currentQuestion + 1 === quizData.length){
            await hideQuestions(id, quizData)
            await showEndResults()
        } else {
            setQuizAsPending()
        }
    }

    async function setQuizAsPending(){
        const quizDocument = firebaseInstance
        .firestore()
        .collection('running')
        .doc(id)
        
        await quizDocument.get()
        .then((doc) => {
            if(doc.exists && doc.data().isPending !== true){
                quizDocument.update({
                    isPending: true
                })
                setQuizPending(true)
            }

            if(doc.exists && doc.data().isPending === true){
                quizDocument.update({
                    isPending: false
                })
                setQuizPending(false)
            }
        })
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
                setQuizRunning(false)
            }
        })
    }

    function ScoresComponent() {
        return(
            <>
                <h1>Scores</h1>
                <button onClick={nextQuestion}>Next question</button>
                {participantScores && participantScores.map((i, index) => {
                    return(
                        <p key={index}>{i.id.toUpperCase()}: {i.points} </p>
                    )
                })}
                
            </>
        )
    }

    function QuestionRunningComponent(){
        return(
            <>
                <h1>Question is</h1>
                <p>Current question: {JSON.stringify(question)}</p>
                <button onClick={showScores}>Show scores</button>
            </>
        )
    }

    function WaitingRoomComponent(){
        return(
            <div>
                <h1>Use this PINCODE to join the quiz: {id}</h1>
                <p>Waiting for contestants...</p>
                {participants && participants.map((i, index) => {
                    return(
                        <p key={index}>{i.id}</p>
                    )
                })}
                <button onClick={startQuiz}>Start quiz!</button>
            </div>
        )
    }

    return (
        <div>
            {watingRoomAcitve ? <WaitingRoomComponent />
            : 
            <div>{quizRunning ? 
            <>
                {quizPending ? 
                    <ScoresComponent /> 
                    : 
                    <QuestionRunningComponent />
                }
            </>    
            : 
            <>
               <h2>Quiz over!</h2> 
               <h3>Scores:</h3>
               {participantScores && participantScores.map((i, index) => {
                   return(
                    <p key={index}>{i.id.toUpperCase()}: {i.points}</p>
                   )
               })}
               <button onClick={() => resetQuiz(user.uid, id)}>End quiz</button>
               
            </>
            }</div>
            }
        </div>
    );
}

export default hostRunningQuiz;

/**
    async function previousQuestion(){
        setCurrentQuestion(currentQuestion - 1)
    }
 * 
 * <button onClick={testValues}>test</button>
 * 
 *     async function testValues(){
        console.log('all data:', quizData)
        console.log('current q:', currentQuestion)
        showFirstQ(id, question.id)
        const filter = quizData.filter(i => {
            return(i !== question)
        })

        console.log(filter)
    }
 * {currentQuestion > 0 ? <button onClick={previousQuestion}>Previous question</button> : ''}
 * 
 * useEffect(() => {
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
