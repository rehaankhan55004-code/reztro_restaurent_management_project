"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Nav } from "react-bootstrap";
import { useRouter, usePathname } from "next/navigation";

import Logo from "@/public/Logo.svg";
import SymbolLogo from "@/public/Symbol.svg";

import {
  Grid,
  Calendar3,
  BoxSeam,
  ChevronDown,
  BoxArrowRight,
  ReceiptCutoff,
  ChatLeftText,
  WindowStack,

} from "react-bootstrap-icons";
import { Star } from "lucide-react";



export default function Sidenav() {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="d-none d-lg-flex p-4 flex-column h-100 border-end">

        <Link href="/dashboard" className="mb-5 text-decoration-none">
          <Image src={Logo} alt="Logo" width={170} height={50} priority />
        </Link>

        <div className="d-flex flex-column flex-grow-1">

          <div className="flex-grow-1 ">
            <SidebarMenu />
          </div>

          <div className="mt-auto p-3 rounded-4 bg-success d-flex flex-column align-items-center">
            <p className="small mb-3 mt-5">
              Streamline restaurant <br />
              management with real- <br />
              time insights.
            </p>

            <button className="btn btn-primary text-white rounded-3 w-100">
              Upgrade Now
            </button>
          </div>

        </div>
      </div>


      {/* Tablet Icon Sidebar */}
      {/* Tablet Icon Sidebar */}
      <div className="d-none d-md-flex d-lg-none p-3 flex-column h-100 align-items-center border-end">

        <Link href="/dashboard" className="mb-5">
          <Image
            src={SymbolLogo}
            alt="Logo Icon"
            width={42}
            height={42}
            priority
          />
        </Link>

        {/* 👇 Wrap like desktop */}
        <div className="d-flex flex-column flex-grow-1 align-items-center w-100">

          {/* Menu */}
          <div className="flex-grow-1 d-flex flex-column align-items-center w-100">
            <SidebarMenu iconsOnly />
          </div>

          {/* Bottom button */}
          <div className="mt-auto">
            <Button
              type="button"
              className="btn border-0 bg-transparent text-secondary d-flex justify-content-center align-items-center rounded-3 p-2"
              style={{ width: "42px", height: "42px" }}
            >
              <BoxArrowRight size={20} />
            </Button>
          </div>

        </div>
      </div>
    </>
  );
}


function SidebarMenu({ iconsOnly = false }) {
  const router = useRouter();
  const pathname = usePathname();

  const inventoryActive =
    pathname === "/inventory" ||
    pathname === "/purchase-order";

  const [inventoryOpen, setInventoryOpen] =
    useState(inventoryActive);

  useEffect(() => {
    if (inventoryActive) setInventoryOpen(true);
    else setInventoryOpen(false);
  }, [pathname]);

  return (
    <Nav className="flex-column gap-2">

      {/* Dashboard */}
      {iconsOnly ? (
        <Link
          href="/dashboard"
          className={`nav-link sidebar-link border-0 d-flex justify-content-center align-items-center rounded-3 p-2 fw-semibold ${pathname === "/dashboard"
            ? "text-white bg-primary"
            : "text-secondary"
            }`}
          style={{ width: "42px", height: "42px" }}
        >
          <Grid />
        </Link>
      ) : (
        <Link
          href="/dashboard"
          className={`nav-link sidebar-link fw-semibold ${pathname === "/dashboard"
            ? "active-sidebar"
            : "text-secondary"
            }`}
        >
          <Grid className="me-2" />
          {!iconsOnly && " Dashboard"}
        </Link>
      )}

      {/* Orders */}
      {iconsOnly ? (
        <Link
          href="/orders"
          className={`nav-link sidebar-link border-0 d-flex justify-content-center align-items-center rounded-3 p-2 fw-semibold ${pathname === "/orders" ||
            pathname.includes("/orderdetails")
            ? "text-white bg-primary"
            : "text-secondary"
            }`}
          style={{ width: "42px", height: "42px" }}
        >
          <ReceiptCutoff />
        </Link>
      ) : (
        <Link
          href="/orders"
          className={`nav-link sidebar-link fw-semibold ${pathname === "/orders" ||
            pathname.includes("/orderdetails")
            ? "active-sidebar"
            : "text-secondary"
            }`}
        >
          <ReceiptCutoff className="me-2" />
          {!iconsOnly && " Orders"}
        </Link>
      )}

      {/* Messages */}
      {iconsOnly ? (
        <Link
          href="/messages"
          className={`nav-link sidebar-link border-0 d-flex justify-content-center align-items-center rounded-3 p-2 fw-semibold ${pathname === "/messages"
            ? "text-white bg-primary"
            : "text-secondary"
            }`}
          style={{ width: "42px", height: "42px" }}
        >
          <ChatLeftText />
        </Link>
      ) : (
        <Link
          href="/messages"
          className={`nav-link sidebar-link fw-semibold ${pathname === "/messages"
            ? "active-sidebar"
            : "text-secondary"
            }`}
        >
          <ChatLeftText className="me-2" />
          {!iconsOnly && " Messages"}
        </Link>
      )}

      {/* Calendar */}
      {iconsOnly ? (
        <Link
          href="/calendar"
          className={`nav-link sidebar-link border-0 d-flex justify-content-center align-items-center rounded-3 p-2 fw-semibold ${pathname === "/calendar"
            ? "text-white bg-primary"
            : "text-secondary"
            }`}
          style={{ width: "42px", height: "42px" }}
        >
          <Calendar3 />
        </Link>
      ) : (
        <Link
          href="/calendar"
          className={`nav-link sidebar-link fw-semibold ${pathname === "/calendar"
            ? "active-sidebar"
            : "text-secondary"
            }`}
        >
          <Calendar3 className="me-2" />
          {!iconsOnly && " Calendar"}
        </Link>
      )}

      {iconsOnly ? (
        <Link
          href="/menu"
          className={`nav-link sidebar-link border-0 d-flex justify-content-center align-items-center rounded-3 p-2 fw-semibold ${pathname === "/menu"
            ? "text-white bg-primary"
            : "text-secondary"
            }`}
          style={{ width: "42px", height: "42px" }}
        >
          <WindowStack />
        </Link>
      ) : (
        <Link
          href="/menu"
          className={`nav-link sidebar-link fw-semibold ${pathname === "/menu"
            ? "active-sidebar"
            : "text-secondary"
            }`}
        >
          <WindowStack className="me-2" />
          {!iconsOnly && " Menu"}
        </Link>
      )}

      {/* Inventory */}
      {iconsOnly ? (
        <Link
          href="/inventory"
          className={`nav-link sidebar-link border-0 d-flex justify-content-center align-items-center rounded-3 p-2 fw-semibold ${pathname === "/inventory"
            ? "text-white bg-primary"
            : "text-secondary"
            }`}
          style={{ width: "42px", height: "42px" }}
        >
          <BoxSeam />
        </Link>
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              if (!inventoryOpen) {
                setInventoryOpen(true);
                router.push("/inventory");
              } else {
                setInventoryOpen(false);
              }
            }}
            className="nav-link sidebar-link border-0 bg-transparent w-100 text-start d-flex align-items-center fw-semibold text-secondary"
          >
            <BoxSeam />
            Inventory

            <ChevronDown
              size={12}
              className={`ms-2 ${inventoryOpen ? "rotate-180" : ""}`}
            />
          </button>

          {inventoryOpen && (
            <div className="ms-5 mt-1 d-flex flex-column gap-2">

              <Link
                href="/inventory"
                className={`dropdown-item rounded-3 p-2 fw-semibold ${pathname === "/inventory"
                  ? "submenu-active"
                  : "submenu-item text-muted"
                  }`}
              >
                Inventory
              </Link>

              <Link
                href="/purchase-order"
                className={`dropdown-item rounded-3 p-2 fw-semibold ${pathname === "/purchase-order"
                  ? "submenu-active"
                  : "submenu-item text-muted"
                  }`}
              >
                Purchase Order
              </Link>

            </div>
          )}
        </>
      )}

      {/* Reviews */}
      {iconsOnly ? (
        <Link
          href="/reviews"
          className={`nav-link sidebar-link border-0 d-flex justify-content-center align-items-center rounded-3 p-2 fw-semibold ${pathname === "/reviews"
            ? "text-white bg-primary"
            : "text-secondary"
            }`}
          style={{ width: "42px", height: "42px" }}
        >
          <Star size={20} />
        </Link>
      ) : (
        <Link
          href="/reviews"
          className={`nav-link sidebar-link fw-semibold ${pathname === "/reviews"
            ? "active-sidebar"
            : "text-secondary"
            }`}
        >
          <Star className="me-2" size={20} />
          {!iconsOnly && " Reviews"}
        </Link>
      )}

    </Nav>
  );
}


const CustomToggle = React.forwardRef(
  ({ children, onClick }, ref) => (
    <a
      href="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="text-decoration-none"
    >
      {children}
    </a>
  )
);

CustomToggle.displayName = "CustomToggle";