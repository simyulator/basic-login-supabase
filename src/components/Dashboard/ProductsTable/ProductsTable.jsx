import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import ProductModal from "./ProductModal";
import { fetchProducts } from "../../../APIServices/APIServices";
import { useMutation, useQuery, useQueryClient } from "react-query";

const ProductsTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const {
    isError,
    isSuccess,
    isLoading,
    data: productsList,
    error,
  } = useQuery(["products"], fetchProducts);
  const queryClient = useQueryClient();

  const columns = [
    {
      id: 1,
      headerName: "Product name",
    },
    {
      id: 2,
      headerName: "Color",
    },
    {
      id: 3,
      headerName: "Category",
    },
    {
      id: 4,
      headerName: "Price",
    },
    {
      id: 5,
      headerName: "Actions",
    },
  ];

  function onCloseModal() {
    setCurrentProduct(null);
    setOpenModal(false);
  }

  function handleEdit(product) {
    setCurrentProduct(product);
    setOpenModal(true);
  }

  const deleteProduct = useMutation(
    async (productId) => {
      const { error } = await supabase
        .from("apple_products")
        .delete()
        .eq("id", productId);
      if (error) {
        throw new Error(error.message);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );

  async function handleDelete(productId) {
    deleteProduct.mutate(productId);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto ">
      <Button className="my-4" color="blue" onClick={() => setOpenModal(true)}>
        Add Product
      </Button>
      <Table striped hoverable>
        <Table.Head>
          {columns.map((column) => {
            return (
              <Table.HeadCell key={column.id}>
                {column.headerName}
              </Table.HeadCell>
            );
          })}
        </Table.Head>
        <Table.Body className="divide-y">
          {productsList?.map((product) => {
            return (
              <Table.Row key={product.id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {product.name}
                </Table.Cell>
                <Table.Cell>{product.color}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>{`$${product.price}`}</Table.Cell>
                <Table.Cell>
                  <div className="flex space-x-2">
                    <Button
                      color="blue"
                      size="xs"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="blue"
                      size="xs"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <ProductModal
        openModal={openModal}
        onCloseModal={onCloseModal}
        product={currentProduct}
      />
    </div>
  );
};

export default ProductsTable;
