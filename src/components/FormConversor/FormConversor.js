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

  const useStyles = makeStyles({

    contenedor_form: {
        marginTop: 30,
    },


    contenedor_inputs: {
        width: "50%"
    },

    container_charts: {
        marginTop: 30
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
    
    const format_data = (serie, isClp) => {
        serie.sort((a, b) => {
            if(moment(a.fecha).diff(b.fecha, 'days') > 0) return -1
            if(moment(a.fecha).diff(b.fecha, 'days') < 0) return 1
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
                {(historico !== undefined && currencies !== undefined) &&
                <Grid
                    container
                    direction="row"
                    justify="center"
                >
                    <SimpleChart selected={selected} historico={historico} titulo={`Valor del ${selected} en CLP`}/>
                    <MultipleChart currencies={currencies} currencies_items={currencies_items} titulo={'Comparación valor divisas en CLP'}/>  
                </Grid>
                } 
            </Grid>    
        </Grid>
    )
}