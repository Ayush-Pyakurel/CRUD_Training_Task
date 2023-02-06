import { useState, useEffect } from "react";
import styleModalItem from "./ModalItem.module.css";

const ModalItem = ({ config }) => {
  const [formData, setFormData] = useState({ created_by: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (config.id) {
      fetchProduct(config.id);
    }
  }, []);

  //function to fetch individual product
  const fetchProduct = async id => {
    setLoading(true);
    await fetch(`https://product-fhqo.onrender.com/products/${id}`, {
      method: "GET",
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setFormData({ ...data, created_by: data.created_by });
        setLoading(false);
      });
  };

  return (
    <div className={styleModalItem.container}>
      <form className={styleModalItem["form-container"]}>
        <label htmlFor="">
          Name:<span className={styleModalItem.required}>*</span>
        </label>
        <input
          className={styleModalItem["product-input"]}
          type="text"
          onChange={({ target }) =>
            setFormData({ ...formData, product_name: target.value })
          }
          value={formData.product_name}
          placeholder="Add product name"
          required
        />
        <label htmlFor="">
          Category:<span className={styleModalItem.required}>*</span>{" "}
        </label>
        <select
          value={formData.category_name}
          onChange={e =>
            setFormData({ ...formData, category_name: e.target.value })
          }
          required
        >
          <option disabled selected>
            Select a Category
          </option>
          {config.category &&
            config.category.map((data, index) => (
              <option
                key={`category_${index}`}
                value={data}
                style={{ fontFamily: "Rubik" }}
              >
                {data.toUpperCase()}
              </option>
            ))}
        </select>

        <label htmlFor="">
          Status:<span className={styleModalItem.required}>*</span>{" "}
        </label>
        <select
          value={formData.status}
          onChange={e => setFormData({ ...formData, status: e.target.value })}
          required
        >
          <option disabled selected>
            Select a Status
          </option>
          {config.status &&
            config.status.map((data, index) => (
              <option
                key={`status_${index}`}
                value={data}
                style={{ fontFamily: "Rubik" }}
              >
                {data.toUpperCase()}
              </option>
            ))}
        </select>

        <label htmlFor="">
          Description:<span className={styleModalItem.required}>*</span>{" "}
        </label>
        <textarea
          rows={5}
          value={formData.description}
          onChange={e =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        ></textarea>
      </form>
      {(!formData.product_name ||
        !formData.category_name ||
        !formData.description ||
        !formData.status) && (
        <p style={{ color: "red", fontFamily: "Rubik", textAlign: "center" }}>
          Field with * must be entered!
        </p>
      )}
      <div className={styleModalItem["btn-container"]}>
        <button
          className={styleModalItem.btn}
          style={{ background: "#058305" }}
          onClick={() => config.onConfirm(formData, config.id)}
          disabled={
            loading ||
            !formData.product_name ||
            !formData.category_name ||
            !formData.description ||
            !formData.status
          }
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
