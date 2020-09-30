import React from 'react';
import CardAboutMe from './CardAboutMe';
import { Grid, makeStyles, Typography } from '@material-ui/core';


const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
        marginTop: 30
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