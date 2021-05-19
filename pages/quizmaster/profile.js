
import React from 'react';
//NEXT
import { useRouter } from 'next/router'
//MATERIAL UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FaceRounded from '@material-ui/icons/FaceRounded'
//CONTEXT
import { useAuth } from '../../context/authContext';
import { useQuizMaster } from '../../context/quizMasterContext';
//UTILS
import { handleSignOut } from '../../utils/firebaseHelpers';
//COMPONENTS
import { 
    TextElement, 
    ButtonComponent 
} from '../../components/BaseComponents';
import PageContainer from '../../components/PageComponents/PageContainer';

const useStyles = makeStyles((theme) => ({
    icon: {
        height: 40,
        width: 40
    },
    card: {
        width: '80%',
        maxWidth: '400px',
        backgroundColor: theme.palette.transparent.main,
        border: theme.borders.medium
    },
    grid: {
        width: '90vw',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}))

function profile() {

    const router = useRouter();
    
    const { userData } = useQuizMaster();
    const user = userData.uid
    const { loading, isAuthenticated } = useAuth();

    const classes = useStyles();

    async function signOut(){
        await handleSignOut()
        router.push('/')
    }

    //AUTHENTICATION
    if(loading){
        return(
        <>Loading...</>
        );
    };
    
    if(isAuthenticated === false) {
        router.push('/login');
        return <>You aren't logged in.</>
    };

    return (
        <PageContainer user={user}>
            <Grid 
            className={classes.grid} 
            container
            justify="flex-start"
            >
                <Card className={classes.card}>
                    <CardContent>
                        <FaceRounded className={classes.icon}/>
                        <TextElement>User: {userData.email}</TextElement>
                    </CardContent>
                    <CardActions>
                        <ButtonComponent onClick={signOut}>Sign out</ButtonComponent>
                    </CardActions>
                </Card>
            </Grid>
        </PageContainer>
    );
}

export default profile;