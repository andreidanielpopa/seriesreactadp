import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'
import { Navigate } from 'react-router-dom'

export default class ModificarPersonaje extends Component {

    selectPersonajes = React.createRef();
    selectSerie = React.createRef();

    state = {
        series: [],
        personajes: [],
        status: false,
        serieSeleccionado: null,
        personajeSeleccionado: null,
    }

    loadPersonajes = () => {
        let request = 'api/Personajes/';
        let url = Global.urlApiSeries + request;

        axios.get(url).then(response => {
            this.setState({
                personajes: response.data,
            })
        })
    }

    loadSeries = () => {
        let request = 'api/Series/';
        let url = Global.urlApiSeries + request;

        axios.get(url).then(response => {
            this.setState({
                series: response.data,
            })
        })
    }

    modificarPersonaje = (e) => {
        e.preventDefault();

        let idPersonajeSelect = parseInt(this.selectPersonajes.current.value);
        let idSerieSelect = parseInt(this.selectSerie.current.value);

        let request = 'api/Personajes/' + idPersonajeSelect + '/' + idSerieSelect;
        let url = Global.urlApiSeries + request;

        axios.put(url).then(response => {
            this.setState({
                status: true,
            })
        })

    }

    mostrarSeleccionadoSerie = () => {
        let idSerieSelect = parseInt(this.selectSerie.current.value);

        let request = 'api/Series/' + idSerieSelect;
        let url = Global.urlApiSeries + request;

        axios.get(url).then(response => {
            this.setState({
                serieSeleccionado: response.data,
            })
        })
    }

    mostrarSeleccionadoPersonaje = () => {
        let idPersonajeSelect = parseInt(this.selectPersonajes.current.value);

        let request = 'api/Personajes/' + idPersonajeSelect;
        let url = Global.urlApiSeries + request;

        axios.get(url).then(response => {
            this.setState({
                personajeSeleccionado: response.data,
            })
        })
    }

    componentDidMount = () => {
        this.loadPersonajes();
        this.loadSeries();
    }


    render() {
        return (
            <div>
                <h1>Modificar Personaje</h1>
                <form>
                    <label>Serie</label>
                    <select className='form-control' ref={this.selectSerie} onChange={this.mostrarSeleccionadoSerie}>
                        {
                            this.state.series.map((serie, index) => {
                                return (
                                    <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                                )
                            })
                        }
                    </select>
                    <label>Personaje</label>
                    <select className='form-control' ref={this.selectPersonajes} onChange={this.mostrarSeleccionadoPersonaje}>
                        {
                            this.state.personajes.map((personaje, index) => {
                                return (
                                    <option key={index} value={personaje.idPersonaje}>{personaje.nombre}</option>
                                )
                            })
                        }
                    </select>
                    <button className='btn btn-success' onClick={this.modificarPersonaje}>Modificar Personaje</button>
                </form>
                <div className='row'>
                    {
                        this.state.serieSeleccionado != null &&
                        (
                            <div className='col-md-6'>
                                <h1>{this.state.serieSeleccionado.nombre}</h1>
                                <hr/>
                                <img src={this.state.serieSeleccionado.imagen} style={{width:'800px'}}></img>
                            </div>
                        )
                    }
                    {
                        this.state.personajeSeleccionado != null &&
                        (
                            <div className='col-md-6'>
                                <h1>{this.state.personajeSeleccionado.nombre}</h1>
                                <hr/>
                                <img src={this.state.personajeSeleccionado.imagen} style={{width:'800px'}}></img>
                            </div>
                        )
                    }
                </div>
                {
                    this.state.status === true &&
                    (<Navigate to={'/personajes/' + this.state.serieSeleccionado.idSerie} />)
                }
            </div>
        )
    }
}
