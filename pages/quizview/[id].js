import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebaseInstance from '../../utils/firebase';

function quizView() {

    const [data, setData] = useState([])
    const router = useRouter();
    const { id } = router.query;

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


    }, [id])
    
    return (
        <div>
            {data.length === 0 ? <p>No quiz running!</p> : ''}
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
    );

}
export default quizView;