import React, { useState } from 'react';
import { useRouter } from 'next/router';


import { createQuizDocument, createQuizPin } from '../utils/firebaseHelpers';

function QuizForm({ quizPin, userId, handleClose }) {
    const router = useRouter()
    const [quizName, setQuizName] = useState('')
    
    async function addNewQuizFirestore(event){
        event.preventDefault()
        createQuizPin()
        await createQuizDocument(userId, quizPin, quizName)
        router.push(`/createquiz/${quizPin}`)
    }

    return (
        <div>
            <form
            onSubmit={(e) => addNewQuizFirestore(e)}
            >
                <label htmlFor="quizName">Name your quiz</label>
                <input 
                    type="text" 
                    name="quizName"
                    id="quizName"
                    placeholder="Name your quiz" 
                    onChange={(e) => setQuizName(e.target.value)}
                />
                <button type="submit">Create</button>
            </form>
            
            <button onClick={handleClose}>Close</button>
        </div>
    );
}

export default QuizForm;