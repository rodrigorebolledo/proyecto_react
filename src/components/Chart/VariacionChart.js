import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer} from 'recharts';
import Card from '@material-ui/core/Card';
import { makeStyles, Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';

//Styles
const useStyles = makeStyles({
    card: {
        margin: 15,
        width: '45%'
    }
});

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
                <ResponsiveContainer width='100%' aspect={4.0/3.0}>
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
            </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}