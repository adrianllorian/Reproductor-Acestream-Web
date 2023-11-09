import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'; // Importa la biblioteca axios


// Put any other imports below so that CSS from your
// components takes precedence over default styles.


export default function Inicio() {

    const serverURL = 'http://raspberrypi.home:8801/guardarCanales'; // Declaración de una variable para la URL del servidor
    const serverAcestreamPredeterminado = 'raspberrypi.home:6878'


    const [textValue, setTextValue] = useState(''); // Estado local para almacenar el valor del textarea
    const [dataList, setDataList] = useState([]); // Estado para almacenar los objetos de datos


    const handleTextAreaChange = (event) => {
        const newValue = event.target.value;
        setTextValue(newValue); // Actualiza el estado con el valor del textarea
      };
    
      /*
        const handlePrintContent = () => {
        console.log('Contenido del textarea:', textValue); // Imprime el contenido del textarea cuando se pulsa el botón
      };
      */
      const [isCasaActive, setIsCasaActive] = useState(true);
      const [textIp, setTextIp] = useState(serverAcestreamPredeterminado);
    
      const handleCasaChange = () => {
        setIsCasaActive(true);
        setTextIp(serverAcestreamPredeterminado);
      };
    
      const handleOtroServidorChange = () => {
        setIsCasaActive(false);
        setTextIp('');
      };

      const handleAddData = () => {
        // Separa las líneas del texto del textarea por salto de línea
        const lines = textValue.split('\n');
    
        const dataObjects = [];
    
        for (let i = 0; i < lines.length; i += 2) {
          if (i + 1 < lines.length) {
            const newData = {
              nombreCanal: lines[i],
              channelId: lines[i + 1],
              ipServidor: isCasaActive ? serverAcestreamPredeterminado : textIp
            };
            dataObjects.push(newData);
          }
        }
    
        // Crea una nueva lista vacía y luego agrega los objetos a ella
  const newDataList = [...dataObjects];

  // Establece el estado de dataList con la nueva lista newDataList
  setDataList(newDataList);
      };

      const handleSendToServer = () => {
        // Realiza una solicitud POST al servidor con la lista dataList

        const jsonData = JSON.stringify(dataList); // Convierte dataList a formato JSON
               
        axios.post(serverURL, jsonData, {
          headers: {
            'Content-Type': 'application/json' // Indica que estás enviando datos JSON
          }
        })
          .then((response) => {
            console.log('Éxito: Los datos se han enviado al servidor', response.data);
            if(response){
              alert('Guardado con exito')
            }
            else{
              console.error('Error al enviar datos al servidor');
            }
            
          })
          .catch((error) => {
            console.error('Error al enviar datos al servidor', error);
          });
      };

  return (
    <div className='container'>
  <div className='d-flex justify-content-center'>
    <h3>Mi TV</h3>
  </div>
  <div className='row mt-4'>
    <div className='col-lg-4 col-12'> {/* Utilizamos col-lg-4 para 3 columnas en ordenador y col-12 para 1 columna en móvil */}
      <div className='row'>
        <h4 className='d-flex justify-content-center'>Añadir Enlaces</h4>
      </div>
      <div className='row mt-3'>
        <div className="form-group">
          <textarea className="form-control" id="textAreaEnlace" rows="13" value={textValue} onChange={handleTextAreaChange}></textarea>
        </div>
      </div>
    </div>
    <div className='col-lg-4 col-12'> {/* Utilizamos col-lg-4 para 3 columnas en ordenador y col-12 para 1 columna en móvil */}
      <div className='row'>
        <h4 className='d-flex justify-content-center mt-lg-0 mt-3'>Elegir Servidor</h4>
      </div>
      <div className='row mt-3'>
        <div className='d-flex justify-content-center'>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1"
                checked={isCasaActive}
                onChange={handleCasaChange}></input>
            <label className="form-check-label" htmlFor="inlineCheckbox1">Casa</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox2"
                checked={!isCasaActive}
                onChange={handleOtroServidorChange}></input>
                 <label className="form-check-label" htmlFor="inlineCheckbox2">Otro Servidor</label>
            <input className="form-control" type="text" id="inlineCheckbox2"
                placeholder='localhost:8000'
                value={isCasaActive ? '' : textIp}
                onChange={(e) => setTextIp(e.target.value)}></input>
          </div>
        </div>
      </div>
      <div className='row mt-5'>
        <h4 className='d-flex justify-content-center'>Listar enlaces</h4>
        <p  className='mt-2 list-unstyled text-center font-monospace bg-dark text-white'>{isCasaActive ? serverAcestreamPredeterminado : textIp}</p>
        <ul className='mt-2 list-unstyled text-center font-monospace bg-dark text-white'>
          {dataList.map((data, index) => (
            <li key={index}>
              Nombre de Canal: {data.nombreCanal} ChannelId: {data.channelId}
            </li>
          ))}
          </ul>
      </div>
      <div className='row mt-3'>
        <div className='d-flex justify-content-center'>
          <button type="button" className="btn btn-success"  onClick={handleAddData}>Listar Enlaces</button>
        </div>
      </div>
    </div>
    <div className='col-lg-4 col-12'> {/* Utilizamos col-lg-4 para 3 columnas en ordenador y col-12 para 1 columna en móvil */}
      <div className='row'>
        <h4 className='d-flex justify-content-center mt-lg-0 mt-3'>Comfirmar Enlaces</h4>
      </div>
      <div className='row mt-3'>
        <div className='d-flex justify-content-center'>
          <button type="button" className="btn btn-success" onClick={handleSendToServer}>Enviar al Servidor</button>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
