import Head from 'next/head'

import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/authContext';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'

import {  ButtonComponent, HeadLine, UnderTitle } from '../components/BaseComponents';
import PageContainer from '../components/PageComponents/PageContainer';

const useStyles = makeStyles((theme) => ({
  grid: {
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  titleContainer: {
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
  },
}))

export default function Home() {

  //TODO: Activate createQuizPin and add pin to firestore data
  //const [quizPin, setQuizPin] = useState(null)
  

  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter()

  const classes = useStyles();

  return (

    <>
      <Head>
        <title>Welcome to Kashoot</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <PageContainer>
        <Grid 
        container
        spacing={4}
        direction='column'
        alignItems='center'
        justify='space-evenly'
        className={classes.grid}
        >
          <Grid item xs={12} className={classes.titleContainer}>
            <HeadLine component={"h1"}>Welcome!</HeadLine>
            <UnderTitle component={"h2"}>Choose to create or join quiz to get started.</UnderTitle>
          </Grid>
          <Grid item xs={12} sm={6}>

            <ButtonComponent onClick={() => router.push('/login')} size={"large"}>Create quiz</ButtonComponent>
          </Grid>
          <Grid item xs={12} sm={6}>

            <ButtonComponent onClick={() => router.push('/participant')} size={"large"}>Join quiz</ButtonComponent>
          </Grid>
        </Grid>
      </PageContainer>

    </>
  )
}
