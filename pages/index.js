import Head from 'next/head'
import styles from '../styles/Home.module.css'
import firebaseInstance from '../utils/firebase';
import { createQuizPin } from '../utils/firebaseHelpers'
import React, {useState, useEffect} from 'react';
import { useAuth } from '../context/authContext';

import {  ButtonComponent, HeadLine, SubTitle, TextElement, UnderTitle, PageContainer, LinkComponent } from '../components/BaseComponents';
import ListItem from '../components/PageComponents/ListItem';
import ShowScoresComponent from '../components/PageComponents/ShowScoresComponent';

export default function Home() {

  //TODO: Activate createQuizPin and add pin to firestore data
  //const [quizPin, setQuizPin] = useState(null)
  

  const { user, loading, isAuthenticated } = useAuth();
  
  return (

    <div>
      <Head>
        <title>Welcome to Kashoot</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <>
      </>
      <>
        <HeadLine>Headline</HeadLine>
        <SubTitle>Subtitle</SubTitle>
        <UnderTitle>Undertitle</UnderTitle>
        <TextElement style={'main'}>This is some text.</TextElement>
        <br></br>
        <TextElement style={'secondary'}>This is secondary text.</TextElement>
        <br></br>
        <ButtonComponent size={'large'}>Button</ButtonComponent>
        <LinkComponent href={"#"}>Click me!</LinkComponent>
        <ListItem 
          title={'Question'} 
          ariaLabelEdit={'Press to edit'} 
          ariaLabelDelete={'Press to delete question from quiz'}
          handleEdit={() => console.log('edited')} 
          handleDelete={() => console.log('deleted')} 
          />
      </>
      

      <footer>
      </footer>
    </div>
  )
}
