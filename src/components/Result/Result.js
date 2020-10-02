import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import CardResult from './CardResult';


const useStyles = makeStyles({
    container: {
       marginBottom: 15, 
    }
});

export default function Result(props){

    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
            justify="center"
            className={classes.container}
        >
            <CardResult importe={props.importe} conversion={props.conversion} selected={props.selected}/>
        </Grid>
    )
}