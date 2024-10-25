import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'
import { NavLink } from 'react-router-dom'

export default class Menu extends Component {
    state = {
        series: [],
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

    componentDidMount = () => {
        this.loadSeries();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Fifth navbar example">
                <div className="container-fluid">
                    <img src='https://appseries.azurewebsites.net/static/media/logo1.1408c71b2c87ca1fb473.png' style={{ width: '80px' }}></img>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample05">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to='/'>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/create' >Nuevo personaje</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link " to='/update'>Modificar personaje</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Select</span>
                                <ul className="dropdown-menu">
                                    {
                                        this.state.series.map((serie, index) => {
                                            return (
                                                <li key={index}><NavLink className="dropdown-item"to={'/serie/'+serie.idSerie}>{serie.nombre}</NavLink></li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
