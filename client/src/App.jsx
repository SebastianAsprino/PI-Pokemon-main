import { Route, Routes } from 'react-router-dom'
import Landing from './components/landing/landing'
import Home from './components/home/home'
import Detail from './components/detail/detail'
import Form from './components/form/form'


function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element={<Landing/>}/>
        <Route path = "/home" element={<Home/>}/>
        <Route path  = "/pokemons/:id" element={<Detail/>}/>
        <Route path = "/form" element={<Form/>}/>
      </Routes>
    </>
  )
}

export default App

