import firebaseInstance from './firebase';

const userCollection = firebaseInstance
.firestore()
.collection('users')

const runningCollection = firebaseInstance
.firestore()
.collection('running')

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

export async function addQuizToRunningCollection(quizPin, selectedQuizData){
  console.log(selectedQuizData)
  
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

export async function handleSignOut(){
  await firebaseInstance.auth().signOut()
}