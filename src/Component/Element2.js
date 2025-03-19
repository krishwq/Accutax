import React, { useRef, useState, useEffect } from "react";
import pic1 from './images/slidepic1.webp';
import pic2 from './images/slidepic2.webp';
import pic3 from './images/slidepic3.webp';
import pic4 from './images/slidepic4.webp';


function Element2() {
  const carousels = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    const handleCarouselEvents = (carousel, index) => {
      const items = Array.from(carousel.querySelectorAll(".carousel-item"));
      const currentIndex = items.findIndex((item) => item.classList.contains("active"));
      if (index === 0) {
        setActiveIndex(currentIndex);
        setTotalSlides(items.length);
      }
    };

    carousels.current.forEach((carousel, index) => {
      if (!carousel) return;
      const handleSlideChange = () => handleCarouselEvents(carousel, index);

      carousel.addEventListener("slid.bs.carousel", handleSlideChange);
      handleCarouselEvents(carousel, index);

      return () => {
        carousel.removeEventListener("slid.bs.carousel", handleSlideChange);
      };
    });
  }, []);

  const handlePrevious = () => {
    carousels.current.forEach((carousel) => {
      if (carousel) {
        const prevButton = carousel.querySelector(".carousel-control-prev");
        if (prevButton) prevButton.click();
      }
    });
  };

  const handleNext = () => {
    carousels.current.forEach((carousel) => {
      if (carousel) {
        const nextButton = carousel.querySelector(".carousel-control-next");
        if (nextButton) nextButton.click();
      }
    });
  };

  return (
    <div className="element2_container">
      <div className="tablet">
        <div
          ref={(el) => (carousels.current[1] = el)}
          id="carouselExample2"
          className="carousel slide"
        >
          <div className="carousel-inner">
            <div className="carousel-item active carousel-item-img">
              <img src={pic1} alt="pic1s" />
            </div>
            <div className="carousel-item carousel-item-img">
              <img src={pic2} alt="pic2" />
            </div>
            <div className="carousel-item carousel-item-img">
            <img src={pic3} alt="pic3" />
            </div>
            <div className="carousel-item carousel-item-img">
              <img src={pic4} alt="pic4" />
            </div>
          </div>
          <button className="carousel-control-prev d-none" type="button" data-bs-target="#carouselExample2" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next d-none" type="button" data-bs-target="#carouselExample2" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>

      <div className="car1cont">
        <h1>How to file taxes with Accutax</h1>
        <div
          ref={(el) => (carousels.current[0] = el)}
          id="carouselExample1"
          className="carousel slide"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div>
                <span>STEP 1/4</span>
                <h3>A.I. scans every expense & finds deductions</h3>
                <p>Accutax's A.I. analyzes your expenses, identifying every tax write-off based on 200+ deduction categories.</p>
              </div>
            </div>
            <div className="carousel-item">
            <div>
                <span>STEP 2/4</span>
                <h3>Upload your tax documents in 2 minutes</h3>
                <p>Complete your tax profile so CAs can customize your list of tax documents to upload.</p>
              </div>
            </div>
            <div className="carousel-item">
            <div>
                <span>STEP 3/4</span>
                <h3>CAs prepare your tax returns</h3>
                <p>The CA team prepares your federal and state tax returns for your review and e-sign.</p>
              </div>
            </div>
            <div className="carousel-item">
            <div>
                <span>STEP 4/4</span>
                <h3>CAs e-file your taxes</h3>
                <p>When everything is ready and reviewed, CPAs e-file, and your taxes are complete for the year.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev d-none" type="button" data-bs-target="#carouselExample1" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next d-none" type="button" data-bs-target="#carouselExample1" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>

        <div className="btn-slide">
          <button
            onClick={handlePrevious}
            disabled={activeIndex === 0}
            style={{ backgroundColor: activeIndex === 0 ? "gray" : "" }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex === totalSlides - 1}
            style={{ backgroundColor: activeIndex === totalSlides - 1 ? "gray" : "" }}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Element2;