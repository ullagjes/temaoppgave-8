import React, { useState } from 'react';
import { useRouter } from 'next/router';

import * as Yup from 'yup';

import { createQuizDocument, createQuizPin } from '../../utils/firebaseHelpers';

import FormComponent from './FormComponent';
import FormItem from './FormItem';

const schema = Yup.object().shape({
    title: Yup.string().required('Please add a title').label('Title')
})


function QuizForm({ quizPin, userId }) {
    const router = useRouter()
    const [quizName, setQuizName] = useState('')
    
    async function addNewQuizFirestore(values){
        
        createQuizPin()
        await createQuizDocument(userId, quizPin, values.title)
        router.push(`/createquiz/${quizPin}`)
    }

    const initialValues = {title: ''}

    return (
        <div>
            <FormComponent
            schema={schema}
            onSubmit={addNewQuizFirestore}
            initialValues={initialValues}
            buttonText={'Create'}
            formTitle={'Create a new quiz'}
            >
                <FormItem 
                fieldName={'title'}
                labelText={'Name your quiz'}
                placeholder={'Type title here'}

                />
            </FormComponent>
        </div>
    );
}

export default QuizForm;

/**
 *             {/* <form
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
            </form> }
            
            <button onClick={handleClose}>Close</button>
 */