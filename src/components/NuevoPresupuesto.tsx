type Props = {
  presupuesto: number;
  setPresupuesto: (numero: number) => void;
}

const NuevoPresupuesto:React.FC <Props> = props => {

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      presupuesto: {value: number};
    };

    if(+target.presupuesto.value === 0){
      alert("Por favor inserte un presupesto");
    }else{
      props.setPresupuesto(+target.presupuesto.value);
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
        <form className="formulario" onSubmit={handleSubmit}>
          <div className="campo">
            <label>Definir Presupuesto</label>
            <input 
              className="nuevo-presupuesto"
              name="presupuesto"
              type="number"
              step="any"
              min={0}
              placeholder="Añade tu presupuesto"
            />
          </div>

          <input type="submit" value="Añadir"/>
        </form>
    </div>
  )
}

export default NuevoPresupuesto