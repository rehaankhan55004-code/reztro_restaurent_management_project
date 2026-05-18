"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Logo from "@/public/Logo.svg";


import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    InputGroup,
} from "react-bootstrap";

import {
    Envelope,
    Lock,
    Person,
} from "react-bootstrap-icons";
import { useRouter } from "next/navigation";
import Image from "next/image";

const schema = yup.object({
    fullName: yup
        .string()
        .required("Full name is required"),

    email: yup
        .string()
        .email("Enter valid email")
        .required("Email is required"),

    password: yup
        .string()
        .min(6, "Minimum 6 characters required")
        .required("Password is required"),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm your password"),
});

export default function SignupPage() {

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
        router.push("/signin")

    };

    return (
        <Container fluid className="min-vh-100 p-0">
            <Row className="g-0 flex-column flex-lg-row min-vh-100">

                {/* LEFT SIDE */}

                <Col
                    xs={12}
                    lg={6}
                    className="bg-primary d-flex align-items-center justify-content-center px-4 px-lg-5 py-5"
                >
                    <div
                        className="text-white w-100 mx-auto"
                        style={{ maxWidth: "600px" }}
                    >

                        {/* LOGO */}
                        <div className="mb-5">
                            <div className="bg-white rounded-4 p-3 shadow d-inline-flex">
                                <Image
                                    src={Logo}
                                    alt="Logo"
                                    width={110}
                                    height={110}
                                    className="img-fluid"
                                />
                            </div>
                        </div>

                        {/* HEADING */}
                        <div className="mb-5">

                            <h1 className="display-4 fw-bold lh-sm mb-3">
                                Smart Restaurant Management Platform
                            </h1>

                            <p className="fs-5 text-white-50 mb-0">
                                Simplify your restaurant operations with order
                                management, analytics, customer handling,
                                and reservations — all in one place.
                            </p>

                        </div>

                        {/* FEATURES */}
                        <div className="d-flex flex-column gap-4">

                            {/* FEATURE */}
                            <div className="d-flex align-items-start gap-3">

                                <div className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0 px-3 py-2">
                                    ✓
                                </div>

                                <div className="text-start">

                                    <h5 className="fw-semibold mb-1">
                                        Easy Order Tracking
                                    </h5>

                                    <p className="text-white-50 mb-0">
                                        Manage restaurant orders efficiently
                                        with a seamless workflow.
                                    </p>

                                </div>

                            </div>

                            {/* FEATURE */}
                            <div className="d-flex align-items-start gap-3">

                                <div className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0 px-3 py-2">
                                    ✓
                                </div>

                                <div className="text-start">

                                    <h5 className="fw-semibold mb-1">
                                        Secure Dashboard
                                    </h5>

                                    <p className="text-white-50 mb-0">
                                        Secure access with a modern and
                                        user-friendly dashboard experience.
                                    </p>

                                </div>

                            </div>

                            {/* FEATURE */}
                            <div className="d-flex align-items-start gap-3">

                                <div className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0 px-3 py-2">
                                    ✓
                                </div>

                                <div className="text-start">

                                    <h5 className="fw-semibold mb-1">
                                        Smart Analytics
                                    </h5>

                                    <p className="text-white-50 mb-0">
                                        Get real-time business insights
                                        and performance analytics instantly.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>
                </Col>

                {/* RIGHT SIDE */}
                <Col
                    xs={12}
                    lg={6}
                    className="bg-light d-flex align-items-center justify-content-center p-4"
                >

                    <Card
                        className="border-0 shadow-lg w-100 rounded-4"
                        style={{ maxWidth: "520px" }}
                    >
                        <Card.Body className="p-4 p-md-5">

                            <div className="text-center mb-5">

                                <h2 className="fw-bold mb-2">
                                    Create Account
                                </h2>

                                <p className="text-muted mb-0">
                                    Sign up to access your dashboard
                                </p>
                            </div>

                            <Form onSubmit={handleSubmit(onSubmit)}>

                                {/* FULL NAME */}
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">
                                        Full Name
                                    </Form.Label>

                                    <InputGroup>

                                        <InputGroup.Text className="bg-white border-end-0">
                                            <Person />
                                        </InputGroup.Text>

                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your full name"
                                            className="border-start-0 py-3 shadow-none"
                                            {...register("fullName")}
                                            isInvalid={!!errors.fullName}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.fullName?.message}
                                        </Form.Control.Feedback>

                                    </InputGroup>
                                </Form.Group>

                                {/* EMAIL */}
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">
                                        Email Address
                                    </Form.Label>

                                    <InputGroup>

                                        <InputGroup.Text className="bg-white border-end-0">
                                            <Envelope />
                                        </InputGroup.Text>

                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            className="border-start-0 py-3 shadow-none"
                                            {...register("email")}
                                            isInvalid={!!errors.email}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.email?.message}
                                        </Form.Control.Feedback>

                                    </InputGroup>
                                </Form.Group>

                                {/* PASSWORD */}
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">
                                        Password
                                    </Form.Label>

                                    <InputGroup>

                                        <InputGroup.Text className="bg-white border-end-0">
                                            <Lock />
                                        </InputGroup.Text>

                                        <Form.Control
                                            type="password"
                                            placeholder="Create password"
                                            className="border-start-0 py-3 shadow-none"
                                            {...register("password")}
                                            isInvalid={!!errors.password}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.password?.message}
                                        </Form.Control.Feedback>

                                    </InputGroup>
                                </Form.Group>

                                {/* CONFIRM PASSWORD */}
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">
                                        Confirm Password
                                    </Form.Label>

                                    <InputGroup>

                                        <InputGroup.Text className="bg-white border-end-0">
                                            <Lock />
                                        </InputGroup.Text>

                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm your password"
                                            className="border-start-0 py-3 shadow-none"
                                            {...register("confirmPassword")}
                                            isInvalid={!!errors.confirmPassword}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirmPassword?.message}
                                        </Form.Control.Feedback>

                                    </InputGroup>
                                </Form.Group>

                                {/* BUTTON */}
                                <Button
                                    type="submit"
                                    className="w-100 py-3 fw-semibold rounded-3 bg-primary border-0 text-white"
                                >
                                    Create Account
                                </Button>

                            </Form>

                            {/* FOOTER */}
                            <div className="text-center mt-4">

                                <span className="text-muted">
                                    Already have an account?
                                </span>

                                <button
                                    type="button"
                                    onClick={() => router.push("/signin")}
                                    className="btn btn-link text-primary fw-bold text-decoration-none ms-2 p-0"
                                >
                                    Login
                                </button>

                            </div>

                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Container>
    );
}