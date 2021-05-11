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
import next from 'next';

//TODO: check firestore data for quizrunning instead of usestate

function hostRunningQuiz() {

    const router = useRouter();

    const { id } = router.query;
    const { user } = useAuth();

    const [counting, setCounting] = useState(0)

    //FOR QUIZTITLE, WAITINGROOM AND PENDING
    const [allQuizData, setAllQuizData] = useState([])
    const [quizRunning, setQuizRunning] = useState(true)
    const [quizPending, setQuizPending] = useState(null)
    const [waitingRoomAcitve, setWaitingRoomActive] = useState(null)
    const [quizEnded, setQuizEnded] = useState(null)

    //PARTICIPANT DATA
    const [participants, setParticipants] = useState([])

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
        //REALTIME DATA
        getCurrentQ()
        getParticipantData()
        getQCounter()
        
    }, [id])

    //UPDATE COUNTER
    useEffect(() => {
        setCurrentQ(counting)
    }, [counting])

    useEffect(() => {
        //updateCountInFirestore()
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
                setQuizPending(false)
                console.log('pending status initially true')
            } else {
                console.log('pending status intially not true')
                setQuizPending(true)
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

    //GET ALL DATA 
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

    async function getQCounter(){
        await runningQuizDocument
        .get()
        .then((doc) => {
            if(doc.exists){
                setCounting(doc.data().count)
            }
        })
    }

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
            setParticipants(array)
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

    async function nextQ(){
        if(currentQ < allQs.length){
            setCurrentQ(currentQ + 1)
            upDateCurrentQInFirestore(allQs[currentQ].id)
            
            undoPending()
        } else {
            console.log('the end')
            setQuizEnded(true)
        }
    }

    function WaitingRoomComponent(){
        return(
            <div>
                <h1>Use PINCODE: {id} to join the quiz!</h1>
                <p>Waiting for participants...</p>
                {JSON.stringify(counting)}
                {participants && participants.map((i, index) => {
                    return(
                        <p key={index}>{i.id}</p>
                    )
                })}
                <button onClick={startQuiz}>Start quiz!</button>
            </div>
        )
    }


    return(
        <>
       <button onClick={updateCountInFirestore}>test</button>
        {JSON.stringify(waitingRoomAcitve)}
        {JSON.stringify(quizPending)}
        {JSON.stringify(realTimeQ)}
        <p>current q</p>{JSON.stringify(currentQ)}
        <p>counter</p>{JSON.stringify(counting)}
        <button onClick={setQuizToPending}>Pending</button>
        <button onClick={nextQ}>Next</button>
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