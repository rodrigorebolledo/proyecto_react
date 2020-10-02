import React, { useEffect, useState } from 'react';
import {BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, Label, ResponsiveContainer} from 'recharts';
import Card from '@material-ui/core/Card';
import { makeStyles, Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
const useStyles = makeStyles({
  card: {
          margin: 15,
        },

  barStyle: {
    backgroundColor: '#000',
  }
  });


export default function SimpleChart(props){

    const [data, setData] = useState([])
    const classes = useStyles();
    const getArrayOfCurrencies = () => {
        const currencies_items = props.currencies_items;
        const currencies_array = []
        currencies_items.forEach(element => {
            if(props.currencies[element['value'].toLowerCase()].unidad_medida === "Pesos"){
              
                currencies_array.push(props.currencies[element['value'].toLowerCase()])
            }
            
        });
        setData(currencies_array);
    }
    
    
    
    useEffect(getArrayOfCurrencies,[]);




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
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="codigo">
            <Label value="Divisas" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis />
            <Tooltip formatter={(value) => new Intl.NumberFormat('es-CL').format(value)} />
            <Bar dataKey="valor" name="Valor monedas" fill="#454545"/>
          </BarChart>
        </CardContent>
      </Card>
    )
}