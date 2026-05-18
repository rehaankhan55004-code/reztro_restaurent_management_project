"use client";

import { useMemo, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { Plus, Search, Sliders, X } from "react-bootstrap-icons";
import DataTable from "@/components/common/DataTable";
import { inventoryItems } from "@/data/InventoryData";
import Link from "next/link";
import "@/styles/inventory/InventoryTable.scss";

const getStatusClass = (status) => {
    if (status === "Low") return "low";
    if (status === "Out of Stock") return "out";
    return "available";
};

export default function InventoryPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Category");
    const [status, setStatus] = useState("All Status");
    const [showFilter, setShowFilter] = useState(false);

    const filteredData = useMemo(() => {
        const keyword = search.toLowerCase();

        return inventoryItems.filter((item) => {
            const name = item.itemName || item.name || item.title || "";
            const itemCategory = item.category || "";
            const itemStatus = item.status || "";

            const searchMatch =
                name.toLowerCase().includes(keyword) ||
                itemCategory.toLowerCase().includes(keyword);

            const categoryMatch =
                category === "All Category" || itemCategory === category;

            const statusMatch =
                status === "All Status" || itemStatus === status;

            return searchMatch && categoryMatch && statusMatch;
        });
    }, [search, category, status]);

    const columns = useMemo(
        () => [
            {
                id: "select",
                header: () => <Form.Check />,
                cell: () => <Form.Check />,
                enableSorting: false,
            },
            {
                accessorKey: "itemName",
                header: "Item",
                cell: ({ row }) => (
                    <div className="inventory-item d-flex align-items-center gap-2">
                        {row.original.image ? (
                            <img src={row.original.image} alt={row.original.itemName} />
                        ) : (
                            <div className="item-placeholder" />
                        )}

                        <div>
                            <span>{row.original.itemName}</span>
                            <small>{row.original.category}</small>
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: "category",
                header: "Category",
                meta: { className: "desktop-only-col" },
            },
            {
                accessorKey: "status",
                header: "Status",
                meta: { className: "desktop-only-col" },
                cell: ({ row }) => (
                    <span className={`status-badge ${getStatusClass(row.original.status)}`}>
                        {row.original.status}
                    </span>
                ),
            },
            {
                accessorKey: "qtyInStock",
                header: "Qty in Stock",
                cell: ({ row }) => (
                    <div className="stock-cell">
                        <div className="stock-progress d-flex align-items-center gap-2">
                            <div className="progress-track">
                                <span
                                    style={{
                                        width: `${row.original.qtyInReorder > 0
                                            ? Math.min(
                                                (row.original.qtyInStock / row.original.qtyInReorder) * 100,
                                                100
                                            )
                                            : 0
                                            }%`,
                                    }}
                                />
                            </div>

                            <strong>{row.original.qtyInStock}</strong>
                        </div>

                        <span className={`status-badge ${getStatusClass(row.original.status)}`}>
                            {row.original.status}
                        </span>
                    </div>
                ),
            },
            {
                accessorKey: "qtyInReorder",
                header: "Qty in Reorder",
                meta: { className: "text-center" },
            },
            {
                id: "action",
                header: "Action",
                enableSorting: false,
                cell: () => (
                    <div className="action-btns d-flex align-items-center gap-2">
                        <Button type="button" variant="light" size="sm">
                            Reorder
                        </Button>

                        <Button type="button" className="update-stock-btn" size="sm">
                            Update Stock
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );

    return (
        <Card className="inventory-table-card border-0">
            <Card.Header className="bg-white border-0">
                <div className="inventory-mobile-search d-flex align-items-center gap-2 d-lg-none">
                    <InputGroup className="inventory-search">
                        <InputGroup.Text>
                            <Search size={18} />
                        </InputGroup.Text>

                        <Form.Control
                            placeholder="Search for item"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>

                    <Button
                        type="button"
                        className="inventory-filter-toggle"
                        onClick={() => setShowFilter(true)}
                    >
                        <Sliders size={20} />
                    </Button>
                </div>

                <div className="inventory-table-top d-flex align-items-center justify-content-between gap-3 flex-wrap">
                    <div className="inventory-tabs d-flex align-items-center gap-2">
                        <button type="button" className="active">
                            Inventory
                        </button>

                        <Link href="/purchase-order" className="tab-link">
                            Purchase Order
                        </Link>
                    </div>

                    <div className="inventory-actions d-none d-lg-flex align-items-center gap-2">
                        <InputGroup className="inventory-search">
                            <InputGroup.Text>
                                <Search size={13} />
                            </InputGroup.Text>

                            <Form.Control
                                placeholder="Search for item"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </InputGroup>

                        <Form.Select
                            className="inventory-filter"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>All Category</option>
                            <option>Food Ingredients</option>
                            <option>Kitchen Tools & Equipment</option>
                            <option>Cleaning Supplies</option>
                        </Form.Select>

                        <Form.Select
                            className="inventory-filter"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option>All Status</option>
                            <option>Available</option>
                            <option>Low</option>
                            <option>Out of Stock</option>
                        </Form.Select>

                        <Link
                            href="/inventory/add-product"
                            className="add-product-btn text-decoration-none d-inline-flex justify-content-center align-items-center"
                        >
                            <Plus className="plus" /> Add Product
                        </Link>
                    </div>
                </div>
            </Card.Header>

            {showFilter && (
                <div className="mobile-filter-popup d-lg-none">
                    <div
                        className="mobile-filter-backdrop"
                        onClick={() => setShowFilter(false)}
                    />

                    <div className="mobile-filter-content">
                        <button
                            type="button"
                            className="mobile-filter-close"
                            onClick={() => setShowFilter(false)}
                        >
                            <X />
                        </button>

                        <h5 className="mb-3">Filter</h5>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option>All Category</option>
                                <option>Food Ingredients</option>
                                <option>Kitchen Tools & Equipment</option>
                                <option>Cleaning Supplies</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>All Status</option>
                                <option>Available</option>
                                <option>Low</option>
                                <option>Out of Stock</option>
                            </Form.Select>
                        </Form.Group>

                        <Link
                            href="/inventory/add-product"
                            className="add-product-btn w-100 text-decoration-none d-inline-flex justify-content-center align-items-center"
                        >
                            <Plus className="plus" /> Add Product
                        </Link>
                    </div>
                </div>
            )}

            <Card.Body className="">
                <DataTable data={filteredData} columns={columns} pageSize={10} />
            </Card.Body>
        </Card>
    );
}