import React from 'react';
import { Field, ErrorMessage } from 'formik';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    errorMessage: {
        color: theme.palette.warning.contrastText,
        borderBottom: `2px solid ${theme.palette.warning.main}`,
        fontSize: '1.2rem',
        paddingLeft: theme.spacing(3),
        marginTop: theme.spacing(1),
        backgroundColor: theme.palette.warning.light,
    },
    field: {
        '&::placeholder': {
            color: theme.palette.secondary.dark,
            fontSize: '1rem'
        },
        padding: theme.spacing(3),
        width: '100%',
        border: 'none',
        fontSize: '1rem',
        
        color: theme.palette.text.main,
        backgroundColor: theme.palette.transparent.main,
    },
    itemContainer: {
        borderBottom: `2px solid ${theme.palette.secondary.dark}`,
        margin: theme.spacing(2),
    },
    label: {
        padding: theme.spacing(2),
        fontSize: '1.2rem',
        color: theme.palette.text.main,
    },

}))

function FormItem({
    fieldName, 
    fieldType,
    placeholder, 
    labelText, 
    cbValue, 
    cbName, 
    cbText
}) {
    
    const classes = useStyles();
    
    return (
        <>
        <Grid item xs={12} className={classes.itemContainer}>
            <label 
            htmlFor={fieldName} 
            className={classes.label}>
                {labelText}
            </label>
            <Field 
            name={fieldName} 
            type={fieldType ? fieldType : 'text'}
            placeholder={placeholder} 
            className={classes.field}
            />
            <ErrorMessage 
            component="div" 
            name={fieldName} 
            className={classes.errorMessage}
            />
            {cbName && <>
                <label className={classes.label}>
                    <Field type="checkbox" name={cbName} value={cbValue}/>
                        {cbText}
                </label>
                <ErrorMessage
                component="div"
                name={cbName}
                className={classes.errorMessage}
                />
            </>}
            
        </Grid>
        </>
    );
}

export default FormItem;