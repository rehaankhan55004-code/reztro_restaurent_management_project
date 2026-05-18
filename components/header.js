"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
    Navbar,
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
    Gear,
    ArrowLeft
} from "react-bootstrap-icons";

export default function Header() {

    const [show, setShow] = useState(false);

    const pathname = usePathname();

    const router = useRouter();

    const isActive = (path) => {

        if (path === "/orders") {

            return (
                pathname === "/orders" ||
                pathname.includes("/orderdetails")
            );
        }

        /* MENU ACTIVE */
        if (path === "/menu") {

            return (
                pathname === "/menu" ||
                pathname.includes("/menu-details")
            );
        }

        return pathname === path;
    };

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

    const isDashboard =
        pathname === "/dashboard" ||
        pathname === "/";

    /* DETAILS PAGES */
    const isDetailsPage =
        pathname.includes("/orderdetails") ||
        pathname.includes("/menu-details");

    return (
        <>
            <Navbar className="px-4 py-3 mt-3">

                <div className="w-100 d-flex align-items-start">

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

                        <div className="d-flex align-items-center">

                            {/* BACK BUTTON */}
                            {isDetailsPage && (
                                <Button
                                    variant="transparent"
                                    className="mb-2"
                                    onClick={() => router.back()}
                                >
                                    <ArrowLeft
                                        className="text-muted"
                                        size={25}
                                    />
                                </Button>
                            )}

                            <h4 className="mb-1 fw-bold">
                                {pageTitle}
                            </h4>

                        </div>

                        {isDashboard ? (

                            <p className="text-muted mb-0">
                                Hello Admin
                            </p>

                        ) : (

                            <div
                                className={`small d-flex align-items-center flex-wrap ${isDetailsPage ? "ms-3" : ""
                                    }`}
                            >

                                <span className="text-primary fw-semibold">
                                    Dashboard
                                </span>

                                {pathParts.map((part, index) => {

                                    const isOrders =
                                        part === "orders" &&
                                        pathname.includes("/orderdetails");

                                    /* MENU BREADCRUMB ACTIVE */
                                    const isMenu =
                                        part === "menu" &&
                                        pathname.includes("/menu-details");

                                    return (
                                        <span key={index}>

                                            <span className="text-muted">
                                                {" "} / {" "}
                                            </span>

                                            <span
                                                className={
                                                    isOrders || isMenu
                                                        ? "text-primary fw-semibold"
                                                        : "text-muted"
                                                }
                                            >
                                                {formatName(part)}
                                            </span>

                                        </span>
                                    );
                                })}

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

                </div>

            </Navbar>

            <Offcanvas
                show={show}
                onHide={() => setShow(false)}
                placement="end"
            >

                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Menu
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>

                    <Nav className="flex-column gap-3">

                        <Link
                            href="/dashboard"
                            className={`nav-link d-flex align-items-center ${isActive("/dashboard")
                                ? "text-primary fw-semibold"
                                : "text-secondary"
                                }`}
                            onClick={() => setShow(false)}
                        >
                            <Grid className="me-2" />
                            Dashboard
                        </Link>

                        <Link
                            href="/orders"
                            className={`nav-link d-flex align-items-center ${isActive("/orders")
                                ? "text-primary fw-semibold"
                                : "text-secondary"
                                }`}
                            onClick={() => setShow(false)}
                        >
                            <Bag className="me-2" />
                            Orders
                        </Link>

                        <Link
                            href="/messages"
                            className={`nav-link d-flex align-items-center ${isActive("/messages")
                                ? "text-primary fw-semibold"
                                : "text-secondary"
                                }`}
                            onClick={() => setShow(false)}
                        >
                            <ChatDots className="me-2" />
                            Messages
                        </Link>

                        <Link
                            href="/calendar"
                            className={`nav-link d-flex align-items-center ${isActive("/calendar")
                                ? "text-primary fw-semibold"
                                : "text-secondary"
                                }`}
                            onClick={() => setShow(false)}
                        >
                            <Calendar3 className="me-2" />
                            Calendar
                        </Link>

                        <Link
                            href="/menu"
                            className={`nav-link d-flex align-items-center ${isActive("/menu")
                                ? "text-primary fw-semibold"
                                : "text-secondary"
                                }`}
                            onClick={() => setShow(false)}
                        >
                            <Grid className="me-2" />
                            Menu
                        </Link>

                        <Dropdown>

                            <Dropdown.Toggle
                                variant="light"
                                className={`w-100 text-start d-flex align-items-center ${inventoryActive
                                    ? "text-primary fw-semibold"
                                    : "text-secondary"
                                    }`}
                            >
                                <BoxSeam className="me-2" />
                                Inventory
                            </Dropdown.Toggle>

                            <Dropdown.Menu>

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

                        <Link
                            href="/reviews"
                            className={`nav-link d-flex align-items-center ${isActive("/reviews")
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