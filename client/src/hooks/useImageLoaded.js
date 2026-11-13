import { useEffect, useState } from 'react';

/**
 * Precarga una imagen y devuelve true cuando terminó de cargar (o falló),
 * para mostrar un loader mientras tanto sin quedar colgado si la URL está rota.
 */
export default function useImageLoaded(src) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    setLoaded(false);

    const image = new Image();
    const finish = () => {
      if (active) setLoaded(true);
    };
    image.onload = finish;
    image.onerror = finish;
    image.src = src;

    return () => {
      active = false;
    };
  }, [src]);

  return loaded;
}
