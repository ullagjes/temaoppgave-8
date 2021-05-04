import React from 'react';
import { useQuizMaster } from '../../context/quizMasterContext';
import NavBar from '../../components/NavBar';

function quizMaster() {
    const { quizes, userData } = useQuizMaster();

    return (
        <>
        <NavBar />
        </>
    );
}

export default quizMaster;