"use client";

import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "@/styles/purchase/purchaseForm.scss";

export default function PurchaseForm({ initialData, onSubmit, buttonText }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      orderId: initialData?.orderId || "",
      orderDate: initialData?.orderDate || "",
      itemName: initialData?.itemName || "",
      itemCategory: initialData?.itemCategory || "",
      vendorSupplier: initialData?.vendorSupplier || "",
      price: initialData?.price || "",
      qty: initialData?.qty || "",
      status: initialData?.status || "",
      deliveryProgress: initialData?.deliveryProgress || "",
      arrivalDate: initialData?.arrivalDate || "",
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="purchase-form-card">
      <Row className="g-4">
        <Col lg={8}>
          <div className="form-section">
            <h5>Purchase Information</h5>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Order ID</Form.Label>
                  <Form.Control
                    placeholder="PO1001"
                    isInvalid={!!errors.orderId}
                    {...register("orderId", { required: "Order ID is required" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.orderId?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Order Date</Form.Label>
                  <Form.Control
                    type="date"
                    isInvalid={!!errors.orderDate}
                    {...register("orderDate", { required: "Order date is required" })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.orderDate?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                placeholder="Fresh Salmon"
                isInvalid={!!errors.itemName}
                {...register("itemName", { required: "Item name is required" })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.itemName?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Item Category</Form.Label>
                  <Form.Control
                    placeholder="Food Ingredients"
                    isInvalid={!!errors.itemCategory}
                    {...register("itemCategory", {
                      required: "Category is required",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.itemCategory?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Vendor / Supplier</Form.Label>
                  <Form.Control
                    placeholder="Ocean Fresh Suppliers"
                    isInvalid={!!errors.vendorSupplier}
                    {...register("vendorSupplier", {
                      required: "Vendor supplier is required",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.vendorSupplier?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Col>

        <Col lg={4}>
          <div className="form-section">
            <h5>Order Details</h5>

            <Row>
              <Col md={6} lg={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="15"
                    isInvalid={!!errors.price}
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 1, message: "Price must be greater than 0" },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6} lg={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="10"
                    isInvalid={!!errors.qty}
                    {...register("qty", {
                      required: "Quantity is required",
                      min: { value: 1, message: "Quantity must be greater than 0" },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.qty?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                placeholder="Pending / Shipped / Delivered"
                isInvalid={!!errors.status}
                {...register("status", { required: "Status is required" })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.status?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Delivery Progress</Form.Label>
              <Form.Control
                type="number"
                placeholder="50"
                isInvalid={!!errors.deliveryProgress}
                {...register("deliveryProgress", {
                  required: "Delivery progress is required",
                  min: { value: 0, message: "Minimum value is 0" },
                  max: { value: 100, message: "Maximum value is 100" },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.deliveryProgress?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Arrival Date</Form.Label>
              <Form.Control
                type="date"
                isInvalid={!!errors.arrivalDate}
                {...register("arrivalDate", {
                  required: "Arrival date is required",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.arrivalDate?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100 purchase-submit-btn">
              {buttonText}
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}