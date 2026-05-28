
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Cursos from './components/Cursos'
import CursoDetalle from './components/CursoDetalle'
import CursoFormulario from './components/CursoFormulario'
import CursoLeccion from './components/CursoLeccion'
import Dashboard from './components/Dashboard'
import Login from './components/Login'

function RequireAuth({ children }) {
    return Boolean(localStorage.getItem('auth-token')) ? children : <Navigate to='/login' replace />
}

function GuestOnly({ children }) {
    return Boolean(localStorage.getItem('auth-token')) ? <Navigate to='/dashboard/cursos' replace /> : children
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={<Navigate to={Boolean(localStorage.getItem('auth-token')) ? '/dashboard/cursos' : '/login'} replace />}
                />
                <Route
                    path='/login'
                    element={<GuestOnly><Login /></GuestOnly>}
                />
                <Route
                    path='/dashboard'
                    element={<RequireAuth><Dashboard /></RequireAuth>}
                >
                    <Route index element={<Navigate to='cursos' replace />} />
                    <Route path='cursos' element={<Cursos />} />
                    <Route path='cursos/:id' element={<CursoDetalle />} />
                    <Route path='cursos/:id/leccion/:leccionId' element={<CursoLeccion />} />
                    <Route path='cursos/:id/formulario' element={<CursoFormulario />} />
                </Route>
                <Route path='/cursos' element={<Navigate to='/dashboard/cursos' replace />} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
