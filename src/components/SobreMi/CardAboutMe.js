import { CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import React from 'react';

const useStyles = makeStyles({
    root: {
        maxWidth: '30%',
        ['@media (max-width:1100px)']:{ // eslint-disable-line no-useless-computed-key
            maxWidth: '60%'
        },
        ['@media (max-width:800px)']:{ // eslint-disable-line no-useless-computed-key
            maxWidth: '75%'
        },
        ['@media (max-width:500px)']:{ // eslint-disable-line no-useless-computed-key
            maxWidth: '90%'
        },
    },
    media: {
        height: 350,
    },



});

export default function CardAboutMe(props){
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image="https://i.imgur.com/UOAKaFZ.jpg"/>
            </CardActionArea>
            
            <CardContent>
                <Typography gutterBottom variant="h4" component="h2" color="inherit" >Rodrigo Rebolledo</Typography>
                <Typography gutterBottom variant="body1" color="textPrimary">Ingeniero informático - FULLSTACK</Typography>
                <Typography align="justify" variant="body1" color="textSecondary">Me considero un apasionado de la informática. A muy temprana edad comencé mi acercamiento a las tecnologías. Llegado su momento esto me hizo tomar una decisión respecto
                    a mi futuro laboral, estudiar ingeniería informática. Una carrera que me apasiona profundamente.
                    Hoy en día me encuentro terminando la carrera, en busca de perfeccionar mis habilidades
                    y aportar mucho con mis ideas y soluciones. 
                </Typography>
            </CardContent>
        </Card>
    )
}