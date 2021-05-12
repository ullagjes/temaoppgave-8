import '../styles/globals.css'
import { AuthProvider } from '../context/authContext';
import { Question } from '../context/questionContext';
import { QuizMaster } from '../context/quizMasterContext';
import { ThemeProvider } from 'styled-components'
import theme from '../utils/theme';

function MyApp({ Component, pageProps }) {
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
