"use client";

import React from "react";
import { Accordion, Button, Card, Col, Form, Row } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import RatingStars from "@/components/menus/RetingStars";

export default function MenuFilter({
  menuFilters,
  selectedCategories,
  selectedMealTimes,
  selectedPrices,
  selectedRatings,
  selectedPromos,
  onCategoryChange,
  onMealTimeChange,
  onPriceChange,
  onRatingChange,
  onPromoChange,
  onResetFilters,
}) {
  return (
    <Card className="menu-filter border-0 rounded-4 bg-white h-100">
      <Card.Body className="p-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <p className="fw-bold mb-0 fs-16">Filter</p>

          <Button
            type="button"
            variant="link"
            className="filter-dot-btn p-0 text-muted text-decoration-none"
            onClick={onResetFilters}
            aria-label="Reset filters"
          >
            <BsThreeDots />
          </Button>
        </div>

        <Accordion
          defaultActiveKey={["0", "1", "2", "3", "4"]}
          alwaysOpen
          flush
          className="filter-accordion"
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Category</Accordion.Header>
            <Accordion.Body>
              <Row className="g-2">
                {menuFilters.categories.map((category) => (
                  <Col xs={6} key={category.id}>
                    <Form.Check
                      type="checkbox"
                      id={`category-${category.id}`}
                      label={category.name}
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => onCategoryChange(category.name)}
                      className="filter-check"
                    />
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Meal Times</Accordion.Header>
            <Accordion.Body>
              <Row className="g-2">
                {menuFilters.mealTimes.map((time) => (
                  <Col xs={6} key={time.id}>
                    <Form.Check
                      type="checkbox"
                      id={`time-${time.id}`}
                      label={time.name}
                      checked={selectedMealTimes.includes(time.name)}
                      onChange={() => onMealTimeChange(time.name)}
                      className="filter-check"
                    />
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Price Range</Accordion.Header>
            <Accordion.Body>
              <Row className="g-2">
                {menuFilters.priceRanges.map((price) => (
                  <Col xs={6} key={price.id}>
                    <Form.Check
                      type="checkbox"
                      id={`price-${price.id}`}
                      label={price.label}
                      checked={selectedPrices.includes(price.label)}
                      onChange={() => onPriceChange(price.label)}
                      className="filter-check"
                    />
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>Rating</Accordion.Header>
            <Accordion.Body>
              <div className="d-flex flex-column gap-2">
                {menuFilters.ratings.map((rating) => (
                  <Form.Check
                    key={rating.id}
                    type="checkbox"
                    id={`rating-${rating.id}`}
                    checked={selectedRatings.includes(rating.value)}
                    onChange={() => onRatingChange(rating.value)}
                    className="filter-check"
                    label={
                      <span className="rating-filter-label">
                        <RatingStars rating={rating.value} showEmpty={false} size={13} />
                        <span>{rating.label}</span>
                      </span>
                    }
                  />
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>Promos</Accordion.Header>
            <Accordion.Body>
              <div className="d-flex flex-wrap gap-2">
                {menuFilters.promos.map((promo) => (
                  <Button
                    key={promo.id}
                    size="sm"
                    variant={
                      selectedPromos.includes(promo.name)
                        ? "primary"
                        : "outline-secondary"
                    }
                    className="promo-btn"
                    onClick={() => onPromoChange(promo.name)}
                  >
                    {promo.name}
                  </Button>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
}