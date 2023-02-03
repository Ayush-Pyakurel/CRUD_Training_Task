import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function App() {
  const [product, setProduct] = useState();
  const [row, setRow] = useState();

  // const queryClient = useQuery({
  //   queryKey: ["product"],
  //   queryFn: () => {},
  // });
  const dummy = [
    {
      id: 1,
      name: "Jon Snow",
      email: "jonsnow@gmail.com",
      age: 35,
      phone: "(665)121-5454",
      address: "0912 Won Street, Alabama, SY 10001",
      city: "New York",
      zipCode: "10001",
      registrarId: 123512,
    },
  ];

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "registrarId", headerName: "Registered Id" },
    {
      field: "name",
      headerName: "Name",
      // flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "email", headerName: "Email" },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      type: "number",
      // flex: 2,
      headerName: "Phone",
      headerAlign: "left",
      align: "left",
      hideable: false,
    },
    { field: "address", headerName: "Address", flex: 1 },
    {
      field: "city",
      headerName: "City",
      // flex: 1,
      align: "center",
      headerAlign: "center",
    },
    { field: "zipCode", headerName: "ZipCode" },
  ];

  const fetchProductTable = () => {
    fetch("https://product-fhqo.onrender.com/products", {
      method: "GET",
    })
      .then(data => {
        return data.json();
      })
      .then(res => {
        const value = res;

        setProduct(value);
        console.log(product, "p");
      });
  };

  useEffect(() => {
    fetchProductTable();
  }, []);

  return (
    <Box
      m="20px"
      display="flex"
      justifyContent="center"
      alignItem="center"
      border="1px solid red"
      padding='5px'
    >
      <Box height="75vh" border="1px solid green" width="100%">
        <DataGrid rows={dummy} columns={columns} />
      </Box>
    </Box>
  );
}

export default App;
