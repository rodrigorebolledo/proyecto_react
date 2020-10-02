import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    button: {
        backgroundColor: '#222327',
        '&:hover': {
            backgroundColor: '#454545'
        },
        color: '#fff'
    }
});
export default function ButtonConversor(props){
    const classes = useStyles();
    return(
        <Button variant="contained" className={classes.button} onClick={props.handleButton}>{props.valor}</Button>
    )
}