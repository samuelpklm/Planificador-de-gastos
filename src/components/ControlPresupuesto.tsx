import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useEffect, useState } from "react";



type NewGasto = {
  nombre: string;
  cantidad: number;
  categoria: string;
  fecha: Date;
  id: string;
}

type Props = {
  presupuesto: number;
  gastos: NewGasto[];
  setMonto: (arg: number) => void;
  setPresupuesto: (arg: number) => void;
  setGastos: (arg: NewGasto[]) => void;
 }

const ControlPresupuesto:React.FC<Props>= props => {

  const [disponible, setDisponible] = useState<number>(0);
  const [gastado, setGastado] = useState<number>(0);
  const [porcentaje, setPorcentaje] = useState<number>(0); 

  const handleResetApp = () => {
    const result = confirm('Desea Reiniciar Presupuesto y Gastos?');

    if(result){
      props.setGastos({} as NewGasto[]);
      props.setPresupuesto(0);

    }
  }

  useEffect( () => {
    if(Object.keys(props.gastos).length > 0){
      const totalGastado = props.gastos.reduce((total, gasto) => +gasto.cantidad + +total, 0);
      
      const totalDisponible = +props.presupuesto - +totalGastado;

      setTimeout(() => {
        setPorcentaje((+totalDisponible * 100)/+props.presupuesto);
      }, 1000)

      setDisponible(totalDisponible);
      setGastado(totalGastado);
      props.setMonto(totalDisponible);
    } else{
      const totalDisponible = +props.presupuesto;
      setDisponible(totalDisponible);
      setGastado(0);
      setTimeout(() => {
        setPorcentaje(100);
      }, 1000)
    }
  } , [props.gastos]) // eslint-disable-line react-hooks/exhaustive-deps

 

  const formatearCantidad = (cantidad: number) => {
    return cantidad.toLocaleString('de-DE', {
      style: 'currency',
      currency: 'USD'
    })
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar 
          styles={buildStyles({
            pathColor: '#3B82F6',
            trailColor: '#F5F5F5',
            textColor: disponible === 0 ? 'red' : '#3B82F6'
          })}
          value={porcentaje}
          text={`${porcentaje.toFixed(2)}% Monto`}
        />
      </div>

      <div className="contenido-presupuesto">
          <button
            className='reset-app'
            type='button'
            onClick={handleResetApp}
          >
            Resetear App
          </button>
        <p>
          <span>
            Presupuesto: 
          </span> {formatearCantidad(props.presupuesto).slice(0,-1) + 'Bs'}
        </p>
        <p className={`${+disponible === 0 ? 'negativo': ''}`}>
          <span>
            Disponible: 
          </span> {formatearCantidad(disponible).slice(0,-1) + 'Bs'}
        </p>
        <p>
          <span>
            Gastado: 
          </span> {formatearCantidad(gastado).slice(0,-1) + 'Bs'}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto