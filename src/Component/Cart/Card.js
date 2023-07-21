import { useContext } from 'react'
import CartContext from '../../store/Cart-context'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem/CartItem'
function Card(props) {
    const cartCxt = useContext(CartContext)
    const totalAmount = `$${cartCxt.amount.toFixed(2)}`
    const hasItem = cartCxt.items.length > 0
    function removeFromCartHanlder(item){
        cartCxt.removeItem(this.id)
    }
    function addToCartHandler(){
        let item={...this,amount:1}
        cartCxt.addItem(item)
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
    return (
        <Modal clickHandler={props.closeHandler}>
            {cartItem}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.closeHandler} className={classes['button--alt']}>Close</button>
                {hasItem && <button className={classes.button}>Order</button>}
            </div>
        </Modal>

    )
}
export default Card