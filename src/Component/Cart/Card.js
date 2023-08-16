import React, { useContext, useRef, useState } from 'react'
import CartContext from '../../store/Cart-context'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem/CartItem'
import OrderForm from './OrderForm'
import Loading from '../../asset/animation_lkpa5ygw.json'
import Lottie from 'lottie-react'
function Card(props) {
    const [showOrder, setShowOrder] = useState(false)
    const cancelButtonRef = useRef(null)
    const cartCxt = useContext(CartContext)
    const totalAmount = `$${cartCxt.amount.toFixed(2)}`
    const hasItem = cartCxt.items.length > 0
    const [isformSubmitting, setIsFormSubmitting] = useState(false)
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    function removeFromCartHanlder(item) {
        cartCxt.removeItem(this.id)
    }
    function addToCartHandler() {
        let item = { ...this, amount: 1 }
        cartCxt.addItem(item)
    }
    function orderHandler() {
        setShowOrder(true)
    }
    async function submitHandler(data) {
        setIsFormSubmitting(true)
        await fetch("https://react-api-c5e80-default-rtdb.firebaseio.com/order.json", {
            method: 'POST',
            body: JSON.stringify({
                data: data,
                item: cartCxt.items
            })
        })
        cartCxt.clearCart()
        setIsFormSubmitted(true)
        setIsFormSubmitting(false)

    }
    let cartItem = <ul className={classes['cart-items']}>
        {
            cartCxt.items.map(cart => <CartItem
                name={cart.name}
                key={cart.id}
                price={cart.price}
                amount={cart.amount}
                onRemove={removeFromCartHanlder.bind(cart)}
                onAdd={addToCartHandler.bind(cart)}
            />)
        }
    </ul>
    let cancelOrderButton = !showOrder && <div className={classes.actions}>
        <button onClick={props.closeHandler} className={classes['button--alt']}>Close</button>
        {hasItem && <button onClick={orderHandler} className={classes.button}>Order</button>}
    </div>
    const cartModal = <React.Fragment> {cartItem}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {showOrder && <OrderForm submitHandler={submitHandler} portalRef={cancelButtonRef} clickHandler={props.closeHandler} />}
        {cancelOrderButton}
        <div ref={cancelButtonRef} id="buttonref"></div>
    </React.Fragment>

    const cartLoading = <Lottie animationData={Loading}></Lottie>

    const cartSubmitted = <><p>Form Submitted Successfully!!!</p> <div className={classes.actions}>
        <button onClick={props.closeHandler} className={classes['button--alt']}>Close</button>
        {hasItem && <button onClick={orderHandler} className={classes.button}>Order</button>}
    </div></>
    return (
        <Modal clickHandler={props.closeHandler}>
            {!isformSubmitting&& !isFormSubmitted &&cartModal}
            {isformSubmitting && cartLoading}
            {isFormSubmitted && cartSubmitted}
        </Modal>

    )
}
export default Card