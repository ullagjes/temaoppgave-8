import React, { useEffect, useState } from 'react';
//NEXT
import { useRouter } from 'next/router';
//UTILS
import firebaseInstance from '../../../../utils/firebase';
import { 
    getCorrectAnswer, 
    submitAnswerToFireStore, 
    updateUserPoints,
    getAllParticipantScores, 
} from '../../../../utils/firebaseHelpers';
//COMPONENTS
import ShowParticipantOptions from '../../../../components/PageComponents/ShowParticipantOptions';
import PageContainer from '../../../../components/PageComponents/PageContainer';
import WaitingroomComponent from '../../../../components/PageComponents/WaitingroomComponent';
import LockedScreenComponent from '../../../../components/PageComponents/LockedScreenComponent';
import ShowParticipantFeedback from '../../../../components/PageComponents/ShowParticipantFeedback';
import QuizEndedComponent from '../../../../components/PageComponents/QuizEndedComponent';
import { ButtonComponent } from '../../../../components/BaseComponents';

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
    const [participants, setParticipants] = useState([])

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
    
    //GETS PARTICIPANTSCORES WHEN QUIZ IS ENDED
    useEffect(() => {
        getParticipants(id)
    }, [quizEnded])

    async function getParticipants(quizPin) {
        const data = await getAllParticipantScores(quizPin)
        const filteredData = await filterByHighest(data)
        setParticipants(filteredData)
    }
    
    //FILTERS CONTESTANTS FROM HIGHEST TO LOWEST
    function filterByHighest(value){
        const filtered = value.sort(function (a, b){
            return b.points - a.points
        })
        return filtered;
    }

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
        if(check === true){
            setScreenLocked(true)
        }
        else {
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
            setUserFeedBack('Correct! Awesome job!')
        } else if(check === true) {
            setUserFeedBack(userFeedBack)
            return null;
        } else {
            setUserFeedBack('Wrong! Better luck next time')
        }
    }

    return (
        <PageContainer>
            {!quizRunning ? <ButtonComponent onClick={() => router.push('/')}>Return to home page</ButtonComponent> 
            : 
            <>
                {waitingRoomActive ? 
                    <WaitingroomComponent
                    title={'The quiz will begin shortly!'}
                    subTitle={'Waiting for quizmaster to start quiz...'}
                    showProgress={true}
                    /> 
                : ''}
                {!quizPending ? 
                <ShowParticipantOptions 
                question={currentQ}
                onClick={submitAnswer}
                />
                : ''}
                {(screenLocked && !quizPending && !quizEnded) ? 
                <LockedScreenComponent screenLocked={screenLocked}/>
                : ''}
                {(screenLocked && quizPending && !quizEnded) ? 
                <ShowParticipantFeedback 
                userFeedBack={userFeedBack}
                userPoints={userPoints}
                /> 
                : ''}
                {(quizEnded && participants.length > 0) ? 
                <QuizEndedComponent
                title={'Quiz over!'}
                subTitle={'Final scores'}
                participants={participants}  /> 
                : ''}
            </>
            }
        </PageContainer>
    );
}

export default ParticipantQuizView;