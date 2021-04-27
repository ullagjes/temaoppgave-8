import Head from 'next/head'
import styles from '../styles/Home.module.css'
import firebaseInstance from '../utils/firebase';
import { createQuizPin } from '../utils/firebaseHelpers'
import React, {useState, useEffect} from 'react';
import { useAuth } from '../context/authContext';
export default function Home() {

  //TODO: Activate createQuizPin and add pin to firestore data
  //const [quizPin, setQuizPin] = useState(null)
  

  const { user, loading, isAuthenticated } = useAuth();
  
  return (

    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Heisann!</h1>
        <button onClick={createQuizPin}>Test</button>
        <p>{JSON.stringify(isAuthenticated, null, 2)}</p>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
