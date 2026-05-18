"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MenuForm from "@/components/menus/MenuForm";
import { getMenuById, updateMenu } from "@/utils/MenuStorage";
import { toast } from "react-toastify";

export default function EditMenuPage() {
  const { id } = useParams();
  const router = useRouter();

  const [menu, setMenu] = useState(null);

  useEffect(() => {
    setMenu(getMenuById(id));
  }, [id]);

  const handleUpdateMenu = (data) => {
    const tagList = data.tag
      ? data.tag.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const finalData = {
      ...menu,
      name: data.name,
      image: data.image,
      price: Number(data.price),
      rating: Number(data.rating),
      category: data.category,
      tags: tagList,
      tag: tagList[0] || "",
      label: tagList[0] || "",
      mealTime: data.mealTime,
      description: data.description,
      values: data.values
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      ingredients: data.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      nutrition: [
        { label: "Calories", value: data.calories, unit: "Kcal" },
        { label: "Proteins", value: data.proteins, unit: "gram" },
        { label: "Fats", value: data.fats, unit: "gram" },
        { label: "Carbs", value: data.carbs, unit: "gram" },
      ],
    };

    updateMenu(id, finalData);

    toast.success("Menu updated successfully!");

    setTimeout(() => {
      router.push(`/menu/menuDetails/${id}`);
    }, 1200);
  };

  if (!menu) return <p>Menu not found</p>;

  return (
    <div className="menu-action-page">
      <MenuForm
        initialData={menu}
        buttonText="Update Menu"
        onSubmit={handleUpdateMenu}
      />
    </div>
  );
}