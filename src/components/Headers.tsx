import ControlPresupuesto from "./ControlPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto"

type NewGasto = {
  nombre: string;
  cantidad: number;
  categoria: string;
  fecha: Date;
  id: string;
}


type Props = {
  presupuesto: number;
  setPresupuesto: (numero: number) => void;
  gastos: NewGasto[];
  setMonto: (arg: number) => void;
  setGastos: (arg: NewGasto[]) => void;
}


const Headers:React.FC<Props> = props => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>

        {props.presupuesto !== 0 
          ?
          <ControlPresupuesto 
            presupuesto={props.presupuesto} 
            gastos={props.gastos} 
            setMonto={props.setMonto}
            setPresupuesto={props.setPresupuesto}
            setGastos={props.setGastos}
          />
          :
          <NuevoPresupuesto 
           presupuesto={props.presupuesto}
           setPresupuesto={props.setPresupuesto}
        />}

        
        </header>
  )
}

export default Headers