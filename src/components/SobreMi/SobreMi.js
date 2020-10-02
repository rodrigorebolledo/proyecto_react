import React from 'react';
import CardAboutMe from './CardAboutMe';
import { Grid, makeStyles } from '@material-ui/core';

//Styles
const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
        paddingTop: 30,
        backgroundColor: '#dedede',
        height: '100%'
    },
});

export default function SobreMi(){

    const classes = useStyles();
    return (
            <Grid
                container
                justify="center"
                alignItems="center"
                className={classes.root}
                
            >
                <CardAboutMe/>
            </Grid>
    )
}