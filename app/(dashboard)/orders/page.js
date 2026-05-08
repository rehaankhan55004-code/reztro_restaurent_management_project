"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

import { customerOrders, orderCards } from "@/data";
import {
  Table,
  Button,
  Form,
  ButtonGroup,
  Dropdown,
  Row,
} from "react-bootstrap";

import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { ChevronsUpDown, List, Grid } from "lucide-react";
import TablePagination from "@/components/table_pagination";

import FilterGroup from "@/components/filter";
import SearchInput from "@/components/search";
import PageSizeSelector from "@/components/pagesize";
import Order_Card from "@/components/Order_Card";
import CardPagination from "@/components/pagination";
import { useRouter } from "next/navigation";

export default function OrdersTable() {

  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [cardPagination, setCardPagination] = useState({
    pageIndex: 0,
    pageSize: 6,
  });
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 991);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [view, setView] = useState("table");

  const data = useMemo(() => {
    if (statusFilter === "All") return customerOrders;
    return customerOrders.filter((item) => item.status === statusFilter);
  }, [statusFilter]);

  const columns = useMemo(() => {
    const baseColumns = [
      {
        id: "select",
        enableSorting: false,
        header: ({ table }) => (
          <Form.Check
            type="checkbox"
            className="m-0 p-0"
            checked={table.getIsAllPageRowsSelected()}
            ref={(el) =>
              el && (el.indeterminate = table.getIsSomePageRowsSelected())
            }
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Form.Check
            type="checkbox"
            className="m-0 p-0"
            checked={row.getIsSelected()}
            ref={(el) =>
              el && (el.indeterminate = row.getIsSomeSelected())
            }
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
    ];

    if (isTablet) {
      return [
        ...baseColumns,
        {
          header: "Order",
          accessorKey: "orderId",
          cell: ({ row }) => (
            <div className="d-flex flex-column">
              <span className="fw-semibold">{row.original.orderId}</span>
              <small className="text-muted">{row.original.customer}</small>
            </div>
          ),
        },
        {
          header: "Date",
          accessorKey: "date",
          cell: ({ row }) => (
            <div className="d-flex flex-column">
              <span>{row.original.date}</span>
              <small className="text-muted">{row.original.time}</small>
            </div>
          ),
        },
        {
          header: "Order Type",
          accessorKey: "orderType",
          cell: ({ row, getValue }) => {
            const value = getValue();
            const dotColors = {
              "Dine-In": "bg-primary",
              Takeaway: "bg-danger",
              Online: "bg-dark",
            };

            return (
              <div className="d-flex flex-column">
                <span className="badge bg-info text-dark px-3 py-2 rounded-3 d-inline-flex align-items-center gap-2">
                  <span
                    className={`rounded-circle ${dotColors[value] || "bg-secondary"}`}
                    style={{ width: "8px", height: "8px" }}
                  ></span>
                  {value}
                </span>
                <small className="text-muted mt-1">
                  {row.original.address || "-"}
                </small>
              </div>
            );
          },
        },
        {
          header: "Amount",
          accessorKey: "amount",
          cell: ({ getValue }) => (
            <span className="fw-semibold text-primary">
              ${Number(getValue()).toFixed(2)}
            </span>
          ),
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
              <span className={`badge px-3 py-2 rounded-3 ${styles[getValue()]}`}>
                {getValue()}
              </span>
            );
          },
        },
      ];
    }

    return [
      ...baseColumns,
      {
        header: "Order ID",
        accessorKey: "orderId",
        cell: ({ getValue }) => (
          <span className="text-secondary">{getValue()}</span>
        ),
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: ({ row }) => (
          <div className="d-flex flex-column">
            <span>{row.original.date}</span>
            <small className="text-muted">{row.original.time}</small>
          </div>
        ),
      },
      { header: "Customer", accessorKey: "customer" },
      {
        header: "Order Type",
        accessorKey: "orderType",
        cell: ({ getValue }) => {
          const value = getValue();
          const dotColors = {
            "Dine-In": "bg-primary",
            Takeaway: "bg-danger",
            Online: "bg-dark",
          };

          return (
            <span className="badge bg-info text-dark px-3 py-2 rounded-3 d-inline-flex align-items-center gap-2">
              <span
                className={`rounded-circle ${dotColors[value] || "bg-secondary"}`}
                style={{ width: "8px", height: "8px" }}
              ></span>
              {value}
            </span>
          );
        },
      },
      {
        header: "Address",
        accessorKey: "address",
        cell: ({ getValue }) => (
          <span className="bg-info text-dark px-3 py-2 rounded-3 d-inline-block">
            {getValue() || "-"}
          </span>
        ),
      },
      { header: "Qty", accessorKey: "qty" },
      {
        header: "Amount",
        accessorKey: "amount",
        cell: ({ getValue }) => (
          <span className="fw-semibold text-primary">
            ${Number(getValue()).toFixed(2)}
          </span>
        ),
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
            <span className={`badge px-3 py-2 rounded-3 ${styles[getValue()]}`}>
              {getValue()}
            </span>
          );
        },
      },
    ];
  }, [isTablet]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
      rowSelection,
      pagination: pagination,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const filteredCards = orderCards.filter((item) => {
    if (statusFilter === "All") return true;
    return item.status === statusFilter;
  });

  const paginatedCards = filteredCards.slice(
    cardPagination.pageIndex * cardPagination.pageSize,
    (cardPagination.pageIndex + 1) * cardPagination.pageSize
  );
  return (
    <>
      {view === "table" && (
        <div className="p-4 bg-white rounded-4 shadow-sm">

          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">

            <FilterGroup
              options={["All", "On Process", "Completed", "Cancelled"]}
              value={statusFilter}
              onChange={setStatusFilter}
            />

            <div className="d-flex align-items-center gap-2">

              <ButtonGroup>
                <Button
                  size="sm"
                  variant={view === "table" ? "primary" : "info"}
                  onClick={() => setView("table")}
                >
                  <List size={16} className={view === "table" ? "text-white" : "text-secondary"} />
                </Button>

                <Button
                  size="sm"
                  variant={view === "card" ? "primary" : "info"}
                  onClick={() => setView("card")}
                >
                  <Grid size={16} className={view === "card" ? "text-white" : "text-secondary"} />
                </Button>
              </ButtonGroup>

              <SearchInput
                value={globalFilter}
                onChange={setGlobalFilter}
                placeholder="Search order ID, customer, etc"
              />

              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className="rounded-3 border-0 d-flex align-items-center gap-2 no-caret"
                >
                  This Week
                  <ChevronDown size={16} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>This Week</Dropdown.Item>
                  <Dropdown.Item>This Month</Dropdown.Item>
                  <Dropdown.Item>This Year</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="table-scroll w-100 table-responsive">
            <Table className="custom-table">
              <thead className="text-muted">
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
                        className="px-3 py-2 text-secondary fw-normal"
                      >
                        <div className={header.column.id === "select" ? "" : "d-flex gap-1 align-items-center"}>
                          {header.column.id === "select" ? (
                            flexRender(header.column.columnDef.header, header.getContext())
                          ) : (
                            <span className="small">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </span>
                          )}

                          {header.column.getCanSort() && header.column.id !== "select" && (
                            <span className="text-muted small">
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
                  <tr
                    key={row.id}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      router.push(`/orders/orderdetails?id=${row.original.id}`)
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3 py-2">
                        {flexRender(
                          cell.column.columnDef.cell ??
                          cell.column.columnDef.accessorKey,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-3">
            <PageSizeSelector
              table={table}
              pageSize={pagination.pageSize}
              total={table.getFilteredRowModel().rows.length}
            />

            <TablePagination
              table={table}
              pagination={pagination}
            />
          </div>

        </div>
      )}

      {view === "card" && (
        <>
          <section className="rounded-4">

            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">

              <FilterGroup
                options={["All", "On Process", "Completed", "Cancelled"]}
                value={statusFilter}
                onChange={setStatusFilter}
                mode="card"
              />

              <div className="d-flex align-items-center gap-2">

                <ButtonGroup>
                  <Button
                    size="sm"
                    variant={view === "table" ? "primary" : "info"}
                    onClick={() => setView("table")}
                  >
                    <List size={16} className={view === "table" ? "text-white" : "text-secondary"} />
                  </Button>

                  <Button
                    size="sm"
                    variant={view === "card" ? "primary" : "info"}
                    onClick={() => setView("card")}
                  >
                    <Grid size={16} className={view === "card" ? "text-white" : "text-secondary"} />
                  </Button>
                </ButtonGroup>

                {/* <SearchInput
                  value={globalFilter}
                  onChange={setGlobalFilter}
                  placeholder="Search order ID, customer, etc"
                /> */}

                {/* <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="rounded-3 border-0 d-flex align-items-center gap-2 no-caret"
                  >
                    This Week
                    <ChevronDown size={16} />
                  </Dropdown.Toggle>
                </Dropdown> */}

              </div>
            </div>

            <Row className="g-3">
              {paginatedCards.map((item) => (
                <Order_Card
                  key={item.id}
                  item={item}
                  onDetails={() =>
                   router.push(`/orders/orderdetails?id=${item.id}`)
                  }
                />
              ))}
            </Row>
            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-3">

              <PageSizeSelector
                table={{
                  setPageSize: (size) =>
                    setCardPagination((prev) => ({
                      ...prev,
                      pageSize: size,
                      pageIndex: 0,
                    })),
                  setPageIndex: (index) =>
                    setCardPagination((prev) => ({
                      ...prev,
                      pageIndex: index,
                    })),
                }}
                pageSize={cardPagination.pageSize}
                total={filteredCards.length}
                options={[6, 9, 12]}
              />

              <CardPagination
                pageIndex={cardPagination.pageIndex}
                pageSize={cardPagination.pageSize}
                total={filteredCards.length}
                onPageChange={(index) =>
                  setCardPagination((prev) => ({
                    ...prev,
                    pageIndex: index,
                  }))
                }
              />

            </div>
          </section>
        </>
      )}
    </>
  );
}