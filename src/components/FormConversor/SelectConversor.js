import { MenuItem, TextField } from '@material-ui/core';
import React, { useState } from 'react';

export default function SelectConversor(props){

    const [currency, setCurrency] = useState("DOLAR")
    
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