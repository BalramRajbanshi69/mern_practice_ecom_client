import React, { useContext, useEffect, useState } from "react";
import s1 from "../assets/picTwo.jpg";
import ProductContext from "../context/ProductContext";
import { BsThreeDots } from "react-icons/bs";
import EditModal from "./EditModal";
import toast from "react-hot-toast";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "./Products.css"


const Products = ({showAddButton= true}) => {
    const apiUrl = import.meta.env.VITE_REACT_API_URL;
  const params = useParams();
  const searchQuery = params.searchQuery;
  const {
    product,
    state: { cart },
    dispatch,
    allProduct,
    editProduct,
    deleteProduct,
    getUserProducts,
  } = useContext(ProductContext);
  console.log("Product items:", product);
  console.log("Carts items:", cart);
  console.log(allProduct);

  const [menuVisible, setMenuVisible] = useState(false);
  const [modelVisible, setModelVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(8);
     const [showAll, setShowAll] = useState(false);
     const location = useLocation();

  const showAddNotification = () => toast.success("Added to Cart Successfully");
  const showRemoveNotification = () => toast.success("Removed from Cart Successfully");


     useEffect(() => {
        setShowAll(false);
      }, [location.pathname]);
    // Filter products for home page
    // const displayedProducts = showAddButton
    //   ? product
    //   : showAll
    //   ? product
    //   : product?.slice(0, visibleProducts);



        // Update the displayedProducts logic
    const displayedProducts = React.useMemo(() => {
      // Ensure products is an array
      const productsArray = Array.isArray(product) ? product : [];
      if (showAddButton) {
        return productsArray;
      }
      return showAll ? productsArray : productsArray.slice(0, visibleProducts);
    }, [product, showAddButton, showAll, visibleProducts]);


    
       const handleViewAll = (e) => {
         e.preventDefault();
         setShowAll(true);
       };

  const handleMenu = (id) => {
    setMenuVisible((prevMenu) => ({
      ...prevMenu,
      [id]: !prevMenu[id],
    }));
  };

  const OpenEditModal = (prod) => {
    setModelVisible(true);
    setSelectedProduct(prod);
  };

  const EditCloseModal = () => {
    setModelVisible(false);
    setSelectedProduct(null);
  };

    // Update the EditSave function
  const EditSave = async (updatedData) => {
    console.log("save changing or changed");
    const success = await editProduct(selectedProduct._id, updatedData);
    if (success) {
      // Close both the edit modal and menu
      setModelVisible(false);
      setMenuVisible(prev => ({
        ...prev,
        [selectedProduct._id]: false
      }));
      setSelectedProduct(null);
    }
  };

  // Update the handleDeleteMenu function
  const handleDeleteMenu = async (id) => {
    console.log("deleting products");
    await deleteProduct(id);
    // Close the menu for the deleted item
    setMenuVisible(prev => ({
      ...prev,
      [id]: false
    }));
  };

    useEffect(() => {
     if (showAddButton) {
       getUserProducts();
     } else {
       allProduct(searchQuery);
     }
   }, [showAddButton, searchQuery,getUserProducts,allProduct]);

//   useEffect(()=>{
//     allProduct(searchQuery);
//   },[searchQuery])

  return (

    <div>

    <div className="container mt-4">
    <div className="row">
        <div className="col-12 mb-4 d-flex justify-content-between align-items-center">
            <h4>My products</h4>
            {showAddButton && (
                <Link to="/addproduct" className="btn btn-primary">
                    <FaPlus className="me-2" size={20} />
                    Add Products
                </Link>
            )}
        </div>

        {(!displayedProducts || displayedProducts.length === 0) ? (
            <div className="col-12">
                <div className="p-5 text-center">
                    <h3 className="mb-3 h5 font-semibold">No Products Found</h3>
                    <p className="text-muted">
                        {showAddButton
                            ? "Start by adding your first product!"
                            : "No products available at the moment."}
                    </p>
                    {showAddButton && (
                        <Link
                            to="/addproduct"
                            className="inline-block px-4 py-2 mt-4 btn btn-primary"
                        >
                            Add Your First Product
                        </Link>
                    )}
                </div>
            </div>
        ) : (
            displayedProducts && displayedProducts?.map((item) => (
                <div key={item._id} className="col-lg-3 col-md-6 mb-4">
                    <div className="card shadow-sm h-100">
                        <div className="position-relative" style={{ height: '180px', overflow: 'hidden' }}>
                            <img
                                src={
                                    item.image?.length > 0
                                        ? `${apiUrl}/uploads/${item.image[0]}`
                                        : s1
                                }
                                alt={item.title || "Product Image"}
                                className="card-img-top object-fit-cover h-100"
                            />
                        </div>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <div>
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h5 className="card-title mb-0">{item.title}</h5>
                                    {showAddButton && (
                                        <div className="position-relative">
                                            <button
                                                onClick={() => handleMenu(item._id)}
                                                className="btn btn-sm btn-light border rounded-circle"
                                            >
                                                <BsThreeDots />
                                            </button>
                                            {menuVisible[item._id] && (
                                                <div className="position-absolute top-100 start-50 translate-middle mt-2 bg-white border rounded shadow-sm z-1">
                                                    <button
                                                        className="dropdown-item btn btn-sm btn-outline-primary w-100"
                                                        onClick={() => OpenEditModal(item)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="dropdown-item btn btn-sm btn-outline-danger w-100"
                                                        onClick={() => handleDeleteMenu(item._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <p className="card-text text-muted small mb-2 line-clamp-2">{item.description}</p>
                                <p className="card-text small mb-1">
                                    <strong>Price:</strong> ${item.price}
                                </p>
                                <p className="card-text small mb-0">
                                    <strong>InStock:</strong> {item.inStock}
                                </p>
                            </div>
                            <div>
                                {cart && cart.some((p) => p._id === item._id) ? (
                                    <button
                                        className="btn btn-danger w-100 mt-3"
                                        onClick={() => {
                                            showRemoveNotification();
                                            dispatch({
                                                type: "REMOVE_FROM_CART",
                                                payload: item,
                                            });
                                        }}
                                    >
                                        Remove From Cart
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-primary w-100 mt-3"
                                        onClick={() => {
                                            showAddNotification();
                                            dispatch({
                                                type: "ADD_TO_CART",
                                                payload: item,
                                            });
                                        }}
                                    >
                                        Add To Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    {modelVisible &&
                        selectedProduct &&
                        selectedProduct._id === item._id && (
                            <EditModal
                                isOpen={modelVisible}
                                onClose={EditCloseModal}
                                prod={selectedProduct}
                                onSave={EditSave}
                            />
                        )}
                </div>
            ))
      )}
        {!showAddButton &&
            product?.length > visibleProducts &&
            !showAll && (
                <div className="col-12 text-center mt-4">
                    <button
                        onClick={handleViewAll}
                        className="btn btn-outline-primary"
                    >
                        View All Products
                    </button>
                </div>
            )}
    </div>


    
</div>

<footer class="bg-dark text-light py-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h5>About Us</h5>
                    <p>Your go-to online store for quality products and excellent service.</p>
                </div>
                <div class="col-md-4">
                    <h5>Quick Links</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-light">Home</a></li>
                        <li><a href="#" class="text-light">Products</a></li>
                        <li><a href="#" class="text-light">Services</a></li>
                        <li><a href="#" class="text-light">Contact</a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h5>Follow Us</h5>
                    <ul class="list-inline">
                        <li className="list-inline-item"><a href="#" className="text-light"><i className="fa-brands fa-facebook-f"></i></a></li>
                <li className="list-inline-item"><a href="#" className="text-light"><i className="fa-brands fa-instagram"></i></a></li>
                <li className="list-inline-item"><a href="#" className="text-light"><i className="fa-brands fa-twitter"></i></a></li>
                <li className="list-inline-item"><a href="#" className="text-light"><i className="fa-brands fa-github"></i></a></li>
                <li className="list-inline-item"><a href="#" className="text-light"><i className="fa-brands fa-linkedin-in"></i></a></li>
                    </ul>
                </div>
            </div>
            <hr className="my-3"/>
            <p >&copy; 2025 Your E-commerce Store. All rights reserved.</p>
        </div>
    </footer>

    
    </div>
  
  );
};

export default Products;
