import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import firebaseInstance from '../../../../utils/firebase';

import { 
    getCorrectAnswer, 
    submitAnswerToFireStore, 
    updateUserPoints 
} from '../../../../utils/firebaseHelpers';
import ShowParticipantOptions from '../../../../components/PageComponents/ShowParticipantOptions';
import PageContainer from '../../../../components/PageComponents/PageContainer';
import WaitingroomComponent from '../../../../components/PageComponents/WaitingroomComponent';
import LockedScreenComponent from '../../../../components/PageComponents/LockedScreenComponent';

function ParticipantQuizView() {

    const router = useRouter()
    const { id, participantId } = router.query;

    //TOGGLES
    const [screenLocked, setScreenLocked] = useState(true)
    const [quizRunning, setQuizRunning] = useState(true)
    const [quizPending, setQuizPending] = useState(null)
    const [quizEnded, setQuizEnded] = useState(null)
    const [waitingRoomActive, setWaitingRoomActive] = useState(null)
    
    //QUIZ DATA
    const [allData, setAllData] = useState([])
    const [currentQ, setCurrentQ] = useState([])

    //PARTICIPANT DATA
    const [userPoints, setUserPoints] = useState(0)
    const [userFeedBack, setUserFeedBack] = useState('')

    //FIRESTORE REFS
    const participantDocument = firebaseInstance
    .firestore()
    .collection('running')
    .doc(id)
    .collection('participants')
    .doc(participantId)
    
    const docRef = firebaseInstance
    .firestore()
    .collection('running')
    .doc(id)
    
    //COLLECTS QUIZDATA AND PREVIOUS USER POINTS
    useEffect(() => {
        getAllQuizData()
        getParticipantPoints()
    }, [id])

    //REALTIME DATA FOR CURRENT QUESTION AND IF QUIZDOCUMENT STATUS CHANGES
    useEffect(() => {
        getCurrentQ()
        listenToQuizStatusChanges()
    }, [allData])

    //UPDATES PARTICIPANT POINTS IN FIRESTORE
    useEffect(() => {
        async function updatePoints(){
            await updateUserPoints(id, participantId, userPoints)
        }
        updatePoints()
    }, [userPoints])

    //SETS USER ANSWER TO NULL IF QUIZMASTER ENDS QUIZ BEFORE PARTICIPANT ANSWERS
    useEffect(() => {
        if(currentQ.length > 0){
            if(quizPending && currentQ){
                submitAnswer(null)
            }
        }
    }, [quizPending])

    //GET INITIAL DATA FOR QUIZ RUNNING
    async function getAllQuizData() {
        await docRef
        .get()
        .then((doc) => {
            setAllData(doc.data())
        })
    }

    //REALTIME DATA FOR CURRENT QUESTION
    function getCurrentQ(){
        const collRef = docRef
        .collection('questions')

        const query = collRef
        .where('isSelected', '==', true)

        return query.onSnapshot((snapshot) => {
            let array = []
            snapshot.forEach(i => {
                array.push({
                    id: i.id,
                    title: i.data().title,
                    options: i.data().options
                })
            })
            setCurrentQ(array)
        })
    }

    //CHECK QUIZ STATUS FOR TOGGLE EFFECTS
    function listenToQuizStatusChanges(){
        return docRef.onSnapshot((snapshot) => {
            if(snapshot.exists){
                setQuizPending(snapshot.data().isPending)
                setQuizRunning(snapshot.data().isActive)
                setWaitingRoomActive(snapshot.data().isWaitingRoomActive)
                setQuizEnded(snapshot.data().hasEnded)
                if(snapshot.data().isPending === true){
                    setScreenLocked(true)
                } else {
                    setScreenLocked(false)
                }
            }
        })
    }

    //UPDATES USERPOINTS FROM DATA IN FIRESTORE
    async function getParticipantPoints(){
        await participantDocument.get()
        .then((doc) => {
            if(doc.exists){
                setUserPoints(doc.data().points)
            } else {
                return console.log('error when retreiveing points')
            }
        })
    }

    //ADDS PARTICIPANT ANSWER TO FIREBASE
    //ALSO CHECKS IF USER ALREADY HAS SUBMITTED AN ANSWER
    async function submitAnswer(value){
        let check = await submitAnswerToFireStore(id, participantId, currentQ[0].id, value)
        if(value === null){
            setUserFeedBack('To late!')
            setScreenLocked(true)
            return null;
        } else {
            await checkIfAnswerCorrect(value, check)
            setScreenLocked(true) 
        }
    }

    //COMPARES PARTICIPANT ANSWER WITH CORRECT ANSWER
    //UPDATES POINTS IF ANSWER IS CORRECT AND HAS NOT BEEN PREVIOUSLY ANSWERED
    async function checkIfAnswerCorrect(value, check){
        const answer = await getCorrectAnswer(id, currentQ[0].id)
        
        if(answer.includes(value) && check === false){
            setUserPoints(userPoints + 10)
            setUserFeedBack('Correct!')
            console.log('Correct!')
        } else if(check === true) {
            return null;
        } else {
            setUserFeedBack('Wrong!')
            console.log('Wrong!')
        }
    }

    function LoadingComponent(){
        return (
            <>
                {quizPending ? <p>Your points so far: {userPoints}</p> : <p>{userFeedBack}</p>}
            </>
        )
    }

    function ShowOptionsComponent(){
        return(
            <div>
                <ShowParticipantOptions 
                question={currentQ}
                onClick={submitAnswer}

                />
            </div>
        )
    }
    return (
        <PageContainer>
            {JSON.stringify(screenLocked)}
            {JSON.stringify(quizPending)}
            {waitingRoomActive ? 
                <WaitingroomComponent
                title={'The quiz will begin shortly!'}
                subTitle={'Waiting for quizmaster to start quiz...'}
                showProgress={true}
                /> 
            : ''}
            {!quizPending ? <ShowOptionsComponent /> : ''}
            {(screenLocked && !quizPending) ? <LockedScreenComponent screenLocked={screenLocked}/>: ''}
            {(screenLocked && quizPending) ? <>Test</> : ''}
            
        </PageContainer>
                
    );
}

export default ParticipantQuizView;

/**
 * <p>userFeedBack: {JSON.stringify(userFeedBack)}</p>
            <p>Locked: {JSON.stringify(screenLocked)}</p>
            <p>Running: {JSON.stringify(quizRunning)}</p>
            <p>Pending: {JSON.stringify(quizPending)}</p>
            <p>Ended: {JSON.stringify(quizEnded)}</p>
            <p>CurrentQ: {JSON.stringify(currentQ)}</p>
            <p>Points: {JSON.stringify(userPoints)}</p>

            
 *     // async function getParticipantData(){
    //     console.log(currentQ[0].id)
    //     await participantDocument.collection('answers')
    //     .doc(currentQ[0].id)
    //     .get()
    //     .then((doc) => {
    //         if (doc.exists && doc.data().isPlaying){
    //             console.log('User has already submitted answer')
    //             setScreenLocked(true)
    //             setUserFeedBack('You have already answered!')
    //         } else {
    //             console.log('User has not answered this q before')
    //             setScreenLocked(false)
    //         }
    //     })
    // }
 * {screenLocked ? <LoadingComponent /> : <ShowOptionsComponent />}
                {!quizRunning ? <p>Quiz over! Final points: {userPoints}</p> : ''}
            
 * 
    // async function checkIfQuizIsRunning (){
    //     quizDocument.get()
    //     .then((doc) => {
    //         if(doc.exists){
                
    //             if(doc.data().isActive === false){
    //                 setQuizRunning(false)
    //                 setScreenLocked(true)
    //                 console.log('quiz is no longer active')

    //             } if(doc.data().isWaitingRoomActive){
    //                 setWaitingRoomActive(true)
    //                 console.log('currently waiting for quiz to start')
    //             } if(doc.data().isPending){
    //                 setScreenLocked(true)
    //             } else {
    //                 const sorted = quizDocument.collection('questions')
    //                 .where('isSelected', '==', true)
        
    //                 return sorted.onSnapshot((snapshot) => {
    //                     let array = []
    //                     snapshot.forEach((doc) => {
    //                         array.push({
    //                             id: doc.id,
    //                             title: doc.data().title,
    //                             options: doc.data().options,
    //                         })
    //                     })
    
    //                     setData(array)
    //                     setScreenLocked(false)
    //                     if(array.length < 0){setWaitingRoomActive(false)}
    //                     setUserFeedBack('')
    //                 })
    //             }
    //         } 
    //     })  
    // } 

    // return docRef.onSnapshot((snapshot) => {
    //     setQuizPending(snapshot.data().isPending)
    //     setQuizRunning(snapshot.data().isActive)
    // })
 * useEffect(() => {
    //     // if(data.length > 0){
    //     //     getParticipantData()
    //     //     getParticipantPoints()
    //     // }
    //     if(allData){
    //         if(allData.isWaitingRoomActive){
    //             setWaitingRoomActive(true)
    //             console.log('waiting room initally true')
    //         } else {
    //             console.log('waiting room initally not true')
    //             setWaitingRoomActive(false)
    //         }
    //         if(allData.isPending){
    //             setQuizPending(true)
    //             console.log('pending status initially false')
    //         } else {
    //             console.log('pending status intially not false')
    //             setQuizPending(false)
    //         }
    //         if(allData.isActive){
    //             setQuizRunning(true)
    //             console.log('quiz is active')
    //         } else {
    //             setQuizRunning(false)
    //             console.log('quiz is not active')
    //         }
    //         if(allData.hasEnded){
    //             setQuizEnded(true)
    //             console.log('ended')
    //         } else {
    //             setQuizEnded(false)
    //             console.log('still in play')
    //         }
    //     }
    // }, [allData, currentQ]) */