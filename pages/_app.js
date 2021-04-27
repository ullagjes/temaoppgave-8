import '../styles/globals.css'
import { AuthProvider } from '../context/authContext';
import { Question } from '../context/questionContext';


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Question>
        <Component {...pageProps} />  
      </Question>
    </AuthProvider>
      
    )
}

export default MyApp
