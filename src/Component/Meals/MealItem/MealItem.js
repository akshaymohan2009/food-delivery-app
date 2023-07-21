import { useContext } from 'react'
import CartContext from '../../../store/Cart-context'
import MealForm from './MealForm'
import classes from './MealItem.module.css'
function MealItem(props) {
    const price = `$${props.price.toFixed(2)}`
    const cartcontext=useContext(CartContext)
    function onAddHandler(enteredAmount){
        cartcontext.addItem({
            id:props.id,
            name:props.name,
            price:props.price,
            amount:enteredAmount
        })
    }
    return <li className={classes.meal} key={props.id}>
        <div >
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealForm onAddHandler={onAddHandler}/>
        </div>
    </li>
}
export default MealItem