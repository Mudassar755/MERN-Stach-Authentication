import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
//react-bootstrap
import { Container } from "react-bootstrap";

function Slider() {
  const [index, setIndex] = useState(0);
  // const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    // setDirection(e.direction);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className="carousel-image-1">
        <Carousel.Caption className=" d-none d-sm-block mb-5 text-right mb-5 ">
          <Container>
            <h1 className="display-3">MERN Stack Developers</h1>
            <p className="lead">
              Team of highly competent and passionate developer, providing
              services in Web Application Development, Single Page
              Applications(SPA), Progressive Web Apps(PWA), Mobile Apps
            </p>
            <Link to="/" className="btn btn-danger btn-lg">
              Sign Up Now
            </Link>
          </Container>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carousel-image-2">
        <Carousel.Caption className=" d-none d-sm-block mb-5 ">
          <h1 className="display-3">React.Js & React-Native Developer</h1>
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
            aperiam vel ullam deleniti reiciendis ratione quod aliquid inventore
            vero perspiciatis.
          </p>
          <Link to="/about" className="btn btn-primary btn-lg">
            Learn More
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carousel-image-3">
        <Carousel.Caption className="text-right mb-5  d-none d-sm-block mb-5">
          <h1 className="display-3">Back End Develoer (Node.js. MongoDB, Express.js)</h1>
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
            aperiam vel ullam deleniti reiciendis ratione quod aliquid inventore
            vero perspiciatis.
          </p>
          <Link to="/about" className="btn btn-success btn-lg">
            Learn More
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
