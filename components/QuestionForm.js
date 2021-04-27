import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useQuestion } from '../context/questionContext';

const schema = Yup.object().shape({
    title: Yup.string().required('Please add a question').label('Question'),
    option_one: Yup.string().required('At least two options required').label('First option'),
    option_two: Yup.string().required('At least two options required').label('Second option'),
    option_three: Yup.string().label('Question'),
    option_four: Yup.string().label('Question'),
});

function QuestionForm({ initialValues }) {

    const { questions, addQuestion, removeQuestion } = useQuestion();

    
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values) => addQuestion(values)}
        >
            <Form>
                <label htmlFor='title'>Question</label>
                <Field name="title" type="text" placeholder="Type your question here"/>
                <ErrorMessage name="title" />
                <br></br>
                <br></br>
                <label htmlFor='option_one'>Option 1:</label>
                <Field name="option_one" type="text" placeholder="Option 1(required)"
                />
                <ErrorMessage name="option_one" />
                <br></br>
                <br></br>
                <label htmlFor='option_two'>Option 2:</label>
                <Field name="option_two" type="text" placeholder="Option 2(required)"
                />
                <ErrorMessage name="option_two" />
                <br></br>
                <br></br>
                <label htmlFor='option_three'>Option 3:</label>
                <Field name="option_three" type="text" placeholder="Option 3(optional)"
                />
                <br></br>
                <br></br>
                <label htmlFor='option_four'>Option 4:</label>
                <Field name="option_four" type="text" placeholder="Option 4(optional)"
                />
                <br></br>
                <button type="submit">Done</button>
                        
            </Form>
        </Formik>
    );
}

export default QuestionForm;