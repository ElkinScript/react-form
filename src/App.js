import React from 'react';
import CustomNavbar from './components/Navbar';
import FormularioRegistro from './components/FormularioRegistro';
import './App.css';

function App() {
    return (
        <div className="App">
            <CustomNavbar/>
            <FormularioRegistro/>
        </div>
    );
}

export default App;