import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


//Styles
const useStyles = makeStyles({
  table: {
      minWidth: 580
  },
  container_table: {
      margin: 15,
  }
});

//Constantes
const conversionesList = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000, 50000];


export default function ConversionesTable(props) {

    const [rows, setRow] = useState([]);

    const createRows = () => {
        let counter = 0
        let rows_create = []
        if(props.selected === "BITCOIN"){
            console.log(props.valorDolar)
            console.log(props.selectedValue)
            if(props.tipo === "clp"){
                conversionesList.forEach(element => {
                    let objeto = {c_moneda: element, equivalencia: Intl.NumberFormat('es-CL').format(element/(props.selectedValue*props.valorDolar)) };
                    rows_create.push(objeto) ;
                    counter += 1;
                });
                if(counter === conversionesList.length){
                    setRow(rows_create);
                }
            }else if (props.tipo === "divisa") {
                conversionesList.forEach(element => {
                    let objeto = {c_moneda: element, equivalencia: Intl.NumberFormat('es-CL').format(element*(props.selectedValue*props.valorDolar)) };
                    rows_create.push(objeto) ;
                    counter += 1;
                });
                if(counter === conversionesList.length){
                    setRow(rows_create);
                }
            }
        } else {
            if(props.tipo === "clp"){
                conversionesList.forEach(element => {
                    let objeto = {c_moneda: element, equivalencia: element/props.selectedValue };
                    rows_create.push(objeto) ;
                    counter += 1;
                });
                if(counter === conversionesList.length){
                    setRow(rows_create);
                }
            }else if (props.tipo === "divisa") {
                conversionesList.forEach(element => {
                    let objeto = {c_moneda: element, equivalencia: Intl.NumberFormat('es-CL').format(element*props.selectedValue) };
                    rows_create.push(objeto) ;
                    counter += 1;
                });
                if(counter === conversionesList.length){
                    setRow(rows_create);
                }
            }
        }
        
    }

  useEffect(createRows,[props.selected, props.selectedValue]);
  const classes = useStyles();

  return (
    <Grid
        className={classes.container_table}
    >
        <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell >{props.tipo === "clp" ? 'CLP' : props.selected}</TableCell>
                <TableCell align="right">{props.tipo === "clp" ? props.selected : 'CLP' }</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow>
                <TableCell>{row.c_moneda} </TableCell>
                    <TableCell align="right">{row.equivalencia}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Grid>
  );
}
