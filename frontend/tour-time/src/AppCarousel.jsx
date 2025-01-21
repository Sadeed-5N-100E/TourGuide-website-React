import React from 'react';
import { Carousel } from 'antd';
import img1 from './Images/image1.jpg'
import img2 from './Images/image2.jpg'
import img3 from './Images/image3.jpg'
import img4 from './Images/image4.jpg'
import img5 from './Images/image5.jpg'

const contentStyle = {
  height: '500px',
  width: '100%',
  objectFit: 'cover',
  color: '#fff',
  textAlign: 'center',
  background: '#364d79',
};

const carouselStyle = {
  maxWidth: '1000px',
  margin: '0 auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
};

const imageStyle = {
  ...contentStyle,
  objectPosition: 'center',
};

const AppCarousel = () => (
  <div style={carouselStyle}>
    <Carousel autoplay effect="fade">
      <div>
        <img src={img1} alt="Slide 1" style={imageStyle} />
      </div>
      <div>
        <img src={img2} alt="Slide 2" style={imageStyle} />
      </div>
      <div>
        <img src={img3} alt="Slide 3" style={imageStyle} />
      </div>
      <div>
        <img src={img4} alt="Slide 4" style={imageStyle} />
      </div>
      <div>
        <img src={img5} alt="Slide 5" style={imageStyle} />
      </div>
    </Carousel>
  </div>
);

export default AppCarousel;