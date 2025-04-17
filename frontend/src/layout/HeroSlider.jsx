import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/HeroSlider.css"; // تأكد من إضافة هذا الملف في المسار الصحيح

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // تفعيل الأسهم
  };

  const slides = [
    {
      id: 1,
      img: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
      title: "Counter-Strike: Global Offensive",
    },
    {
      id: 2,
      img: "https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg",
      title: "Dota 2",
    },
    {
      id: 3,
      img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg",
      title: "apex legends",
    }
  ];

  return (
    <div
      className="hero-slider"
      style={{
        width: "80%",
        margin: "40px auto",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        position: "relative",
      }}
    >
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} style={{ position: "relative" }}>
            <img
              src={slide.img}
              alt={slide.title}
              style={{
                width: "100%",
                height: "600px",
                objectFit: "cover",
                position: "relative",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "30px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "#fff",
                padding: "15px 30px", // تعديل البادينج بشكل مريح
                borderRadius: "8px",
                fontSize: "1.2rem", // تكبير الخط
                fontWeight: "bold",
                textAlign: "center",
                maxWidth: "90%",
                zIndex: 2, // التأكد من أن العنوان فوق الصورة
              }}
            >
              {slide.title}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
