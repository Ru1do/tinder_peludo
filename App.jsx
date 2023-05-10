import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardMedia, Button, Typography } from "@mui/material";

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
    setPerrosAceptados([...perrosAceptados, imagenPerro]);
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((respuesta) => respuesta.json())
      .then((datos) => setImagenPerro(datos.message));
  };

  

  const rechazarPerro = () => {
    setPerrosRechazados([...perrosRechazados, imagenPerro]);
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((respuesta) => respuesta.json())
      .then((datos) => setImagenPerro(datos.message));
  };

  return (
    
    <Container maxWidth="md" sx={{ marginBottom: "2rem" }}>
    <Grid container spacing={4} justifyContent="space-between" alignItems="stretch">
      <Grid item xs={4} sx={{ order: 1 }}>
        <Typography align="left" variant="h2">Aceptados</Typography>
        {/* Columna de perros rechazados */}
        {perrosRechazados.map((perro) => (
          <Card key={perro} sx={{ maxWidth: 300, borderRadius: 4 }}>
            <CardMedia component="img" image={perro} alt="Perro" sx={{ maxWidth: "100%", height: "auto" }} />
          </Card>
        ))}
      </Grid>
      <Grid item xs={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography align="center" variant="h2">Candidatos</Typography>
        {/* Columna de perros candidatos */}
        <Card sx={{ maxWidth: 300, borderRadius: 4 }}>
          <CardMedia component="img" image={imagenPerro} alt="Perro" sx={{ maxWidth: "100%", height: "auto" }} />
        </Card>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Button variant="contained" color="secondary" onClick={rechazarPerro}>
              Rechazar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={aceptarPerro}>
              Aceptar
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4} sx={{ order: 2 }}>
        <Typography align="left" variant="h2">Rechazados</Typography>
        {/* Columna de perros aceptados */}
        {perrosAceptados.map((perro) => (
          <Card key={perro} sx={{ maxWidth: 300, borderRadius: 4 }}>
            <CardMedia component="img" image={perro} alt="Perro" sx={{ maxWidth: "100%", height: "auto" }} />
          </Card>
        ))}
      </Grid>
    </Grid>
  </Container>
  
);
        }
export default PaginaPerros;
