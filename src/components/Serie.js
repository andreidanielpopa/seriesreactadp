import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'
import { NavLink } from 'react-router-dom'

export default class Serie extends Component {
    state = {
        detallesSerie: [],
    }

    loadDetalles = () => {
        let idserie = parseInt(this.props.id);
        let request = 'api/Series/' + idserie;
        let url = Global.urlApiSeries + request;

        axios.get(url).then(response => {
            this.setState({
                detallesSerie: response.data,
            })
        })
    }

    componentDidMount = () => {
        this.loadDetalles();
    }

    componentDidUpdate = (oldProps) => {
        if (oldProps.id != this.props.id) {
            this.loadDetalles();
        }
    }
    render() {
        return (
            <div>
                <h1>Serie</h1>
                <div className="card" style={{ width: '18rem' }}>
                    <img src={this.state.detallesSerie.imagen} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{this.state.detallesSerie.nombre}</h5>
                        <p className="card-text">{this.state.detallesSerie.puntuacion}</p>
                        <NavLink to={'/personajes/' + this.state.detallesSerie.idSerie} className="btn btn-primary">Personajes</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}
