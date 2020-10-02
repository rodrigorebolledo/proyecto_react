import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
import { Button, makeStyles, Typography  } from '@material-ui/core';
import { Link } from "react-router-dom";

//Styles
const useStyles = makeStyles({
    grid_container: {
        marginTop: 10,
        marginBottom: 10,
    },

    titulo: {
        marginLeft: 20,
    },

    buttonContainer: {
        marginRight: 150,
    },

    app_bar: {
        backgroundColor: '#222327'
    }

});

export default function NavBar() {

    const classes = useStyles();
  
    return (
        <AppBar className={classes.app_bar} position="static">
          <Grid
            container
            direction="row"
            justify="space-between"
            className={classes.grid_container}
          >
            <Box
                className={classes.titulo}
            >
                <Typography variant="h6">
                    Conversor CLP
                </Typography>
            </Box>
            <Grid
                className={classes.buttonContainer}
            >
                <Button component={ Link } to="/" color="inherit">
                        Inicio
                    </Button>
                <Button component={ Link } to="/about-me" color="inherit">
                    Sobre Mi
                </Button>
            </Grid>
          </Grid>
        </AppBar>
    );
  }