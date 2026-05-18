"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Sidenav from "@/components/sidenav";

export default function Layout({ children }) {

  return (
    <div className="d-flex min-vh-100">

      <aside className="d-none d-md-flex flex-column flex-shrink-0">
        <Sidenav />
      </aside>

      <div className="flex-grow-1 d-flex flex-column min-vh-100 bg-dashboard main-layout">

        <Header />

        <main className="flex-grow-1 d-flex flex-column mx-4">
          {children}
        </main>

        <Footer />

      </div>
    </div>
  );
}

// import { Container, Row, Col } from "react-bootstrap";
// import Sidenav from "@/components/sidenav";
// import Footer from "@/components/footer";
// import Header from "@/components/header";

// export default function Layout({ children }) {
//   return (
//     <Container fluid className="min-vh-100 p-0">
//       <Row className="g-0 min-vh-100">

//         {/* Sidebar */}
//         <Col
//           md={1}
//           lg={2}
//           className="d-none d-md-block"
//         >
//           <Sidenav />
//         </Col>

//         {/* Main Content */}
//         <Col
//           xs={12}
//           md={11}
//           lg={10}
//           className="d-flex flex-column bg-dashboard min-vh-100"
//         >
//           <Header />

//           <main className="flex-grow-1 p-4">
//             {children}
//           </main>

//           <Footer />
//         </Col>

//       </Row>
//     </Container>
//   );
// }