import CartContext from "./cart-context"
import { useReducer } from "react"

const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        let updateItems, updateItem
        const existingCartIndex = state.items.findIndex(item => item.id === action.item.id)
        const existingCartItem = state.items[existingCartIndex]
        if (existingCartItem) {
            updateItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updateItems = [...state.items]
            updateItems[existingCartIndex] = updateItem
        } else {
            updateItems = state.items.concat(action.item)
        }
        const newTotalAmount = state.totalAmount + action.item.amount * action.item.price
        return {
            items: updateItems,
            totalAmount: newTotalAmount
        }
    }
    if (action.type === 'REMOVE') {
        let updateItems, updateItem
        const existingCartIndex = state.items.findIndex(item => item.id === action.id)
        const existingCartItem = state.items[existingCartIndex]
        if (existingCartItem.amount > 1) {
            updateItem = {
                ...existingCartItem,
                amount: existingCartItem.amount -1
            }
            updateItems = [...state.items]
            updateItems[existingCartIndex] = updateItem
        } else if (existingCartItem.amount === 1) {
            updateItems = [...state.items].filter(item => {return item.id !== action.id})
        }
        const newTotalAmount = state.totalAmount - existingCartItem.price
        return {
            items: updateItems,
            totalAmount: newTotalAmount
        }
        
    }
    return defaultCartState
}

const CartProvider = (props) => {
    const [cartState,dispatchCartAction] = useReducer(cartReducer, defaultCartState)
    const addItemToCartHandler = (item) => {
        dispatchCartAction({type : 'ADD', item})
    }
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id})
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartProvider