import React, { useState } from 'react';
import firebaseInstance from '../../utils/firebase';
import Link from 'next/link';

import { useQuestion } from '../../context/questionContext';

import QuestionForm from '../../components/QuestionForm'


function createQuestion() {

    return (
        <>
        <Link href="/createquiz/createQuestion">
                <a>Add a question</a>
            </Link>
                {questions && questions.map((i, index) => {
                return (
                    <div key={index}>
                        <p>{i.title}</p>
                        <p>{i.option_one}</p>
                        <p>{i.option_two}</p>
                        <p>{i.option_three}</p>
                        <p>{i.option_four}</p>
                    </div>
                    )
                })
            }
            <QuestionForm 
                initialValues={{
                    title: '',
                    option_one: '',
                    option_two: '',
                    option_three: '',
                    option_four: '',
                    correctAnswers: []
                    //is_option_one_correct: false,
                    //is_option_two_correct: false,
                    //is_option_three_correct: false,
                    //is_option_four_correct: false,
                }}
            />
        </>
    );
}

export default createQuestion;