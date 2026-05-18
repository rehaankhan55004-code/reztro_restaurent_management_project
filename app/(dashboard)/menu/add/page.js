"use client";

import { useRouter } from "next/navigation";
import MenuForm from "@/components/menus/MenuForm";
import { addMenu } from "@/utils/MenuStorage";
import { toast } from "react-toastify";

export default function AddMenuPage() {
  const router = useRouter();

  const handleAddMenu = (data) => {
  const finalData = {
    name: data.name,
    image: data.image,
    price: Number(data.price),
    rating: Number(data.rating),
    category: data.category,
    tag: data.tag,
    mealTime: data.mealTime,
    description: data.description,
    values: data.values.split(",").map((item) => item.trim()).filter(Boolean),
    ingredients: data.ingredients.split(",").map((item) => item.trim()).filter(Boolean),
    nutrition: {
      calories: data.calories,
      proteins: data.proteins,
      fats: data.fats,
      carbs: data.carbs,
    },
  };

  addMenu(finalData);

  toast.success("Menu added successfully!");

  setTimeout(() => {
    router.push("/menu");
  }, 1200);
};

  return (
    <div className="menu-action-page">
      <MenuForm buttonText="Add Menu" onSubmit={handleAddMenu} />
    </div>
  );
}