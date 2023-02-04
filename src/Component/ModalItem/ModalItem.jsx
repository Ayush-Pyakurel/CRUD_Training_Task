import { useState, useEffect } from "react";
import styleModalItem from "./ModalItem.module.css";

const ModalItem = ({ config }) => {
  const [formData, setFormData] = useState({ created_by: "" });

  useEffect(() => {
    if (config.id) {
      fetchProduct(config.id);
    }
  }, []);

  //function to fetch individual product
  const fetchProduct = id => {
    fetch(`https://product-fhqo.onrender.com/products/${id}`, {
      method: "GET",
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setFormData({ ...data, created_by: data.created_by });
      });
  };
  return (
    <div className={styleModalItem.container}>
      <form className={styleModalItem["form-container"]}>
        <label htmlFor="">Name: </label>
        <input
          type="text"
          onChange={({ target }) =>
            setFormData({ ...formData, product_name: target.value })
          }
          value={formData.product_name}
          placeholder="Add product name"
        />

        <label htmlFor="">Category: </label>
        <select
          value={formData.category_name}
          onChange={e =>
            setFormData({ ...formData, category_name: e.target.value })
          }
        >
          <option disabled selected>
            Select a Category
          </option>
          {config.category &&
            config.category.map((data, index) => (
              <option key={`category_${index}`} value={data}>
                {data}
              </option>
            ))}
        </select>

        <label htmlFor="">Status: </label>
        <select
          value={formData.status}
          onChange={e => setFormData({ ...formData, status: e.target.value })}
        >
          <option disabled selected>
            Select a Status
          </option>
          {config.status &&
            config.status.map((data, index) => (
              <option key={`status_${index}`} value={data}>
                {data}
              </option>
            ))}
        </select>

        <label htmlFor="">Description: </label>
        <textarea
          cols={50}
          rows={5}
          value={formData.description}
          onChange={e =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
      </form>
      <div className={styleModalItem["btn-container"]}>
        <button
          className={styleModalItem.btn}
          style={{ background: "#058305" }}
          onClick={() => config.onConfirm(formData, config.id)}
        >
          {config.id ? "Edit" : "Add"}
        </button>
        <button
          className={styleModalItem.btn}
          style={{ color: "black" }}
          onClick={() => config.close()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalItem;
