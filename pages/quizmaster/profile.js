import React from 'react';

import { useQuizMaster } from '../../context/quizMasterContext';

import NavBar from '../../components/NavBar';

function profile() {

    const { userData } = useQuizMaster();

    return (
        <>
            <NavBar />
            {JSON.stringify(userData.uid)}
        </>
    );
}

export default profile;