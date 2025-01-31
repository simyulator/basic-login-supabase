import React, { useState, FormEvent, ChangeEvent } from "react";
import { Modal, Label, TextInput, Button } from "flowbite-react";
import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../../../supabaseClient";
import { Product } from "../../../types/Product";

interface ProductModalProps {
  openModal: boolean;
  onCloseModal: () => void;
  product: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({
  openModal,
  onCloseModal,
  product,
}) => {
  const [formData, setFormData] = useState<Product>({
    id: product?.id || 0,
    name: product?.name || "",
    color: product?.color || "",
    category: product?.category || "",
    price: product?.price || 0,
  });

  const queryClient = useQueryClient();

  const createProduct = useMutation(
    async (newProduct: Omit<Product, "id">) => {
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
    async (updatedProduct: Product) => {
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (product) {
      updateProduct.mutate({ ...formData, id: product.id });
    } else {
      createProduct.mutate(formData);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="color" value="Color" />
            </div>
            <TextInput
              name="color"
              placeholder="Red"
              value={formData.color}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="category" value="Category" />
            </div>
            <TextInput
              name="category"
              placeholder="Fruit"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Price" />
            </div>
            <TextInput
              name="price"
              type="number"
              placeholder="1.00"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <Button color="blue" type="submit">
            Save
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
