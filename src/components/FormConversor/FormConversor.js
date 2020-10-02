import { Grid, makeStyles } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import InputConversor from './InputConversor';
import SelectConversor from './SelectConversor';
import ButtonConversor from './ButtonConversor';
import Result from '../Result'
import axios from 'axios';
import SimpleChart from '../Chart';
import MultipleChart from '../Chart/MultipleChart';
import VariacionChart from '../Chart/VariacionChart';

  const useStyles = makeStyles({

    contenedor_form: {
        paddingTop: 30,
        backgroundColor: '#dedede'
    },


    contenedor_inputs: {
        width: "50%"
    },

    container_charts: {
        // marginTop: 30
    }



  });

  const currencies_items = [
    {
      value: 'UF',
    },
    {
      value: 'DOLAR',
    },

    {
        value: 'EURO'
    },
    {
        value: 'UTM',
    },

    {
        value: 'BITCOIN',
    },    
  ];


export default function FormConversor(props){
    //States
    const [currencies, setCurrencies] = useState();
    const [selected, setSelected] = useState("DOLAR");
    const [importe, setImporte] = useState();
    const [conversion, setConversion] = useState()
    const [hideResult, setHideResult] = useState(true);
    const [errors, setErrors] = useState({error: true})
    const [historico, setHistorico] = useState();
    const [multiHistorico, setMultiHistorico] = useState();
    //Style
    const classes = useStyles();
    //Functions
    const cargaApi = async () => {
         await axios.get("https://mindicador.cl/api")
        .then(res => {
            setCurrencies(res.data);
        })
        .catch(err => alert(err))
    }
    const handleSelected = (select) => {
        setSelected(select)
        handleHideResult(true)
        cargaSimpleHistorico(select.toLowerCase())

    }

    const handleInput = (value) => {
        setImporte(value);
        handleHideResult(true)
    }

    const handleButton = () => {
        if(errors.error === false){
            const divisa = currencies[selected.toLowerCase()];
            let valor_divisa = divisa.valor;
            if(divisa.unidad_medida === 'Dólar'){
                const valor_dolar = currencies["dolar"].valor
                setConversion(((importe/valor_dolar)/valor_divisa).toFixed(2))
                handleHideResult(false)

            } else{
                setConversion((importe/valor_divisa).toFixed(2));
                handleHideResult(false)
            }
        } else {
            alert("Por favor ingrese un importe")
        }
    }
    const handleHideResult = (value) => {
        setHideResult(value);
      }

    const validate = () => {
        if(importe === undefined || importe === '' || importe === '0'){

            setErrors({error: true})
        } else {
            setErrors({error: false})
        }
    }

    const cargaSimpleHistorico = async (valor) => {
        let formateado;
            await axios.get(`https://mindicador.cl/api/${valor}`)
            .then((res) => {
                if(res.data.unidad_medida === "Dólar"){
                    formateado = format_data(res.data.serie, false)
                }else{
                    formateado = format_data(res.data.serie, true)
                }
                
            }).catch((err)=>{
            console.log(`Se ha encontrado el siguiente error: ${err}`)

        });
        setHistorico(formateado)
        
        
    }

    const cargaMultipleAlzaBaja = async () => {
        let formateado;
        let array_variaciones_chart = [];
        let contador = 0
        currencies_items.forEach(async element => {
            let objeto = {name: 'Dólar', Alza: 5, Disminucion: -2}
            await axios.get(`https://mindicador.cl/api/${element.value.toLowerCase()}`)
            .then((res) => {
                    formateado = format_data(res.data.serie, true);
                    objeto['name'] = element.value;
                    let valor_maximo = 0;
                    let count_alzas = 0;
                    let count_bajas = 0;

                    formateado.forEach(element => {
                        if(valor_maximo === 0){
                            valor_maximo = element.valor;
                        }
                        if(element.valor > valor_maximo){
                            
                            valor_maximo = element.valor;
                            count_alzas += 1;

                        } else if (element.valor < valor_maximo){
                            count_bajas -= 1;
                        }

                    });

                    objeto['Alza'] = (count_alzas)
                    objeto['Disminucion'] = count_bajas
                    array_variaciones_chart.push(objeto);
                    contador += 1;
                    if(contador === currencies_items.length){
                        setMultiHistorico(array_variaciones_chart);
                    }
                
            }).catch((err)=>{
                console.log(`Se ha encontrado el siguiente error: ${err}`)
            });             
            
            });
        
            
            
        
    }
    
    const format_data = (serie, isClp) => {
        serie.sort((a, b) => {
            if(moment(a.fecha).diff(b.fecha, 'days') > 0) return 1
            if(moment(a.fecha).diff(b.fecha, 'days') < 0) return -1
            return 0
        });
        
        
        serie.forEach(element => {
            let format_date = moment(element.fecha).format('DD/MM/YYYY');
            element.fecha = format_date;

    });

        
        serie.forEach(element => {
            if(isClp === false){
                element.valor = element.valor * currencies.dolar.valor
            }
        });

        return serie;
    }
   

    //Effects
    useEffect(() => {
        cargaApi();
        cargaSimpleHistorico('dolar');
        cargaMultipleAlzaBaja()
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(validate,[importe])



    return(
        <Grid
        container
        direction="row"
        justify="center"
        className={classes.contenedor_form}
        >
            <Grid
                container
                direction="row"
                justify="space-between"
                className={classes.contenedor_inputs}

            >
                <InputConversor
                    id_input="importe_input"
                    label="Importe en CLP"
                    type="number"
                    handleInput={handleInput}
                />

                <SelectConversor
                    id_select="select_to"
                    label="Para"
                    helperText="Por favor selecciona una moneda."
                    selected={selected}
                    handleSelected ={handleSelected}
                    currencies={currencies_items}
                />

                <ButtonConversor
                    valor="Convertir"
                    handleButton={handleButton}
                />
            </Grid>
            {hideResult === false && <Result importe={importe} conversion={conversion} selected={selected}/>}
            <Grid
                container
                direction="row"
                justify="center"
                className={classes.container_charts}
            >
                {(historico !== undefined && currencies !== undefined && multiHistorico !== undefined ) &&
                
                <Grid
                    container
                    direction="row"
                    justify="center"
                >
                    <SimpleChart selected={selected} historico={historico} titulo={`Valor del ${selected.toLowerCase()} en CLP`}/>
                    <MultipleChart currencies={currencies} currencies_items={currencies_items} titulo={'Comparación valor divisas en CLP'}/>  
                    <VariacionChart historico={multiHistorico} titulo="Alzas y disminuciones divisas - Último mes."/>
                </Grid>
                } 

                
            </Grid>    
        </Grid>
    )
}