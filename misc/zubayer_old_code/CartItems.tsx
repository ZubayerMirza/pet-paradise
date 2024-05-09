import React from "react";

interface CartItemsProps {
  items: string[];
}

// Store the items in cart
const CartItems: React.FC<CartItemsProps> = ({ items }) => {
  return (
    <div className="cart-container">
      <h3>Cart</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default CartItems;
