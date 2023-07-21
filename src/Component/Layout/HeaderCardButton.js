import { useContext, useState, useEffect } from "react"
import CartIcon from "../Cart/CartIcon"
import classes from './HeaderCardButton.module.css'
import CartContext from "../../store/Cart-context"
function HeaderCartButton(props) {
    const [animation, setAnimation] = useState(false)
    const cartCtx = useContext(CartContext)
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => curNumber + item.amount, 0)
    const btnClasses = `${classes.button} ${animation ? classes.bump : ''}`
    useEffect(() => {
        if(cartCtx.items.length===0)
        {
            return 
        }
        setAnimation(true)
        let timer=setTimeout(() => {
            setAnimation(false)
        }, 300)
        return ()=>{
            clearInterval(timer)
        }
    }, [cartCtx.items])
    return (
        <button onClick={props.clickHandler} className={btnClasses}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}
export default HeaderCartButton