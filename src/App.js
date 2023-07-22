import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";

export default function App() {
    
  const [selectedState, setSelectedState] = useState([]);
  const [states, setStates] = useState([]);

  async function getStates() {
    const response = await fetch("http://127.0.0.1:8000/address/api/v1/state?per_page=100");
    const states = await response.json();
    setStates(states.data);
  }

  const [selectedCity, setSelectedCity] = useState(null);
  // const cities = [
  //     { name: 'New York', code: 'NY' },
  //     { name: 'Rome', code: 'RM' },
  //     { name: 'London', code: 'LDN' },
  //     { name: 'Istanbul', code: 'IST' },
  //     { name: 'Paris', code: 'PRS' }
  // ];
  
  useEffect(() => {
    getStates();
  },[]);
  
  const onStateChange= (e) => {
    setSelectedState(e.value);
    getDistrictsByState(e.value);
    getCitiesByState(e.value);
    getTownshipsByState(e.value);
  }

  const onCityChange = (e) => {
    setSelectedCity(e.value);
    getTownshipsByCity(e.value);    
  }

  const onDistrictChange = (e) => {
    setSelectedDistrict(e.value);
    getTownshipsByDistrict(e.value);    
  }

  const onTownshipChange = (e) => {
    setSelectedTownship(e.value);
  }

  async function getCitiesByState(selectedState) {
    const id = selectedState.id;
    const response = await fetch(`http://127.0.0.1:8000/address/api/v1/city/state/${id}?per_page=100`);
    const cities = await response.json();
    setCities(cities.data);
  }

  async function getTownshipsByDistrict(selectedDistrict) {
    const id = selectedDistrict.id;
    const response = await fetch(`http://127.0.0.1:8000/address/api/v1/township/district/${id}?per_page=1000`);
    const districts = await response.json();
    setTownships(districts.data);
  }

  async function getTownshipsByCity(selectedCity) {
    const id = selectedCity.id;
    const response = await fetch(`http://127.0.0.1:8000/address/api/v1/township/city/${id}?per_page=1000`);
    const townships = await response.json();
    setTownships(townships.data);
  }

  async function getTownshipsByState(selectedCity) {
    const id = selectedCity.id;
    const response = await fetch(`http://127.0.0.1:8000/address/api/v1/township/state/${id}?per_page=1000`);
    const townships = await response.json();
    setTownships(townships.data);
  }

  const [cities, setCities] = useState([]);
  async function getCities() {
    const response = await fetch(`http://127.0.0.1:8000/address/api/v1/city?per_page=5000`);
    const cities =  await response.json();
    setCities(cities.data);
  } 

  // useEffect(() => {
  //   getCities();
  // },[]);

  const [townships, setTownships] = useState([]);
  const [selectedTownship, setSelectedTownship] = useState([]);

  async function getTownships() {
    const response = await fetch(`http://127.0.0.1:8000/address/api/v1/township?per_page=10000`);
    const townships =  await response.json();
    setTownships(townships.data);
  }

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);

  async function getDistricts() {
    const response = await fetch(`http://127.0.0.1:8000/address/api/v1/district?per_page=10000`);
    const districts =  await response.json();
    setDistricts(districts.data);
  }

  async function getDistrictsByState(selectedState) {
    const id = selectedState.id;
    const response = await fetch(`http://127.0.0.1:8000/address/api/v1/district/state/${id}?per_page=10000`);
    const districts =  await response.json();
    setDistricts(districts.data);
  }
  

  // useEffect(() => {
  //   getTownships();
  // },[]); 

  const items = [
    {
        label: 'HOME',
        icon: 'pi pi-fw pi-home'
    },
    {
        label: 'PROJECTS',
        icon: 'pi pi-fw pi-folder',
        items: [
          {
            label: 'Files',
            icon: 'pi pi-fw pi-file'
          },
          {
            label: 'Photos',
            icon: 'pi pi-fw pi-images'
          }
        ]
    },
    {
      label: 'ABOUT US',
      icon: 'pi pi-fw pi-user'
    }
];

  const start = <img alt="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
  const end = <InputText placeholder="Search" type="text" />;

  return (
    <>
      <div className="">
        <Menubar model={items} start={start} end={end}/>
      </div>
      <div className="card">
        <DataTable value={states} sortMode="multiple" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '100%' }}>
          <Column field="id" header="No." sortable style={{ width: '25%' }}></Column>
          <Column field="en_name" header="Name_Eng" sortable style={{ width: '25%' }}></Column>
          <Column field="mm_name" header="Name_MM" sortable style={{ width: '25%' }}></Column>
          <Column field="p_code" header="P Code" sortable style={{ width: '25%' }}></Column>
        </DataTable>
      </div>
      <div className="card flex justify-content-center align-items-center h-screen">
        <Dropdown value={selectedState} options={states} onChange={onStateChange} optionLabel="mm_name" placeholder="Select a State" />
        <Dropdown value={selectedDistrict} options={districts} onChange={onDistrictChange} optionLabel="mm_name" placeholder="Select a District" />
        <Dropdown value={selectedTownship} options={townships} onChange={onTownshipChange} optionLabel="mm_name" placeholder="Select a Township" />
      </div>
    </>
  )
}  