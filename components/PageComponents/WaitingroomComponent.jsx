import React from 'react';

import Container from '@material-ui/core/Container';

import { ButtonComponent, UnderTitle, TextElement } from '../BaseComponents';
import ParticipantItem from './ParticipantItem';

function WaitingroomComponent({pinCode, participants, onClick}) {
    console.log('participantprops', participants)
    return (
        <div>
            <Container maxWidth="lg">

                <UnderTitle component={"h1"}>Use this pincode: {pinCode} to join the quiz!</UnderTitle>
                <TextElement>Waiting for participants to join...</TextElement>
                {participants && participants.map((i, index) => {
                    return(
                        <ParticipantItem participant={i.id} key={index}/>
                    )
                })}
                <ButtonComponent onClick={onClick}>Start quiz!</ButtonComponent>
            </Container>
        </div>
    );
}

export default WaitingroomComponent;