"use client";

import React, { useMemo, useState } from "react";
import Chart from "react-apexcharts";

import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Form,
  Button,
} from "react-bootstrap";

import {
  StarFill,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChatLeftText,
} from "react-bootstrap-icons";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

import reviewsData from "@/data/ReviewsData";

const {
  ratingSummary,
  reviewStatistics,
  reviews,
} = reviewsData;

/* =========================
    PAGINATION COMPONENT
========================= */

function TablePagination({ table, pagination }) {

  const totalPages = table.getPageCount();
  const currentPage = pagination.pageIndex + 1;

  let pages = [];

  if (totalPages <= 5) {

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

  } else {

    pages = [1];

    if (currentPage > 3) {
      pages.push("dots-left");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {

      if (!pages.includes(i)) {
        pages.push(i);
      }

    }

    if (currentPage < totalPages - 2) {
      pages.push("dots-right");
    }

    pages.push(totalPages);

  }

  return (

    <div className="d-flex align-items-center gap-2 flex-wrap">

      <Button
        size="sm"
        variant="light"
        className="rounded-3 px-3 py-2 border"
        onClick={() =>
          table.setPageIndex(
            Math.max(pagination.pageIndex - 1, 0)
          )
        }
        disabled={pagination.pageIndex === 0}
      >
        <ChevronLeft />
      </Button>

      {pages.map((page, index) => {

        if (
          page === "dots-left" ||
          page === "dots-right"
        ) {

          return (
            <span
              key={`dots-${index}`}
              className="px-2 text-muted"
            >
              ...
            </span>
          );
        }

        const pageIndex = page - 1;

        return (

          <Button
            key={`${page}-${index}`}
            size="sm"
            className={`rounded-3 px-3 py-2 border ${
              pagination.pageIndex === pageIndex
                ? "text-white"
                : "text-dark"
            }`}
            variant={
              pagination.pageIndex === pageIndex
                ? "primary"
                : "light"
            }
            onClick={() =>
              table.setPageIndex(pageIndex)
            }
          >
            {page}
          </Button>

        );
      })}

      <Button
        size="sm"
        variant="light"
        className="rounded-3 px-3 py-2 border"
        onClick={() =>
          table.setPageIndex(
            Math.min(
              pagination.pageIndex + 1,
              totalPages - 1
            )
          )
        }
        disabled={
          pagination.pageIndex >= totalPages - 1
        }
      >
        <ChevronRight />
      </Button>

    </div>

  );
}

export default function ReviewsPage() {

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  });

  /* =========================
      REVIEW STATISTICS CHART
  ========================= */

  const reviewChart = {
    series: [
      {
        name: "Positive Review",
        data: reviewStatistics.chartData.map(
          (item) => item.positiveReview
        ),
      },
      {
        name: "Negative Review",
        data: reviewStatistics.chartData.map(
          (item) => item.negativeReview
        ),
      },
    ],

    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },

      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "45%",
        },
      },

      colors: ["#ff6b1a", "#2d2d2d"],

      dataLabels: {
        enabled: false,
      },

      stroke: {
        show: false,
      },

      legend: {
        position: "top",
        horizontalAlign: "left",
        markers: {
          shape: "circle", 
        },
      },

      grid: {
        borderColor: "#f1f1f1",
      },

      xaxis: {
        categories: reviewStatistics.chartData.map(
          (item) => item.month
        ),

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
      TABLE COLUMNS
  ========================= */

  const columns = useMemo(
    () => [
      {
        accessorKey: "itemName",

        cell: ({ row }) => {

          const item = row.original;

          return (

            <div className="py-3 border-bottom">

              <Row className="g-4 align-items-start">

                {/* IMAGE + DETAILS */}

                <Col lg={3}>

                  <div className="d-flex gap-3">

                    <div
                      className="rounded-4 bg-secondary-subtle flex-shrink-0"
                      style={{
                        width: "92px",
                        height: "92px",
                      }}
                    />

                    <div>

                      <h5 className="fw-semibold mb-1">
                        {item.itemName}
                      </h5>

                      <small className="text-muted d-block mb-3">
                        {item.category}
                      </small>

                      <div className="small text-muted d-flex flex-column gap-1">

                        <span>
                          <ChatLeftText
                            size={12}
                            className="me-2"
                          />
                          {item.totalReviews} Reviews
                        </span>

                        <span>
                          <StarFill
                            size={12}
                            className="text-warning me-2"
                          />
                          {item.overallRate} Overall Rate
                        </span>

                      </div>

                    </div>

                  </div>

                </Col>

                {/* REVIEW */}

                <Col lg={9}>

                  <div className="d-flex align-items-center gap-2 flex-wrap mb-3">

                    <div className="d-flex gap-1 text-warning">

                      {[1, 2, 3, 4, 5].map((star) => (

                        <StarFill
                          key={star}
                          size={13}
                          opacity={
                            star <= Math.floor(item.rating)
                              ? 1
                              : 0.4
                          }
                        />

                      ))}

                    </div>

                    <small className="fw-semibold">
                      {item.ratingText}
                    </small>

                    <small className="text-muted">
                      • {item.reviewDate}
                    </small>

                  </div>

                  <p
                    className="text-muted mb-4"
                    style={{
                      lineHeight: "1.8",
                    }}
                  >
                    {item.reviewText}
                  </p>

                  <h6 className="fw-semibold mb-0">
                    {item.customerName}
                  </h6>

                </Col>

              </Row>

            </div>

          );
        },
      },
    ],
    []
  );

  /* =========================
      REACT TABLE
  ========================= */

  const table = useReactTable({
    data: reviews,
    columns,

    state: {
      pagination,
    },

    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel:
      getPaginationRowModel(),
  });

  return (

    <Container fluid className="p-3 p-lg-4">

      {/* =========================
          TOP SECTION
      ========================= */}

      <Row className="g-4 mb-4">

        {/* RATINGS */}

        <Col xl={5}>

          <Card className="border-0 rounded-4 shadow-sm h-100">

            <Card.Body className="p-4">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <h5 className="fw-semibold mb-0">
                  Ratings
                </h5>

                <small className="text-muted fw-medium">
                  {ratingSummary.period}
                  <ChevronDown
                    size={12}
                    className="ms-1"
                  />
                </small>

              </div>

              <Row className="g-4 align-items-center">

                {/* LEFT */}

                <Col md={4}>

                  <div className="bg-info rounded-4 text-center p-4 h-100 d-flex flex-column justify-content-center">

                    <h1
                      className="fw-bold mb-2"
                      style={{
                        fontSize: "70px",
                      }}
                    >
                      {ratingSummary.averageRating}
                    </h1>

                    <div className="d-flex justify-content-center gap-1 text-warning mb-2">

                      {[1, 2, 3, 4, 5].map((item) => (
                        <StarFill
                          key={item}
                          size={16}
                        />
                      ))}

                    </div>

                    <small className="text-muted">
                      {ratingSummary.totalReviews} Reviews
                    </small>

                  </div>

                </Col>

                {/* RIGHT */}

                <Col md={8}>

                  <div className="d-flex flex-column gap-3">

                    {ratingSummary.ratingDetails.map(
                      (item) => (

                        <div key={item.id}>

                          <div className="d-flex justify-content-between align-items-center mb-1">

                            <small className="text-muted fw-medium">
                              {item.label}
                            </small>

                            <small className="fw-semibold">
                              {item.value}
                            </small>

                          </div>

                          <ProgressBar
                            now={item.progress}
                            variant="primary"
                            style={{
                              height: "6px",
                              borderRadius: "20px",
                            }}
                          />

                        </div>

                      )
                    )}

                  </div>

                </Col>

              </Row>

            </Card.Body>

          </Card>

        </Col>

        {/* REVIEW STATISTICS */}

        <Col xl={7}>

          <Card className="border-0 rounded-4 shadow-sm h-100">

            <Card.Body className="p-4">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <h5 className="fw-semibold mb-0">
                  {reviewStatistics.title}
                </h5>

                <small className="text-muted fw-medium">
                  {reviewStatistics.period}
                  <ChevronDown
                    size={12}
                    className="ms-1"
                  />
                </small>

              </div>

              <Chart
                options={reviewChart.options}
                series={reviewChart.series}
                type="bar"
                height={280}
              />

            </Card.Body>

          </Card>

        </Col>

      </Row>

      {/* =========================
          REVIEWS TABLE
      ========================= */}

      <Card className="border-0 rounded-4 shadow-sm">

        <Card.Body className="p-4">

          {/* FILTERS */}

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

            <div className="d-flex flex-wrap gap-2">

              <Button
                variant="light"
                className="rounded-3 border d-flex align-items-center gap-2"
              >
                <StarFill
                  size={12}
                  className="text-warning"
                />
                All Rating
                <ChevronDown size={12} />
              </Button>

              <Button
                variant="light"
                className="rounded-3 border"
              >
                All Category
                <ChevronDown
                  size={12}
                  className="ms-2"
                />
              </Button>

              <Button
                variant="light"
                className="rounded-3 border"
              >
                All Menu
                <ChevronDown
                  size={12}
                  className="ms-2"
                />
              </Button>

            </div>

            <Button
              variant="light"
              className="rounded-3 border"
            >
              This Year
              <ChevronDown
                size={12}
                className="ms-2"
              />
            </Button>

          </div>

          {/* TABLE */}

          <div>

            {table
              .getRowModel()
              .rows.map((row) => (

                <div key={row.id}>

                  {row
                    .getVisibleCells()
                    .map((cell) => (

                      <div key={cell.id}>

                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}

                      </div>

                    ))}

                </div>

              ))}

          </div>

          {/* PAGINATION */}

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">

            <div className="d-flex align-items-center gap-2 text-muted">

              <span>Showing</span>

              <Form.Select
                size="sm"
                className="rounded-3"
                style={{
                  width: "70px",
                }}
                value={pagination.pageSize}
                onChange={(e) =>
                  table.setPageSize(
                    Number(e.target.value)
                  )
                }
              >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
              </Form.Select>

              <span>
                out of {reviews.length}
              </span>

            </div>

            <TablePagination
              table={table}
              pagination={pagination}
            />

          </div>

        </Card.Body>

      </Card>

    </Container>

  );
}