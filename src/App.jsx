import { useState } from "react"
import Film from "./components/Film"
import Header from "./components/Header"
import { db } from "./data/db"


function App() {

    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])

  return (
    <>

    <Header/>  

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((film) => (
            <Film
            key = {film.id}
            film = {film}
            cart = {cart}
            setCart={setCart}
            />
            )) }
            
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">VideoRent - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
