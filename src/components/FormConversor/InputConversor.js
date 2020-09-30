import { TextField } from '@material-ui/core';
import React from 'react';

export default function InputConversor(props){




    return(
        <TextField
        id={props.id_input}
        label={props.label}
        type={props.type}
        autoComplete={props.autoComplete}
        onChange={(e) => props.handleInput(e.target.value)}
        required
      />
    )
}