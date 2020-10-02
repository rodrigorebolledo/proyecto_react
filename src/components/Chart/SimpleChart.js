import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from '@material-ui/core/Card';
import { makeStyles, Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
const useStyles = makeStyles({
    card: {
        margin: 15,
        maxWidth: 800
    }
});

export default function SimpleChart(props){

    const name_line = `Valor ${props.selected.toLowerCase()}`
    const classes = useStyles();
    return(
        <Card
            className={classes.card}
        >
            <CardContent>
                <Typography component="h5" variant="h5">
                    {props.titulo}
                </Typography>
            </CardContent>
            <CardContent>
                <LineChart width={600} height={300} data={props.historico.slice(0,5)}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="fecha"/>
                    <YAxis type="number" domain={['dataMin', 'dataMax']}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('es-CL').format(value)} />
                    <Legend />
                    <Line type="monotone" dataKey="valor" name={name_line} stroke='#000000' strokeDasharray="3 4 5 2" />
                </LineChart>
            </CardContent>
        </Card>
    )
}