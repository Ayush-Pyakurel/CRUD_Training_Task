import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "./App.css";
import Topbar from "./Component/Topbar";

function App() {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(false);

  // const queryClient = useQuery({
  //   queryKey: ["product"],
  //   queryFn: () => {},
  // });

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

  useEffect(() => {
    fetchProductTable();
  }, []);

  return (
    <>
      <section className="main-container">
        <h4>This is CRUD</h4>
        <div className="top-bar">
          <button className="add-btn">Add a new Product</button>
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
              <tr>
                <td>195</td>
                <td>Cheese Ball</td>
                <td>Dairy</td>
                <td>Description</td>
                <td>2023-02-02</td>
                <td>in_stock</td>
                <td>
                  <button className="btn">Edit</button>
                  <button className="btn">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default App;
