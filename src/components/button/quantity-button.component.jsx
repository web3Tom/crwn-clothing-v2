import "./quantity-button.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const QuantityButton = ({ cartItem }) => {
  const { quantity } = cartItem;
  const { removeItemQuantity } = useContext(CartContext);
  const removeProductQuantity = () => removeItemQuantity(cartItem);
  const { addItemToCart } = useContext(CartContext);
  const addProductQuantity = () => addItemToCart(cartItem);
  const removeArrow = "<";
  const addArrow = ">";

  return (
    <div className="qbutton-container">
      <button onClick={removeProductQuantity}>{removeArrow}</button>
      <p>{quantity}</p>
      <button onClick={addProductQuantity}>{addArrow}</button>
    </div>
  );
};

export default QuantityButton;
