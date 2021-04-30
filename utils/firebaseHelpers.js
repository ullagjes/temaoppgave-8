import firebaseInstance from './firebase';

const userCollection = firebaseInstance
.firestore()
.collection('users')



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
        //setQuizPin(newCount);

      })
    })
}

export async function createUserInFirestore(userId){
  
  await userCollection.doc(userId)
  .set({
    userId: userId
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
  quizTitle, 
  answerObject,
  correctAnswerObject
  ) {
  await userCollection
  .doc(userId)
  .collection('quizes')
  .doc(quizPin)
  .set({
    title: quizTitle,
    answers: { answerObject },
    correctAnswer: { correctAnswerObject }
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

export async function checkForQuizData(userId, quizPin){
  if(userId){
      try {
        const collection = firebaseInstance
        .firestore()
        .collection(userId)

        collection.doc(quizPin)
        .get()
        .then((doc) => {
          let data = doc.data()
          return data
        })

    } catch(error){
      return console.log('error when fetching quizdata', error)
    }
  } else {
    return console.log('user not found')
  }
}