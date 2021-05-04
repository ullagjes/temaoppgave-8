import 
    React, { 
    useState, 
    useEffect,
    createContext, 
    useContext, 
} from 'react'
import { useRouter } from 'next/router';

import { checkForUserData } from '../utils/firebaseHelpers';
import { useAuth } from './authContext';

const QuizMasterContext = createContext({
    quizes: [],
    userData: []
    //addQuiz: () => {},
    //removeQuiz: () => {},
});

export const QuizMaster = ({ children }) => {

    const router = useRouter();

    const { user } = useAuth();

    const [quizes, setQuizes] = useState([]);
    const [userData, setUserData] = useState([])

    useEffect(() => {
        if(user){
            getQuizmasterData(user.uid)
            setUserData(user)
        }
    }, [user])

    async function getQuizmasterData(user){
        const data = await checkForUserData(user)
        setQuizes(data)
    }
    

    
    //const questionsCopy = [...questions];

    /*const addQuiz = (question) => {
        setQuestions(question);

    };
    
    const removeQuestion = (index) => {
        questionsCopy.splice(index, 1);
        setQuestions(questionsCopy);
    };*/

    return(
        <QuizMasterContext.Provider value={{ quizes, userData }}>
            {children}
        </QuizMasterContext.Provider>
    );
};

export const QuizConsumer = QuizMasterContext.Consumer;

export const useQuizMaster = () => {
    return useContext(QuizMasterContext);
};
