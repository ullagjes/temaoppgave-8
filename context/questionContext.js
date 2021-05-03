import 
    React, { 
    useState, 
    createContext, 
    useContext, 
} from 'react'
import { useRouter } from 'next/router';

const QuestionContext = createContext({
    questions: [],
    addQuestion: () => {},
    removeQuestion: () => {},
});

export const Question = ({ children }) => {

    const router = useRouter();

    const [questions, setQuestions] = useState([]);
    const questionsCopy = [...questions];

    const addQuestion = (question) => {
        setQuestions(question);

    };
    
    const removeQuestion = (index) => {
        questionsCopy.splice(index, 1);
        setQuestions(questionsCopy);
    };

    return(
        <QuestionContext.Provider value={{questions, addQuestion, removeQuestion}}>
            {children}
        </QuestionContext.Provider>
    );
};

export const QuestionConsumer = QuestionContext.Consumer;

export const useQuestion = () => {
    return useContext(QuestionContext);
};
