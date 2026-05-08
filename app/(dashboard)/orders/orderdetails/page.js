"use client";

import { useSearchParams } from "next/navigation";
import {
    Card,
    Row,
    Col,
    Table,
    Badge,
    Button,
    Container
} from "react-bootstrap";

import {
    CheckCircle,
    X,
    CircleDashed
} from "lucide-react";

import { orderCards } from "@/data";
import { Check, GeoAlt } from "react-bootstrap-icons";

export default function OrderDetailsPage() {

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

    const searchParams = useSearchParams();

    const id = searchParams.get("id");

    const order = orderCards.find(
        (item) => item.id === Number(id)
    );

    if (!order) {
        return <div>Order Not Found</div>;
    }

    return (
        <div className="bg-dashboard py-4">

            <Container fluid>

                {/* MAIN LAYOUT */}
                <Row className="g-4 align-items-start">

                    {/* LEFT */}
                    <Col xl={8} xxl={9}>

                        <div className="p-4 bg-white rounded-4 h-100">

                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">

                                <div className="d-flex align-items-center gap-2 flex-wrap">

                                    <h3 className="fw-bold mb-0">
                                        Order ID{" "}
                                        <span className="text-primary">
                                            #{order.orderId}
                                        </span>
                                    </h3>

                                    <Badge
                                        bg="info"
                                        text="primary"
                                        className="fw-normal px-2 py-1"
                                    >
                                        {order.orderType}
                                    </Badge>

                                </div>

                                <Badge
                                    className={`d-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-normal border-0 ${statusConfig[order.status]?.class}`}
                                >
                                    {statusConfig[order.status]?.icon}
                                    {order.status}
                                </Badge>

                            </div>

                            {/* ORDER LIST */}
                            <Card className="border rounded-4 mb-4 overflow-hidden">

                                <Card.Body className="p-3 p-md-4">

                                    <h5 className="fw-semibold mb-3">
                                        Order List
                                    </h5>

                                    <Table responsive borderless className="mb-0">

                                        <thead className="border-bottom">

                                            <tr className="text-muted small fw-normal">
                                                <th>Item</th>
                                                <th>Qty</th>
                                                <th>Price</th>
                                                <th>Total</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {order.items.map((item) => (

                                                <tr
                                                    key={item.id}
                                                    className="align-middle border-bottom"
                                                >

                                                    <td>
                                                        <div className="d-flex align-items-center gap-3">

                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="rounded-4 flex-shrink-0 object-fit-cover"
                                                                style={{
                                                                    width: "52px",
                                                                    height: "52px",
                                                                }}
                                                            />

                                                            <div>
                                                                <div className="fw-medium">
                                                                    {item.name}
                                                                </div>
                                                                <div className="text-muted small">
                                                                    Food Item
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </td>

                                                    <td>{item.qty}</td>
                                                    <td>${item.price}</td>
                                                    <td>
                                                        ${(item.qty * item.price).toFixed(2)}
                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </Table>

                                    <div className="d-flex justify-content-end align-items-center gap-3 mt-4 pt-2">

                                        <span className="text-muted">
                                            Total Amount
                                        </span>

                                        <h4 className="fw-bold mb-0">
                                            ${order.totalAmount}
                                        </h4>

                                    </div>

                                </Card.Body>

                            </Card>

                        </div>

                    </Col>

                    {/* RIGHT */}
                    <Col xl={4} xxl={3}>

                        <div className="bg-white p-4 rounded-4">

                            {/* CUSTOMER */}
                            <Card className="border rounded-4 mb-4">

                                <Card.Body className="p-4">

                                    <h5 className="fw-semibold mb-4">
                                        Customer
                                    </h5>

                                    <div className="text-center mb-4">

                                        <div
                                            className="bg-warning-subtle rounded-circle mx-auto mb-3"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                            }}
                                        />

                                        <h6 className="fw-semibold mb-0">
                                            {order.customerName}
                                        </h6>

                                    </div>

                                    <hr />

                                    <div className="small text-muted mb-3">
                                        Address : 789 Oak Lane
                                    </div>

                                    <div className="small text-muted mb-3">
                                        Email : customer@gmail.com
                                    </div>

                                    <div className="small text-muted mb-4">
                                        Phone : (555) 345-7890
                                    </div>

                                    <div className="d-flex gap-2">

                                        <Button variant="light" className="w-100 rounded-3 py-2">
                                            Send Message
                                        </Button>

                                        <Button variant="primary" className="w-100 rounded-3 text-white py-2">
                                            Make a Call
                                        </Button>

                                    </div>

                                </Card.Body>

                            </Card>

                            {/* ORDER TRACKING */}
                            <Card className="border rounded-4">

                                <Card.Body className="p-4">

                                    <div className="d-flex justify-content-between align-items-center mb-4">

                                        <h5 className="fw-semibold mb-0">
                                            Order Tracking
                                        </h5>

                                        <div className="text-muted fs-4 lh-1">...</div>

                                    </div>

                                    <div className="gap-4 d-flex flex-column">

                                        {/* DELIVERED */}
                                        <div className="d-flex align-items-center">

                                            <div
                                                className="small flex-shrink-0"
                                                style={{ width: "70px" }}
                                            >
                                                <div className="text-muted">
                                                    Oct 12, 2035
                                                </div>

                                                <div className="text-dark fw-medium">
                                                    11:30 AM
                                                </div>
                                            </div>

                                            <div
                                                className="d-flex align-items-center justify-content-center rounded-circle border border-primary mx-3"
                                                style={{
                                                    width: "42px",
                                                    height: "42px",
                                                }}
                                            >
                                                <GeoAlt
                                                    className="text-primary"
                                                    size={18}
                                                />
                                            </div>

                                            <div className="fw-medium">
                                                Delivered
                                            </div>

                                        </div>

                                        {/* OUT FOR DELIVERY */}
                                        <div className="d-flex align-items-center">

                                            <div
                                                className="small flex-shrink-0"
                                                style={{ width: "70px" }}
                                            >
                                                <div className="text-muted">
                                                    Oct 12, 2035
                                                </div>

                                                <div className="text-dark fw-medium">
                                                    11:00 AM
                                                </div>
                                            </div>

                                            <div
                                                className="bg-primary d-flex align-items-center justify-content-center rounded-circle text-white mx-3"
                                                style={{
                                                    width: "42px",
                                                    height: "42px",
                                                }}
                                            >
                                                <Check size={20} />
                                            </div>

                                            <div className="fw-medium">
                                                Out for Delivery
                                            </div>

                                        </div>

                                        {/* PREPARING */}
                                        <div className="d-flex align-items-center">

                                            <div
                                                className="small flex-shrink-0"
                                                style={{ width: "70px" }}
                                            >
                                                <div className="text-muted">
                                                    Oct 12, 2035
                                                </div>

                                                <div className="text-dark fw-medium">
                                                    10:30 AM
                                                </div>
                                            </div>

                                            <div
                                                className="bg-primary d-flex align-items-center justify-content-center rounded-circle text-white mx-3"
                                                style={{
                                                    width: "42px",
                                                    height: "42px",
                                                }}
                                            >
                                                <Check size={20} />
                                            </div>

                                            <div className="fw-medium">
                                                Preparing Food
                                            </div>

                                        </div>

                                        {/* CONFIRMED */}
                                        <div className="d-flex align-items-center">

                                            <div
                                                className="small flex-shrink-0"
                                                style={{ width: "70px" }}
                                            >
                                                <div className="text-muted">
                                                    Oct 12, 2035
                                                </div>

                                                <div className="text-dark fw-medium">
                                                    10:18 AM
                                                </div>
                                            </div>

                                            <div
                                                className="bg-primary d-flex align-items-center justify-content-center rounded-circle text-white mx-3"
                                                style={{
                                                    width: "42px",
                                                    height: "42px",
                                                }}
                                            >
                                                <Check size={20} />
                                            </div>

                                            <div className="fw-medium">
                                                Order Confirmed
                                            </div>

                                        </div>

                                        {/* PLACED */}
                                        <div className="d-flex align-items-center">

                                            <div
                                                className="small flex-shrink-0"
                                                style={{ width: "70px" }}
                                            >
                                                <div className="text-muted">
                                                    Oct 12, 2035
                                                </div>

                                                <div className="text-dark fw-medium">
                                                    10:15 AM
                                                </div>
                                            </div>

                                            <div
                                                className="bg-primary d-flex align-items-center justify-content-center rounded-circle text-white mx-3"
                                                style={{
                                                    width: "42px",
                                                    height: "42px",
                                                }}
                                            >
                                                <Check size={20} />
                                            </div>

                                            <div className="fw-medium">
                                                Order Placed
                                            </div>

                                        </div>

                                    </div>

                                </Card.Body>

                            </Card>

                        </div>

                    </Col>

                </Row>

            </Container>

        </div>
    );
}