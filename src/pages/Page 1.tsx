import { IonItemDivider, IonButton, IonItem, IonLabel, IonInput, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItemGroup, IonImg, IonThumbnail } from '@ionic/react';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';

function Genero() {
  const [nombre, setNombre] = useState("");
  const [genero, setGenero] = useState("");

  const predecirGenero = async () => {
    const response = await fetch(`https://api.genderize.io/?name=${nombre}`);
    const data = await response.json();
    setGenero(data.gender);
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" className='input' style={{ color: "black" }} placeholder='Digite un nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <button className='submit' onClick={predecirGenero}>Predecir género</button>
        {genero === "male" ?
          <img src="https://cdn.vox-cdn.com/thumbor/CH4xj8iJNrNFS0LsG8qtCJ56Nl0=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22538593/sonic_30th.jpg" alt="Niño" />
          :
          genero === "female" ?
            <img src="https://i.kym-cdn.com/photos/images/facebook/001/753/332/c5d" alt="Niña" />
            :
            null
        }

      </header>
    </div>
  );
}
function Edad() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleButtonClick = async () => {
    const response = await fetch(`https://api.agify.io/?name=${name}`);
    const data = await response.json();
    setAge(data.age);
  };

  let message, image;

  if (age === null) {
    message = "Ingrese un nombre para predecir la edad";
  } else if (age <= 35) {
    message = "Eres joven";
    image = <img width={870} src="https://previews.123rf.com/images/dolgachov/dolgachov1505/dolgachov150501741/40249487-la-gente-el-ocio-el-gesto-y-el-concepto-de-adolescente-grupo-de-amigos-adolescentes-felices-que.jpg" alt="Joven" />;
  } else if (age <= 60) {
    message = "Eres adulto";
    image = <img width={870} src="https://previews.123rf.com/images/gstockstudio/gstockstudio1401/gstockstudio140100310/25058215-colegas-del-asunto-cuatro-personas-en-ropa-formal-hablando-de-algo-mientras-est%C3%A1-de-pie-cerca-uno.jpg" alt="Adulto" />;
  } else {
    message = "Eres anciano";
    image = <img src="https://cuidadores.unir.net/images/mayores.png" alt="Anciano" />;
  }

  return (
    <div>
      <h1>Predecir Edad</h1>
      <input className='input' placeholder='Digite un nombre' type="text" value={name} onChange={handleNameChange} />
      <button className='submit' onClick={handleButtonClick}>Predecir</button>
      {age !== null && (
        <div>
          <p>{message}</p>
          <p>Edad: {age}</p>
          {image}
        </div>
      )}
    </div>
  );
}
function Universidades() {
  const [countryName, setCountryName] = useState("");
  interface University {
    name: string;
    domains: string[];
    web_pages: string[];
  }

  const [universities, setUniversities] = useState<University[]>([]);


  const handleCountryNameChange = (event: any) => {
    setCountryName(event.target.value);
  };

  const handleSearchUniversities = () => {
    fetch(`http://universities.hipolabs.com/search?country=${countryName}`)
      .then((response) => response.json())
      .then((data) => setUniversities(data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <label htmlFor="country-name-input">Ingrese el nombre de un país en inglés:</label>
      <input placeholder='Digite un pais en inglés' className='input' type="text" id="country-name-input" value={countryName} onChange={handleCountryNameChange} />

      <button className='submit' onClick={handleSearchUniversities}>Buscar universidades</button>


      {universities.length > 0 ? (
        <div>
          <h2>Universidades en {countryName}</h2>
          <ul>
            {universities.length > 0 && universities.map((university) => (
              <li key={university.name}>
                <p><strong>Nombre:</strong> {university.name}</p>
                <p><strong>Dominio:</strong> {university.domains.join(", ")}</p>
                <p><strong>Link:</strong> <a href={university.web_pages[0]}>{university.web_pages[0]}</a></p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No se encontraron resultados</p>

      )}
    </div>
  );
}
function Clima() {
  const [name, setName] = useState("Clima");
  const [weather, setWeather] = useState({
    main: {
      temp: 0,
      feels_like: 0
    },
    weather: [{
      description: '',
      main: ''
    }]
  });

  useEffect(() => {
    const fetchData = async () => {
      //const API_KEY = '6ad579045894ae29c194ec744cbdd6e5';
      
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Dominican%20Republic&appid=6ad579045894ae29c194ec744cbdd6e5');
      console.log(response.data);
      setWeather(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>{name}</h1>
      {weather ? (
        <div id="clima" className='container'>
          <div>
            <h2>El clima actual en República Dominicana</h2>
            <p><strong>Temperatura:</strong> {weather.main.temp} °C</p>
            <p><strong>Sensación térmica:</strong> {weather.main.feels_like} °C</p>
            <p><strong>Descripción:</strong> {weather.weather[0].description}</p>
            <p><strong>Estado:</strong> {weather.weather[0].main}</p>
          </div>
        </div>
      ) : (
        <div>Cargando el clima...</div>
      )}
    </div>
  );
}
const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {
          name === "Inbox" ?
            <img src="https://w7.pngwing.com/pngs/336/305/png-transparent-tool-boxes-stanley-black-decker-hand-tool-combination-of-yellow-and-black-miscellaneous-drawer-screw.png" alt="Imagen" style={{ width: "100%", display: "block", margin: "auto" }} />
            : null
        }

        {
          name === "Predecir Género" ?
            <>
              <Genero />
            </>
            : null
        }

        {
          name === "Predecir Edad" ? (
            <>
              <Edad />
            </>
          ) : null
        }

        {
          name == "Universidades" ?
            <>
              <Universidades />
            </>
            : null
        }
        {
          name == "Clima" ?
            <>
              <Clima />
            </>
            : null
        }
        {
          name == "Contrátame" ?


            <IonItemGroup>


              <IonImg style={{ width: "150px", height: "auto", margin: "0 auto" }}
                src="https://media.licdn.com/dms/image/D4E03AQGbZ57DWEddiw/profile-displayphoto-shrink_800_800/0/1672693137219?e=1681344000&v=beta&t=G3y5fEwc90hEvdObx7QC7QF0eDCqKH2uKcOFCtVtRfk" />


              <IonLabel style={{ top: "40%", textAlign: "center", fontSize: "20px" }}>Nombre: Abisay Medina Rosario</IonLabel>
              <IonLabel style={{ top: "40%", textAlign: "center", fontSize: "20px" }}>Matrícula: 2020-10664</IonLabel>
              <IonLabel style={{ top: "40%", textAlign: "center", fontSize: "20px" }}>Correo Personal: abisaymedinarosario@gmail.com</IonLabel>
            </IonItemGroup>

            : null
        }

      </IonContent>
    </IonPage>
  );
};

export default Page;
