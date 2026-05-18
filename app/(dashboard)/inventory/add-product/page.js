"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/inventory/ProductForm";
import { addInventoryItem } from "@/utils/InventoryStorage";
import { toast } from "react-toastify";
import "@/styles/inventory/addProduct/addProducts.scss";

export default function AddProductPage() {
  const router = useRouter();

  const handleAddProduct = (data) => {
    addInventoryItem(data);

    toast.success("Product added successfully!");

    setTimeout(() => {
      router.push("/inventory");
    }, 1200);
  };

  return (
    <div className="inventory-action-page">
      <ProductForm buttonText="Add Product" onSubmit={handleAddProduct} />
    </div>
  );
}