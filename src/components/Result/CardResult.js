import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles({
    root: {
        marginTop: 30,
        width: '50%'
    },

    titulo: {
        color: 'white',
    },

    cabezera: {
        backgroundColor: '#000000',
    }
});


export default function CardResult(props){

    const classes = useStyles();

    return(
        <Card className={classes.root}>
            <CardContent className={classes.cabezera}>
                <Typography variant="h6" className={classes.titulo}  >Resultado Conversión</Typography>
            </CardContent>
            <CardContent>
                <Typography color="textSecondary" component="p">El resultado de la conversión es el siguiente:</Typography>
                <Typography variant="h4" component="p">{props.importe} CLP = {props.conversion} {props.selected}</Typography>
            </CardContent>
        </Card>
    )
}