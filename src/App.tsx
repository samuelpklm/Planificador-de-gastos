import { useEffect, useState } from "react";
import { useLocalStorage } from 'usehooks-ts'

import Headers from "./components/Headers";
import IconoNuevoGasto from './assets/nuevo-gasto.svg'
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";

type NewGasto = {
  nombre: string;
  cantidad: number;
  categoria: string;
  fecha: Date;
  id: string;
}

function App() {
  const [presupuesto, setPresupuesto] = useLocalStorage<number>('presupuesto',0);
  const [modal, setModal] = useState<boolean>(false);
  const [animarModal, setAnimarModal] = useState<boolean>(false);
  const [gastos, setGastos] = useLocalStorage<NewGasto[]>('gastos',{} as NewGasto[]); 
  const [gasto, setGasto] = useState<NewGasto>({} as NewGasto); 
  const [monto, setMonto] = useState<number>({} as number);
  const [filtro, setFiltro] = useState<string>(''); 
  const [gastosFiltrados, setGastosFiltrados] = useState<NewGasto[]>({} as NewGasto[]); 

  useEffect( () => {
    if(filtro){
      const gastosFiltrados = gastos.filter( gastito => gastito.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro,gastos]) // eslint-disable-line react-hooks/exhaustive-deps


  useEffect( () => {
    if(Object.keys(gasto).length > 0){
      handleNuevoGasto();
    }
  }, [gasto])

  const handleNuevoGasto = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 500)
  }

  const guardarGasto = (gasto: NewGasto) =>{

    if(Object.keys(gastos).length > 0){
      setGastos([...gastos, gasto]);
    }else{
      setGastos([gasto]);
    }
  }

  const editarGasto = (id: string, gastoEditado: NewGasto) =>{

    const nuevaLista = gastos.map((gastoI) => {
      if(gastoI.id === id){
        return gastoEditado;
      }else{
        return gastoI;
      }
    })
    setGastos(nuevaLista);
  }

  const eliminarGasto = (id: string) =>{
     const nuevaLista = gastos.filter((gastoI) => gastoI.id !== id)
    setGastos(nuevaLista);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Headers 
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        gastos={gastos}
        setMonto={setMonto}
        setGastos={setGastos}
      />

      {
        presupuesto !== 0 && 
          (
            <>
              <main>
                <Filtros 
                  filtro={filtro}
                  setFiltro={setFiltro}
                />
                <ListadoGastos 
                  gastos={gastos}
                  setGasto={setGasto}
                  eliminarGasto={eliminarGasto}
                  filtro={filtro}
                  gastosFiltrados={gastosFiltrados}
                />
              </main>

            <div className="nuevo-gasto">
              <img 
                src={IconoNuevoGasto}
                alt="icono nuevo gasto"
                onClick={handleNuevoGasto}
              />
            </div>
            </>
          )
      }

      {modal && <Modal 
                    animarModal={animarModal} 
                    setModal={setModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gasto={gasto}
                    setGasto={setGasto}
                    setGastos={setGastos}
                    editarGasto={editarGasto}
                    monto={monto}
                    setMonto={setMonto}
                />}
      
    </div>
  )
}

export default App
