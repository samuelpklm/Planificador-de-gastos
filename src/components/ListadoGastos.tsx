import Gastos from "./Gastos";

type NewGasto = {
    nombre: string;
    cantidad: number;
    categoria: string;
    fecha: Date;
    id: string;
  }

type Props = {
    gastos: NewGasto[];
    setGasto: (arg: NewGasto) => void;
    eliminarGasto: (arg: string) => void;
    filtro: string;
    gastosFiltrados: NewGasto[];
}

const ListadoGastos:React.FC<Props> = props => {
  return (
    <div className="listado-gastos contenedor">
        

        {
          props.filtro ? 
          <>
            <h2>{Object.keys(props.gastosFiltrados).length > 0 ? 'Gastos' : 'No hay Gastos en esta categoria'}</h2>
            {(
              Object.keys(props.gastosFiltrados).length > 0 && props.gastosFiltrados.map(gasto => (
                <Gastos
                    key={gasto.id}
                    gasto={gasto}
                    setGasto={props.setGasto}
                    eliminarGasto={props.eliminarGasto}
                />
            ))
            )}
          </>
          :
          <>
            <h2>{Object.keys(props.gastos).length > 0 ? 'Gastos' : 'No hay gastos'}</h2>
            {(
              Object.keys(props.gastos).length > 0 && props.gastos.map(gasto => (
                <Gastos
                    key={gasto.id}
                    gasto={gasto}
                    setGasto={props.setGasto}
                    eliminarGasto={props.eliminarGasto}
                />
            )))}
          </>
        }

        

    </div>
  )
}

export default ListadoGastos