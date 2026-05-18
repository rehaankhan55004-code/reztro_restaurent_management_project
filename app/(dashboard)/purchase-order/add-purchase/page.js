"use client";

import { useRouter } from "next/navigation";
import PurchaseForm from "@/components/purchase/PurchaseForm";
import { addPurchaseOrder } from "@/utils/PurchaseStorage";
import { toast } from "react-toastify";

export default function AddPurchasePage() {
    const router = useRouter();

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        });
    };

    const handleAddPurchase = (data) => {
        const finalData = {
            ...data,
            orderDate: formatDate(data.orderDate),
            arrivalDate: formatDate(data.arrivalDate),
        };

        addPurchaseOrder(finalData);
        toast.success("Purchase order added successfully!");

        setTimeout(() => {
            router.push("/purchase-order");
        }, 1200);
    };


    return (
        <div className="purchase-action-page">
            <PurchaseForm buttonText="Add Purchase" onSubmit={handleAddPurchase} />
        </div>
    );
}