import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import firebaseInstance from '../../../../utils/firebase';

import { 
    getCorrectAnswer, 
    submitAnswerToFireStore, 
    updateUserPoints 
} from '../../../../utils/firebaseHelpers';
function ParticipantQuizView() {

    const router = useRouter()
    const { id, participantId } = router.query;
    const [screenLocked, setScreenLocked] = useState(true)
    const [quizRunning, setQuizRunning] = useState(true)
    const [userPoints, setUserPoints] = useState(0)
    const [userFeedBack, setUserFeedBack] = useState('')
    const [data, setData] = useState([])

    useEffect(() => {
        let participantDocument = firebaseInstance
        .firestore()
        .collection('running')
        .doc(id)
        .collection('participants')
        .doc(participantId)

        async function getParticipantData(){

            await participantDocument.collection('answers')
            .doc(data[0].id)
            .get()
            .then((doc) => {
                if (doc.exists){
                    console.log('dokumentet eksisterer')
                    setScreenLocked(true)
                    setUserFeedBack('You have already answered!')
                } else {
                    console.log('dokumentet eksisterer ikke')
                    setScreenLocked(false)
                }
            })
        }

        async function getParticipantPoints(){
            await participantDocument.get()
            .then((doc) => {
                if(doc.exists){
                    setUserPoints(doc.data().points)
                }
            })
        }

        if(data.length > 0){
            getParticipantData()
            getParticipantPoints()
        }
    }, [data])

    useEffect(() => {
        const quizDocument = firebaseInstance
        .firestore()
        .collection('running')
        .doc(id)

        checkIfQuizIsRunning()

        async function checkIfQuizIsRunning (){
            quizDocument.get()
            .then((doc) => {
                if(doc.exists){

                    if(doc.data().isActive === false){
                        setQuizRunning(false)
                        setScreenLocked(true)
                        setUserFeedBack('Quiz over!')
                        console.log('quiz is no longer active')

                    } else {
                        const sorted = quizDocument.collection('questions')
                        .where('isSelected', '==', true)
            
                        return sorted.onSnapshot((snapshot) => {
                            let array = []
                            snapshot.forEach((doc) => {
                                array.push({
                                    id: doc.id,
                                    title: doc.data().title,
                                    options: doc.data().options,
                                })
                            })
        
                            setData(array)
                            setScreenLocked(false)
                            setUserFeedBack('')
                        })
                    }
                    
                } 
            })  
        } 
    }, [id])

    useEffect(() => {
        async function updatePoints(){
            await updateUserPoints(id, participantId, userPoints)
        }
        updatePoints()
    }, [userPoints])

    async function submitAnswer(value){
        await submitAnswerToFireStore(id, participantId, data[0].id, value)
        await checkScore(value)
        setScreenLocked(true)
    }

    async function checkScore(value){
        const answer = await getCorrectAnswer(id, data[0].id)
        
        if(answer.includes(value)){
            setUserPoints(userPoints + 10)
            setUserFeedBack('Correct!')
        } else {
            setUserFeedBack('Wrong!')
        }
    }

    function Loading(){
        return (
            <>
                <p>{userFeedBack}</p>
                <p>{userPoints}</p>
            </>
        )
    }
    
    function ShowOptons(){
        return(
            <div>
                {JSON.stringify(userPoints)}
                {data && data.map((i, index) => {
                    return(
                        <div key={index}> 
                        <h1>{i.title}</h1>
                        <button onClick={() => submitAnswer('option_one')}>{i.options.a}</button>
                        <button onClick={() => submitAnswer('option_two')}>{i.options.b}</button>
                        {i.options.c && <button onClick={() => submitAnswer('option_three')}>{i.options.c}</button>}
                        {i.options.d && <button onClick={() => submitAnswer('option_four')}>{i.options.d}</button>}
                        </div>
                    )
                })}
            </div>
        )
    }
    return (
        <main>

            {screenLocked ? <Loading /> : <ShowOptons />}
        </main>
    );
}

export default ParticipantQuizView;