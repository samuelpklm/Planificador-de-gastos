import { useEffect, useState } from 'react';
import CerrarBtn from '../assets/cerrar.svg'
import { generaId } from '../helpers';

type NewGasto = {
  nombre: string;
  cantidad: number;
  categoria: string;
  fecha: Date;
  id: string;
}

type Props = {
  setModal: (booleano: boolean) => void;
  animarModal: boolean;
  setAnimarModal: (booleano: boolean) => void;
  guardarGasto: (parametro: NewGasto) => void;
  gasto: NewGasto;
  setGasto: (arg: NewGasto) => void;
  setGastos: (arg: NewGasto[]) => void;
  editarGasto:(arg: string, arg2: NewGasto) => void;
  monto: number;
  setMonto: (arg: number) => void;
}

const Modal:React.FC<Props> = props => {

  const [nombreGasto, setNombreGasto] = useState<string>('')
  const [cantidadGasto, setCantidadGasto] = useState<string>('')
  const [nombreCategoria, setNombreCategoria] = useState<string>('')
  const [dateEntrada, setDateEntrada] = useState<string>('')
  const [maximo, setMaximo] = useState<number>(props.monto)
  

   useEffect( () => {
    
     if(Object.keys(props.gasto).length > 0){
      setNombreGasto(props.gasto.nombre);
      setCantidadGasto(props.gasto.cantidad.toString());
      setNombreCategoria(props.gasto.categoria);
      setDateEntrada(props.gasto.fecha.toString());
     
      setMaximo(+props.gasto.cantidad + props.monto);
     } 
   }, [props.gasto]) // eslint-disable-line react-hooks/exhaustive-deps

  const limpiarFormulario = () =>{
    setNombreGasto('');
    setCantidadGasto('');
    setNombreCategoria('');
    setDateEntrada('');
    setMaximo(props.monto);
    props.setGasto({} as NewGasto);
  }

  const ocultarModal = () => {
    props.setAnimarModal(false);

    setTimeout(() => {
      props.setModal(false);
      limpiarFormulario();
    }, 500)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      nombre: {value: string};
      cantidad: {value: number};
      categoria: {value: string};
      fecha: {value: Date};
    };

    const objeto = {
      nombre: target.nombre.value,
      cantidad: target.cantidad.value,
      categoria: target.categoria.value,
      fecha: target.fecha.value,
      id: props.gasto.id ? props.gasto.id : generaId() 
    }

    if(props.gasto.id){
      props.editarGasto(props.gasto.id, objeto);
    }else{
      props.guardarGasto(objeto);
    }

    
    ocultarModal();
    
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img 
          src={CerrarBtn}
          alt="cerrar modal"
          onClick={ocultarModal}
        />
      </div>

      <form 
        className={`formulario ${props.animarModal ? 'animar' : 'cerrar'}`}
        onSubmit={handleSubmit}  
      >
        <legend> {Object.keys(props.gasto).length > 0 ? 'Editar Gasto': 'Nuevo Gasto'} </legend>

        <div className='campo'>
          <label htmlFor='nombre'>Nombre Gasto</label>
          <input 
            className='letras'
            id="nombre"
            name='nombre'
            value={nombreGasto}
            onChange={(e) => setNombreGasto(e.target.value)}
            type="text"
            placeholder='Añade el nombre del gasto'
            required
            onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Ingrese el nombre del gasto')}
            onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
          />
        </div>

        <div className='campo'>
          <label htmlFor='cantidad'>Cantidad</label>
          <input 
            className='letras'
            id="cantidad"
            name='cantidad'
            type="number"
            value={cantidadGasto}
            onChange={(e) => setCantidadGasto(e.target.value)}
            placeholder='Añade la cantidad del gasto: ej. 300'
            max={maximo}
            required
            onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Ingrese una Cantidad Correcta')}
            onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
          />
        </div>

        <div className='campo'>
          <label htmlFor='fecha'>Fecha</label>
          <input 
            id="fecha"
            name='fecha'
            type="date"
            value={dateEntrada.toString()}
            onChange={(e) => setDateEntrada(e.target.value)}
            required
            onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Ingrese la fecha del gasto')}
            onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
          />
        </div>

        <div className='campo'>
          <label htmlFor='categoria'>Categoria</label>
          <select id="categoria" name='categoria' required 
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
            onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Ingrese la categoria del gasto')}
            onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
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

        <input 
          type="submit"
          value={Object.keys(props.gasto).length > 0 ? 'Guardar Cambios': 'Añadir Gasto'}
        />
      </form>
    </div>
  )
}

export default Modal