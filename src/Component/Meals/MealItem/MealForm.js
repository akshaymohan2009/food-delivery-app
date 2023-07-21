import { useRef } from 'react'
import Input from '../../UI/Input'
import classes from './MealForm.module.css'
function MealForm(props){
    const inputAmountref=useRef()
    function submitHandler(e)
    {
        e.preventDefault()
        let enteredAmount=+inputAmountref.current.value
        if(enteredAmount<0||enteredAmount>5)
        {
            return
        }
        props.onAddHandler(enteredAmount)
    }
    return <form className={classes.form} onSubmit={submitHandler}>
        <Input ref={inputAmountref} label="Amount" input={{
            id:'amount'+Math.random(),
            type:'number',
            min:1,
            max:5,
            step:1,
            defaultValue:1,
        }}/>
        <button type="submit">+ Add</button>
    </form>
}
export default MealForm