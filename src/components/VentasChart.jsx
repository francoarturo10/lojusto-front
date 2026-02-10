import { useEffect, useState } from "react";
import axios from "axios";

export function VentasChart(){
    const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/reportes/ventas-mensuales")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
        {data}
    </>
  )
}