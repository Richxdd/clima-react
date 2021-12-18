
import { useEffect, useState } from 'react'
import Clima from './components/Clima'
import Error from './components/Error'
import Formulario from './components/Formulario'
import Header from './components/Header'

  const App = () => {

    const [busqueda,setBusqueda]= useState({
      ciudad:'',
      pais:''
  })

  const [consultar,setConsultar]=useState(false)
  const [resultado,setResultado]=useState({})
  const [error,setError]=useState(false)

  const {ciudad,pais}=busqueda

  useEffect(()=>{
      if(consultar){
        const consultarApi = async () =>{
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=9507e6da10aa32eaafea1de6246b5be5`
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
          setResultado(resultado);
          setConsultar(false)

          if(resultado.cod==='404'){
            setError(true)
          }else{
            setError(false)
          }


        }
        consultarApi()
      }
      
    },[consultar])

    let componente

    if(error){
      componente=<Error mensaje='No hay resultados'/>
    }else{
      componente=<Clima resultado={resultado}/>
    }

  return (
    <div>
        <Header titulo='Clima React App'/>
        <div className='contenedor-form'>
            <div className='container'>
                <div className='row'>
                    <div className='col m6 s12'>
                      <Formulario
                        busqueda={busqueda}
                        setBusqueda={setBusqueda}
                        setConsultar={setConsultar}
                      />
                    </div>
                    <div className='col m6 s12'>
                        {componente}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default App
