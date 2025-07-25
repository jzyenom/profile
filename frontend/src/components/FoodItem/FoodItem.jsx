// import React, { useContext } from "react";
// import "./FoodItem.css";
// import { assets } from "../../assets/assets";
// import { StoreContext } from "../../context/StoreContext";

// const FoodItem = ({ id, name, price, description, image }) => {
//   // const [itemCount,setItemCount] = useState(0)
//   // not used since a new state is create for every situation
//   const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

//   return (
//     <div className="food-item">
//       <div className="food-item-image-container">
//         <img className="food-item-image" src={image} alt="" />
//         {!cartItems[id] ? (
//           <img
//             className="add"
//             onClick={() => addToCart(id)}
//             src={assets.add_icon_white}
//             alt=""
//           />
//         ) : (
//           <div className="food-item-counter">
//             <img
//               src={assets.remove_icon_red}
//               onClick={() => removeFromCart(id)}
//               alt=""
//             />
//             <p>{cartItems[id]}</p>
//             <img
//               src={assets.add_icon_green}
//               onClick={() => addToCart(id)}
//               alt=""
//             />
//           </div>
//         )}
//       </div>

//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//           <p>{name}</p>
//           <img src={assets.rating_starts} alt="" />
//         </div>
//         <p className="food-item-desc">{description}</p>
//         <p className="food-item-price">${price}</p>
//       </div>
//     </div>
//   );
// };

// export default FoodItem;
//
//
//
//
//
//
// import React, { useContext } from "react";
// import "./FoodItem.css";
// import { assets } from "../../assets/assets";
// import { StoreContext } from "../../context/StoreContext";

// const FoodItem = ({ id, name, price, description, image }) => {
//   const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

//   return (
//     <div className="food-item">
//       <div className="food-item-image-container">
//         <img className="food-item-image" src={image} alt={name} />
//         {!cartItems[id] ? (
//           <img
//             className="add"
//             onClick={() => addToCart(id)}
//             src={assets.add_icon_white}
//             alt="Add to cart"
//           />
//         ) : (
//           <div className="food-item-counter">
//             <img
//               src={assets.remove_icon_red}
//               onClick={() => removeFromCart(id)}
//               alt="Remove one"
//             />
//             <p>{cartItems[id]}</p>
//             <img
//               src={assets.add_icon_green}
//               onClick={() => addToCart(id)}
//               alt="Add one more"
//             />
//           </div>
//         )}
//       </div>

//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//           <p>{name}</p>
//           <img src={assets.rating_starts} alt="stars" />
//         </div>
//         <p className="food-item-desc">{description}</p>
//         <p className="food-item-price">
//           <span>&#8358;</span>
//           {price.toFixed(2)}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default FoodItem;
//
//
//
//
//
import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image, onSelect }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img className="food-item-image" src={image} alt={name} />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => {
              addToCart(id);
              onSelect?.();
            }}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={() => removeFromCart(id)}
              alt="Remove one"
            />
            <p>{cartItems[id]?.quantity || 0}</p> {/* ✅ FIXED HERE */}
            <img
              src={assets.add_icon_green}
              onClick={() => {
                addToCart(id);
                onSelect?.();
              }}
              alt="Add one more"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="stars" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">
          <span>&#8358;</span>
          {price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
