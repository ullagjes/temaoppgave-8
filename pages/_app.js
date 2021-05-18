import '../styles/globals.css'
import React, { useEffect } from 'react';
import { AuthProvider } from '../context/authContext';
import { Question } from '../context/questionContext';
import { QuizMaster } from '../context/quizMasterContext';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../utils/theme';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if(jssStyles){
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <QuizMaster>
          <Question>
            <Component {...pageProps} />  
          </Question>
        </QuizMaster>
        
      </AuthProvider>
    </ThemeProvider>
      
    )
}

export default MyApp
