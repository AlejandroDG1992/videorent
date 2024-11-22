import { useState, useEffect } from "react"
import Film from "./components/Film"
import Header from "./components/Header"
import { db } from "./data/db"


function App() {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)
    const MIN_ITEMS = 1
    const MAX_ITEMS = 5

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item) {
        const itemExist = cart.findIndex(film => film.id === item.id)
        if(itemExist >= 0){
            if (cart[itemExist].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++
            setCart(updatedCart)
        }else{
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(film => film.id !== id))
    }

    function decreseQuantity(id){
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function increseQuantity(id){
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item                
        })
        setCart(updatedCart)
    }

    function clearCart(e){
        setCart([])
    }


  return (
    <>
    <Header
        cart = {cart}
        removeFromCart={removeFromCart}
        decreseQuantity={decreseQuantity}
        increseQuantity={increseQuantity}
        clearCart={clearCart}
    />  

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((film) => (
            <Film
            key = {film.id}
            film = {film}
            setCart = {setCart}
            addToCart = {addToCart}
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
