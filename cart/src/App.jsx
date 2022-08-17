import CartContainer from './components/CartContainer'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { calculateItems } from './features/cart/cartSlice'
import { useEffect } from 'react'
import Modal from './components/Modal'

export default function App() {
    const { cartItems } = useSelector(store => store.cart)
    const { isOpen } = useSelector(store => store.modal)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(calculateItems())
    }, [dispatch, cartItems])

    return (
        <main>
            {isOpen &&
                <Modal />
            }
            <Navbar />
            <CartContainer />
        </main>
    )
}