"use client";

import { CircleDashed } from "lucide-react";
import Image from "next/image";
import { Card, Col } from "react-bootstrap";
import { CheckCircle, X } from "react-bootstrap-icons";

export default function Order_Card({ item, onDetails }) {

  const statusConfig = {
    Completed: {
      class: "bg-success text-primary",
      icon: <CheckCircle size={12} />,
    },
    Cancelled: {
      class: "bg-secondary-subtle text-dark",
      icon: <X size={18} />,
    },
    "On Process": {
      class: "bg-danger text-dark",
      icon: <CircleDashed size={12} />,
    },
  };

  return (
    <Col md={6} lg={4}>
      <Card className="border-0 shadow-sm rounded-4 p-3 h-100">

        {/* TOP */}
        <div className="d-flex justify-content-between text-muted small mb-2">
          <span>{item.date}</span>
          <span>{item.time}</span>
        </div>

        {/* NAME + STATUS */}
        <div className="d-flex justify-content-between align-items-start mb-1">

          {/* LEFT */}
          <div>
            <div className="fw-semibold fs-5">{item.customerName}</div>
            <div className="text-primary small mt-1">#{item.orderId}</div>
          </div>

          {/* RIGHT (STACKED) */}
          <div className="d-flex flex-column align-items-end gap-1">

            {/* STATUS */}
            <span
              className={`px-3 py-1 rounded-pill small d-flex align-items-center gap-1 ${statusConfig[item.status]?.class}`}
            >
              {statusConfig[item.status]?.icon}
              {item.status}
            </span>

            {/* TYPE + TABLE */}
            <div className="d-flex align-items-center gap-2 text-muted small mt-1">
              <span>{item.orderType}</span>

              {item.table && (
                <span className="badge bg-secondary-subtle text-dark rounded-2  fw-normal">
                  {item.table}
                </span>
              )}
            </div>

          </div>
        </div>



        <hr className="my-2" />

        {/* ITEMS */}
        <div className="mb-3">
          <div className="fw-semibold mb-2">Items</div>

          <div
            className="d-flex flex-column gap-2 pe-1"
            style={{ height: "140px", overflowY: "auto" }}
          >
            {item.items.map((it) => (
              <div
                key={it.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center gap-2">

                  <div
                    className="position-relative overflow-hidden rounded-3 bg-light"
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  >
                    <Image
                      src={it.image}
                      alt={it.name || "Food Image"}
                      fill
                      className="object-fit-cover"
                    />
                  </div>
                  <div>
                    <div className="small">{it.name}</div>
                    <div className="text-muted small">x{it.qty}</div>
                  </div>
                </div>

                <div className="small text-secondary">${it.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-2" />

        {/* TOTAL */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-semibold">Total</span>
          <span className="fw-semibold text-primary">
            ${item.totalAmount.toFixed(2)}
          </span>
        </div>

        {/* BUTTONS */}
        <div className="d-flex gap-2">
          <button
            className="btn btn-light btn-sm w-100 rounded-3"
            onClick={onDetails}
          >
            See Details
          </button>

          <button className="btn btn-success btn-sm w-100 rounded-3 text-dark">
            Pay Bills
          </button>
        </div>

      </Card>
    </Col>
  );
}