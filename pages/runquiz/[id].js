import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../context/authContext';
import { resetQuiz } from '../../utils/firebaseHelpers';
import firebaseInstance from '../../utils/firebase';


import WaitingroomComponent from '../../components/PageComponents/WaitingroomComponent';

import { ShowOptionsComponent } from '../../components/PageComponents/ShowOptionsComponent';

//TODO: check firestore data for quizrunning instead of usestate

function hostRunningQuiz() {

    const router = useRouter();

    const { id } = router.query;
    const { user } = useAuth();

    //COUNTER USED IN REAL TIME DATA UPDATES
    const [counting, setCounting] = useState(0)

    //FOR QUIZTITLE, WAITINGROOM AND PENDING
    const [allQuizData, setAllQuizData] = useState([])
    const [quizRunning, setQuizRunning] = useState(true)
    const [quizPending, setQuizPending] = useState(null)
    const [waitingRoomAcitve, setWaitingRoomActive] = useState(null)
    const [quizEnded, setQuizEnded] = useState(null)

    //PARTICIPANT DATA
    const [participants, setParticipants] = useState([])
    const [participantsByScore, setParticipantsByScore] = useState([])
    
    //FOR ALL QUESTIONS AND REALTIME DATA
    const [allQs, setAllQs] = useState([])
    const [realTimeQ, setRealTimeQ] = useState([])
    const [currentQ, setCurrentQ] = useState(0) 

    //FIRESTORE REFS
    const runningQuizCollection = firebaseInstance
        .firestore()
        .collection('running')
        
    const runningQuizDocument = runningQuizCollection
        .doc(id)
    
    //GETS DATA AND REALTIME DATA
    useEffect(() => {
        //ALL DATA FROM RUNNING COLLECTION
        getQuizData()
        //REALTIME DATA FUNCTIONS
        getCurrentQ()
        getParticipantData()
        getQCounter()
        
    }, [id])

    //UPDATE COUNTER
    useEffect(() => {
        setCurrentQ(counting)
    }, [counting])

    useEffect(() => {
        if(allQs.length !== 0){
            updateCountInFirestore(allQs[currentQ])
        }
    }, [allQs, currentQ])

    //UPDATES STATE FOR PENDING AND WAITING ROOM IF USER REFRESHES PAGE
    useEffect(() => {
        if(allQuizData){
            if(allQuizData.isWaitingRoomActive){
                setWaitingRoomActive(true)
                console.log('waiting room initally true')
            } else {
                console.log('waiting room initally not true')
                setWaitingRoomActive(false)
            }
            if(allQuizData.isPending){
                setQuizPending(true)
                console.log('pending status initially false')
            } else {
                console.log('pending status intially not false')
                setQuizPending(false)
            }
            if(allQuizData.isActive){
                setQuizRunning(true)
                console.log('quiz is active')
            } else {
                setQuizRunning(false)
                console.log('quiz is not active')
            }
            if(allQuizData.hasEnded){
                setQuizEnded(true)
                console.log('ended')
            } else {
                setQuizEnded(false)
                console.log('still in play')
            }
        }
    }, [allQuizData])

    //UPDATES WAITINGROOM TO FALSE AND SETS QUIZRUNNING TO TRUE
    function startQuiz(){
        updateWaitingRoomStatus()
        nextQ()
    }

    //UPDATES WAITINGROOM BOOLEAN. USED IN STARTQUIZ FUNCTION
    async function updateWaitingRoomStatus(){
        await runningQuizDocument
        .update({
            isWaitingRoomActive: false
        }, {merge: true})
        setWaitingRoomActive(false)
    }

    //SETS PENDING BOOLEAN TO TRUE IN FIRESTORE
    async function setQuizToPending(){
        await runningQuizDocument
        .update({
            isPending: true
        }, {merge: true})
        
        setQuizPending(true)
        
    }

    //SETS PENDING BOOLEAN TO FALSE IN FIRESTORE
    async function undoPending(){
        await runningQuizDocument
        .update({
            isPending: false
        }, {merge: true})
        
        setQuizPending(false)
    }

    //GET ALL DATA FROM CURRENT QUIZ 
    async function getQuizData(){
        const docRef = await runningQuizDocument
        .get()

        setAllQuizData(docRef.data())

        const collectionRef = await runningQuizDocument
        .collection('questions')
        .get()

        let array = []
        collectionRef.forEach(i => {
            array.push({
                id: i.id,
                ...i.data()
            })
        })
        setAllQs(array)
    }

    //SYNCS COUNTER STATE WITH COUNTER IN FIRESTORE
    async function getQCounter(){
        await runningQuizDocument
        .get()
        .then((doc) => {
            if(doc.exists){
                setCounting(doc.data().count)
            }
        })
    }

    //SYNCS FIRESTORE WITH COUNTER STATE
    async function updateCountInFirestore(){
        await runningQuizDocument
        .update({
            count: currentQ
        }, {merge: true})
    }

    //FUNCTION RETRIEVES REALTIME DATA ON CURRENT QUESTION SELECTED
    function getCurrentQ(){
        const questionCollection = runningQuizDocument
        .collection('questions')

        const selectedQ = questionCollection
        .where("isSelected", "==", true)

        return selectedQ.onSnapshot((snapshot) => {
            let array = []
            snapshot.forEach(i => {
                array.push({
                    id: i.id,
                    ...i.data()
                })
            })
            setRealTimeQ(array)
        })
    }

    //FUNCTION RETRIEVES REAL TIME DATA ON ALL PARTICIPANTS
    function getParticipantData(){
        const participantColl = runningQuizDocument
        .collection('participants')

        const participantQuery = participantColl
        .where("isPlaying", "==", true)

        return participantQuery.onSnapshot((snapshot) => {
            let array = []
            snapshot.forEach(i => {
                array.push({
                    id: i.id,
                    ...i.data()
                })
            })
            let filterByHighest = array.sort(function (a, b) {
                return b.points - a.points
            })
            setParticipants(filterByHighest)
        })
    }

    //UPDATE FIRESTORE DATA TO SHOW WHICH Q IS SELECTED
    async function upDateCurrentQInFirestore(questionId){

        const filter = allQs.filter(i => {
            return (i.id !== questionId)
        })
        
        const collectionRef = runningQuizDocument
            .collection('questions')
            
        await collectionRef
        .doc(questionId)
        .update({
            isSelected: true
        }, {merge: true})
        
        filter.forEach(i => {
            collectionRef.doc(i.id)
            .update({
                isSelected: false
            }, {merge: true})
        })
    }

    //END QUIZ RESET STATES AND FIRESTORE COLLECTION
    async function endQuiz(){
        await resetQuiz(id)
        router.push('/')
    }

    //UPDATES WHICH QUESTION WILL BE VISIBLE THROUGH REAL TIME DATA
    async function nextQ(){
        if(currentQ < allQs.length){
            setCurrentQ(currentQ + 1)
            upDateCurrentQInFirestore(allQs[currentQ].id)
            
            undoPending()
        } else {
            console.log('the end')
            await runningQuizDocument
            .update({
                hasEnded: true
            }, {merge: true})
            setQuizEnded(true)
        }
    }

    function WaitingRoomComponent(){
        return(
            
            <div>
                <WaitingroomComponent 
                    pinCode={id}
                    participants={participants}
                    onClick={startQuiz}
                />
            </div>
        )
    }

    function ShowOptions(){
        return(
            <>
            {realTimeQ.map((i, index) => {
                console.log(i)
                return (
                    <ShowOptionsComponent 
                    key={index}
                    title={i.title}
                    optionOne={i.options.option_one}
                    optionTwo={i.options.option_two}
                    optionThree={i.options.option_three}
                    optionFour={i.options.option_four}
                    onClick={setQuizToPending}
                    />
                    )
                })
            }
            </>
        )
    }

    function ShowScoresComponent(){
        return(
            
            <>
            {realTimeQ.map((i, index) => {
                
                return(
                    
                    <div key={index}>
                        
                        <h2>{i.title}</h2>
                        {i.correctAnswers.map((j, index) => {
                           const filteredByValue = Object.fromEntries(
                            Object.entries(i.options).filter(([key, value]) => key === j) )
                            return(
                                <div key={index}>
                                    <p>{JSON.stringify(filteredByValue)}</p>
                                    <p>Correct answer: {j}</p>
                                </div>
                                )
                            })
                        }
                        <h2>Scores</h2>
                        {participants.map((k, index) => {
                            return(
                                <div key={index}>
                                    <h3>{k.id}: {k.points}</h3>
                                </div>
                                )
                            })
                        }
                        <button onClick={nextQ}>Next</button>
                    </div>
                    )
                })
            }
            </>
        )
    }

    function QuizEndedComponent(){
        return(
            <>
                <div>
                    <h2>Quiz over!</h2>
                    {participants.map((k, index) => {
                            return(
                                <div key={index}>
                                    <h3>{k.id}: {k.points}</h3>
                                </div>
                            )
                        })
                    }
                    <button onClick={endQuiz}>End quiz</button>
                </div>
            </>
        )
    }

    function NoQuizRunningComponent(){
        return(
            <>
            <p>No quiz here!</p>
            </>
        )
    }

    return(
        <>
        {(!quizRunning && quizEnded) ? <NoQuizRunningComponent /> 
        : 
        <>
            {waitingRoomAcitve ? <WaitingRoomComponent /> : ''}
            {(quizRunning && !quizPending) ? <ShowOptions /> : ''}
            {quizPending && !quizEnded ? <ShowScoresComponent /> : ''}
            {quizEnded ? <QuizEndedComponent /> : ''}
        </>
        }
        </>
    )
}

export default hostRunningQuiz;

/** 
 * {waitingRoomAcitve ? <WaitingRoomComponent /> : 
            <div>
                {quizRunning ? <p>Quiz running </p> : <p>not running</p>}
            </div>
        }
 * {!allQuizData ? 
            <p>Loading</p> 
        : 
            <>
                {waitingRoomAcitve ? <WaitingRoomComponent />
                : 
                <div>
                    {quizRunning ? 
                    <>
                        {quizPending ?
                        <>
                            <p>Quiz is pending</p>
                            
                            <button onClick={nextQ}>Next</button>
                        </>
                        :
                        <>
                            <p>realtime q{JSON.stringify(realTimeQ)}</p>
                            <button onClick={setQuizToPending}>Next</button>
                        </>
                        
                        }
                    
                    </>
                    :
                    <>
                        {quizEnded ? 
                        <p>Quiz has ended</p>
                        :
                        <p>Loading...</p>
                        }
                    </>
                    }   
                </div>
            }
            </>
        } */