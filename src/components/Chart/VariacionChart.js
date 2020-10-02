import React, {useEffect, useState} from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
  } from 'recharts';
import Card from '@material-ui/core/Card';
import { makeStyles, Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
const useStyles = makeStyles({
    card: {
        margin: 15
    }
});
// const data = [
//     {
//       name: 'DOLAR', Alza: 29, Disminucion: 1
//     },
//     {
//       name: 'UF', Alza: 29, Disminucion: 1
//     },
//     {
//       name: 'EURO', Alza: 0, Disminucion: 13
//     },
//     {
//       name: 'UTM', Alza: 19, Disminucion: 3
//     }
//   ];


export default function VariacionChart(props){
  
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
                <BarChart
                    width={500}
                    height={300}
                    data={props.historico}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="Alza" name="Cantidad de Alzas" fill="#454545" />
                <Bar dataKey="Disminucion" name="Cantidad de Disminuciones" fill="#969696" />

            </BarChart>
            </CardContent>
        </Card>
    )
}