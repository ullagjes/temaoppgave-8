import React, { useEffect, useState  } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuestion } from '../../context/questionContext';
import { useAuth } from '../../context/authContext';
import { createQuizDocument } from '../../utils/firebaseHelpers';
import { createQuizPin } from '../../utils/firebaseHelpers';
import firebaseInstance from '../../utils/firebase';


function createNewQuiz() {

    //User clicks on add new quiz
    //effect triggers new quizpin and creates new collection in firestore

    //const [array, setArray] = useState([1])
    //const [count, setCount] = useState(2)

    const router = useRouter()
    
    const { questions, addQuestion, removeQuestion } = useQuestion();
    const { user } = useAuth();
    const [userId, setUserId] = useState(null)
    const [newQuizPin, setNewQuizPin] = useState(null)


    useEffect(() => {
        if(user){
            setUserId(user.uid);
            const counter = firebaseInstance
            .firestore()
            .collection('globals')
            .doc('A3xMG5HOTnEpws1AASxC')

            return counter.onSnapshot((snapshot) => {
                const val = snapshot.data()
                setNewQuizPin(val.counter)
            })
        }

    }, [user])

    async function addNewQuizFirestore(){
        createQuizPin()
        /*const collection = firebaseInstance
        .firestore()
        .collection('users')

        await collection.doc(JSON.stringify(newQuizPin)).set({name: 'ulla'});*/
        await createQuizDocument(userId, JSON.stringify(newQuizPin))

    }


    return (
        <>
            <p>{JSON.stringify(newQuizPin)}</p>
            <button onClick={addNewQuizFirestore}>Create new quiz</button>
        </>
    );
}

export default createNewQuiz;

/*

<div key={index}>
                    <QuestionForm 
                        initialValues={{
                            title: i.title,
                            option_one: i.option_one,
                            option_two: i.option_two,
                            option_three: i.option_three,
                            option_four: i.option_four,
                        }} 
                    />
                    </div>
        {array.map((i, index) => {
            return(
                <div key={index}>
                <Formik
                
                onSubmit={(values) => onSubmit(values)}
                >
                    <Form>
                        <label htmlFor='title'>Question{index}</label>
                            <Field name="title" type="text" placeholder="Type your question here"/>
                            <ErrorMessage name="title" />
                            <br></br>
                            <br></br>
                            <label htmlFor='option_one'>Option 1:</label>
                            <Field name="option_one" type="text" placeholder="Option 1(required)"
                            />
                            <ErrorMessage name="option_one" />
                            <br></br>
                            <br></br>
                            <label htmlFor='option_two'>Option 2:</label>
                            <Field name="option_two" type="text" placeholder="Option 2(required)"
                            />
                            <ErrorMessage name="option_two" />
                            <br></br>
                            <br></br>
                            <label htmlFor='option_three'>Option 3:</label>
                            <Field name="option_three" type="text" placeholder="Option 3(optional)"
                            />
                            <br></br>
                            <br></br>
                            <label htmlFor='option_four'>Option 4:</label>
                            <Field name="option_four" type="text" placeholder="Option 4(optional)"
                            />
                            <br></br>
                        <button type="submit">Done</button>
                        
                    </Form>
                </Formik>
                
                </div>
            )
        })}
        <button onClick={addNewQuestion}>Add another question</button>
        {questions.map((i, index) => {
            return(
                <div>
                    {toggle ? <div key={index}>
                        <p>{i.title}</p>
                        <p>{i.option_one}</p>
                        <p>{i.option_two}</p>
                        {i.option_three && <p>{i.option_three}</p>}
                        {i.option_four && <p>{i.option_four}</p>}
                    </div> 
                    : 
                    <Formik
                        initialValues={{
                            title: i.title,
                            option_one: i.option_one,
                            option_two: i.option_two,
                            option_three: i.option_three,
                            option_four: i.option_four,
                        }}
                        validationSchema={schema}
                        onSubmit={(values) => console.log(values)}
                    >
                        <Form>
                        <label htmlFor='title'>Question{index}</label>
                            <Field name="title" type="text" />
                            <ErrorMessage name="title" />
                            <br></br>
                            <br></br>
                            <label htmlFor='option_one'>Option 1:</label>
                            <Field name="option_one" type="text" 
                            />
                            <ErrorMessage name="option_one" />
                            <br></br>
                            <br></br>
                            <label htmlFor='option_two'>Option 2:</label>
                            <Field name="option_two" type="text" 
                            />
                            <ErrorMessage name="option_two" />
                            <br></br>
                            <br></br>
                            <label htmlFor='option_three'>Option 3:</label>
                            <Field name="option_three" type="text" 
                            />
                            <br></br>
                            <br></br>
                            <label htmlFor='option_four'>Option 4:</label>
                            <Field name="option_four" type="text" 
                            />
                            <br></br>
                        <button type="submit">Done</button>
                        
                    </Form>

                    </Formik>
                    }
                    <button onClick={() => {
                        setToggle(!toggle)
                    }}>Edit</button>
                    <button>Delete</button>
                </div>

            )
        })}


*<FieldArray>
                {() => () => {
                    return (
                        <>
                        <label htmlFor='option_one'>Option 1:</label>
                        <Field name="option_one" type="text" placeholder="Option 1(required)"
                        />
                        <ErrorMessage name="option_one" />
                        <br></br>
                        <label htmlFor='option_two'>Option 2:</label>
                        <Field name="option_two" type="text" placeholder="Option 2(required)"
                        />
                        <ErrorMessage name="option_two" />
                        <br></br>
                        <label htmlFor='option_three'>Option 3:</label>
                        <Field name="option_three" type="text" placeholder="Option 3(optional)"
                        />
                        <br></br>
                        <label htmlFor='option_four'>Option 4:</label>
                        <Field name="option_four" type="text" placeholder="Option 4(optional)"
                        />
                        <br></br>
                        </>
                    )
                }}    
                </FieldArray> */