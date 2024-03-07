import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SimpleSlider = () => {
    const settings = {
        dots: false,
        automatic:true,
        infinite: true,
        speed: 5,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div style={{width:"400px"}} >
            <Slider {...settings}>
                <div>
                    <h3 style={{ fontSize: "40px" }}>Slide 1</h3>
                </div>
                <div>
                    <h3>Slide 2</h3>
                </div>
                <div>
                    <h3>Slide 3</h3>
                </div>
            </Slider>
        </div>
    );
};

export default SimpleSlider;
