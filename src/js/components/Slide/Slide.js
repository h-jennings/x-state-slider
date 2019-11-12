import React from 'react';
import PropTypes from 'prop-types';
import './Slide.scss';
import { Machine } from 'xstate';

const slideMachine = new Machine({
  id: 'slideMachine',
  initial: 'current',
  states: {
    past: {
      on: {
        CLICK_RIGHT: 'prev',
        CLICK_LEFT: 'past',
      },
    },
    prev: {
      on: {
        CLICK_RIGHT: 'current',
        CLICK_LEFT: 'past',
      },
    },
    current: {
      on: {
        CLICK_RIGHT: 'next',
        CLICK_LEFT: 'prev',
      },
    },
    next: {
      on: {
        CLICK_RIGHT: 'future',
        CLICK_LEFT: 'current',
      },
    },
    future: {
      on: {
        CLICK_RIGHT: 'future',
        CLICK_LEFT: 'next',
      },
    },
  },
});

const Slide = React.forwardRef(({ event, src }, ref) => (
  <div ref={ref} className="c-Slide">
    <img
      src={src}
      alt=""
    />
  </div>
));


export default Slide;
