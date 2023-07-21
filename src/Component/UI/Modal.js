import classes from './Modal.module.css'
import ReactDOM from 'react-dom'
function Backdrop(props) {
    return <div onClick={props.clickHandler} className={classes.backdrop}></div>
}
function ModalOverlay(props) {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )

}

const portalElement = document.getElementById('overlay')

function Modal(props) {
    return (<>
        {ReactDOM.createPortal(<Backdrop clickHandler={props.clickHandler} />, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>)


}
export default Modal