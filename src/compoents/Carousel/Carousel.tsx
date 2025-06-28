import React, { useState, useEffect } from 'react';
import './Carousel.less';

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = true,
  interval = 3000,
  showDots = true,
  showArrows = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // 自动播放
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setDirection('right');
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  // 切换到下一张
  const nextSlide = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // 切换到上一张
  const prevSlide = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // 直接跳转到指定索引
  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        {images.map((image, index) => {
          let slideClass = 'carousel-slide';
          
          if (index === currentIndex) {
            slideClass += ' active';
          } else if (index === (currentIndex - 1 + images.length) % images.length) {
            slideClass += direction === 'right' ? ' slide-out-left' : ' slide-out-right';
          } else if (index === (currentIndex + 1) % images.length) {
            slideClass += direction === 'right' ? ' slide-in-right' : ' slide-in-left';
          }
          
          return (
            <div
              key={index}
              className={slideClass}
            >
              <img src={image} alt={`slide-${index}`} />
            </div>
          );
        })}
      </div>

      {/* 左右箭头 */}
      {showArrows && images.length > 1 && (
        <>
          <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </>
      )}

      {/* 指示点 */}
      {showDots && images.length > 1 && (
        <div className="carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel; 