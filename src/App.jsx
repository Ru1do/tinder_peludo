import React, { useState, useEffect } from "react";
import { Grid, Card, CardMedia, Button } from "@mui/material";

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
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {/* Columna de perros rechazados */}
        {perrosRechazados.map((perro) => (
          <Card key={perro} sx={{ maxWidth: 400, borderRadius: 3 }}>
            <CardMedia component="img" image={perro} alt="Perro" />
          </Card>
        ))}
      </Grid>
      <Grid item xs={4}>
        {/* Columna de perros candidatos */}
        <Card sx={{ maxWidth: 400, borderRadius: 3 }}>
          <CardMedia component="img" image={imagenPerro} alt="Perro" />
        </Card>
        <Grid container spacing={2} sx={{ mt: 2 }}>
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
      <Grid item xs={4}>
        {/* Columna de perros aceptados */}
        {perrosAceptados.map((perro) => (
          <Card key={perro} sx={{ maxWidth: 400, borderRadius: 3 }}>
            <CardMedia component="img" image={perro} alt="Perro" />
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};

export default PaginaPerros;
