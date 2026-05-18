"use client";

import { useMemo, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { Plus, Search, Sliders2, X } from "react-bootstrap-icons";
import DataTable from "@/components/common/DataTable";
import { purchaseOrders } from "@/data/PurchaseOrderData";
import Link from "next/link";
import "@/styles/purchase/purchaseOrder.scss";

export default function PurchaseOrderPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [showTabletSearch, setShowTabletSearch] = useState(false);

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return purchaseOrders.filter((item) => {
      const matchSearch =
        item.itemName.toLowerCase().includes(keyword) ||
        item.vendorSupplier.toLowerCase().includes(keyword) ||
        item.orderId.toLowerCase().includes(keyword);

      const matchStatus = status === "All" || item.status === status;

      return matchSearch && matchStatus;
    });
  }, [search, status]);

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: () => <Form.Check />,
        cell: () => <Form.Check />,
        enableSorting: false,
      },
      {
        accessorKey: "orderId",
        header: "Order ID",
        cell: ({ row }) => (
          <div className="po-order-cell">
            <strong>{row.original.orderId}</strong>
            <small>{row.original.orderDate}</small>
          </div>
        ),
      },
      {
        accessorKey: "itemName",
        header: "Item",
        cell: ({ row }) => (
          <div className="po-item-cell">
            <small className="po-mobile-category">{row.original.itemCategory}</small>
            <strong>{row.original.itemName}</strong>
            <span className="po-desktop-only">{row.original.itemCategory}</span>
            <span className="po-mobile-vendor">{row.original.vendorSupplier}</span>
          </div>
        ),
      },
      {
        accessorKey: "vendorSupplier",
        header: "Vendor/Supplier",
        meta: { className: "po-desktop-only" },
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
          <span className="po-price">
            ${Number(row.original.price).toFixed(2)}
          </span>
        ),
      },
      {
        accessorKey: "qty",
        header: "Qty",
      },
      {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => (
          <span className="po-price">
            ${Number(row.original.total).toFixed(2)}
          </span>
        ),
      },

      {
        accessorKey: "status",
        header: "Status",
        meta: { className: "po-desktop-only" },
        cell: ({ row }) => (
          <span className={`po-status ${row.original.status.toLowerCase()}`}>
            {row.original.status}
          </span>
        ),
      },
      {
        accessorKey: "deliveryProgress",
        header: "Delivery Status",
        cell: ({ row }) => (
          <div className="po-delivery-cell">
            <span className={`po-status po-mobile-status ${row.original.status.toLowerCase()}`}>
              {row.original.status}
            </span>

            <div className="po-progress-wrap">
              <div className="po-progress">
                <span
                  className={row.original.deliveryProgress === 100 ? "completed" : ""}
                  style={{ width: `${row.original.deliveryProgress}%` }}
                />
              </div>
              <strong>{row.original.deliveryProgress}%</strong>
            </div>

            <small>Arrival: {row.original.arrivalDate}</small>
          </div>
        ),
      },
      {
        id: "action",
        header: "Action",
        enableSorting: false,
        meta: { className: "po-mobile-hide" },
        cell: () => (
          <Button type="button" className="receive-btn" size="sm">
            Receive
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <Card className="purchase-order-card border-0">
      <Card.Header className="bg-white border-0">
        <div className="purchase-mobile-search d-flex align-items-center gap-2 d-lg-none">
          <InputGroup className="purchase-search">
            <InputGroup.Text>
              <Search size={18} />
            </InputGroup.Text>

            <Form.Control
              placeholder="Search message, name, etc"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <Button
            type="button"
            className="purchase-filter-toggle"
            onClick={() => setShowFilter(true)}
          >
            <Sliders2 />
          </Button>

          <Link
            href="/purchase-order/add-purchase"
            className="purchase-mobile-add text-decoration-none d-inline-flex align-items-center justify-content-center"
          >
            <Plus />
          </Link>
        </div>

        <div className="purchase-table-top d-flex justify-content-between align-items-center flex-wrap">
          <div className="purchase-tabs d-flex gap-1">
            {["All", "Pending", "Shipped", "Delivered"].map((item) => (
              <button
                key={item}
                type="button"
                className={status === item ? "active" : ""}
                onClick={() => setStatus(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="purchase-actions d-none d-lg-flex">
            <InputGroup
              className={`purchase-search ${showTabletSearch ? "show-tablet-search" : ""
                }`}
            >
              <InputGroup.Text onClick={() => setShowTabletSearch(true)}>
                <Search size={13} />
              </InputGroup.Text>

              <Form.Control
                placeholder="Search item, vendor, etc"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>

            <Form.Select
              className="purchase-category-filter"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="All">All Category</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </Form.Select>

            <Link
              href="/purchase-order/add-purchase"
              className="add-purchase-btn text-decoration-none d-inline-flex align-items-center justify-content-center"
            >
              <Plus className="plus" /> Add Purchase
            </Link>
          </div>
        </div>
      </Card.Header>
      {showFilter && (
        <div className="purchase-mobile-filter-popup d-md-none">
          <div
            className="purchase-mobile-filter-backdrop"
            onClick={() => setShowFilter(false)}
          />

          <div className="purchase-mobile-filter-content">
            <button
              type="button"
              className="purchase-mobile-filter-close"
              onClick={() => setShowFilter(false)}
            >
              <X />
            </button>

            <h5>Filter</h5>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>All</option>
                <option>Pending</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </Form.Select>
            </Form.Group>

            <Button
              type="button"
              className="add-purchase-btn w-100"
              onClick={() => setShowFilter(false)}
            >
              Apply Filter
            </Button>
          </div>
        </div>
      )}

      <Card.Body className="pt-0">
        <DataTable data={filteredData} columns={columns} pageSize={10} />
      </Card.Body>
    </Card>
  );
}
