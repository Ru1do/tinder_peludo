import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Card, CardMedia, CardContent, Button, Badge, LinearProgress } from '@mui/material';

import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'
import BlockIcon from '@mui/icons-material/Block';
import './App.css';


const generarNombreAleatorio = () => {
  const caracteres = "abcdefghijklmnopqrstuvwxyz";
  let nombre = "";
  for (let i = 0; i < 6; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    nombre += caracteres.charAt(indice);
  }
  return nombre;
};

const PaginaPerros = () => {
  const [imagenPerro, setImagenPerro] = useState("");
  const [perrosAceptados, setPerrosAceptados] = useState([]);
  const [perrosRechazados, setPerrosRechazados] = useState([]);
  
  

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((respuesta) => respuesta.json())
      .then((datos) => setImagenPerro(datos.message));
  }, []);

  const aceptarPerro = () => {
    const nombrePerro = generarNombreAleatorio();
    const perro = {
      nombre: nombrePerro,
      imagen: imagenPerro
    };
    setPerrosAceptados([imagenPerro, ...perrosAceptados]);
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((respuesta) => respuesta.json())
      .then((datos) => setImagenPerro(datos.message));
  };

  const rechazarPerro = () => {
    setPerrosRechazados([imagenPerro, ...perrosRechazados]);
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((respuesta) => respuesta.json())
      .then((datos) => setImagenPerro(datos.message));
  };

  return (
    <Grid container spacing={2}>
      <Grid item={true} xs={12} xl={4} sx={{ maxHeight: '600px' }}>
  <Typography align="left" variant="h2">Candidatos</Typography>
  {/* Columna de perros candidatos */}
  {imagenPerro && (
    <Card sx={{ maxWidth: '100%', borderRadius: 3 }}>
      <CardMedia sx={{ pr: 10, pt: 3, height: 400, width: 450, objectFit: 'cover' }} component="img" image={imagenPerro} alt="Perro" />
      <CardContent>
        <Typography variant="h4" align="center">
          Nombre del Perro
        </Typography>
        <Typography
                  variant="body1"
                  component="p"
                  sx={{ color: '#555', mb: 2 }}>
                  Salgamos!! 
                </Typography>
        <Grid container justifyContent="center">
          <Grid item>
            <Tooltip title="Rechazar">
              <IconButton
                onClick={rechazarPerro}
                sx={{ borderRadius: '20px', color: 'red', width: 64, height: 64 }}
              >
                <BlockIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Aceptar">
              <IconButton
                onClick={aceptarPerro}
                sx={{ borderRadius: '20px', color: 'red', width: 64, height: 64 }}
              >
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )}
</Grid>

        
      <Grid item={true} xs={6} xl={4} sx={{ overflowY: 'scroll', maxHeight: 800 }} >
        <Typography align="left" variant="h2">Aceptados</Typography>
        {/* Columna de perros aceptados */}
        {perrosAceptados.map((perro) => (
          <Card key={perro} sx={{ maxWidth: 300 }}>
                  <CardMedia sx={{ pr: 10, pt: 3, height: 400, width: 450, objectFit: 'cover' }} component="img" image={perro} alt="Perro" />
                  <Typography
                  variant="body1"
                  component="p"
                  sx={{ color: '#555', mb: 2 }}>
                  Salgamos!! 
                </Typography>
          </Card>
        ))}
      </Grid>

      <Grid item={true} xs={6} xl={4} sx={{ overflowY: 'scroll', maxHeight: 800 }}>
        <Typography align="left" variant="h2">Rechazados</Typography>
        {/* Columna de perros rechazados */}
        {perrosRechazados.map((perro) => (
          <Card key={perro} sx={{ maxWidth: 400, borderRadius: 3 }}>
         <CardMedia sx={{ pr: 10, pt: 3, height: 400, width: 450, objectFit: 'cover' }} component="img" image={perro} alt="Perro" />
         <Typography
                  variant="body1"
                  component="p"
                  sx={{ color: '#555', mb: 2 }}>
                  Salgamos!! 
                </Typography>

          </Card>
        ))}
      </Grid>
    </Grid>
  );
};

export default PaginaPerros;
