import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../../store/cart-context'
import { useContext } from 'react'
const MealItem = (props) => {
    const price = `$${props.price.toFixed(2)}`;
    const cartCtx = useContext(CartContext)
    const handleOnAddToCart = (amount) => {
        cartCtx.addItem({
            amount: amount,
            price: props.price,
            id: props.id,
            name: props.name
        })
    }
    return (
        <li className={classes.meal}>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
            <MealItemForm id={props.id} onAddToCart={handleOnAddToCart}></MealItemForm>
        </li>
    )
}
export default MealItem