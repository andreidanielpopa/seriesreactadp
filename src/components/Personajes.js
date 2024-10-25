import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'
import { NavLink } from 'react-router-dom'

export default class Personajes extends Component {
    state = {
        personajes: [],
    }

    loadDetalles = () => {
        let idserie = parseInt(this.props.id);
        let request = 'api/Series/PersonajesSerie/' + idserie;
        let url = Global.urlApiSeries + request;

        axios.get(url).then(response => {
            this.setState({
                personajes: response.data,
            })
        })
    }

    componentDidMount = () => {
        this.loadDetalles();
    }
    render() {
        return (
            <div>
                <h1>Personajes de {this.props.id}</h1>
                <NavLink to={'/serie/'+this.props.id} className='btn btn-danger'> Volver a la serie </NavLink>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Personaje</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.personajes.map((personaje,index)=>{
                                return(<tr key={index}>
                                    <td>{personaje.nombre}</td>
                                    <td><img src={personaje.imagen} style={{width:'150px',height:'150px'}}></img></td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
