//react hook import
import { useEffect, useState } from "react";

//style import
import "./App.css";

//icon imports
import { faMagnifyingGlass } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//component import
import Popup from "./Component/Popup/Popup";
import Confirmation from "./Component/Confirmation/Confirmation";
import ModalItem from "./Component/ModalItem/ModalItem";

function App() {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [modalConfig, setModalConfig] = useState({});
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //config for Modal
  const createConfig = (type, id) => {
    let modalConfigs = {};
    switch (type) {
      case "delete":
        modalConfigs = {
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
        modalConfigs = {
          title: "Add New product",
          close: handleModalClose,
          component: (
            <ModalItem
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
        modalConfigs = {
          title: "Edit product",
          close: handleModalClose,
          component: (
            <ModalItem
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
    setModalConfig(modalConfigs);
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

  //function to add new table
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
        handleModalClose();
      });
  };

  //function to edit existing product
  const handleEdit = (data, id) => {
    fetch(`https://product-fhqo.onrender.com/products/${id}`, {
      method: "PUT",
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
        handleModalClose();
      });
  };

  //function of delete the existing products
  const handleDelete = id => {
    fetch(`https://product-fhqo.onrender.com/products/${id}`, {
      method: "DELETE",
    })
      .then(data => {
        fetchProductTable();
        handleModalClose();
      })
      .catch(res => {
        console.log("failed");
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
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              type="text"
              className="search-input"
              placeholder="Search Products"
            />
          </div>
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
                        style={{ backgroundColor: "green" }}
                        onClick={() => createConfig("edit", item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn"
                        style={{ backgroundColor: "red" }}
                        onClick={() => createConfig("delete", item.id)}
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
