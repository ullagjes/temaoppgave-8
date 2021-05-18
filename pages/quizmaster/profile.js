import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import PageContainer from '../../components/PageComponents/PageContainer';

import { useQuizMaster } from '../../context/quizMasterContext';



function profile() {

    const { userData } = useQuizMaster();
    const user = userData.uid

    return (
        <PageContainer user={user}>
            <Button>Test</Button>
        </PageContainer>
    );
}

export default profile;