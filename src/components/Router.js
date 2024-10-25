import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Home from './Home'
import Menu from './Menu'
import Serie from './Serie'
import Personajes from './Personajes'
import NuevoPersonaje from './NuevoPersonaje'
import ModificarPersonaje from './ModificarPersonaje'

export default class Router extends Component {
    render() {
        function DetalleSerieElement() {
            let { id } = useParams();
            return (<Serie id={id} />)
        }

        function PersonajesElement() {
            let { id } = useParams();
            return (<Personajes id={id} />)
        }
        return (
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/serie/:id' element={<DetalleSerieElement />} />
                    <Route path='/personajes/:id' element={<PersonajesElement />} />
                    <Route path='/create' element={<NuevoPersonaje />} />
                    <Route path='/update' element={<ModificarPersonaje />} />
                </Routes>
            </BrowserRouter>
        )
    }
}
