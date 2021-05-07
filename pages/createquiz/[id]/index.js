import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuth } from '../../../context/authContext';
import { 
    addQuestionToDocument, 
    addQuizToRunningCollection, 
    addTitleToRunningQuiz, 
    checkForQuizData, 
    countCollection,
    getQuizTitle 
} from '../../../utils/firebaseHelpers';

import NavBar from '../../../components/NavBar';
import QuestionForm from '../../../components/QuestionForm';

function createQuestions () {

    const { user } = useAuth();
    
    const router = useRouter();
    const { id } = router.query

    const [selectedQuizData, setSelectedQuizData] = useState([])
    const [selectedQuizTitle, setSelectedQuizTitle] = useState([])
    const [toggle, setToggle] = useState(false)
    const [counter, setCounter] = useState(null)

    useEffect(() => {
        if(user){
            getSelectedQuizData(user.uid, id)

        }

        if(counter === null && user){
            getCounter(user.uid, id)
        }
    }, [user])

    useEffect(() => {
        console.log('data loaded from firestore in createQuestions:', selectedQuizData.length)
    }, [selectedQuizData])

    async function getSelectedQuizData(user, quizPin){
        const data = await checkForQuizData(user, quizPin)
        const title = await getQuizTitle(user, quizPin)
        console.log(title)
        setSelectedQuizTitle(title)
        setSelectedQuizData([...data])
    }
    
    function createNewQuestion(){
        setToggle(true)
        //getCounter(user.uid, id)
    }

    async function getCounter(user, quizPin){
        let collectionLength = await countCollection(user, quizPin)
        setCounter(collectionLength)
    }

    async function addQuestionToFiresTore(values){        
        try {
            await addQuestionToDocument(user.uid, id, counter, values)
            getCounter(user.uid, id)
        } catch(error) {
            console.log('error when adding question to firestore', error)
        }
    }

    async function startQuiz(){
        await addTitleToRunningQuiz(id, selectedQuizTitle)
        await addQuizToRunningCollection(id, selectedQuizData)
        router.push(`/runquiz/${id}`)
    }

    function testValues(){
        console.log(selectedQuizData[0])
    }

    return (
        <>  
            <NavBar />
            <div>
                {JSON.stringify(counter)}
                <button onClick={testValues}>test</button>
                <h1>{selectedQuizTitle}</h1>
                <div>
                    {selectedQuizData && selectedQuizData.map((i, index) => {
                        return (
                            <Link href={`${id}/${i.id}/`} key={index}>
                                <a>
                                    <div>
                                        <h2>{i.title}</h2>
                                    </div>    
                                </a>
                            </Link>
                        )
                    })}
                </div>
                <button onClick={createNewQuestion}>Add question</button>
                {toggle ? 
                    <QuestionForm 
                        quizPin={id} 
                        counter={counter} 
                        onSubmit={addQuestionToFiresTore} 
                        initialValues={{
                            title: '',
                            option_one: '',
                            option_two: '',
                            option_three: '',
                            option_four: '',
                            correctAnswers: [],
                        }}
                    /> 
                : ''}
            </div>
            <button onClick={startQuiz}>Run quiz!</button>
        </>
    );
}

export default createQuestions;
