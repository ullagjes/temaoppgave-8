import '../styles/globals.css'

import React, { useEffect } from 'react';
//MATERIAL UI
import { ThemeProvider } from '@material-ui/styles';
//CONTEXT
import { AuthProvider } from '../context/authContext';
import { QuizMaster } from '../context/quizMasterContext';
//UTILS
import theme from '../utils/theme';

function MyApp({ Component, pageProps }) {

  //MAKES MATERIAL UI COMPATIBLE WITH NEXT.JS
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
            <Component {...pageProps} />  
        </QuizMaster>
      </AuthProvider>
    </ThemeProvider>
      
    )
}

export default MyApp
