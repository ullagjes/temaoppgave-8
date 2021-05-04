import React, { useEffect, useState  } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../context/authContext';
import firebaseInstance from '../../utils/firebase';

import NavBar from '../../components/NavBar';
import QuizForm from '../../components/QuizForm';

function CreateNewQuiz() {

    const router = useRouter()
    const { user, isAuthenticated, loading } = useAuth();
    const [userId, setUserId] = useState(null)
    const [newQuizPin, setNewQuizPin] = useState(null)

    const [toggle, setToggle] = useState(false)

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

    function handleOpen(){
        setToggle(true)
    }

    function handleClose(){
        setToggle(false)
    }

    //===========================================AUTHENTICATION
    
    if(loading){
        return(
        <>Loading...</>
        );
    };

    if(isAuthenticated === false) {
        router.push('/login');
        return <>You aren't logged in.</>
    };
  
    return (
        <>
            <NavBar />
            <button onClick={handleOpen}>Create new quiz</button>
            {toggle ? 
                <QuizForm 
                    quizPin={JSON.stringify(newQuizPin)} 
                    userId={userId} 
                    handleClose={handleClose}/> 
                : null
            }
        </>
    );
}

export default CreateNewQuiz;




/*



    /*useEffect(() => {
        if(isAuthenticated) {
            getQuizData(userId)}
    }, [isAuthenticated])

    async function getQuizData(userId){
        const userData = await checkForUserData(userId)
        setUserData(userData)
    }


sjekk .some() og .every()


const myFilms = [{  title: 'Star Wars'}, year: 1989, tags: ["Action" ]}]

const filtered= myFilms.filter(film => {
    return film.tags.some(tag => tag === 'action')
})

const filtered = myFilms.filter(film => filter(film, 'Action'))

function filter(film, tagName){
    return film.tags.some(tag => tag === tagName)
}

//Finner den første filmen i et array med året 1999
const result = myFilms.find(film => film.year === 1999)

const resultHasTag = filter(result, 'Sci-Fi')

const films = [
    {
        title: 'Star wars',
        year: 1999,
        actorCount: 300
    },
    {
        title: 'Star trek',
        year: 1995,
        actorCount: 100
    },
    {
        title: 'Jurassic Park',
        year: 1993,
        actorCount: 50
    }
]

function countNumberOfActors(acc, film) {
    return acc + film.actorCount
}

const totalActors = myFilms.reduce((countNumberOfActors, 0)



const [userData, setUserData] = useState(null)
 
 const collection = firebaseInstance
        .firestore()
        .collection('users')

        await collection.doc(JSON.stringify(newQuizPin)).set({name: 'ulla'});
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


<FieldArray>
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