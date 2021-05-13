import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useQuizMaster } from '../../context/quizMasterContext';

import { SubTitle, UnderTitle, LinkComponent, ButtonComponent } from '../../components/BaseComponents';
import ListItem from '../../components/PageComponents/ListItem';



function library(props) {
    const { quizes, userData } = useQuizMaster();
    const router = useRouter();

    return (
            <main>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <SubTitle component={'h1'}>Library</SubTitle>
                        <UnderTitle component={'h2'}>
                            Here are all your previous quizes. Select one to edit or to get started!
                        </UnderTitle>
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
            </main>
    );
}

export default library;

{/* <Link href={`/createquiz/${i.id}`}>
                                    <a>{i.quizName}</a>
                                </Link> */}