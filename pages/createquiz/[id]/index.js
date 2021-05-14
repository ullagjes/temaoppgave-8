import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuth } from '../../../context/authContext';
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
import { SubTitle, ButtonComponent, TextElement } from '../../../components/BaseComponents';
import ListItem from '../../../components/PageComponents/ListItem';
import QuestionForm from '../../../components/QuestionForm';
import PageContainer from '../../../components/PageComponents/PageContainer';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '720px',
    },
    titleContainer: {
        margin: theme.spacing(3),
    }
}))

function createQuestions () {

    const { user } = useAuth();
    
    const router = useRouter();
    const { id } = router.query

    const classes = useStyles();

    const [selectedQuizData, setSelectedQuizData] = useState([])
    const [selectedQuizTitle, setSelectedQuizTitle] = useState([])
    const [toggle, setToggle] = useState(false)
    const [counter, setCounter] = useState(null)

    useEffect(() => {
        if(user){
            getSelectedQuizData(user.uid, id)
        }

        if(counter === null && user){
            getCounter(user.uid, id)
        }
    }, [user])

    useEffect(() => {
        console.log('data loaded from firestore in createQuestions:', selectedQuizData.length)
    }, [selectedQuizData])

    async function getSelectedQuizData(user, quizPin){
        const data = await checkForQuizData(user, quizPin)
        const title = await getQuizTitle(user, quizPin)
        console.log(title)
        setSelectedQuizTitle(title)
        setSelectedQuizData([...data])
    }
    
    function createNewQuestion(){
        setToggle(true)
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

    return (
        <PageContainer user={user}>

                <div className={classes.root}>
                    <div className={classes.titleContainer}>

                        <Grid 
                            container
                            direction="row"
                        >
                            <Grid item xs={12}>
                                        <SubTitle component={"h1"}>{selectedQuizTitle}</SubTitle>
                                    </Grid>
                            <Grid item xs={6} sm={3}>
                                <ButtonComponent onClick={createNewQuestion}>Add question</ButtonComponent>
                                {toggle ? 
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
                                : ''}
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <ButtonComponent onClick={startQuiz}>Run quiz!</ButtonComponent>
                            </Grid>
                        </Grid>    
                    </div>
                    <div>
                        {selectedQuizData && selectedQuizData.map((i, index) => {
                            return (
                                <ListItem 
                                    key={index}
                                    title={i.title}
                                    ariaLabelEdit={'Click to edit question'}
                                    handleEdit={() => router.push(`/createquiz/${id}/${i.id}`)}
                                />
                                
                            )
                        })}
                    </div>
                </div>    
        </PageContainer>
        
    );
}

export default createQuestions;
