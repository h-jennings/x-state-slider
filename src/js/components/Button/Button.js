import React from 'react';
import PropTypes from 'prop-types';
import arrow from '../../../assets/images/rightArrowIcon.svg';
import './Button.scss';

const Button = ({ onClick, orientation = 'right' }) => (
  <button
    type="button"
    className="c-Button"
    onClick={onClick}
  >
    <img
      src={arrow}
      alt=""
      style={
        {
          transform: `${orientation === 'right' ? 'rotate(0deg)' : 'rotate(180deg)'}`,
        }
      }
    />
  </button>
);

Button.propTypes = {
  orientation: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
