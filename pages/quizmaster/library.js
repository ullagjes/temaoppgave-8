import React from 'react';

import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useQuizMaster } from '../../context/quizMasterContext';

import { SubTitle, UnderTitle} from '../../components/BaseComponents';
import ListItem from '../../components/PageComponents/ListItem';
import PageContainer from '../../components/PageComponents/PageContainer';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        width: '80%',
        maxWidth: '720px',
        alignContent: 'center',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    titleContainer: {
        color: theme.palette.primary.contrastText,
        display: 'flex',
        flexDirection: 'column',
    },
}))

function library() {
    const { quizes, userData } = useQuizMaster();
    const router = useRouter();
    const user = userData.uid
    const classes = useStyles();
    return (
        <PageContainer user={user}>

            <Grid 
            className={classes.gridContainer}
            spacing={4}
            direction='column'
            alignItems='center'
            justify='space-evenly'
            container >
                <Grid className={classes.titleContainer} item xs={12}>
                    <SubTitle component={'h1'}>Library</SubTitle>
                    <UnderTitle component={'h2'}>Here are all your previous quizes. Select one to edit or to get started!</UnderTitle>
                </Grid>
                <Grid 
                container 
                spacing={2}
                >
                {quizes && quizes.map((i, index) => {
                    return (
                        <ListItem 
                        key={index} 
                        title={i.quizName}
                        ariaLabelEdit={"click to edit quiz"}
                        handleEdit={() => router.push(`/createquiz/${i.id}`)}  
                        />
                        )
                })}
                </Grid>
            </Grid>
        </PageContainer>
    );
}

export default library;

{/* <Link href={`/createquiz/${i.id}`}>
                                    <a>{i.quizName}</a>
                                </Link> */}