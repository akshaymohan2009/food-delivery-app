import React from 'react'
import classes from './OrderForm.module.css'
import ReactDOM from 'react-dom';
function OrderForm(props) {
    const [allInputValid, setAllInputValid] = React.useState({
        name: true,
        city: true,
        postalcode: true,
        street: true
    })
    function isValid(value) {
        return value.trim().length > 0
    }
    function isPostcodefivechars(value) {
        return value.trim().length == 5
    }
    const nameRef = React.useRef(null)
    const streetRef = React.useRef(null)
    const postalcodeRef = React.useRef(null)
    const cityRef = React.useRef(null)

    function submitHandler(e) {
        e.preventDefault()
        const isNameRefValid = isValid(nameRef.current.value)
        const isStreetRefValid = isValid(streetRef.current.value)
        const isPostalCodeRefValid = isPostcodefivechars(postalcodeRef.current.value)
        const isCityRefValid = isValid(cityRef.current.value)
        const formIsValid = isNameRefValid && isStreetRefValid && isPostalCodeRefValid && isCityRefValid
        setAllInputValid({
            name: isNameRefValid,
            street: isStreetRefValid,
            postalcode: isPostalCodeRefValid,
            city: isCityRefValid
        })
        if (!formIsValid) {
            return
        }
        console.log("form is valid")
        props.submitHandler({
            name:nameRef.current.value,
            street:streetRef.current.value,
            postalcode:postalcodeRef.current.value,
            city:cityRef.current.value
        })
    }
    const inputclass=`${classes.control} ${allInputValid.name?'':classes.invalid}` 
    const streetclass=`${classes.control} ${allInputValid.street?'':classes.invalid}` 
    const postalcodeclass=`${classes.control} ${allInputValid.postalcode?'':classes.invalid}` 
    const cityclass=`${classes.control} ${allInputValid.city?'':classes.invalid}` 
    return (
        <form className={classes.form}>
            <div className={inputclass}>
                <label htmlFor='name'>Your name</label>
                <input ref={nameRef} id="name" type="text" />
                {!allInputValid.name && <p className={classes.invalid}>Please enter a Valid name!</p>}
            </div>
            <div className={streetclass}>
                <label htmlFor='street'>Street </label>
                <input ref={streetRef} id="street" type="text" />
                {!allInputValid.street && <p className={classes.invalid}>Please enter a Valid Street!</p>}
            </div>
            <div className={postalcodeclass}>
                <label htmlFor='postalcode'>postal Code</label>
                <input ref={postalcodeRef} id="postalcode" type="text" />
                {!allInputValid.postalcode && <p className={classes.invalid}>Please enter a Valid 5 digit postalCode!</p>}
            </div>
            <div className={cityclass}>
                <label htmlFor='city'>city</label>
                <input ref={cityRef} id="city" type="text" />
                {!allInputValid.city && <p className={classes.invalid}>Please enter a Valid city!</p>}
            </div>
            {ReactDOM.createPortal(<div className={classes.actions}>
                <button onClick={props.clickHandler}>Cancel</button>
                <button className={classes.submit} onClick={submitHandler}>confirm</button>
            </div>, props.portalRef?.current)
            }

        </form>
    )
}
export default OrderForm