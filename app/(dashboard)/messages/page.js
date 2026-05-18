"use client";

import { useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  InputGroup,
} from "react-bootstrap";

import {
  Search,
  SlidersHorizontal,
  Plus,
  Phone,
  Video,
  MoreHorizontal,
  Smile,
  Paperclip,
  Send,
  CheckCheck,
  PanelRight,
} from "lucide-react";

import {
  messageUsers,
  messageConversations,
} from "@/data/MessagesData";

export default function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState(messageUsers[0]);

  const activeConversation = messageConversations.find(
    (conv) => conv.user_id === selectedUser.id
  );

  const getRoleBadge = (role) => {
    switch (role) {
      case "customer":
        return "Customer";

      case "kitchen_admin":
        return "Kitchen Admin";

      case "head_chef":
        return "Head Chef";

      default:
        return role;
    }
  };

  return (
    <div className="container-fluid rounded-4 bg-white ">
      <Card className="border-0 rounded-5 overflow-hidden ">
        <Card.Body className="p-2 p-lg-3">

          <Row className="g-3">

            {/* SIDEBAR */}

            <Col xl={4} lg={5}>
              <div className="bg-white rounded-5 h-100 p-3 border-0">

                {/* SEARCH */}

                <div className="d-flex align-items-center gap-2 mb-3">

                  <InputGroup>

                    <InputGroup.Text className="bg-info border-0 rounded-start-3 px-3">
                      <Search size={16} className="text-secondary" />
                    </InputGroup.Text>

                    <Form.Control
                      placeholder="Search message, name, etc"
                      className="bg-info border-0 shadow-none rounded-end-3 py-2"
                    />

                  </InputGroup>

                  <Button
                    className="border-0 rounded-4 d-flex align-items-center justify-content-center bg-primary-subtle text-secondary p-0 flex-shrink-0"
                    style={{ width: "44px", height: "44px" }}
                  >
                    <SlidersHorizontal size={18} />
                  </Button>

                  <Button
                    variant="primary"
                    className="border-0 rounded-4 d-flex align-items-center text-white justify-content-center p-0 flex-shrink-0"
                    style={{ width: "44px", height: "44px" }}
                  >
                    <Plus size={20} />
                  </Button>

                </div>

                {/* USERS */}

                <div
                  className="pe-1 overflow-auto"
                  style={{
                    maxHeight: "78vh",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >

                  {messageUsers.map((user) => (

                    <div
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      role="button"
                      className={`py-3 border-bottom ${selectedUser.id === user.id
                        ? "bg-white"
                        : "bg-white"
                        }`}
                    >

                      <div className="d-flex gap-3">

                        {/* AVATAR */}

                        <div
                          className="rounded-4 bg-success d-flex align-items-center justify-content-center fw-semibold text-dark flex-shrink-0"
                          style={{
                            width: "42px",
                            height: "42px",
                            minWidth: "42px",
                          }}
                        >
                          {user.avatar_text || ""}
                        </div>

                        {/* CONTENT */}

                        <div className="flex-grow-1 overflow-hidden">

                          {/* TOP */}

                          <div className="d-flex justify-content-between align-items-start gap-2">

                            <div className="d-flex align-items-center gap-2 flex-wrap overflow-hidden">

                              <h6 className="mb-0 fw-semibold text-dark text-truncate fs-6">
                                {user.name}
                              </h6>

                              <Badge
                                bg=""
                                className={`fw-normal border-0 ${user.role === "head_chef"
                                    ? "bg-dark text-white"
                                    : user.role === "kitchen_admin"
                                      ? "bg-danger text-dark"
                                      : "bg-success text-secondary-emphasis"
                                  }`}
                                style={{
                                  fontSize: "9px",
                                }}
                              >
                                {getRoleBadge(user.role)}
                              </Badge>

                            </div>

                            <small className="text-muted text-nowrap">
                              {user.last_message_time}
                            </small>

                          </div>

                          {/* MESSAGE */}

                          <div className="d-flex justify-content-between align-items-center mt-1 gap-2">

                            <div className="small text-muted text-truncate pe-2 d-flex align-items-center">

                              {user.is_read && (
                                <CheckCheck
                                  size={14}
                                  className="me-1 text-primary flex-shrink-0"
                                />
                              )}

                              <span className="text-truncate">
                                {user.last_message}
                              </span>

                            </div>

                            {user.unread_count > 0 && (

                              <div
                                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  fontSize: "10px",
                                }}
                              >
                                {user.unread_count}
                              </div>

                            )}

                          </div>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>
            </Col>

            {/* CHAT SECTION */}

            <Col xl={8} lg={7}>

              <div className="bg-dashboard  rounded-5 h-100 d-flex flex-column p-4">

                {/* HEADER */}

                <div className="bg-light rounded-4 p-3 d-flex justify-content-between align-items-center ">

                  <div className="d-flex align-items-center gap-3">

                    <div
                      className="rounded-circle bg-success"
                      style={{
                        width: "48px",
                        height: "48px",
                      }}
                    />

                    <div>

                      <h6 className="mb-0 fw-semibold">
                        {selectedUser.name}
                      </h6>

                      <small className="text-muted d-flex align-items-center gap-1">

                        <span
                          className={`rounded-circle d-inline-block ${selectedUser.is_online
                            ? "bg-primary"
                            : "bg-secondary"
                            }`}
                          style={{
                            width: "8px",
                            height: "8px",
                          }}
                        />

                        {selectedUser.is_online
                          ? "Online"
                          : "Offline"}

                      </small>

                    </div>

                  </div>

                  <div className="d-flex align-items-center gap-2">

                    <Button
                      className="bg-success border-0 rounded-4 text-secondary"
                      style={{ width: "42px", height: "42px" }}
                    >
                      <Phone size={18} />
                    </Button>

                    <Button
                      className="bg-success border-0 rounded-4 text-secondary"
                      style={{ width: "42px", height: "42px" }}
                    >
                      <Video size={18} />
                    </Button>

                    <Button
                      className="bg-success border-0 rounded-4 text-secondary"
                      style={{ width: "42px", height: "42px" }}
                    >
                      <PanelRight size={18} />
                    </Button>

                    <Button
                      className="bg-light border-0 rounded-4 text-secondary"
                      style={{ width: "42px", height: "42px" }}
                    >
                      <MoreHorizontal size={18} />
                    </Button>

                  </div>

                </div>

                {/* CHAT BODY */}

                <div
                  className="flex-grow-1 px-2 px-lg-3 py-4 overflow-auto"
                  style={{ minHeight: "500px" }}
                >

                  {activeConversation && (
                    <>

                      <div className="text-center text-muted small mb-4">
                        {activeConversation.date_label}
                      </div>

                      {activeConversation.messages.map((msg) => {

                        const isAdmin =
                          msg.sender_type === "admin";

                        return (

                          <div
                            key={msg.id}
                            className={`d-flex mb-4 ${isAdmin
                              ? "justify-content-end"
                              : "justify-content-start"
                              }`}
                          >

                            <div
                              className={`d-flex gap-2 ${isAdmin
                                ? "flex-row-reverse"
                                : ""
                                }`}
                              style={{ maxWidth: "75%" }}
                            >

                              {!isAdmin && (

                                <div
                                  className="rounded-circle bg-light flex-shrink-0"
                                  style={{
                                    width: "36px",
                                    height: "36px",
                                  }}
                                />

                              )}

                              <div>

                                <div
                                  className={`rounded-4 px-3 py-3 ${isAdmin
                                    ? "bg-danger text-dark"
                                    : "bg-light text-dark"
                                    }`}
                                >
                                  {msg.message}
                                </div>

                                <div
                                  className={`small text-muted mt-1 d-flex align-items-center gap-1 ${isAdmin
                                    ? "justify-content-end"
                                    : ""
                                    }`}
                                >

                                  {msg.time}

                                  {isAdmin && (
                                    <CheckCheck size={14} />
                                  )}

                                </div>

                              </div>

                            </div>

                          </div>

                        );
                      })}

                    </>
                  )}

                </div>

                {/* FOOTER */}

                <div className="border bg-white rounded-4 p-2 px-3">

                  <div className="d-flex align-items-center gap-2">

                    <Button
                      variant=""
                      className="border-0 p-0 text-muted"
                    >
                      <Smile size={18} />
                    </Button>

                    <Form.Control
                      placeholder="Type a message.."
                      className="border-0 shadow-none"
                    />

                    <Button
                      variant=""
                      className="border-0 p-0 text-muted"
                    >
                      <Paperclip size={18} />
                    </Button>

                    <Button
                      variant="primary"
                      className="rounded-4 border-0 px-4 d-flex align-items-center text-light gap-2"
                    >
                      Send
                      <Send size={16} />
                    </Button>

                  </div>

                </div>

              </div>

            </Col>

          </Row>

        </Card.Body>
      </Card>
    </div>
  );
}