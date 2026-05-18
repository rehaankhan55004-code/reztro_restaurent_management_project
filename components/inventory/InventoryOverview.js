"use client";

import dynamic from "next/dynamic";
import { Card, Col, Form, Row } from "react-bootstrap";
import { inventoryStats } from "@/data/InventoryData";
import { useMemo, useState } from "react";
import "@/styles/inventory/InventoryOverview.scss";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function InventoryOverview() {
  const { supplyOverview, stockLevel } = inventoryStats;

  const [supplyFilter, setSupplyFilter] = useState(supplyOverview.filter);

  const filteredChartData = useMemo(() => {
    if (supplyFilter === "Last 6 Months") {
      return supplyOverview.chartData.slice(-6);
    }

    if (supplyFilter === "Last 8 Months") {
      return supplyOverview.chartData.slice(-8);
    }

    return supplyOverview.chartData;
  }, [supplyFilter, supplyOverview.chartData]);

  const supplyChartOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "inherit",
      parentHeightOffset: 0,
    },
    colors: ["#FF6B1E"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.30,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    markers: {
      size: 4,
      colors: ["#FF6B1E"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
        strokeWidth: 3,
      },
    },
    grid: {
      borderColor: "#eeeeee",
      strokeDashArray: 0,
      padding: {
        left: 10,
        right: 18,
        top: 0,
        bottom: 0,
      },
    },
    xaxis: {
      categories: filteredChartData.map((item) => item.month),
      tickPlacement: "beetween",
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        offsetY: 2,
        style: {
          colors: "#8f8f8f",
          fontSize: "11px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      max: 320,
      tickAmount: 4,
      labels: {
        offsetX: -15,
        style: {
          colors: "#8f8f8f",
          fontSize: "11px",
        },
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    tooltip: {
      y: {
        formatter: (value) => `${value} Products`,
      },
    },
  };

  const supplyChartSeries = [
    {
      name: "Products",
      data: filteredChartData.map((item) => item.products),
    },
  ];

  return (
    <Row className="g-3 inventory-overview-row">
      <Col xs={12} xl={7} xxl={8}>
        <Card className="inventory-overview-card border-0">
          <Card.Body>
            <div className="overview-card-head d-flex align-items-center justify-content-between">
              <div>
                <p>{supplyOverview.title}</p>
                <h3>{supplyOverview.totalProducts.toLocaleString()}</h3>
              </div>

              <Form.Select
                className="overview-select shadow-none"
                value={supplyFilter}
                onChange={(e) => setSupplyFilter(e.target.value)}
              >
                <option>Last 8 Months</option>
                <option>Last 6 Months</option>
                <option>This Year</option>
              </Form.Select>
            </div>

            <div className="supply-chart">
              <Chart
                options={supplyChartOptions}
                series={supplyChartSeries}
                type="area"
                height={165}
              />
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} xl={5} xxl={4}>
        <Card className="inventory-overview-card stock-level-card border-0">
          <Card.Body>
            <div className="overview-card-head d-flex align-items-start justify-content-between">
              <div>
                <p className="mb-3">{stockLevel.title}</p>
                <h3>
                  {stockLevel.totalProducts}
                  <span> Products</span>
                </h3>
              </div>

              <Form.Select className="overview-select shadow-none">
                <option>{stockLevel.filter}</option>
                <option>This Week</option>
                <option>This Year</option>
              </Form.Select>
            </div>

            <div className="stock-bars">
              {stockLevel.bars.map((bar) => (
                <span key={bar.id} className={bar.type} />
              ))}
            </div>

            <div className="stock-legends d-flex align-items-center justify-content-between">
              {stockLevel.summary.map((item) => {
                const className =
                  item.label === "In Stock"
                    ? "inStock"
                    : item.label === "Low Stock"
                      ? "lowStock"
                      : "outOfStock";

                return (
                  <div key={item.id}>
                    <span className={`dot ${className}`} />
                    <p>{item.label}</p>
                    <strong>{item.value} Products</strong>
                  </div>
                );
              })}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}