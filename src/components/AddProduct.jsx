import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const apiUrl = import.meta.env.VITE_REACT_API_URL;
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    inStock: "",
    image: null,
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    inStock: "",
    image: "",
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      description: "",
      price: "",
      inStock: "",
      image: "",
    };

    if (!product.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    } else if (product.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
      isValid = false;
    }

    if (!product.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    } else if (product.description.trim().length < 5) {
      newErrors.description = "Description must be at least 5 characters long";
      isValid = false;
    }

    if (!product.price) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (isNaN(Number(product.price)) || Number(product.price) <= 0) {
      newErrors.price = "Price must be a positive number greater than 0";
      isValid = false;
    }

    if (!product.inStock) {
      newErrors.inStock = "In Stock is required";
      isValid = false;
    } else if (isNaN(Number(product.inStock)) || Number(product.inStock) < 0) {
      newErrors.inStock = "In Stock must be a non-negative number";
      isValid = false;
    }

    if (!product.image) {
      newErrors.image = "Image is required";
      isValid = false;
    } else if (!(product.image instanceof File)) {
      newErrors.image = "Invalid image file";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


      if (!localStorage.getItem("token")) {
      navigate("/login");
      toast.error("Please login to add products");
      return;
    }

    
    if (validate()) {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("inStock", product.inStock);
      if (product.image) {
        formData.append("myfile", product.image);
      }
      try {
        const response = await axios.post(
          `${apiUrl}/api/product/addproduct`,
          formData,
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
              "Content-Type": "multipart/form-data", // Ensure correct content type for file upload
            },
          }
        );
        console.log(response.data);
        toast.success("Product added successfully!");

        setProduct({
          title: "",
          description: "",
          price: "",
          inStock: "",
          image: null,
        });
        setErrors({
          title: "",
          description: "",
          price: "",
          inStock: "",
          image: "",
        });

      
          navigate("/products");
        
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add product");
        console.error(error);
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setProduct({
        ...product,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
    // Clear the error for the changed field
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="container mt-4">
      <h4>Add your product here !!</h4>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="form-control"
            id="title"
          />
          {errors.title && <div className="text-danger">{errors.title}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="form-control"
            id="description"
          />
          {errors.description && (
            <div className="text-danger">{errors.description}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="form-control"
            id="price"
          />
          {errors.price && <div className="text-danger">{errors.price}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="inStock">
            inStock
          </label>
          <input
            type="number"
            name="inStock"
            value={product.inStock}
            onChange={handleChange}
            className="form-control"
            id="inStock"
          />
          {errors.inStock && (
            <div className="text-danger">{errors.inStock}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="form-control"
            id="image"
          />
          {errors.image && <div className="text-danger">{errors.image}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
