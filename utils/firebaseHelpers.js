import firebaseInstance from './firebase';

const userCollection = firebaseInstance
.firestore()
.collection('users')

const runningCollection = firebaseInstance
.firestore()
.collection('running')

//========================USERDATA

export async function createUserInFirestore(userId){
  
  await userCollection.doc(userId)
  .set({
    userId: userId
  })
}

export async function checkForUserData(userId){
  try { 
    const array = []
    
    let selectedUserCollection = await userCollection.doc(userId)
    let selectedUserQuizCollection = await selectedUserCollection.collection('quizes').get()
    
    selectedUserQuizCollection.forEach(item => {
      array.push({
        id: item.id,
        ...item.data()
      })
    })

    return(array)

  } catch(error){
      return console.log('error when fetching userdata',error)
  }

}

export async function handleSignOut(){
  await firebaseInstance.auth().signOut()
}

//==========================CREATE QUIZ

export async function createQuizPin(){
  const pinRef = firebaseInstance
  .firestore()
  .collection('globals')
  .doc('A3xMG5HOTnEpws1AASxC')

  await firebaseInstance.firestore().runTransaction((transaction) => {
    return transaction.get(pinRef).then((doc) => {
      const count = doc.data().counter
      let newCount = count + 1
      transaction.update(pinRef, {counter: newCount})
    })
  })
}

export async function createQuizDocument(userId, quizPin, quizName) {
  await userCollection
  .doc(userId)
  .collection('quizes')
  .doc(quizPin)
  .set({
    quizPin: quizPin,
    quizName: quizName
  }, {merge: true})

}

export async function addQuestionToDocument(
  userId, 
  quizPin,
  counter,
  values
  ) {
  await userCollection
  .doc(userId)
  .collection('quizes')
  .doc(quizPin)
  .collection('questions').doc(`question_${counter}`)
  .set({
      id: `question_${counter}`,
      title: values.title,
      options: {
          a: values.option_one,
          b: values.option_two,
          c: values.option_three,
          d: values.option_four,
        },
      correctAnswers: values.correctAnswers
      }, {merge: true})
}

export async function updateQuestionData(userId, quizPin, questionId, values){
  await userCollection
  .doc(userId)
  .collection('quizes')
  .doc(quizPin)
  .collection('questions')
  .doc(questionId)
  .update({
      title: values.title,
      options: {
          a: values.option_one,
          b: values.option_two,
          c: values.option_three,
          d: values.option_four,
        },
      correctAnswers: values.correctAnswers
      }, {merge: true})
}

//======================EXTRACT QUIZDATA

export async function checkForQuizData(userId, quizPin){
  if(userId){
      try {
      let selectedQuizCollection = await userCollection
        .doc(userId)
        .collection('quizes')
        .doc(quizPin)
        .collection('questions')
        .get()
      
      const array = []

      selectedQuizCollection.forEach(item => {
        array.push({
          id: item.id,
          ...item.data()
        })
      })

      return(array)

    } catch(error){
      return console.log('error when fetching quizdata', error)
    }
  } else {
    return console.log('user not found')
  }
}

export async function getQuizTitle(userId, quizPin){
  if(userId){
    try {
      let title = await userCollection
        .doc(userId)
        .collection('quizes')
        .doc(quizPin)
        .get()
        .then((doc) => {
          if(doc.exists){
            return (doc.data().quizName)
            
          } else {
            return ('Not found')
          }
      })
      return title
    } catch(error){
      return console.log('error when fetching quizdata', error)
    }

    
  }  
}

export async function getQuestionData(user, quizPin, questionId){
  
  let document = await userCollection
  .doc(user)
  .collection('quizes')
  .doc(quizPin)
  .collection('questions')
  .doc(questionId)
  .get()
  .then((doc) => {
      if (doc.exists){
          return doc.data()
      } else {
          console.log('does not exist')
      }
  })

  return document
}

export async function countCollection(user, quizPin){
  const array = []
  await firebaseInstance
    .firestore()
    .collection('users')
    .doc(user)
    .collection('quizes')
    .doc(quizPin)
    .collection('questions')
    .get()
    .then(snap => {
            array.push(snap.size)
        })
    return(array)

}

//==========================SHOW PARTICIPANT QUIZDATA

export async function addQuizToRunningCollection(quizPin, selectedQuizData){

  const collection = await firebaseInstance
  .firestore()
  .collection('running')
  .doc(quizPin)
  .collection('questions')
  
  await selectedQuizData.forEach(i => {
    collection.doc(i.id)
    .set({
      id: i.id,
      title: i.title,
      options: {
        a: i.options.a,
        b: i.options.b,
        c: i.options.c,
        d: i.options.d,
      },
      correctAnswers: i.correctAnswers,
      isSelected: false
  
    }, {merge: true})
  })
}

export async function addTitleToRunningQuiz(quizPin, selectedQuizTitle){
  await firebaseInstance
  .firestore()
  .collection('running')
  .doc(quizPin)
  .set({
    title: selectedQuizTitle
  }, {merge: true})

}

export async function showCurrentQuestion(quizPin, questionId){
  await runningCollection
  .doc(quizPin)
  .collection('questions')
  .doc(questionId)
  .update({
    isSelected: true
  }, {merge: true})
}

export async function hideQuestions(quizPin, questions){
  const collection = await runningCollection
  .doc(quizPin)
  .collection('questions')
  
  await questions.forEach(i => {
    collection.doc(i.id)
    .update({
      isSelected: false
    }, {merge: true})
  })
}

//=========================PARTICIPANT DATA

export async function checkIfQuizExists(quizPin){

  await runningCollection
  .doc(quizPin.toString())
  .get()
  .then((doc) => {
    if(doc.exists){
      return true
    } else {
      return false
    }
  })
}

export async function addParticipantToRunningQuiz(quizPin, userNickname) {
  const collection = await firebaseInstance
  .firestore()
  .collection('running')
  .doc(quizPin)
  .collection('participants')

  const document = collection.doc(userNickname)

  const userDocument = document.get()
  .then((doc) => {
    if(doc.exists){
      return false
    } else {
      document.set({
        id: userNickname,
        points: 0
      }, {merge: true})
    }
  })

  return userDocument
  
}

export async function getCurrentPoints(quizPin, userNickname){
  const collection = await firebaseInstance
  .firestore()
  .collection('running')
  .doc(quizPin)
  .collection('participants')

  const document = collection.doc(userNickname)

  const userDocument = document.get()
  .then((doc) => {
    return doc.data().points
  })

  return userDocument
}

export async function submitAnswerToFireStore(quizPin, userNickname, questionId, answer) {
  const dbCol = firebaseInstance
  .firestore()
  .collection('running')
  const runningCollection = await dbCol.doc(quizPin)
  .collection('participants')
  
  const userAnswers = runningCollection.doc(userNickname)
  .collection('answers')
  
  const currentAnswer = userAnswers.doc(questionId)
  
  currentAnswer.get()
  .then((doc) => {
    if(doc.exists){
      alert('you have already answered!')
    } else {
      currentAnswer.set({answer: answer}, {merge: true})
    }
  })

}

export async function getCorrectAnswer(quizPin, questionId) {
  console.log(questionId)
  
  const correctAnswer = await firebaseInstance 
  .firestore()
  .collection('running')
  .doc(quizPin)
  .collection('questions')
  .doc(questionId)
  .get()
  .then((doc) => {
    return doc.data().correctAnswers
  })

  return correctAnswer;

}

export async function updateUserPoints(quizPin, userNickname, points) {
  const collection = await firebaseInstance
  .firestore()
  .collection('running')
  .doc(quizPin)
  .collection('participants')

  const document = collection.doc(userNickname)

  const userDocument = document.get()
  .then((doc) => {
    if(doc.exists){
      document.update({
        points: points
      }, {merge: true})
    } else {
      console.log('error when updating points')
    }
  })

  return userDocument
}