
import React, { useContext, useEffect, useState } from "react";
import s1 from "../assets/picTwo.jpg";
import ProductContext from "../context/ProductContext";
import { BsThreeDots } from "react-icons/bs";
import EditModal from "./EditModal";
import { toast } from "react-toastify";
import { Link, useLocation, useParams } from "react-router-dom";
import "./Products.css";
import { FaPlus } from "react-icons/fa";


const SearchResult = ({showAddButton= true}) => {
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

  const showAddNotification = () => toast.success("Added Cart Successfully");
  const showRemoveNotification = () => toast.error("Removed Cart Successfully");


     useEffect(() => {
        setShowAll(false);
      }, [location.pathname]);
    // Filter products for home page
    // const displayedProducts = showAddButton
    //   ? products
    //   : showAll
    //   ? products
    //   : products?.slice(0, visibleProducts);



        // Update the displayedProducts logic
    const displayedProducts = React.useMemo(() => {
      // Ensure products is an array
      const productsArray = Array.isArray(product) ? product : [];
      if (showAddButton) {
        return productsArray;
      }
      return showAll ? productsArray : productsArray.slice(0, visibleProducts);
    }, [product, showAddButton, showAll, visibleProducts]);



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



//     useEffect(() => {
//      if (showAddButton) {
//        getUserProducts();
//      } else {
//        allProduct(searchQuery);
//      }
//    }, [showAddButton, searchQuery]);

  useEffect(()=>{
    allProduct(searchQuery);
  },[searchQuery])

  return (
   

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
            displayedProducts?.map((item) => (
                <div key={item._id} className="col-lg-3 col-md-6 mb-4">
                    <div className="card shadow-sm h-100">
                        <div className="position-relative" style={{ height: '180px', overflow: 'hidden' }}>
                            <img
                                src={
                                    item.image?.length > 0
                                        ? `http://localhost:3000/uploads/${item.image[0]}`
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
  
  );
};

export default SearchResult;

