export const orderStats = [
  {
    id: 1,
    title: "Total Orders",
    value: 200,
    icon: "receipt",
  },
  {
    id: 2,
    title: "On Process",
    value: 45,
    icon: "loading",
  },
  {
    id: 3,
    title: "Completed",
    value: 140,
    icon: "check",
  },
  {
    id: 4,
    title: "Canceled",
    value: 15,
    icon: "close",
  }
];

export const ordersOverview = [
  { day: "Sun", orders: 220 },
  { day: "Mon", orders: 230 },
  { day: "Tue", orders: 270 },
  { day: "Wed", orders: 301 },
  { day: "Thu", orders: 310 },
  { day: "Fri", orders: 280 },
  { day: "Sat", orders: 330 }
];

export const orderTypes = [
  {
    id: 1,
    type: "Dine In",
    value: 75,
  },
  {
    id: 2,
    type: "Takeaway",
    value: 60,
  },
  {
    id: 3,
    type: "Online",
    value: 65,
  }
];

export const customerOrders = [
  {
    id: 1,
    orderId: "ORD1023",
    date: "2035-10-20",
    time: "02:47 PM",
    customer: "Alice Johnson",
    orderType: "Dine-In",
    address: "-",
    qty: 1,
    amount: 18.00,
    status: "Completed"
  },
  {
    id: 2,
    orderId: "ORD1024",
    date: "2035-10-26",
    time: "12:47 AM",
    customer: "Bob Smith",
    orderType: "Takeaway",
    address: "-",
    qty: 2,
    amount: 24.00,
    status: "Cancelled"
  },
  {
    id: 3,
    orderId: "ORD1025",
    date: "2035-10-23",
    time: "10:47 PM",
    customer: "Charlie Brown",
    orderType: "Dine-In",
    address: "-",
    qty: 1,
    amount: 10.00,
    status: "Completed"
  },
  {
    id: 4,
    orderId: "ORD1026",
    date: "2035-10-23",
    time: "01:47 PM",
    customer: "Dana White",
    orderType: "Dine-In",
    address: "-",
    qty: 3,
    amount: 30.00,
    status: "On Process"
  },
  {
    id: 5,
    orderId: "ORD1027",
    date: "2035-10-26",
    time: "03:47 PM",
    customer: "Eve Carter",
    orderType: "Online",
    address: "123 Elm Street",
    qty: 1,
    amount: 15.00,
    status: "Completed"
  },
  {
    id: 6,
    orderId: "ORD1028",
    date: "2035-10-22",
    time: "11:47 AM",
    customer: "Frank Miller",
    orderType: "Online",
    address: "456 Pine Avenue",
    qty: 4,
    amount: 35.00,
    status: "Completed"
  },
  {
    id: 7,
    orderId: "ORD1029",
    date: "2035-10-27",
    time: "09:47 AM",
    customer: "Grace Lee",
    orderType: "Takeaway",
    address: "-",
    qty: 2,
    amount: 22.00,
    status: "Cancelled"
  },
  {
    id: 8,
    orderId: "ORD1030",
    date: "2035-10-26",
    time: "08:47 AM",
    customer: "Hannah Gold",
    orderType: "Dine-In",
    address: "-",
    qty: 3,
    amount: 36.00,
    status: "On Process"
  },
  {
    id: 9,
    orderId: "ORD1031",
    date: "2035-10-21",
    time: "05:47 PM",
    customer: "Ivan Tucker",
    orderType: "Online",
    address: "789 Oak Lane",
    qty: 5,
    amount: 60.00,
    status: "Completed"
  },
  {
    id: 10,
    orderId: "ORD1032",
    date: "2035-10-25",
    time: "02:47 PM",
    customer: "Jessica Fox",
    orderType: "Online",
    address: "321 Maple Road",
    qty: 2,
    amount: 25.00,
    status: "On Process"
  }
];

const OrdersData0 = {
  orderStats,
  ordersOverview,
  orderTypes,
  customerOrders
}

export default OrdersData0 