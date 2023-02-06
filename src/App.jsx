//react hook import
import { useEffect, useState } from "react";

//react router-hook import
import { useSearchParams } from "react-router-dom";

//style import
import "./App.css";

//icon imports
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//component import
import Popup from "./Component/Popup/Popup";
import Confirmation from "./Component/Confirmation/Confirmation";
import ModalItem from "./Component/ModalItem/ModalItem";

//react-toastify import
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  //state hooks to capture api datas
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState([]);

  const [noMatch, setNoMatch] = useState(false);

  //state to capture search input
  const [search, setSearch] = useState("");

  //state hook to capture modal/portal values
  const [modalConfig, setModalConfig] = useState({});
  const [showModal, setShowModal] = useState(false);

  //state hook to capture to loading state
  const [loading, setLoading] = useState(false);

  //hook to capture search param in url
  const [searchParams, setSearchParams] = useSearchParams({ search: "" });
  const searchs = searchParams.get("search");

  useEffect(() => {
    searchProducts(searchs);
    setSearch(searchs);
  }, [searchParams]);

  const searchProducts = string => {
    if (!string || string === "") {
      fetchProductTable();
    } else {
      let filteredProduct = [];
      for (let prod of product) {
        if (
          prod.product_name.startsWith(string) ||
          prod.category_name.startsWith(string)
        ) {
          filteredProduct.push(prod);
        } else {
          setNoMatch(true);
        }
      }
      setProduct(filteredProduct);
    }
  };

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
        toast.success("Product added successfully!");
      })
      .catch(error => {
        toast.error(error.message);
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
        toast.success("Product edit successfully!");
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
      .catch(err => {
        toast.error(err);
      });
  };

  useEffect(() => {
    fetchProductTable();
  }, []);

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <section className="main-container">
        <h1
          style={{
            fontFamily: "Rubik",
            filter: "drop-shadow(8px 8px 6px hsl(0, 2%, 45%))",
            color: "hsl(0, 0%, 22%)",
          }}
        >
          CRUD
        </h1>
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
              onChange={e => setSearchParams({ search: e.target.value })}
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
              {product.length > 0 ? (
                product.map((item, index) => (
                  <tr key={index}>
                    <td style={{ fontFamily: "Rubik", fontSize: "16px" }}>
                      {item.id}
                    </td>
                    <td style={{ fontFamily: "Rubik", fontSize: "16px" }}>
                      {item.product_name}
                    </td>
                    <td style={{ fontFamily: "Rubik", fontSize: "16px" }}>
                      {item.category_name}
                    </td>
                    <td style={{ fontFamily: "Rubik", fontSize: "16px" }}>
                      {item.description}
                    </td>
                    <td style={{ fontFamily: "Rubik", fontSize: "16px" }}>
                      {item.created_at.slice(0, 10)}
                    </td>
                    <td style={{ fontFamily: "Rubik", fontSize: "16px" }}>
                      {item.status}
                    </td>
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
                    {noMatch && !loading
                      ? "No products to display!"
                      : "Loading..."}
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
