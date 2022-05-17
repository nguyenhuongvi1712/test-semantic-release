import classes from './Modal.module.css'
import ReactDOM from 'react-dom'
import { Fragment } from 'react'

const overlaysEl = document.getElementById("overlays")
const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClick}></div>
}
const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{ props.children}</div>
        </div>
    )
}
const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.onCloseModal} />, overlaysEl)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlaysEl)}
        </Fragment>
    )
}

export default Modal