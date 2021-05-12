import React from 'react';
import { useQuizMaster } from '../../context/quizMasterContext';
import NavBar from '../../components/NavBar';
import { PageContainer } from '../../components/BaseComponents';

function quizMaster() {
    const { quizes, userData } = useQuizMaster();

    return (
        <>
            <NavBar />
            <PageContainer />
        </>
    );
}

export default quizMaster;