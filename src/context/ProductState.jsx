
import React, { useEffect, useReducer, useState } from "react";
import ProductContext from "./ProductContext";
import cartReducer from "./Reducer";
import toast from "react-hot-toast"

const ProductState = ({children}) => {
  const apiUrl = import.meta.env.VITE_REACT_API_URL;
  const prod = [
    {
      _id: 1,
      title: "sweater",
      description: "this is a woolen sweater",
      price: 1000,
      inStock: 10,
    },
    {
      _id: 2,
      title: "jeans",
      description: "blue jeans",
      price: 500,
      inStock: 5,
    },
    {
      _id: 3,
      title: "tshirt ",
      description: "summer shirt",
      price: 400,
      inStock: 5,
    },
    {
      _id: 4,
      title: "cap ",
      description: "summer cap",
      price: 400,
      inStock: 5,
    },
  ];
  const [product, setProduct] = useState([]);
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [state, dispatch] = useReducer(cartReducer, {
    products: product,
    cart: initialCart,
  });
  
  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);


  const getUserProducts = async () => {
     try {
       const response = await fetch(
         `${apiUrl}/api/product/getloginproducts`,
         {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             "auth-token": localStorage.getItem("token"),
           },
         }
       );
       const data = await response.json();
       setProduct(data.data);
     } catch (error) {
       console.error("Error fetching user products:", error);
     }
   };

  const allProduct = async (searchQuery = "") => {
    const response = await fetch(
      `${apiUrl}/api/product/getallproducts?searchQuery=${searchQuery}`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    let data = await response.json();
    console.log(data);
    setProduct(data);
  };

  // edit product
  const editProduct = async (selectedProduct, updateData) => {
    console.log("edit product", selectedProduct);
    const { title, description, price, inStock } = updateData;
    try {
      const response = await fetch(
        `${apiUrl}/api/product/updateproduct/${selectedProduct}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ title, description, price, inStock }),
        }
      );
      if (response.ok) {
          const data = await response.json();
      
          //update local products state
          setProduct(prevProducts=>
            prevProducts.map((product) =>
              product._id === selectedProduct ? { ...product, ...updateData}: product
          ));
          // Update cart if product exists there
      dispatch({ 
        type: 'UPDATE_ITEM', 
        payload: { _id: selectedProduct, ...updateData }
      });
          
      return true;  // return true on success
    } else {
      toast.error('Failed to update product');
      return false; // return false on failure
    }
  } catch (error) {
    console.error("Error updating product:", error);
    toast.error("Failed to update product");
    return false;
  }
  };

  // delete product
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/product/deleteproduct/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        // Dispatch actions to update both products and cart
      dispatch({ type: 'REMOVE_FROM_CART', payload: { _id: id } });
      toast.success('Product deleted successfully');
      allProduct();
      } else {
        console.log("failed to delete the product");
      }
      allProduct();
    } catch (error) {
      console.error('Error deleting product:', error);
    toast.error('Failed to delete product');
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        state,
        dispatch,
        getUserProducts,
        allProduct,
        editProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductState;
