import React from 'react';
import SlickSlider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export interface ISlide {
  id: string | number;
  content: React.ReactNode;
}

interface SimpleSliderProps {
  slides: ISlide[];
  slidesToShow?: number;
  slidesToScroll?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  dots?: boolean;
  arrows?: boolean;
  infinite?: boolean;
  className?: string;
}

const Slider: React.FC<SimpleSliderProps> = ({
  slides,
  slidesToShow = 1,
  slidesToScroll = 1,
  autoplay = false,
  autoplaySpeed = 3000,
  dots = false,
  arrows = true,
  infinite = true,
  className = '',
}) => {
  const settings = {
    dots,
    infinite,
    speed: 500,
    slidesToShow,
    slidesToScroll,
    autoplay,
    autoplaySpeed,
    arrows,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(slidesToShow, 3),
          slidesToScroll: Math.min(slidesToScroll, 3),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(slidesToShow, 2),
          slidesToScroll: Math.min(slidesToScroll, 2),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={`simple-slider ${className}`}>
      <SlickSlider {...settings}>
        {slides.map(slide => (
          <div key={slide.id} className="px-2">
            {slide.content}
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};

export default Slider;
