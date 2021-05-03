/*import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function App() {
    const initialValues = {
        numberOfTickets: '',
        tickets: []
    };

    const validationSchema = Yup.object().shape({
        numberOfTickets: Yup.string()
            .required('Number of tickets is required'),
        tickets: Yup.array().of(
            Yup.object().shape({
                name: Yup.string()
                    .required('Name is required'),
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required')
            })
        )
    });

    function onChangeTickets(e, field, values, setValues) {
        // update dynamic form
        const tickets = [...values.tickets];
        const numberOfTickets = e.target.value || 0;
        const previousNumber = parseInt(field.value || '0');
        if (previousNumber < numberOfTickets) {
            for (let i = previousNumber; i < numberOfTickets; i++) {
                tickets.push({ name: '', email: '' });
            }
        } else {
            for (let i = previousNumber; i >= numberOfTickets; i--) {
                tickets.splice(i, 1);
            }
        }
        setValues({ ...values, tickets });

        // call formik onChange method
        field.onChange(e);
    }

    function onSubmit(fields) {
        // display form field values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, values, touched, setValues }) => (
                <Form>
                    <div>
                        <label>Number of Tickets</label>
                            <Field name="numberOfTickets">
                                    {({ field }) => (
                                        <select {...field}  onChange={e => onChangeTickets(e, field, values, setValues)}>
                                            <option value=""></option>
                                            {[1,2,3,4,5,6,7,8,9,10].map(i => 
                                                <option key={i} value={i}>{i}</option>
                                            )}
                                        </select>
                                    )}
                                    </Field>
                                    <ErrorMessage name="numberOfTickets" component="div" className="invalid-feedback" />
                               
                        </div>
                        <FieldArray name="tickets">
                        {() => (values.tickets.map((ticket, i) => {
                            
                            return (
                                <>
                                
                                <label>Name</label>
                                <Field name={`tickets.${i}.name`} type="text" />
                                <ErrorMessage name={`tickets.${i}.name`} component="div" className="invalid-feedback" />
                                           
                                <label>Email</label>
                                <Field name={`tickets.${i}.email`} type="text" />
                                <ErrorMessage name={`tickets.${i}.email`} component="div" className="invalid-feedback" />
                                           
                                </>
                            );
                        }))}
                        </FieldArray>
                </Form>
            )}
        </Formik>
    )
}

export { App };*/