import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebaseInstance from '../../utils/firebase';
import { getAllParticipantScores } from '../../utils/firebaseHelpers';

function quizView() {

    const [data, setData] = useState([])
    const [isPending, setIsPending] = useState()
    const [isActive, setIsActive] = useState()
    const [participantScores, setParticipantScores] = useState([])
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const runningQuizDocument = firebaseInstance
        .firestore()
        .collection('running')
        .doc(id)

        return runningQuizDocument.onSnapshot((snapshot) => {
            setIsPending(snapshot.data().isPending)
            setIsActive(snapshot.data().isActive)
        })

    }, [id])

    useEffect(() => {
        const runningQuizDocument = firebaseInstance
        .firestore()
        .collection('running')
        .doc(id)

        const sorted = runningQuizDocument
        .collection('questions')
        .where('isSelected', '==', true)
        
        return sorted.onSnapshot((snapshot) => {
            let array = []
            snapshot.forEach((doc) => {
                array.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setData(array)
        })
    }, [id, isPending])

    useEffect(() => {
        updateParticipantScores(id)
    }, [data])

    async function updateParticipantScores(quizPin) {
        const data = await getAllParticipantScores(quizPin)
        setParticipantScores(data)
    }

    function ShowQComponent(){
        return(
            <div>
            {data && data.map((i, index) => {
                return (
                    <div key={index}>
                        <h2>{i.title}</h2>
                        <div>
                            <p>A)</p>
                            <p>{i.options.a}</p>
                        </div>
                        <div>
                            <p>B)</p>
                            <p>{i.options.b}</p>
                        </div>
                        {i.options.c && 
                            <div>
                                <p>C)</p>
                                <p>{i.options.c}</p>
                            </div>
                        }
                        {i.options.d && 
                            <div>
                                <p>D)</p>
                                <p>{i.options.d}</p>
                            </div>
                        }
                    </div>
                    )
                })
            }
            </div>

        )
    }

    function ShowScoresComponent() {

        return(
            <div>
                <h1>The scores are:</h1>
                {participantScores && participantScores.map((i, index) => {
                    return(
                        <p key={index}>{i.id.toUpperCase()}: {i.points}</p>
                    )
                })}
            </div>
        )
    }

    function ShowFinalScoresComponent(){
        return(
            <div>
                <h1>Quiz over!</h1>
                <p>Final scores:</p>
                {participantScores && participantScores.map((i, index) => {
                    return(
                        <p key={index}>{i.id.toUpperCase()}: {i.points}</p>
                    )
                })}
            </div>
        )
    }
    
    return (
        <div>
            {isPending ? <ShowScoresComponent /> : <ShowQComponent />}
            {(!isActive && !isPending) &&
                <ShowFinalScoresComponent />
            }
        </div>
    );

}
export default quizView;