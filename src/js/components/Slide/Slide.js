import React from 'react';
import PropTypes from 'prop-types';
import './Slide.scss';

const Slide = React.forwardRef(({ src }, ref) => (
  <div ref={ref} className="c-Slide">
    <img
      src={src}
      alt=""
    />
  </div>
));


export default Slide;
