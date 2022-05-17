import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'
import { useContext,useEffect,useState } from 'react'
const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext)
    const numberOfCartItems = cartCtx.items.reduce((total, currentItem) => { return total + currentItem.amount }, 0)
    const [buttonIsHightLighted, setButtonIsHightLighted] = useState(false)
    const btnClasses = `${classes.button} ${buttonIsHightLighted && classes.bump}`
    useEffect(() => {
        if (cartCtx.items.length === 0)
            return
        setButtonIsHightLighted(true)
        const timer = setTimeout(() => {
            setButtonIsHightLighted(false)
        }, 300)
        return () => {
            console.log('clear');
            clearTimeout(timer)
        }
            
    },[cartCtx.items])
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon></CartIcon>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}
export default HeaderCartButton