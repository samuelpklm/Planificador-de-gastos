export const generaId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  export const formatearFecha = (fecha: Date) => {
    const fechaNueva = new Date(fecha);

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    };

    return fechaNueva.toLocaleDateString('es-ES', dateOptions);
  }