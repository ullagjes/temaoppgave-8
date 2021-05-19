import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuth } from '../../../context/authContext';
import FirebaseInstance from '../../../utils/firebase';

import { 
    addQuestionToDocument, 
    addQuizToRunningCollection, 
    addTitleToRunningQuiz, 
    checkForQuizData, 
    countCollection,
    getQuizTitle 
} from '../../../utils/firebaseHelpers';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { SubTitle, ButtonComponent, TextElement, UnderTitle } from '../../../components/BaseComponents';
import ListItem from '../../../components/PageComponents/ListItem';
import QuestionForm from '../../../components/FormComponents/QuestionForm';
import PageContainer from '../../../components/PageComponents/PageContainer';
import firebaseInstance from '../../../utils/firebase';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    container: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    titleContainer: {
        marginBottom: theme.spacing(3),
        borderBottom: theme.borders.medium,
    },
    whiteText: {
        color: 'white'
    },
}))

function createQuestions () {

    const { user, loading, isAuthenticated } = useAuth();
    
    const router = useRouter();
    const { id } = router.query

    const classes = useStyles();

    const [selectedQuizData, setSelectedQuizData] = useState(null)
    const [selectedQuizTitle, setSelectedQuizTitle] = useState([])
    const [counter, setCounter] = useState(null)

    useEffect(() => {
        if(user){
            getSelectedQuizData(user.uid, id)
        }

        if(counter === null && user){
            getCounter(user.uid, id)
        }
    }, [id])

    //REALTIME DATA LISTENES TO EACH ADDED QUESTION DOCUMENT
    async function getSelectedQuizData(user, quizPin){
        const title = await getQuizTitle(user, quizPin)
        
        setSelectedQuizTitle(title)
        const quizCollection = await firebaseInstance
        .firestore()
        .collection('users')
        .doc(user)
        .collection('quizes')
        .doc(quizPin)
        .collection('questions')

        return quizCollection.onSnapshot((snapshot) => {
            let array = []
            snapshot.forEach(i => {
                array.push({
                    id: i.id,
                    ...i.data()
                })
            })
            setSelectedQuizData(array)
        })

    }
    
    
    async function getCounter(user, quizPin){
        let collectionLength = await countCollection(user, quizPin)
        setCounter(collectionLength)
    }

    async function addQuestionToFiresTore(values){        
        try {
            await addQuestionToDocument(user.uid, id, counter, values)
            getCounter(user.uid, id)
        } catch(error) {
            console.log('error when adding question to firestore', error)
        }
    }

    async function startQuiz(){
        await addTitleToRunningQuiz(id, selectedQuizTitle)
        await addQuizToRunningCollection(id, selectedQuizData)
        router.push(`/runquiz/${id}`)
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
        <PageContainer user={user}>
            <Grid 
            container
            direction="row"
            justify="center"
            spacing={5}
            className={classes.container}
            >
                <Grid 
                container 
                item 
                justify="space-between"
                alignItems="baseline"
                className={classes.titleContainer}
                xs={12}>
                   <Grid item xs={12} sm={6}>
                    <SubTitle component={"h1"} className={classes.whiteText}>{selectedQuizTitle}</SubTitle>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <ButtonComponent size={"large"} onClick={startQuiz}>Run quiz!</ButtonComponent>   
                    </Grid> 
                </Grid>
                
                <Grid item sm={6} xs={12}>
                             
                            <QuestionForm 
                            quizPin={id} 
                            counter={counter} 
                            onSubmit={addQuestionToFiresTore} 
                            initialValues={{
                                title: '',
                                option_one: '',
                                option_two: '',
                                option_three: '',
                                option_four: '',
                                correctAnswers: [],
                                }}
                            /> 
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <UnderTitle className={classes.whiteText} component={"h2"}>Your questions</UnderTitle>
                               
                                {selectedQuizData && selectedQuizData.map((i, index) => {
                                    return (
                                    <ListItem 
                                    key={index}
                                    title={i.title}
                                    ariaLabelEdit={'Click to edit question'}
                                    handleEdit={() => router.push(`/createquiz/${id}/${i.id}`)}
                                    /> 
                                    )
                                })
                            }
                        </Grid>
                    </Grid>    
                        
        </PageContainer>
    );
}

export default createQuestions;
