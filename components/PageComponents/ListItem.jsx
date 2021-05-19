import { makeStyles} from '@material-ui/core/styles';
import  Card  from '@material-ui/core/Card';
import  CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'; 
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main,
        padding: theme.spacing(2),
        maxWidth: '350px',
        margin: theme.spacing(2),
        border: theme.borders.medium,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        color: theme.palette.secondary.contrastText
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    edit: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(5),
        paddingBottom: theme.spacing(1),
        
    }, 
    editIcon: {
        height: 30,
        width: 30,
        color: theme.palette.secondary.contrastText,
    },
    deleteIcon: {
        height: 30,
        width: 30,
        color: theme.palette.warning.main,
    }
    })
)

export default function ListItem({
    title, 
    subTitle, 
    ariaLabelEdit, 
    ariaLabelDelete, 
    handleEdit, 
    handleDelete,
}){
    const classes = useStyles();

    return(
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {title}
                    </Typography>
                    {subTitle && <Typography variant="subtitle1">
                        {subTitle}
                    </Typography>}
                </CardContent>
            </div>
            <div className={classes.edit}>
                <IconButton aria-label={ariaLabelEdit} onClick={handleEdit}>
                    <EditIcon className={classes.editIcon}/>
                </IconButton>
                {handleDelete && <IconButton aria-label={ariaLabelDelete} onClick={handleDelete}>
                    <DeleteIcon className={classes.deleteIcon}/>
                </IconButton>}
            </div>
        </Card>
    )
}