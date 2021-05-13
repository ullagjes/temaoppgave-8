import React from 'react';
import { useQuizMaster } from '../../context/quizMasterContext';

function quizMaster() {
    const { quizes, userData } = useQuizMaster();

    return (
        <>
        </>
    );
}

export default quizMaster;