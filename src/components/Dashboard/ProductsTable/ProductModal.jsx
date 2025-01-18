import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchProducts } from "../../../APIServices/APIServices";

const ProductModal = ({ openModal, onCloseModal, product }) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    category: "",
    price: "",
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        color: product.color,
        category: product.category,
        price: product.price,
      });
    } else {
      setFormData({
        name: "",
        color: "",
        category: "",
        price: "",
      });
    }
  }, [product, openModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createProduct = useMutation(
    async (newProduct) => {
      const { error } = await supabase
        .from("apple_products")
        .insert(newProduct);
      if (error) {
        throw new Error(error.message);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
        onCloseModal();
      },
    }
  );

  const updateProduct = useMutation(
    async (updatedProduct) => {
      const { error } = await supabase
        .from("apple_products")
        .update(updatedProduct)
        .eq("id", updatedProduct.id);
      if (error) {
        throw new Error(error.message);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
        onCloseModal();
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product) {
      updateProduct.mutate({ ...formData, id: product.id });
    } else {
      createProduct.mutate(formData);
    }
  };

  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} dismissible>
      <Modal.Header>Add a new Product</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Product name" />
            </div>
            <TextInput
              name="name"
              placeholder="Apple"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="color" value="Color" />
            </div>
            <TextInput
              name="color"
              placeholder="Blue"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="category" value="Category" />
            </div>
            <TextInput
              name="category"
              placeholder="Mobile"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Price" />
            </div>
            <TextInput
              name="price"
              placeholder="0"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <Button className="col-span-2" type="submit" color="blue">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
