import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  Typography,
  TextField,
} from "@mui/material";


const GeneradorCodigo = () => {
  const [codigo, setCodigo] = useState('');

  const generarCodigo = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let nuevoCodigo = '';
    for (let i = 0; i < 6; i++) {
      nuevoCodigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    setCodigo(nuevoCodigo);
  }

  useEffect(() => {
    generarCodigo();
  }, []);

  return codigo;
}

const obtenerImagenes = async () => {
  const response = await axios.get("https://dog.ceo/api/breeds/image/random/3");
  return response.data.message;
};

const App = () => {
  const [imagenes, setImagenes] = useState([]);
  const [perrosRechazados, setPerrosRechazados] = useState([]);
  const [perrosCandidatos, setPerrosCandidatos] = useState([]);
  const [perrosAceptados, setPerrosAceptados] = useState([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  
  
  useEffect(() => {
    const obtenerTodasLasImagenes = async () => {
      const imagenesPorColumna = 3;
      const columnas = 3;
      const nuevasImagenes = [];
      
      for (let i = 0; i < columnas; i++) {
        const columnaNueva = [];
        for (let j = 0; j < imagenesPorColumna; j++) {
          const imagenes = await obtenerImagenes();
          columnaNueva.push(...imagenes);
        }
        nuevasImagenes.push(columnaNueva);
      }
      
      setImagenes(nuevasImagenes);
      setImagenSeleccionada(nuevasImagenes[0][0]);
    }
    
    obtenerTodasLasImagenes();
  }, []);
  
  return (
    <Box display="flex" justifyContent="center" alignItems={"flex-start"}>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Typography variant="h1" align="center" gutterBottom>Tinder Peludo</Typography>
          <Typography variant="h3" align="Left">Rechazados</Typography>
        <List>
        {perrosRechazados.map((perro) => (
          <ListItem key={perro.id}>
            <Typography>{perro.nombre}</Typography>
          </ListItem>
        ))}
      </List>
        
        <Typography variant="h3" align="center"gutterBottom>Candidatos</Typography>
        
        <List>
        {perrosCandidatos.map((perro) => (
          <ListItem key={perro.id}>
            <Typography>{perro.nombre}</Typography>
          </ListItem>
        ))}
      </List>

        <Typography variant="h3" align="Right">Aceptados</Typography>
        
        </Grid>

        {imagenes.map((columna, i) => (
          <Grid item xs={12} md={4} key={i}>
            {columna.map((imagen) => (
              <Card key={imagen}>
                <CardMedia component="img" height="200" image={imagen} />
                <CardContent>
                  <Typography variant="h5"><GeneradorCodigo /></Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default App;