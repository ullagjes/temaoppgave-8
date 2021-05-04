import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebaseInstance from '../../utils/firebase';

function quizView() {

    const [data, setData] = useState([])
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        
        const sorted = firebaseInstance
        .firestore()
        .collection('running')
        .doc(id)
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
            {JSON.stringify(data)}
            
        </div>
    );

}
export default quizView;