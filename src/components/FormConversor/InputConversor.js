import { makeStyles, TextField } from '@material-ui/core';
import React from 'react';

//Styles
const useStyles = makeStyles({
  root: {
    '& .MuiFormLabel-root.Mui-focused':{
      color: '#000'
    },

}
});


export default function InputConversor(props){

  const classes = useStyles();


    return(
        <TextField
        id={props.id_input}
        label={props.label}
        type={props.type}
        autoComplete={props.autoComplete}
        className={classes.root}
        onChange={(e) => props.handleInput(e.target.value)}
        required
      />
    )
}