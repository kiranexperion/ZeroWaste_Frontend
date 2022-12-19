import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import Particle from "../Particle";
// import Techstack from "./Techstack";
// import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/img2.jpg";
// import Toolstack from "./Toolstack";

function About() {
  return (
    <Container fluid className="about-section">
      {/* <Particle /> */}
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
             <strong className="purple">About Us</strong>
            </h1>
            <p style={{ fontSize: "1em" ,color:"black"}}>Thiruvananthapuram is known as the City of temples, Museums, Institutions and land of Art and Culture . The city being the capital is the center spot for the political activities of the State.Thiruvananthapuram is a unique Indian City, which greenery and modernity co exist.
            The present Thiruvananthapuram district was part of the erstwhile Travancore State. According to historical records, the State of Travancore was divided into three administrative units during the reign of Maharaja Rama Varma (a.d.1758-1798) – Vadakkemukkom, Patinjaremukhom and Tekkemukkom. Tekkemukhom roughly corresponds to the present district of Thiruvananthapuram, also one of the most preferred holiday destination in Kerala.</p>
           <p>please visit :
            www.trivandrum.gov.in
            www.thiruvananthapuram.net</p>
            {/* <Aboutcard /> */}
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>
        {/* <h1 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h1> */}

        {/* <Techstack />

        <h1 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h1>
        <Toolstack /> */}

        {/* <Github /> */}
      </Container>
    </Container>
  );
}

export default About;
