import React from 'react';
import * as Yup from 'yup';

import FormComponent from './FormComponent';
import FormItem from './FormItem';

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
        <FormComponent
        schema={schema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        buttonText={"Done"}
        formTitle={"Add a question to your quiz"}
        >
            <FormItem
            fieldName={"title"}
            placeholder={"Type your question here"}
            labelText={"Question text"}
            />
            <FormItem
            fieldName={"option_one"}
            placeholder={"Option 1(required)"}
            labelText={"Option 1:"}
            cbValue={"option_one"}
            cbName={"correctAnswers"}
            cbText={"Option one is correct."}
            />
            <FormItem
            fieldName={"option_two"}
            placeholder={"Option 2(required)"}
            labelText={"Option 2:"}
            cbValue={"option_two"}
            cbName={"correctAnswers"}
            cbText={"Option two is correct."}
            />
            <FormItem
            fieldName={"option_three"}
            placeholder={"Option 3(optional)"}
            labelText={"Option 3:"}
            cbValue={"option_three"}
            cbName={"correctAnswers"}
            cbText={"Option three is correct."}
            />
            <FormItem
            fieldName={"option_four"}
            placeholder={"Option 4(optional)"}
            labelText={"Option 4:"}
            cbValue={"option_four"}
            cbName={"correctAnswers"}
            cbText={"Option four is correct."}
            />
        </FormComponent>
    );
}

export default QuestionForm;

/**
 * function QuestionForm({ initialValues, onSubmit }) {
    const classes = useStyles();

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

 * 
 * async function addQuestionToFiresTore(values){
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