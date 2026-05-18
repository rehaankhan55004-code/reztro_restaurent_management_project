"use client";

import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ProductForm({ initialData, onSubmit, buttonText }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemName: initialData?.itemName || "",
      image: initialData?.image || "",
      category: initialData?.category || "",
      status: initialData?.status || "",
      qtyInStock: initialData?.qtyInStock || "",
      qtyInReorder: initialData?.qtyInReorder || "",
    },
  });

  const [imageType, setImageType] = useState("url");
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="product-form-card">
      <Row className="g-4">
        <Col lg={8}>
          <div className="form-section">
            <h5>Product Information</h5>

            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                placeholder="Fresh Salmon"
                isInvalid={!!errors.itemName}
                {...register("itemName", {
                  required: "Product name is required",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.itemName?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>

              <div className="image-option-tabs d-flex gap-2 mb-2">
                <Button
                  type="button"
                  className={imageType === "url" ? "active" : ""}
                  onClick={() => setImageType("url")}
                >
                  Image URL
                </Button>

                <Button
                  type="button"
                  className={imageType === "file" ? "active" : ""}
                  onClick={() => setImageType("file")}
                >
                  Choose File
                </Button>
              </div>

              {imageType === "url" ? (
                <Form.Control
                  placeholder="Paste image URL"
                  isInvalid={!!errors.image}
                  {...register("image")}
                  onChange={(e) => {
                    setValue("image", e.target.value);
                    setImagePreview(e.target.value);
                  }}
                />
              ) : (
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const imageUrl = URL.createObjectURL(file);
                    setImagePreview(imageUrl);
                    setValue("image", imageUrl);
                  }}
                />
              )}

              {imagePreview && (
                <div className="image-preview mt-3">
                  <img src={imagePreview} alt="Product preview" />
                </div>
              )}
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    placeholder="Food Ingredients"
                    isInvalid={!!errors.category}
                    {...register("category", {
                      required: "Category is required",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.category?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    placeholder="Available / Low / Out of Stock"
                    isInvalid={!!errors.status}
                    {...register("status", {
                      required: "Status is required",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.status?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Col>

        <Col lg={4}>
          <div className="form-section">
            <h5>Stock Details</h5>

            <Form.Group className="mb-3">
              <Form.Label>Qty in Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="45"
                isInvalid={!!errors.qtyInStock}
                {...register("qtyInStock", {
                  required: "Stock quantity is required",
                  min: { value: 0, message: "Minimum value is 0" },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.qtyInStock?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Qty in Reorder</Form.Label>
              <Form.Control
                type="number"
                placeholder="50"
                isInvalid={!!errors.qtyInReorder}
                {...register("qtyInReorder", {
                  required: "Reorder quantity is required",
                  min: { value: 0, message: "Minimum value is 0" },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.qtyInReorder?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100 product-submit-btn">
              {buttonText}
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}