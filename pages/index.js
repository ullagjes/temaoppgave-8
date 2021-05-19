import React from 'react';
//NEXT
import Head from 'next/head'
import { useRouter } from 'next/router';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'
//COMPONENTS
import { 
  ButtonComponent, 
  UnderTitle, 
  SubTitle 
} from '../components/BaseComponents';
import PageContainer from '../components/PageComponents/PageContainer';

const useStyles = makeStyles((theme) => ({
  grid: {
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 'auto',
    minHeight: '300px',
  },
  titleContainer: {
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(4)
  },
  underTitle: {
    color: theme.palette.primary.contrastText,
  }
}))

export default function Home() {

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
        direction='column'
        alignItems='center'
        justify='space-between'
        className={classes.grid}
        >
          <Grid 
          item xs={12}
          className={classes.titleContainer}
          >
            <SubTitle component={"h1"}>Welcome!</SubTitle>
            <UnderTitle component={"h2"} className={classes.underTitle}>Choose to create or join quiz to get started.</UnderTitle>
          </Grid>
          <Grid 
          item xs={12} 
          sm={6}
          >
            <ButtonComponent onClick={() => router.push('/login')} size={"large"}>Create quiz</ButtonComponent>
          </Grid>
          <Grid 
          item xs={12} 
          sm={6}
          >
            <ButtonComponent 
            onClick={() => router.push('/participant')} 
            size={"large"}
            >
              Join quiz
            </ButtonComponent>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  )
}
