// import React, { useState } from "react";
// import { toast } from "react-toastify";

// const EditModal = ({ prod, isOpen, onClose, onSave }) => {
//   if (!isOpen) return null;
//   const [formData, setFormData] = useState({
//     title: prod.title,
//     description: prod.description,
//     price: prod.price,
//     inStock: prod.inStock,
//   });

  
//   const handleChange = (e) => {
//     // console.log("handle change");
//     if (e.target.type == "file") {
//       setFormData({
//         ...formData,
//         [e.target.name]: e.target.files[0],
//       });
//       console.log(e.target.files[0]);
//     } else {
//       setFormData({
//         ...formData,
//         [e.target.name]: e.target.value,
//       });
//     }
//   };



//   const handleSave = async () => {
//     try {
//       await onSave(formData);
//       toast.success("Product updated successfully!");
//       onClose();
//     } catch (error) {
//       toast.error("Failed to update product");
//       console.error("Error updating product:", error);
//     }
//   };





//   return (
//     <div>
//       <div
//         className="modal d-block"
//         style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Edit Product</h5>
//               <button
//                 className="btn-close"
//                 type="button"
//                 onClick={onClose}
//               ></button>
//             </div>
//             <div className="modal-body">
//               <form action="">
//                 <div className="mb-3">
//                   <label htmlFor="title" className="form-label">
//                     Title:
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     id="title"
//                     className="form-control"
//                     value={formData.title}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="price" className="form-label">
//                     Price:
//                   </label>
//                   <input
//                     type="number"
//                     name="price"
//                     id="price"
//                     className="form-control"
//                     value={formData.price}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="description" className="form-label">
//                     Description:
//                   </label>
//                   <input
//                     type="text"
//                     name="description"
//                     id="description"
//                     className="form-control"
//                     value={formData.description}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="inStock" className="form-label">
//                     In Stock:
//                   </label>
//                   <input
//                     type="number"
//                     name="inStock"
//                     id="inStock"
//                     className="form-control"
//                     value={formData.inStock}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </form>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="btn btn-outline-danger"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-outline-primary"
//                 onClick={handleSave}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;













import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const EditModal = ({ prod, isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: prod?.title || "",
    description: prod?.description || "",
    price: prod?.price || "",
    inStock: prod?.inStock || "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    inStock: "",
  });

  useEffect(() => {
    if (prod) {
      setFormData({
        title: prod.title || "",
        description: prod.description || "",
        price: prod.price || "",
        inStock: prod.inStock || "",
      });
      setErrors({
        title: "",
        description: "",
        price: "",
        inStock: "",
      });
    }
  }, [prod, isOpen]);

  const validate = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      description: "",
      price: "",
      inStock: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    } else if (formData.description.trim().length < 5) {
      newErrors.description = "Description must be at least 5 characters long";
      isValid = false;
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number greater than 0";
      isValid = false;
    }

    if (!formData.inStock) {
      newErrors.inStock = "In Stock is required";
      isValid = false;
    } else if (isNaN(Number(formData.inStock)) || Number(formData.inStock) < 0) {
      newErrors.inStock = "In Stock must be a non-negative number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        await onSave(formData);
        toast.success("Product updated successfully!");
        onClose();
      } catch (error) {
        toast.error("Failed to update product");
        console.error("Error updating product:", error);
      }
    }
  };

  return (
    <div>
      <div
        className="modal d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Product</h5>
              <button
                className="btn-close"
                type="button"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  {errors.title && (
                    <div className="text-danger">{errors.title}</div>
                  )}
                </div>
                 <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  {errors.description && (
                    <div className="text-danger">{errors.description}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price:
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  {errors.price && (
                    <div className="text-danger">{errors.price}</div>
                  )}
                </div>
               
                <div className="mb-3">
                  <label htmlFor="inStock" className="form-label">
                    In Stock:
                  </label>
                  <input
                    type="number"
                    name="inStock"
                    id="inStock"
                    className="form-control"
                    value={formData.inStock}
                    onChange={handleChange}
                  />
                  {errors.inStock && (
                    <div className="text-danger">{errors.inStock}</div>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline-danger"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;