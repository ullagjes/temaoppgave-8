import React from 'react'
import firebaseInstance from './firebase';

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

export async function createQuizDocument(userId, quizPin) {
  await firebaseInstance
  .firestore()
  .collection(userId)
  .doc(quizPin)
  .set({quizPin: quizPin})

}

export async function addQuestionToDocument(userId, quizPin, data) {
  await firebaseInstance
  .firestore()
  .collection(userId)
  .doc(quizPin)
  .set(data, {merge: true})

}