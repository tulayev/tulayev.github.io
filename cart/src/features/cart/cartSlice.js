import { createSlice } from '@reduxjs/toolkit'
import cartItems from '../../data'

const initialState = {
    cartItems,
    amount: 4,
    total: 0,
    isLoading: true
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: state => {
            state.cartItems = []
        },
        removeItem: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter(x => x.id !== itemId)
        },
        increase: (state, {payload}) => {
            const item = state.cartItems.find(x => x.id === payload.id)
            item.amount++
        },
        decrease: (state, {payload}) => {
            const item = state.cartItems.find(x => x.id === payload.id)
            item.amount--
        },
        calculateItems: state => {
            let amount = 0, total = 0
            state.cartItems.forEach(item => {
                amount += item.amount
                total += item.amount * item.price
            })
            state.amount = amount
            state.total = total
        }
    }
})

export const { clearCart, removeItem, increase, decrease, calculateItems } = cartSlice.actions

export default cartSlice.reducer