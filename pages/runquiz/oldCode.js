// // 
// <>
// <HeadLine>Headline</HeadLine>
// <SubTitle>Subtitle</SubTitle>
// <UnderTitle>Undertitle</UnderTitle>
// <TextElement style={'main'}>This is some text.</TextElement>
// <br></br>
// <TextElement style={'secondary'}>This is secondary text.</TextElement>
// <br></br>
// <ButtonComponent size={'large'}>Button</ButtonComponent>
// <LinkComponent href={"#"}>Click me!</LinkComponent>
// <ListItem 
//   title={'Question'} 
//   ariaLabelEdit={'Press to edit'} 
//   ariaLabelDelete={'Press to delete question from quiz'}
//   handleEdit={() => console.log('edited')} 
//   handleDelete={() => console.log('deleted')} 
//   />
// </>
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// import { useAuth } from '../../context/authContext';
// import { 
//     activateQuiz,
//     checkForQuizData, 
//     hideQuestions, 
//     getAllParticipantScores, 
//     resetQuiz,
//     showCurrentQuestion 
// } from '../../utils/firebaseHelpers';
// import firebaseInstance from '../../utils/firebase';

// //TODO: check firestore data for quizrunning instead of usestate

// function hostRunningQuiz() {

//     const router = useRouter();

//     const { id } = router.query;
//     const { user } = useAuth();

//     //TOGGLES
//     const [quizRunning, setQuizRunning] = useState(false)
//     const [quizPending, setQuizPending] = useState(null)
//     const [watingRoomAcitve, setWatingRoomActive] = useState(null)
//     const [quizEnded, setQuizEnded] = useState(null)
//     //DATA
//     const [quizData, setQuizData] = useState([])
//     const [qId, setQId] = useState('')
//     const [currentQuestion, setCurrentQuestion] = useState(0)
//     const [question, setQuestion] = useState(null)
    
//     const [runningQuestion, setRunningQuestion] = useState([])
    
//     const [participantScores, setParticipantScores] = useState([])
//     const [participants, setParticipants] = useState([])
    
//     const filter = quizData.filter(i => {
//         return(i !== question)
//     })
    
//     useEffect(() => {
//         if(user){
//             //getData(user.uid, id)
//             const runningCollection = firebaseInstance
//             .firestore()
//             .collection('running')
//             .doc(id)

//             runningCollection.get()
//             .then((doc) => {
//                 console.log('DATA FROM RUNNING QUIZ',doc.data())
//                 if(doc.exists){
//                     if(doc.data().isActive){
//                     console.log('active')
//                     setQuizRunning(true)
//                     } else {
//                         console.log('not active')
//                         setQuizRunning(false)
//                     }
//                     if(doc.data().isWaitingRoomActive === false){
//                         setWatingRoomActive(false)
//                         console.log('waitingroom is not active')
//                     } else {
//                         console.log('waitingroom is active')
//                         setWatingRoomActive(true)
//                 }} else {
//                     return
//                 }

//             })

//         }
//     }, [user])

//     useEffect(() => {
//         async function getFirstQ(){
//             const array = []
//             console.log(id)
//             const currentQuizCollection = firebaseInstance
//             .firestore()
//             .collection('running')
//             .doc(id)
//             .collection('questions')
            
            
//             const query = await currentQuizCollection
//             .where("isSelected", "==", true)
//             .get()
            
//             if(query.empty){
//                 currentQuizCollection
//                 // .doc('question_0')
//                 // .update({
//                 //     isSelected: true,
//                 // })
//             }
            
//             query.forEach(doc => {
//                 console.log('queried data', doc.data())
//             })

            

                

            
//         }
//         getFirstQ()
//     }, [user])
    
//     useEffect(() => {
//         //Checking firestore for boolean values:
//         // if(quizData.length > 0){
//         //     firebaseInstance
//         //     .firestore()
//         //     .collection('running')
//         //     .doc(id)
//         //     .get()
//         //     .then((doc) => {
//         //         console.log('DATA FROM RUNNING QUIZ',doc.data())
//         //         if(doc.data().isActive){
//         //             console.log('active')
//         //             setQuizRunning(true)
//         //         } else {
//         //              console.log('not active')
//         //              setQuizRunning(false)
//         //         }
//         //         if(doc.data().isWaitingRoomActive === false){
//         //             setWatingRoomActive(false)
//         //             console.log('waitingroom is not active')
//         //         } else {
//         //             console.log('waitingroom is active')
//         //             setWatingRoomActive(true)
//         //         }
//         //     })
//         // }
//         //Realtime data is provided when a new participant adds quizpin and username:
//         const participantCollection = firebaseInstance
//         .firestore()
//         .collection('running')
//         .doc(id)
//         .collection('participants')
//         .where('isPlaying', '==', true)

//         return participantCollection.onSnapshot((snapshot) => {
//             let array = []
//             snapshot.forEach(i => {
//                 array.push({
//                     id: i.id,
//                     ...i.data()
//                 })
//             })
//             setParticipants(array)
//         })
//     }, [quizData])

//     //useEffect kicks in when quizdata or currentQuestion values changes
//     //Will iterate through question array and update state of question variable to show the next question in the array
//     useEffect(() => {
//         console.log('when does this run')
        
//         const questionsRunning = firebaseInstance
//         .firestore()
//         .collection('running')
//         .doc(id)
//         .collection('questions')
//         .where("isSelected", "==", true)

//         return questionsRunning.onSnapshot((snapshot) => {
//             let array = []
//             snapshot.forEach(i => {
//                 array.push({
//                     id: i.id,
//                     ...i.data()
//                 })
//             })
//             setRunningQuestion(array)
//         }, err => {
//             console.log('an error occured', err)
//         })
//         //setQuestion(runningQuestion[currentQuestion])
        
//         // const showThisQ = firebaseInstance
//         // .firestore()
//         // .collection('running')
//         // .doc(id)
//         // .collection('questions')
//         // .where("isSelected", "==", true)

//         // return showThisQ.onSnapshot((snapshot) => {
//         //     let array = []
//         //     snapshot.forEach(i => {
//         //         array.push({
//         //             id: i.id,
//         //             ...i.data()
//         //         })
//         //     })

//         //     setQuestion(array)
//        //})
//     }, [])

//     //useEffect checks state of question to determine which question is currently displayed
//     //If the first question is selected, showFirstQ function will update boolean in firestore so the correct question is displayed
//     useEffect(() => {
//         if(question !== undefined){
//             if(question !== null && currentQuestion === 0){
//                 //showFirstQ(id, question.id)
//             }
//             if(question !== null){
//                 //toggleQuestionVisibility()
//             }
//         }

//     }, [question])

//     //See firesbaseHelpers for further details on checkForQuizData function
//     // async function getData(user, quizPin){
//     //     const data = await checkForQuizData(user, quizPin)
//     //     setQuizData(data)
//     //     console.log('INITIAL DATA FROM FIRESTORE', data)
//     // }

//     async function startQuiz(){
//         activateQuiz(id)
//         setWatingRoomActive(false)
//         setQuizRunning(true)
//     }   

//     async function showFirstQ(quizPin, questionId){
//         if(question !== undefined){
//             await showCurrentQuestion(quizPin, questionId)
//         }
//     }

//     async function toggleQuestionVisibility(){
//         await showCurrentQuestion(id, runningQuestion.id)
//         await hideQuestions(id, filter)
//     }

//     async function nextQuestion(){
//         if(currentQuestion + 1 === quizData.length){
//             await hideQuestions(id, quizData)
//             await showEndResults()
//         } else {
//             setCurrentQuestion(currentQuestion + 1)
//             setQuizAsPending()
//         }
//     }

//     async function showScores(){
//         const scoreData = await getAllParticipantScores(id)
//         setParticipantScores(scoreData)

//         if(currentQuestion + 1 === quizData.length){
//             await hideQuestions(id, quizData)
//             await showEndResults()
//         } else {
//             setQuizAsPending()
//         }
//     }

//     async function setQuizAsPending(){
//         const quizDocument = firebaseInstance
//         .firestore()
//         .collection('running')
//         .doc(id)
        
//         await quizDocument.get()
//         .then((doc) => {
//             if(doc.exists && doc.data().isPending !== true){
//                 quizDocument.update({
//                     isPending: true
//                 })
//                 setQuizPending(true)
//             }

//             if(doc.exists && doc.data().isPending === true){
//                 quizDocument.update({
//                     isPending: false
//                 })
//                 setQuizPending(false)
//             }
//         })
//     }

//     async function showEndResults(){
//         const quizDocument = firebaseInstance
//         .firestore()
//         .collection('running')
//         .doc(id)
        
//         await quizDocument.get()
//         .then((doc) => {
//             if(doc.exists){
//                 quizDocument.update({
//                     isActive: false,
//                     isWaitingRoomAcitve: true
//                 })
//                 setQuizRunning(false)
//                 setQuizEnded(true)
//             }
//         })
//     }

//     function ScoresComponent() {
//         return(
//             <>
//                 <h1>Scores</h1>
//                 {JSON.stringify(participantScores)}
//                 <button onClick={nextQuestion}>Next question</button>
//                 {participantScores && participantScores.map((i, index) => {
//                     return(
//                         <p key={index}>{i.id.toUpperCase()}: {i.points} </p>
//                     )
//                 })}
//             </>
//         )
//     }

//     function QuestionRunningComponent(){
//         return(
//             <>
//                 <h1>Question is</h1>
//                 <p>Current question: {JSON.stringify(runningQuestion)}</p>
//                 <button onClick={showScores}>Show scores</button>
//             </>
//         )
//     }

//     function WaitingRoomComponent(){
//         return(
//             <div>
                
//                 <h1>Use this PINCODE to join the quiz: {id}</h1>
//                 <p>Waiting for contestants...</p>
//                 {participants && participants.map((i, index) => {
//                     return(
//                         <p key={index}>{i.id}</p>
//                     )
//                 })}
//                 <button onClick={startQuiz}>Start quiz!</button>
//             </div>
//         )
//     }

//     return (
//         <div>
//             {JSON.stringify(quizData)}
//             {!runningQuestion ? <p>Loading...</p> : 
//                 <>
//                     {watingRoomAcitve ? <WaitingRoomComponent />
//                     : 
//                     <div>
//                         {quizRunning ? 
//                         <>
//                             {quizPending ? 
//                             <ScoresComponent /> 
//                             : 
//                             <QuestionRunningComponent />
//                             }
//                         </>    
//                         : 
//                         <>
//                             {quizEnded ?
//                             <>
//                                 <h2>Quiz over!</h2> 
//                                 <h3>Scores:</h3>
//                                 {participantScores && participantScores.map((i, index) => {
//                                     return(
//                                         <p key={index}>{i.id.toUpperCase()}: {i.points}</p>
//                                         )
//                                     })
//                                 }
//                                 <button onClick={() => resetQuiz(user.uid, id)}>End quiz</button>
//                             </> 
//                             : 
//                             <p>Loading...</p>
//                             }
//                         </>
//                         }
//                     </div>
//                     }
//                 </>
//             }
//         </div>
//     );
// }

// export default hostRunningQuiz;

// /**
//     async function previousQuestion(){
//         setCurrentQuestion(currentQuestion - 1)
//     }
//  * 
//  * <button onClick={testValues}>test</button>
//  * 
//  *     async function testValues(){
//         console.log('all data:', quizData)
//         console.log('current q:', currentQuestion)
//         showFirstQ(id, question.id)
//         const filter = quizData.filter(i => {
//             return(i !== question)
//         })

//         console.log(filter)
//     }
//  * {currentQuestion > 0 ? <button onClick={previousQuestion}>Previous question</button> : ''}
//  * 
//  * useEffect(() => {
//     if(user){
//         getData(user.uid, id)
//     }

// }, [user])

// useEffect(() => {
//     setQuestion(quizData[currentQuestion])
// }, [quizData])

// useEffect(() => {
//     console.log(question)
//     if(question){addQuestionToRunningQuiz(id, question)}
// }, [question])

// async function getData(user, quizPin){
//     const data = await checkForQuizData(user, quizPin)
//     setQuizData(data)
// }

// function incrementCurrentQuestion(){
//     setCurrentQuestion(currentQuestion + 1)
//     setQuestion(quizData[currentQuestion])
// }

// function runQuestion(){
//     if(currentQuestion !== 0){
//         incrementCurrentQuestion()
//     }
    
//     addQuestionToRunningQuiz(id, question)        

// }*/
