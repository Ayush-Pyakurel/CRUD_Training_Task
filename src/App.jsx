import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "./App.css";
import Popup from "./Component/Popup/Popup";
import { ConfirmationNumber } from "@mui/icons-material";
import Confirmation from "./Component/Confirmation/Confirmation";
import AddProduct from "./Component/AddProduct/AddProduct";

function App() {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [modalConfig, setModalConfig] = useState({});
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //config for Modal
  const createConfig = (type, id) => {
    let configs = {};
    switch (type) {
      case "delete":
        configs = {
          title: "Confirm Delete",
          close: handleModalClose,
          component: (
            <Confirmation
              config={{
                close: handleModalClose,
                onConfirm: handleDelete,
                id: id,
              }}
            />
          ),
        };
        break;
      case "add":
        configs = {
          title: "Add product",
          close: handleModalClose,
          component: (
            <AddProduct
              config={{
                close: handleModalClose,
                category,
                status,
                onConfirm: handleAddNewProduct,
              }}
            />
          ),
        };
        break;
      case "edit":
        configs = {
          title: "Edit product",
          close: handleModalClose,
          component: (
            <AddProduct
              config={{
                close: handleModalClose,
                category,
                status,
                onConfirm: handleEdit,
                id,
              }}
            />
          ),
        };
        break;
    }
    setModalConfig(configs);
    setShowModal(true);
  };

  //function to close the modal
  const handleModalClose = () => {
    setShowModal(false);
  };

  //function to fetch the products
  const fetchProductTable = () => {
    setLoading(true);
    fetch("https://product-fhqo.onrender.com/products", {
      method: "GET",
    })
      .then(data => {
        return data.json();
      })
      .then(res => {
        const value = res;
        setProduct(value.products);
        setCategory(value.product_categories);
        setStatus(value.product_status);
        setLoading(false);
      });
  };

  const handleAddNewProduct = data => {
    fetch("https://product-fhqo.onrender.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(data => {
        return data.json();
      })
      .then(res => {
        fetchProductTable();
        handlePopupClose();
      });
  };

  useEffect(() => {
    fetchProductTable();
  }, []);

  return (
    <>
      <section className="main-container">
        <h4>This is CRUD</h4>
        <div className="top-bar">
          <button className="add-btn" onClick={() => createConfig("add")}>
            Add a new Product
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="Search Products"
          />
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {product.length > 0 && !loading ? (
                product.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.product_name}</td>
                    <td>{item.category_name}</td>
                    <td>{item.description}</td>
                    <td>{item.created_at}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => createConfig("edit")}
                      >
                        Edit
                      </button>
                      <button
                        className="btn"
                        onClick={() => createConfig("delete")}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="no-data">
                    Loading....
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {showModal && <Popup config={modalConfig} />}
      </section>
    </>
  );
}

export default App;
