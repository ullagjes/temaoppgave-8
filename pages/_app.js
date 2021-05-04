import '../styles/globals.css'
import { AuthProvider } from '../context/authContext';
import { Question } from '../context/questionContext';
import { QuizMaster } from '../context/quizMasterContext';


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <QuizMaster>
        <Question>
          <Component {...pageProps} />  
        </Question>
      </QuizMaster>
      
    </AuthProvider>
      
    )
}

export default MyApp
