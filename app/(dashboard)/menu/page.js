"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";

import { FaSearch } from "react-icons/fa";
import { BiFilterAlt } from "react-icons/bi";

import { menuFilters, menuItems } from "@/data/MenuListData";
import MenuFilter from "@/components/menus/MenuFilters";
import MenuPagination from "@/components/menus/MenuPagination";
import ShowingPagination from "@/components/menus/showingPagination";
import RatingStars from "@/components/menus/RetingStars";
import Link from "next/link";

const perPageOptions = [6, 9, 12];

export default function MenuPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [selectedMealTimes, setSelectedMealTimes] = useState(["All"]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedPromos, setSelectedPromos] = useState(["All Promo"]);
  const [sortBy, setSortBy] = useState("Popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [showFilter, setShowFilter] = useState(false);


  useEffect(() => {
    const handleResponsiveItems = () => {
      const width = window.innerWidth;

      if (width < 1200) {
        setItemsPerPage(8);
      } else {
        setItemsPerPage(9);
      }

      setCurrentPage(1);
    };

    handleResponsiveItems();

    window.addEventListener("resize", handleResponsiveItems);

    return () => window.removeEventListener("resize", handleResponsiveItems);
  }, []);

  const resetFilters = () => {
    setSelectedCategories(["All"]);
    setSelectedMealTimes(["All"]);
    setSelectedPrices([]);
    setSelectedRatings([]);
    setSelectedPromos(["All Promo"]);
    setSearchText("");
    setCurrentPage(1);
  };

  const toggleFilter = (value, selectedValues, setSelectedValues, hasAll = false) => {
    setCurrentPage(1);

    if (hasAll && (value === "All" || value === "All Promo")) {
      setSelectedValues([value]);
      return;
    }

    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [
        ...selectedValues.filter(
          (item) => item !== "All" && item !== "All Promo"
        ),
        value,
      ];

    if (hasAll && updatedValues.length === 0) {
      setSelectedValues(
        selectedValues.includes("All Promo") ? ["All Promo"] : ["All"]
      );
      return;
    }

    setSelectedValues(updatedValues);
  };

  const filteredMenu = useMemo(() => {
    let result = [...menuItems];

    if (searchText.trim()) {
      const keyword = searchText.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          item.category.toLowerCase().includes(keyword) ||
          item.mealTime.toLowerCase().includes(keyword)
      );
    }

    if (!selectedCategories.includes("All")) {
      result = result.filter((item) => selectedCategories.includes(item.category));
    }

    if (!selectedMealTimes.includes("All")) {
      result = result.filter((item) => selectedMealTimes.includes(item.mealTime));
    }

    if (selectedPrices.length > 0) {
      result = result.filter((item) =>
        selectedPrices.some((label) => {
          const range = menuFilters.priceRanges.find(
            (price) => price.label === label
          );
          if (!range) return false;
          if (range.max === null) return item.price > range.min;
          return item.price >= range.min && item.price <= range.max;
        })
      );
    }

    if (selectedRatings.length > 0) {
      result = result.filter((item) =>
        selectedRatings.some((rating) => {
          const minRating = Number(rating);
          const maxRating = minRating + 1;
          return item.rating >= minRating && item.rating < maxRating;
        })
      );
    }

    if (selectedPromos.length > 0 && !selectedPromos.includes("All Promo")) {
      result = result.filter((item) =>
        selectedPromos.some((promo) => item.tags.includes(promo))
      );
    }

    if (sortBy === "Popular") result.sort((a, b) => b.rating - a.rating);
    if (sortBy === "Newest") result.sort((a, b) => b.id - a.id);
    if (sortBy === "Low Price") result.sort((a, b) => a.price - b.price);
    if (sortBy === "High Price") result.sort((a, b) => b.price - a.price);

    return result;
  }, [
    searchText,
    selectedCategories,
    selectedMealTimes,
    selectedPrices,
    selectedRatings,
    selectedPromos,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);

  const paginatedMenu = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMenu.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMenu, currentPage, itemsPerPage]);

  const filterContent = (
    <MenuFilter
      menuFilters={menuFilters}
      selectedCategories={selectedCategories}
      selectedMealTimes={selectedMealTimes}
      selectedPrices={selectedPrices}
      selectedRatings={selectedRatings}
      selectedPromos={selectedPromos}
      onResetFilters={resetFilters}
      onCategoryChange={(value) =>
        toggleFilter(value, selectedCategories, setSelectedCategories, true)
      }
      onMealTimeChange={(value) =>
        toggleFilter(value, selectedMealTimes, setSelectedMealTimes, true)
      }
      onPriceChange={(value) =>
        toggleFilter(value, selectedPrices, setSelectedPrices)
      }
      onRatingChange={(value) =>
        toggleFilter(value, selectedRatings, setSelectedRatings)
      }
      onPromoChange={(value) =>
        toggleFilter(value, selectedPromos, setSelectedPromos, true)
      }
    />
  );

  return (
    <Container fluid className="menu-page p-0">
      <Row className="g-4">
        <Col xs={12} md={4} xl={3} className="filter-sidebar-col">
          {filterContent}
        </Col>

        <Col xs={12} md={8} xl={9}>
          <Card className="menu-content-card border-0 rounded-4 bg-white h-100 d-flex flex-column">
            <Card.Header className="bg-white border-0 p-3">
              <Row className="g-3 align-items-center justify-content-between">
                <Col xs={12} md={7}>
                  <div className="d-flex align-items-center gap-2">
                    <InputGroup className="search-box border p-1 rounded-4">
                      <InputGroup.Text className="bg-light border-0">
                        <FaSearch size={12} />
                      </InputGroup.Text>

                      <Form.Control
                        className="bg-light shadow-none border-0"
                        placeholder="Search for menu"
                        value={searchText}
                        onChange={(event) => {
                          setSearchText(event.target.value);
                          setCurrentPage(1);
                        }}
                      />

                      <Button variant="primary" className="rounded-4 text-white">
                        Search
                      </Button>
                    </InputGroup>

                    <Button
                      type="button"
                      variant="light"
                      className="mobile-filter-btn"
                      onClick={() => setShowFilter((prev) => !prev)}
                      aria-label="Toggle filters"
                    >
                      <BiFilterAlt />
                    </Button>
                  </div>
                </Col>

                <Col xs={12} md={3}>
                  <div className="sort-box d-flex align-items-center justify-content-md-end gap-2">
                    <span className="sort-label text-muted text-nowrap">
                      Sort by:
                    </span>

                    <Form.Select
                      className="sort-select border-0 shadow-none bg-transparent"
                      value={sortBy}
                      onChange={(event) => {
                        setSortBy(event.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="Popular">Popular</option>
                      <option value="Newest">Newest</option>
                      <option value="Low Price">Low Price</option>
                      <option value="High Price">High Price</option>
                    </Form.Select>
                  </div>
                </Col>
              </Row>
            </Card.Header>

            {showFilter && (
              <div className="mobile-filter-popup d-md-none">
                <div
                  className="mobile-filter-backdrop"
                  onClick={() => setShowFilter(false)}
                />

                <div className="mobile-filter-content">
                  <button
                    type="button"
                    className="mobile-filter-close"
                    onClick={() => setShowFilter(false)}
                    aria-label="Close filters"
                  >
                    ×
                  </button>

                  {filterContent}
                </div>
              </div>
            )}

            <Card.Body className="p-3 flex-grow-1">
              {paginatedMenu.length > 0 ? (
                <Row className="g-4">
                  {paginatedMenu.map((item) => (
                    <Col xs={6} md={6} xxl={4} key={item.id}>
                      <Link href="/menu/menu-details" className="text-decoration-none">
                        <Card className="menu-item-card border-0 h-100 d-flex flex-column">
                          <div className="menu-item-img-wrap">
                            {item.image ? (
                              <Card.Img
                                variant="top"
                                src={item.image}
                                alt={item.name}
                                className="menu-item-img"
                              />
                            ) : (
                              <div className="menu-item-img-placeholder" />
                            )}

                            {item.tags.length > 0 && (
                              <div className="menu-item-tags">
                                {item.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    bg="light"
                                    text="primary"
                                    className="menu-item-badge"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          <Card.Body className="menu-item-body d-flex flex-column justify-content-evenly flex-grow-1">
                            <div>
                              <Card.Title className="menu-item-title">
                                {item.name}
                              </Card.Title>

                              <Card.Text className="menu-item-category">
                                {item.category}
                              </Card.Text>
                            </div>

                            <div className="menu-item-footer d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                <span className="rating-desktop">
                                  <RatingStars rating={item.rating} />
                                </span>

                                <span className="rating-mobile">
                                  <RatingStars rating={1} showEmpty={false} size={12} />
                                </span>

                                <span className="menu-item-rating-value ms-1">
                                  {item.rating}
                                </span>
                              </div>

                              <strong className="menu-item-price">
                                ${item.price.toFixed(2)}
                              </strong>
                            </div>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Card className="border-0 rounded-4 bg-white h-100">
                  <Card.Body className="min-empty d-flex flex-column align-items-center justify-content-center text-center">
                    <h5>No menu item found</h5>
                    <p className="text-muted mb-0">
                      Try changing the filters or search keywords.
                    </p>
                  </Card.Body>
                </Card>
              )}
            </Card.Body>

            <Card.Footer className="bg-white border-0 p-3 mt-auto">
              <div className="menu-footer-pagination d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="d-none d-xl-block">
                  <ShowingPagination
                    totalItems={filteredMenu.length}
                    itemsPerPage={itemsPerPage}
                    options={perPageOptions}
                    onItemsPerPageChange={(value) => {
                      setItemsPerPage(value);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                <MenuPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}