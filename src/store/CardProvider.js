import CartContext from "./Cart-context"
import { useReducer } from 'react'
const defaultCart = {
    item: [],
    totalAmount: 0,
}
function reducerFunction(state, action) {
    if (action.type === "ADD") {
        const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount
        const exitingItem = state.item.findIndex((item) => { if (item.id === action.item.id) return item })
        let updateItem
        if (exitingItem >= 0) {
            let updatedExitingItem = {
                ...state.item[exitingItem],
                amount: state.item[exitingItem].amount + action.item.amount
            }
            updateItem = [...state.item]
            updateItem[exitingItem] = updatedExitingItem
        }
        else {
            updateItem = state.item.concat(action.item)
        }
        /**  const exitingItem = state.item.filter((item) => { if (item.id === action.item.id) return true })
         if (exitingItem.length > 0) {
             let updatedExitingItem = {
                 ...exitingItem[0],
                 amount: exitingItem[0].amount + action.item.amount
             }
             updateItem = [...state.item]
             updateItem = updateItem.map(item => {
                 if (item.id === action.item.id) {
                     return updatedExitingItem
                 }
                 else
                 {
                     return item
                 }
             })
         }
         else {
             updateItem = state.item.concat(action.item)
         }*/
        return {
            item: updateItem,
            totalAmount: updateTotalAmount
        }
    }
    if (action.type === "REMOVE") {
        let removeItem = state.item.findIndex(item => item.id === action.id)
        let removeItemElement = state.item[removeItem]
        let updatedItem
        if (removeItemElement.amount === 0) {
            updatedItem=state.item.filter(item=>item.id!==action.id)
        }
        else {
            updatedItem = [...state.item]
            updatedItem[removeItem] = {
                ...removeItemElement,
                amount: removeItemElement.amount--
            }
        }

        let updateTotalAmount = state.totalAmount - removeItemElement.price
        return {
            item: updatedItem,
            totalAmount: updateTotalAmount
        }
    }
    return defaultCart
}
function CartProvider(props) {
    const [cartState, dispatchCartItem] = useReducer(reducerFunction, defaultCart)
    const addItemToCart = item => {
        dispatchCartItem({
            type: "ADD",
            item: item
        })
    }
    const removeItemFromCart = id => {
        dispatchCartItem({
            type: "REMOVE",
            id: id
        })

    }
    const cartContext = {
        items: cartState.item,
        amount: cartState.totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartProvider