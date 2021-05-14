import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    title: Yup.string().required('Please add a question').label('Question'),
    option_one: Yup.string().required('At least two options required').label('First option'),
    option_two: Yup.string().required('At least two options required').label('Second option'),
    option_three: Yup.string().label('Question'),
    option_four: Yup.string().label('Question'),
    correctAnswers: Yup.array().of(Yup.string().required()).min(1, 'Please select one or more correct answers').required()
});

function QuestionForm({ initialValues, onSubmit }) {

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={
                (values, { resetForm }) => {
                    onSubmit(values)
                    resetForm()
                }
            }
        >
            <Form>
                <label htmlFor='title'>Question</label>
                <Field name="title" type="text" placeholder="Type your question here"/>
                <ErrorMessage name="title" />
                <br></br>
                <br></br>
                <label htmlFor='option_one'>Option 1:</label>
                <Field name="option_one" type="text" placeholder="Option 1(required)"
                /><label>
                <Field type="checkbox" name="correctAnswers" value="option_one"/>
                A.
                </label>
                <ErrorMessage name="option_one" />
                <br></br>
                <br></br>
                <label htmlFor='option_two'>Option 2:</label>
                <Field name="option_two" type="text" placeholder="Option 2(required)"
                />
                <label>
                    <Field type="checkbox" name="correctAnswers" value="option_two"/>
                    B.
                </label>
                <ErrorMessage name="option_two" />
                <br></br>
                <br></br>
                <label htmlFor='option_three'>Option 3:</label>
                <Field name="option_three" type="text" placeholder="Option 3(optional)"
                />
                <label>
                    <Field type="checkbox" name="correctAnswers" value="option_three"/>
                    C.
                </label>
                <br></br>
                <br></br>
                <label htmlFor='option_four'>Option 4:</label>
                <Field name="option_four" type="text" placeholder="Option 4(optional)"
                />
                <label>
                    <Field type="checkbox" name="correctAnswers" value="option_four"/>
                    D.
                </label>
                <ErrorMessage name="correctAnswers" />
                <br></br>
                <button type="submit">Done</button>
                        
            </Form>
        </Formik>
    );
}

export default QuestionForm;

/**async function addQuestionToFiresTore(values){
        await firebaseInstance
        .firestore()
        .collection('users')
        .doc(userId)
        .collection('quizes')
        .doc(quizPin)
        .collection('questions').doc(`question_${counter}`)
        .set({
            id: `question_${counter}`,
            title: values.title,
            options: {
                a: values.option_one,
                b: values.option_two,
                c: values.option_three,
                d: values.option_four,
            },
            correctAnswers: values.correctAnswers
        }, {merge: true})
    } */