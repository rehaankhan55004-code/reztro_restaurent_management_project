"use client";

import React from "react";
import Chart from "react-apexcharts";

import {
  Container,
  Row,
  Col,
  Card,
  Table,
  ProgressBar,
  Form,
  Carousel,
  Button,
  Dropdown,
  Badge,
} from "react-bootstrap";

import {
  ArrowUpRight,
  ArrowDownRight,
  StarFill,
  BoxSeam,
  BagCheck,
  CalendarCheck,
  ThreeDots,
  Search,
  CurrencyDollar,
  People,
  ChevronUp,
  ChevronDown,

  BoxArrowDown,
  Basket,
  Receipt
} from "react-bootstrap-icons";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import { useMemo, useState } from "react";

import DashboardDetailsData from "@/data/DashboardDetailsData";
import { ChevronsUpDown, StarIcon } from "lucide-react";
import { PiBowlSteam } from "react-icons/pi";
import { LiaBoxSolid } from "react-icons/lia";
import Image from "next/image";


const {
  dashboardStats,
  revenueData,
  topCategories,
  ordersOverview,
  orderTypes,
  recentOrders,
  trendingMenus,
  customerReviews,
  recentActivities,
} = DashboardDetailsData;

export default function DashboardPage() {

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  /* =========================
     REVENUE CHART
  ========================= */

  const revenueChart = {
    series: [
      {
        name: "Income",
        data: revenueData.map((item) => item.income),
      },
      {
        name: "Expense",
        data: revenueData.map((item) => item.expense),
      },
    ],

    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },

      tooltip: {
        enabled: true,
        theme: false,

        custom: function ({ series, seriesIndex, dataPointIndex, w }) {

          const month =
            w.globals.categoryLabels[dataPointIndex];

          const income =
            series[0][dataPointIndex];

          const expense =
            series[1][dataPointIndex];

          return `
      <div
        style="
          background:#fff;
          padding:16px;
          border-radius:20px;
          box-shadow:0 4px 20px rgba(0,0,0,0.08);
          min-width:180px;
        "
      >

        <div
          style="
            color:#8c8c8c;
            font-size:14px;
            margin-bottom:14px;
          "
        >
          ${month} 2035
        </div>

        <!-- INCOME -->
        <div
          style="
            display:flex;
            align-items:center;
            justify-content:space-between;
            margin-bottom:12px;
          "
        >

          <div
            style="
              display:flex;
              align-items:center;
              gap:8px;
            "
          >

            <div
              style="
                width:10px;
                height:10px;
                border-radius:50%;
                background:#ff6b1a;
              "
            ></div>

            <span
              style="
                font-size:14px;
                color:#8c8c8c;
              "
            >
              Income
            </span>

          </div>

          <span
            style="
              font-size:18px;
              font-weight:700;
              color:#1f1f1f;
            "
          >
            $${income.toLocaleString()}
          </span>

        </div>

        <!-- EXPENSE -->
        <div
          style="
            display:flex;
            align-items:center;
            justify-content:space-between;
          "
        >

          <div
            style="
              display:flex;
              align-items:center;
              gap:8px;
            "
          >

            <div
              style="
                width:10px;
                height:10px;
                border-radius:50%;
                background:#2e2e2e;
              "
            ></div>

            <span
              style="
                font-size:14px;
                color:#8c8c8c;
              "
            >
              Expense
            </span>

          </div>

          <span
            style="
              font-size:18px;
              font-weight:700;
              color:#1f1f1f;
            "
          >
            $${expense.toLocaleString()}
          </span>

        </div>

      </div>
    `;
        },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },

      colors: ["#ff6b1a", "#2e2e2e"],

      dataLabels: {
        enabled: false,
      },

      grid: {
        borderColor: "#f2f2f2",
      },

      legend: {
        position: "top",
        horizontalAlign: "right",

        markers: {
          shape: "square",
          width: 12,
          height: 12,
          radius: 4,
        },
      },

      xaxis: {
        categories: revenueData.map((item) => item.month),

        labels: {
          style: {
            colors: "#8c8c8c",
          },
        },
      },

      yaxis: {
        labels: {
          style: {
            colors: "#8c8c8c",
          },
        },
      },
    },
  };

  /* =========================
     DONUT CHART
  ========================= */

  const donutChart = {
    series: topCategories.map((item) => item.percentage),

    options: {
      labels: topCategories.map((item) => item.name),

      chart: {
        type: "donut",
      },

      colors: [
        "#FF6B1E", // Seafood
        "#FFEEE0", // Beverage
        "#333333", // Dessert
        "#FDCEA1", // Pasta
      ],

      dataLabels: {
        enabled: false,
      },

      legend: {
        show: false,
      },

      stroke: {
        width: 5,
        colors: ["#ffffff"],
      },

      states: {
        hover: {
          filter: {
            type: "none",
          },
        },
        active: {
          filter: {
            type: "none",
          },
        },
      },

      plotOptions: {
        pie: {
          expandOnClick: false,

          donut: {
            size: "68%",
          },
        },
      },
    },
  };

  /* =========================
     BAR CHART
  ========================= */

  const ordersChart = {
    series: [
      {
        data: ordersOverview.map((item) => item.orders),
      },
    ],

    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        theme: false,

        custom: function ({ series, dataPointIndex, w }) {

          const day =
            w.globals.labels[dataPointIndex];

          const orders =
            series[0][dataPointIndex];

          return `
      <div
        style="
          background:#2f2f2f;
          color:#fff;
          padding:12px 14px;
          border-radius:14px;
          min-width:110px;
        "
      >

        <div
          style="
            font-size:13px;
            opacity:0.8;
            margin-bottom:6px;
          "
        >
          ${day}
        </div>

        <div
          style="
            font-size:22px;
            font-weight:700;
            line-height:1;
          "
        >
          ${orders}
          <span
            style="
              font-size:14px;
              font-weight:400;
              opacity:0.8;
            "
          >
            orders
          </span>
        </div>

      </div>
    `;
        },
      },

      colors: ordersOverview.map((item) =>
        item.active ? "#ff6b1a" : "#f3dfcc"
      ),

      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "45%",
          distributed: true,
        },
      },

      dataLabels: {
        enabled: false,
      },

      legend: {
        show: false,
      },

      xaxis: {
        categories: ordersOverview.map((item) => item.day),
      },

      grid: {
        borderColor: "#f2f2f2",
      },
    },
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Order ID",
      },

      {
        accessorKey: "image",
        header: "Photo",

        cell: ({ row }) => (
          <div
            className="rounded-3 overflow-hidden position-relative"
            style={{
              width: "55px",
              height: "55px",
            }}
          >
            <Image
              src={row.original.image}
              alt={row.original.menu}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        ),
      },

      {
        accessorKey: "menu",
        header: "Menu",

        cell: ({ row }) => (
          <div>

            <h6 className="mb-1">
              {row.original.menu}
            </h6>

            <small className="text-muted">
              {row.original.category}
            </small>

          </div>
        ),
      },

      {
        accessorKey: "quantity",
        header: "Qty",
      },

      {
        accessorKey: "amount",
        header: "Amount",

        cell: ({ row }) => (
          <span
            className="fw-semibold"
            style={{ color: "#ff6b1a" }}
          >
            ${row.original.amount}
          </span>
        ),
      },

      {
        accessorKey: "customer",
        header: "Customer",
      },

      {
        header: "Status",
        accessorKey: "status",

        cell: ({ getValue }) => {

          const styles = {
            Completed: "bg-primary text-white",
            Cancelled: "bg-dark text-white",
            "On Process": "bg-danger text-dark",
          };

          return (

            <span
              className={`badge px-3 py-2 rounded-3 ${styles[getValue()]}`}
            >
              {getValue()}
            </span>

          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: recentOrders,
    columns,

    state: {
      globalFilter,
      sorting,
    },

    onGlobalFilterChange: setGlobalFilter,

    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel: getPaginationRowModel(),

    getFilteredRowModel: getFilteredRowModel(),

    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Container
      fluid
      className="overflow-hidden p-0"
    >

      {/* =========================
          MAIN GRID
      ========================= */}

      <Row className="g-4 align-items-stretch">

        {/* =========================
            LEFT CONTENT
        ========================= */}

        <Col xl={9}>

          {/* TOP STATS */}

          <Row className="g-4 mb-4">

            {dashboardStats.map((item) => (
              <Col xl={4} md={6} sm={12} key={item.id}>

                <Card className="border-0 rounded-4 shadow-sm h-100">

                  <Card.Body className="d-flex justify-content-between align-items-center">

                    <div className="d-flex align-items-center gap-3">

                      <div
                        className="rounded-4 d-flex align-items-center justify-content-center bg-primary text-white"
                        style={{
                          width: "58px",
                          height: "58px",
                        }}
                      >

                        {item.icon === "orders" && (
                          <Receipt size={24} />
                        )}

                        {item.icon === "customers" && (
                          <People size={24} />
                        )}

                        {item.icon === "revenue" && (
                          <CurrencyDollar size={24} />
                        )}

                      </div>

                      <div>

                        <small className="text-muted">
                          {item.title}
                        </small>

                        <h3 className="fw-bold mb-0 mt-1">
                          {item.value}
                        </h3>

                      </div>

                    </div>

                    <div
                      className="small d-flex mt-5 align-items-center gap-1 text-secondary"
                    >

                      {item.type === "up" ? (
                        <Badge
                          pill
                          className="bg-primary-subtle text-primary d-flex align-items-center justify-content-center p-0"
                          style={{
                            width: "15px",
                            height: "15px",
                          }}
                        >
                          <ArrowUpRight size={10} />
                        </Badge>
                      ) : (
                        <Badge
                          pill
                          className="bg-secondary-subtle text-dark d-flex align-items-center justify-content-center p-0"
                          style={{
                            width: "15px",
                            height: "15px",
                          }}
                        >
                          <ArrowDownRight size={10} />
                        </Badge>
                      )}

                      {item.change}

                    </div>

                  </Card.Body>
                </Card>
              </Col>
            ))}

          </Row>

          {/* CHARTS */}

          <Row className="g-4 mb-4">

            {/* REVENUE */}

            <Col xl={8} lg={12}>

              <Card className="border-0 rounded-4 shadow-sm h-100">

                <Card.Body>

                  <div className="d-flex justify-content-between align-items-start mb-4">

                    <div>

                      <small className="text-muted">
                        Total Revenue
                      </small>

                      <h2 className="fw-bold mt-1">
                        $184,839
                      </h2>

                    </div>

                    <Form.Select
                      size="sm"
                      className="border-0 shadow-none"
                      style={{ width: "150px" }}
                    >
                      <option>Last 8 Months</option>
                    </Form.Select>

                  </div>

                  <Chart
                    options={revenueChart.options}
                    series={revenueChart.series}
                    type="line"
                    height={280}
                  />

                </Card.Body>
              </Card>
            </Col>

            {/* TOP CATEGORIES */}

            <Col xl={4} md={12}>

              <Card className="border-0 rounded-4 shadow-sm h-100">

                <Card.Body className="p-4">

                  {/* HEADER */}

                  <div className="d-flex justify-content-between align-items-center mb-2">

                    <h6 className="fw-semibold mb-0">
                      Top Categories
                    </h6>

                    <small className="text-muted fw-medium">
                      This Month
                    </small>

                  </div>

                  {/* CHART */}

                  <div className="d-flex justify-content-center">

                    <Chart
                      options={donutChart.options}
                      series={donutChart.series}
                      type="donut"
                      height={220}
                      width="100%"
                    />

                  </div>

                  {/* LEGEND */}

                  <Row className="g-3 mt-0">

                    {topCategories.map((item, index) => (

                      <Col xs={6} key={item.id}>

                        <div className="d-flex align-items-center gap-2">

                          <div
                            className={`flex-shrink-0 ${index === 0
                              ? "bg-primary"
                              : index === 1
                                ? "bg-success"
                                : index === 2
                                  ? "bg-dark"
                                  : "bg-danger"
                              }`}
                            style={{
                              width: "8px",
                              height: "8px",
                            }}
                          />

                          <small
                            className="text-muted fw-medium"
                            style={{
                              fontSize: "13px",
                            }}
                          >
                            <span className="text-dark">
                              {item.name}
                            </span>{" "}
                            {item.percentage}%
                          </small>

                        </div>

                      </Col>
                    ))}

                  </Row>

                </Card.Body>

              </Card>

            </Col>
          </Row>

          {/* OVERVIEW */}

          <Row className="g-4 mb-4">

            {/* ORDERS OVERVIEW */}

            <Col xl={8} lg={12}>

              <Card className="border-0 rounded-4 shadow-sm h-100">

                <Card.Body>

                  <div className="d-flex justify-content-between mb-4">

                    <h5 className="fw-semibold mb-0">
                      Orders Overview
                    </h5>

                    <small>This Week</small>

                  </div>

                  <Chart
                    options={ordersChart.options}
                    series={ordersChart.series}
                    type="bar"
                    height={260}
                  />

                </Card.Body>
              </Card>
            </Col>

            {/* ORDER TYPES */}
            <Col xl={4} md={12}>

              <Card className="border-0 rounded-4 shadow-sm h-100">

                <Card.Body>

                  <div className="d-flex justify-content-between mb-4">

                    <h5 className="fw-semibold mb-0">
                      Order Types
                    </h5>

                    <small>This Month</small>

                  </div>

                  <div className="d-flex flex-column gap-4">

                    {orderTypes.map((item) => (

                      <div key={item.id}>

                        <div className="d-flex justify-content-between align-items-center">

                          {/* LEFT SIDE */}

                          <div className="d-flex align-items-start gap-3 w-100">

                            {/* ICON */}

                            <div
                              className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 bg-success text-primary"
                              style={{
                                width: "45px",
                                height: "45px",
                              }}
                            >

                              <>
                                {item.title === "Dine-In" && (
                                  <PiBowlSteam size={20} />
                                )}

                                {item.title === "Takeaway" && (
                                  <LiaBoxSolid size={20} />
                                )}

                                {item.title === "Online" && (
                                  <BoxArrowDown size={20} />
                                )}
                              </>

                            </div>

                            {/* TEXT + PROGRESS */}

                            <div className="flex-grow-1">

                              <div className="d-flex justify-content-between align-items-center mb-2">

                                <h6 className="mb-0">
                                  {item.title}
                                  {" "}
                                  <small className="text-secondary">
                                    {item.percentage}%
                                  </small>
                                </h6>

                                <h6 className="fw-bold mb-0">
                                  {item.total}
                                </h6>

                              </div>

                              <ProgressBar
                                variant="dark"
                                now={item.percentage}
                                style={{
                                  height: "8px",
                                  borderRadius: "20px",
                                }}
                              />

                            </div>

                          </div>

                        </div>

                      </div>
                    ))}

                  </div>

                </Card.Body>
              </Card>
            </Col>

          </Row>

          {/* RECENT ORDERS */}


          <Card className="border-0 rounded-4 shadow-sm mb-4">

            <Card.Body>
              <div className="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-3 mb-4">

                <h5 className="fw-semibold mb-0">
                  Recent Orders
                </h5>
                <div className="d-flex flex-wrap gap-2">

                  <div
                    className="d-flex align-items-center px-3 rounded-3  bg-info"
                  >

                    <Search className="text-muted me-2 " />

                    <Form.Control
                      placeholder="Search placeholder"
                      className="border-0 shadow-none bg-info"
                      value={globalFilter ?? ""}
                      onChange={(e) =>
                        setGlobalFilter(e.target.value)
                      }
                    />

                  </div>

                  <Dropdown>
                    <Dropdown.Toggle
                      variant="light"
                      className="rounded-3 border"
                    >
                      This Week
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="rounded-3 border-0 shadow-sm">
                      <Dropdown.Item>This Week</Dropdown.Item>
                      <Dropdown.Item>This Month</Dropdown.Item>
                      <Dropdown.Item>Last 3 Months</Dropdown.Item>
                      <Dropdown.Item>This Year</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Button
                    variant="light"
                    className="rounded-3 border"
                  >
                    See All Orders
                  </Button>

                </div>

              </div>
              <div className="table-responsive rounded-4">

                <Table borderless className="align-middle">

                  <thead className="bg-info text-dark ">

                    {table.getHeaderGroups().map((headerGroup) => (

                      <tr key={headerGroup.id}>

                        {headerGroup.headers.map((header) => (

                          <th
                            key={header.id}
                            onClick={
                              header.column.getCanSort()
                                ? header.column.getToggleSortingHandler()
                                : undefined
                            }
                            className="px-3 py-3 fw-normal border-0 text-secondary bg-info "
                            style={{
                              cursor: header.column.getCanSort()
                                ? "pointer"
                                : "default",
                              fontSize: "13px",
                              whiteSpace: "nowrap",
                            }}
                          >

                            <div
                              className={
                                header.column.id === "select"
                                  ? ""
                                  : "d-flex align-items-center gap-1"
                              }
                            >

                              {header.column.id === "select" ? (

                                flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )

                              ) : (

                                <span className="small fw-medium">

                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}

                                </span>
                              )}

                              {header.column.getCanSort() &&
                                header.column.id !== "select" && (

                                  <span className="text-dark d-flex align-items-center">

                                    {{
                                      asc: <ChevronUp size={14} />,
                                      desc: <ChevronDown size={14} />,
                                    }[header.column.getIsSorted()] ?? (
                                        <ChevronsUpDown size={14} />
                                      )}

                                  </span>
                                )}

                            </div>

                          </th>
                        ))}

                      </tr>
                    ))}

                  </thead>

                  <tbody>

                    {table.getRowModel().rows.map((row) => (

                      <tr key={row.id}>

                        {row.getVisibleCells().map((cell) => (

                          <td key={cell.id}>

                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}

                          </td>
                        ))}

                      </tr>
                    ))}

                  </tbody>

                </Table>

              </div>

              {/* PAGINATION */}

              {/* <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">

                <small className="text-muted">

                  Page{" "}
                  {table.getState().pagination.pageIndex + 1}
                  {" "}of{" "}
                  {table.getPageCount()}

                </small>

                <div className="d-flex gap-2">

                  <Button
                    variant="light"
                    className="border rounded-3"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>

                  <Button
                    variant="light"
                    className="border rounded-3"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>

                </div>

              </div> */}

            </Card.Body>

          </Card>

          {/* CUSTOMER REVIEWS */}

          <Card
            className="border-0 overflow-hidden bg-dashboard"

          >

            <Card.Body className="p-0">

              {/* HEADER */}

              <div className="d-flex justify-content-between align-items-center mb-4">

                <h5 className="fw-semibold mb-0">
                  Customer Reviews
                </h5>

                <small className="fw-medium">
                  See More Reviews
                </small>

              </div>

              {/* CAROUSEL */}

              <Carousel
                indicators={false}
                controls={false}
                interval={2500}
                pause={false}
                touch
              >

                {[0, 1, 2].map((startIndex) => (

                  <Carousel.Item key={startIndex}>

                    <div className="d-flex overflow-hidden gap-4 gap-md-5 pe-5">

                      {[...customerReviews, ...customerReviews]
                        .slice(startIndex, startIndex + 3)
                        .map((item, index) => (

                          <div
                            key={index}
                            className="flex-shrink-0 w-100"
                            style={{ maxWidth: "390px" }}
                          >

                            <Card className="border-0 rounded-4 h-100 bg-white">

                              <Card.Body className="position-relative p-4 overflow-visible">


                                <div
                                  className="position-absolute"
                                  style={{
                                    right: "-35px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                  }}
                                >
                                  <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={145}
                                    height={145}
                                    className="rounded-4 object-fit-cover"
                                  />
                                </div>

                                {/* CONTENT */}

                                <div className="d-flex flex-column w-75">

                                  <h4 className="fw-semibold mb-3">
                                    {item.title}
                                  </h4>

                                  <p
                                    className="text-muted mb-4"
                                    style={{
                                      lineHeight: "1.8",
                                      minHeight: "95px",
                                    }}
                                  >
                                    {item.description}
                                  </p>

                                  <div className="d-flex align-items-center gap-2 mb-2">

                                    <span className="fw-semibold">
                                      {item.customer}
                                    </span>

                                    <span className="text-muted small">
                                      • {item.date}
                                    </span>

                                  </div>

                                  <div className="d-flex align-items-center gap-2">

                                    <div className="d-flex gap-1 text-warning">

                                      <StarFill size={12} />
                                      <StarFill size={12} />
                                      <StarFill size={12} />
                                      <StarFill size={12} />
                                      <StarFill size={12} />

                                    </div>

                                    <span className="fw-medium">
                                      {item.rating}
                                    </span>

                                  </div>

                                </div>

                              </Card.Body>

                            </Card>

                          </div>
                        ))}

                    </div>

                  </Carousel.Item>
                ))}

              </Carousel>

            </Card.Body>

          </Card>
        </Col>

        {/* =========================
    RIGHT SIDEBAR
========================= */}
        <Col xl={3} lg={12} className="d-flex flex-column">

          {/* TRENDING MENUS */}

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="fw-semibold mb-0">
              Trending Menus
            </h5>

            <Dropdown>

              <Dropdown.Toggle
                variant="light"
                size="sm"
                className="rounded-3 border-0 shadow-none"
              >
                This Week
              </Dropdown.Toggle>

              <Dropdown.Menu className="border-0 shadow rounded-4">

                <Dropdown.Item>
                  Today
                </Dropdown.Item>

                <Dropdown.Item>
                  This Week
                </Dropdown.Item>

                <Dropdown.Item>
                  This Month
                </Dropdown.Item>

                <Dropdown.Item>
                  This Year
                </Dropdown.Item>

              </Dropdown.Menu>

            </Dropdown>

          </div>

          {/* DESKTOP VIEW */}

          <div className="d-none d-xl-flex flex-column gap-4 mb-4">

            {trendingMenus.map((item) => (

              <Card
                key={item.id}
                className="border-0 rounded-4 shadow-sm"
              >

                <Card.Body>

                  <div
                    className="rounded-4 mb-3 overflow-hidden position-relative"
                    style={{
                      height: "150px",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-fit-cover"
                    />
                  </div>

                  <h5 className="fw-semibold">
                    {item.title}
                  </h5>

                  <small className="text-muted">
                    {item.category}
                  </small>

                  <div className="d-flex justify-content-between align-items-center mt-3">

                    <div className="d-flex gap-3 text-muted small">

                      <span>
                        <StarIcon
                          size={15}
                          className="me-1 mb-1"
                        />
                        {item.rating}
                      </span>

                      <span>
                        <Basket
                          className="mb-1 me-1"
                          size={14}
                        />
                        {item.orders}
                      </span>

                    </div>

                    <h5 className="fw-bold mb-0 text-primary">
                      ${item.price}
                    </h5>

                  </div>

                </Card.Body>

              </Card>

            ))}

          </div>

          {/* TABLET + MOBILE CAROUSEL */}

          <div className="d-xl-none mb-4 overflow-hidden">

            <Carousel
              indicators={false}
              controls={false}
              interval={2500}
              pause={false}
              touch
            >

              {[0, 1, 2].map((startIndex) => (

                <Carousel.Item key={startIndex}>

                  <div
                    className="d-flex"
                    style={{
                      gap: "16px",
                      overflow: "hidden",
                    }}
                  >

                    {[...trendingMenus, ...trendingMenus]
                      .slice(startIndex, startIndex + 3)
                      .map((item, index) => (

                        <div
                          key={index}
                          className="flex-shrink-0"
                          style={{
                            width: "calc(50% - 8px)",
                            minWidth: "160px",
                            maxWidth: "240px",
                          }}
                        >

                          <Card className="border-0 rounded-4 shadow-sm h-100">

                            <Card.Body>

                              <div
                                className="rounded-4 mb-3 overflow-hidden position-relative"
                                style={{
                                  height: "120px",
                                }}
                              >
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-fit-cover"
                                />
                              </div>

                              <h6 className="fw-semibold mb-1">
                                {item.title}
                              </h6>

                              <small className="text-muted">
                                {item.category}
                              </small>

                              <div className="d-flex justify-content-between align-items-center mt-3">

                                <div className="d-flex gap-2 text-muted small">

                                  <span>
                                    <StarIcon
                                      size={13}
                                      className="me-1 mb-1"
                                    />
                                    {item.rating}
                                  </span>

                                  <span>
                                    <Basket
                                      className="mb-1 me-1"
                                      size={12}
                                    />
                                    {item.orders}
                                  </span>

                                </div>

                                <h6 className="fw-bold mb-0 text-primary">
                                  ${item.price}
                                </h6>

                              </div>

                            </Card.Body>

                          </Card>

                        </div>

                      ))}

                  </div>

                </Carousel.Item>

              ))}

            </Carousel>

          </div>

          {/* RECENT ACTIVITY */}
          <Card className="border-0 rounded-4 shadow-sm flex-grow-1">

            <Card.Body className="p-4 d-flex flex-column h-100">

              {/* HEADER */}
              <div className="d-flex justify-content-between align-items-center mb-4">

                <h5 className="fw-semibold mb-0">
                  Recent Activity
                </h5>

                <ThreeDots className="text-muted" />

              </div>

              {/* ACTIVITIES */}
              <div className="position-relative d-flex flex-column gap-4">

                {/* LINE */}
                {/* <div
                  className="position-absolute top-0 start-0 h-100"
                  style={{
                    width: "2px",
                    background: "#ececec",
                    left: "20px",
                    zIndex: 0,
                  }}
                /> */}

                {recentActivities.map((item) => (

                  <div
                    key={item.id}
                    className="d-flex gap-3 position-relative"
                    style={{
                      zIndex: 1,
                    }}
                  >

                    {/* ICON */}
                    <div
                      className="rounded-4 d-flex align-items-center justify-content-center flex-shrink-0 bg-danger text-dark"
                      style={{
                        width: "42px",
                        height: "42px",
                      }}
                    >

                      {item.icon === "inventory" && (
                        <BoxSeam size={18} />
                      )}

                      {item.icon === "order" && (
                        <BagCheck size={18} />
                      )}

                      {item.icon === "reservation" && (
                        <CalendarCheck size={18} />
                      )}

                    </div>

                    {/* CONTENT */}
                    <div className="flex-grow-1">

                      <div className="d-flex flex-wrap align-items-center gap-2 mb-1">

                        <h6 className="fw-semibold mb-0">
                          {item.name}
                        </h6>

                        <span
                          className="px-2 py-1 rounded-2 small text-muted"
                          style={{
                            background: "#f3f3f3",
                            fontSize: "11px",
                          }}
                        >
                          {item.role}
                        </span>

                      </div>

                      <p
                        className="text-muted mb-2"
                        style={{
                          lineHeight: "1.5",
                        }}
                      >
                        {item.message}
                      </p>

                      <small className="text-muted">
                        {item.time}
                      </small>

                    </div>

                  </div>
                ))}

              </div>

            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
}