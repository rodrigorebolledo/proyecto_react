import { MenuItem, TextField, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

//Styles
const useStyles = makeStyles({
    root: {
      '& .MuiFormLabel-root.Mui-focused':{
        color: '#000'
      },
  }
  });


export default function SelectConversor(props){
    //States
    const classes = useStyles();
    const [currency, setCurrency] = useState("DOLAR")
    

    //Functions
    const handleCurrency = (event) => {
        setCurrency(event.target.value)
        props.handleSelected(event.target.value)
    }

    return(
        <TextField
        id={props.id_select}
        select
        label={props.label}
        value={currency}
        onChange={handleCurrency}
        className={classes.root}
        helperText={props.helperText}
        required
      >
          {props.currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.value}
                </MenuItem>
          ))}
      </TextField>
    )
}