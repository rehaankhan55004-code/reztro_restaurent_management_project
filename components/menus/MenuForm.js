"use client";

import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "@/styles/menu/menuForm.scss";


export default function MenuForm({ initialData, onSubmit, buttonText }) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: initialData?.name ||  "",
            image: initialData?.image || "",
            price: initialData?.price || "",
            rating: initialData?.rating || "",
            mealTime: initialData?.mealTime || "",
            category: initialData?.category || "",
            tag: Array.isArray(initialData?.tags)
                ? initialData.tags.join(", ")
                : initialData?.tag || "",
            description: initialData?.description || "",
            values: initialData?.values?.join(", ") || "",
            ingredients: initialData?.ingredients?.join(", ") || "",

            calories:
                initialData?.nutrition?.find((item) => item.label === "Calories")?.value || "",

            proteins:
                initialData?.nutrition?.find((item) => item.label === "Proteins")?.value || "",

            fats:
                initialData?.nutrition?.find((item) => item.label === "Fats")?.value || "",

            carbs:
                initialData?.nutrition?.find((item) => item.label === "Carbs")?.value || "",
        },
    });
    const [imageType, setImageType] = useState(initialData?.image ? "url" : "url");
    const [imagePreview, setImagePreview] = useState(initialData?.image || "");

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="menu-form-card">
            <Row className="g-4">
                <Col lg={8}>
                    <div className="form-section">
                        <h5>Menu Information</h5>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                placeholder="Enter menu name"
                                isInvalid={!!errors.name}
                                {...register("name", { required: "Menu name is required" })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name?.message}
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
                                    <img src={imagePreview} alt="Menu preview" />
                                </div>
                            )}

                            <Form.Control.Feedback type="invalid">
                                {errors.image?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Row>
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="9"
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

                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.1"
                                        placeholder="4.6"
                                        isInvalid={!!errors.rating}
                                        {...register("rating", {
                                            required: "Rating is required",
                                            min: { value: 1, message: "Minimum rating is 1" },
                                            max: { value: 5, message: "Maximum rating is 5" },
                                        })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.rating?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        placeholder="Beverages"
                                        isInvalid={!!errors.category}
                                        {...register("category", { required: "Category is required" })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.category?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tag</Form.Label>
                                    <Form.Control
                                        placeholder="Popular, Customizable"
                                        isInvalid={!!errors.tag}
                                        {...register("tag")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.tag?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter description"
                                isInvalid={!!errors.description}
                                {...register("description", {
                                    required: "Description is required",
                                    minLength: {
                                        value: 10,
                                        message: "Description must be at least 10 characters",
                                    },
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Values</Form.Label>
                            <Form.Control
                                placeholder="Tropical & Refreshing, Creamy & Indulgent"
                                isInvalid={!!errors.values}
                                {...register("values", { required: "Values are required" })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.values?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                </Col>

                <Col lg={4}>
                    <div className="form-section">

                        <Form.Group className="mb-3">
                            <Form.Label>Meal Time</Form.Label>
                            <Form.Control
                                placeholder="Breakfast, Lunch, Dinner"
                                isInvalid={!!errors.mealTime}
                                {...register("mealTime", {
                                    required: "Meal time is required",
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.mealTime?.message}
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Ingredients</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Mango, Coconut milk, Banana"
                                isInvalid={!!errors.ingredients}
                                {...register("ingredients", {
                                    required: "Ingredients are required",
                                })}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.ingredients?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Calories</Form.Label>
                                    <Form.Control
                                        placeholder="320 Kcal"
                                        isInvalid={!!errors.calories}
                                        {...register("calories", {
                                            required: "Calories is required",
                                        })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.calories?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Proteins</Form.Label>
                                    <Form.Control
                                        placeholder="5 gram"
                                        isInvalid={!!errors.proteins}
                                        {...register("proteins", {
                                            required: "Proteins is required",
                                        })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.proteins?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Fats</Form.Label>
                                    <Form.Control
                                        placeholder="12 gram"
                                        isInvalid={!!errors.fats}
                                        {...register("fats", {
                                            required: "Fats is required",
                                        })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fats?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-4">
                                    <Form.Label>Carbs</Form.Label>
                                    <Form.Control
                                        placeholder="50 gram"
                                        isInvalid={!!errors.carbs}
                                        {...register("carbs", {
                                            required: "Carbs is required",
                                        })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.carbs?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Button type="submit" className="w-100 edit-menu-btn mt-3">
                    {buttonText}
                </Button>
            </Row>
        </Form>
    );
}