import { useQuery } from "react-query";

const fetchImagenPerro = async () => {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  if (!response.ok) {
    throw new Error("No se pudo obtener la imagen del perro");
  }
  const data = await response.json();
  return data.message;
};

const usePerrosQuery = () => {
  const { isLoading, refetch, isRefetching, data: imagenPerro, error } = useQuery("imagenPerro", fetchImagenPerro);

  return { isLoading, refetch, isRefetching, imagenPerro, error };
};

export default usePerrosQuery;
