import { formatearFecha } from "../helpers";

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import IconoAhoroo from '../assets/icono_ahorro.svg'
import IconoCasa from '../assets/icono_casa.svg'
import IconoComida from '../assets/icono_comida.svg'
import IconoGasto from '../assets/icono_gastos.svg'
import IconoOcio from '../assets/icono_ocio.svg'
import IconoSalud from '../assets/icono_salud.svg'
import IconoSubcripciones from '../assets/icono_suscripciones.svg'


const diccionarioIconos:  { [id: string]: string; }= {
  "ahorro": IconoAhoroo, 
  "comida": IconoComida,
  "casa":   IconoCasa,
  "gastos": IconoGasto,
  "ocio":   IconoOcio,
  "salud":  IconoSalud,
  "subscripciones": IconoSubcripciones
}

type NewGasto = {
    nombre: string;
    cantidad: number;
    categoria: string;
    fecha: Date;
    id: string;
  }

type Props = {
    gasto: NewGasto;
    setGasto: (arg: NewGasto) => void;
    eliminarGasto: (arg: string) => void;
}

const Gastos:React.FC<Props> = props => {

  const leadingActions = () => (
      <LeadingActions>
        <SwipeAction onClick={() => props.setGasto(props.gasto)}>
          Editar
        </SwipeAction>
      </LeadingActions>
    );
    

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => props.eliminarGasto(props.gasto.id)}
        destructive={true}
        >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra" >
          <div className="contenido-gasto" >
            {/* {typeof props.gasto.categoria} */}
              <img 
                src={diccionarioIconos[props.gasto.categoria]}
                alt="Icono Gasto"
                style={{pointerEvents: 'none'}}
              /> 
            <div className="descripcion-gasto">
              <p className="categoria">{props.gasto.categoria}</p>
              <p className="nombre-gasto">{props.gasto.nombre}</p>
              <p className="fecha-gasto">
                Agregado el: {''}
                <span>{formatearFecha(props.gasto.fecha)}</span>  
              </p>
            </div>
          </div>

            <p className="cantidad-gasto" >{props.gasto.cantidad} Bs</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gastos