import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'
import { Navigate } from 'react-router-dom'

export default class NuevoPersonaje extends Component {
    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    selectSerie = React.createRef();

    state = {
        series: [],
        status: false,
        idSerieSeleccionado: 0,
    }

    loadSeries = () => {
        let request = 'api/Series';
        let url = Global.urlApiSeries + request;

        axios.get(url).then(response => {
            this.setState({
                series: response.data,
            })
        })
    }

    insetarPersonaje = (e) => {
        e.preventDefault();

        let nombre = this.cajaNombre.current.value;
        let imagen = this.cajaImagen.current.value;
        let idSerie = parseInt(this.selectSerie.current.value);

        this.setState({
            idSerieSeleccionado: idSerie,
        })

        let personaje = {
            idPersonaje: 0,
            nombre: nombre,
            imagen: imagen,
            idSerie: idSerie,
        }

        let request = 'api/Personajes'
        let url = Global.urlApiSeries + request;

        axios.post(url,personaje).then(response =>{
            this.setState({
                status: true,
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries();
    }
    render() {
        return (
            <div>
                <h1>Crear Personaje</h1>
                <form>
                    <label>Nombre</label>
                    <input className='form-control' type='text' ref={this.cajaNombre} />
                    <label>Imagen</label>
                    <input className='form-control' type='text' ref={this.cajaImagen} />
                    <label>Serie</label>
                    <select className='form-control' ref={this.selectSerie}>
                        {
                            this.state.series.map((serie, index) => {
                                return (
                                    <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                                )
                            })
                        }
                    </select>
                    <button className='btn btn-success' onClick={this.insetarPersonaje}>Crear Personaje</button>
                </form>
                {
                    this.state.status === true &&
                    (<Navigate to={'/personajes/'+this.state.idSerieSeleccionado} />)
                }
            </div>
        )
    }
}
