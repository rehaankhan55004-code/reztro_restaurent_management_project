"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Navbar,
    Container,
    Form,
    FormControl,
    Button,
    Offcanvas,
    Nav,
    Dropdown
} from "react-bootstrap";

import {
    List,
    Bell,
    Grid,
    Bag,
    ChatDots,
    Calendar3,
    BoxSeam,
    StarFill,
    Search,
    Gear
} from "react-bootstrap-icons";

export default function Header() {
    const [show, setShow] = useState(false);
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    // ✅ FIXED: Inventory parent active for BOTH inventory + purchase-order
    const inventoryActive =
        pathname === "/inventory" ||
        pathname.startsWith("/inventory/") ||
        pathname === "/purchase-order";

    const pathParts = pathname.split("/").filter(Boolean);

    const formatName = (text) =>
        text
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());

    const pageTitle =
        pathParts.length === 0
            ? "Dashboard"
            : formatName(pathParts[pathParts.length - 1]);

    const isDashboard = pathname === "/dashboard" || pathname === "/";

    return (
        <>
            <Navbar className="px-4 py-3 mt-3">
                <Container fluid className="p-0 align-items-start">

                    {/* LEFT TITLE */}
                    <div>
                        <div className="d-md-none mb-2">
                            <Image
                                src="/Symbol.svg"
                                alt="Logo"
                                width={40}
                                height={40}
                            />
                        </div>

                        <h4 className="mb-1 fw-bold">
                            {pageTitle}
                        </h4>

                        {isDashboard ? (
                            <p className="text-muted mb-0">
                                Hello Admin
                            </p>
                        ) : (
                            <div className="small">
                                <span className="text-primary fw-semibold">
                                    Dashboard
                                </span>

                                {pathParts.map((part, index) => (
                                    <span key={index}>
                                        <span className="text-muted"> / </span>
                                        <span className="text-muted">
                                            {formatName(part)}
                                        </span>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* DESKTOP RIGHT */}
                    <div className="d-none d-md-flex align-items-center gap-3 ms-auto">

                        <Form className="d-flex">
                            <div className="position-relative w-100">
                                <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />

                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="ps-5 border-0 rounded-3"
                                />
                            </div>
                        </Form>

                        <Button variant="light">
                            <Bell />
                        </Button>

                        <Button variant="light">
                            <Gear />
                        </Button>

                        <div className="d-flex align-items-center gap-2 ms-2">
                            <div className="text-end lh-sm">
                                <div className="fw-semibold">
                                    Amaan Solanki
                                </div>
                                <small className="text-muted">
                                    admin
                                </small>
                            </div>

                            <Image
                                src="/Symbol.svg"
                                alt="User"
                                width={38}
                                height={38}
                                className="rounded-circle"
                            />
                        </div>

                    </div>

                    {/* MOBILE BUTTON */}
                    <div className="d-md-none ms-auto">
                        <Button
                            variant="light"
                            onClick={() => setShow(true)}
                        >
                            <List size={28} />
                        </Button>
                    </div>

                </Container>
            </Navbar>

            {/* MOBILE OFFCANVAS */}
            <Offcanvas
                show={show}
                onHide={() => setShow(false)}
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Nav className="flex-column gap-3">

                        {/* Dashboard */}
                        <Link
                            href="/dashboard"
                            className={`nav-link d-flex align-items-center ${
                                isActive("/dashboard")
                                    ? "text-primary fw-semibold"
                                    : "text-secondary"
                            }`}
                            onClick={() => setShow(false)}
                        >
                            <Grid className="me-2" />
                            Dashboard
                        </Link>

                        {/* Orders */}
                        <Link
                            href="/orders"
                            className={`nav-link d-flex align-items-center ${
                                isActive("/orders")
                                    ? "text-primary fw-semibold"
                                    : "text-secondary"
                            }`}
                            onClick={() => setShow(false)}
                        >
                            <Bag className="me-2" />
                            Orders
                        </Link>

                        {/* Messages */}
                        <Link
                            href="/messages"
                            className={`nav-link d-flex align-items-center ${
                                isActive("/messages")
                                    ? "text-primary fw-semibold"
                                    : "text-secondary"
                            }`}
                            onClick={() => setShow(false)}
                        >
                            <ChatDots className="me-2" />
                            Messages
                        </Link>

                        {/* Calendar */}
                        <Link
                            href="/calendar"
                            className={`nav-link d-flex align-items-center ${
                                isActive("/calendar")
                                    ? "text-primary fw-semibold"
                                    : "text-secondary"
                            }`}
                            onClick={() => setShow(false)}
                        >
                            <Calendar3 className="me-2" />
                            Calendar
                        </Link>

                        {/* Menu */}
                        <Link
                            href="/menu"
                            className={`nav-link d-flex align-items-center ${
                                isActive("/menu")
                                    ? "text-primary fw-semibold"
                                    : "text-secondary"
                            }`}
                            onClick={() => setShow(false)}
                        >
                            <Grid className="me-2" />
                            Menu
                        </Link>

                        {/* INVENTORY */}
                        <Dropdown>

                            <Dropdown.Toggle
                                variant="light"
                                className={`w-100 text-start d-flex align-items-center ${
                                    inventoryActive
                                        ? "text-primary fw-semibold"
                                        : "text-secondary"
                                }`}
                            >
                                <BoxSeam className="me-2" />
                                Inventory
                            </Dropdown.Toggle>

                            <Dropdown.Menu>

                                {/* Inventory */}
                                <Dropdown.Item
                                    href="/inventory"
                                    className={
                                        isActive("/inventory")
                                            ? "text-primary fw-semibold"
                                            : "text-secondary"
                                    }
                                >
                                    Inventory
                                </Dropdown.Item>

                                {/* Purchase Order */}
                                <Dropdown.Item
                                    href="/purchase-order"
                                    className={
                                        isActive("/purchase-order")
                                            ? "text-primary fw-semibold"
                                            : "text-secondary"
                                    }
                                >
                                    Purchase Order
                                </Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>

                        {/* Reviews */}
                        <Link
                            href="/reviews"
                            className={`nav-link d-flex align-items-center ${
                                isActive("/reviews")
                                    ? "text-primary fw-semibold"
                                    : "text-secondary"
                            }`}
                            onClick={() => setShow(false)}
                        >
                            <StarFill className="me-2" />
                            Reviews
                        </Link>

                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}