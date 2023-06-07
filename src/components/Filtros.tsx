
type Props = {
  filtro: string;
  setFiltro: (arg: string) => void;
}

const Filtros:React.FC<Props> = props => {
  return (
    <div className="filtros sombra contenedor">
       <form>
          <div className="campo">
            <label>Filtrar Gastos</label>
            <select
              value={props.filtro}
              onChange={e => props.setFiltro(e.target.value)}
            >
              <option value="">-- Seleccione --</option>
              <option value="ahorro">Ahorro</option>
              <option value="comida">Comida</option>
              <option value="casa">Casa</option>
              <option value="gastos">Gastos Varios</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
              <option value="subscripciones">Subscripciones</option>
            </select>
          </div>
       </form>
    </div>
  )
}

export default Filtros