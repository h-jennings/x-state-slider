import React from 'react';
import PropTypes from 'prop-types';
import { Machine, assign } from 'xstate';
import { useMachine } from '@xstate/react';
import { motion } from 'framer-motion';
import Slide from '../Slide';
import Button from '../Button';
import './ImageSlider.scss';


const imageCount = 15;
const imageArr = [];

for (let index = 0; index < imageCount; index += 1) {
  imageArr.push(
    {
      src: 'https://via.placeholder.com/1000x600',
      id: index,
      current: `${index === 0}`,
    },
  );
}

const MotionSlide = motion.custom(Slide);

const slideVariants = {
  past: {
    x: '-200%',
  },
  current: {
    x: '0%',
  },
  next: {
    x: '110%',
  },
  future: {
    x: '200%',
  },
};


const increment = (context) => context.index + 1;
const decrement = (context) => context.index - 1;

const isNotMax = (context) => context.index < imageArr.length - 1;
const isNotMin = (context) => context.index > 0;

const evaluateClass = (contextIndex, imageIndex) => {
  switch (true) {
  case imageIndex === contextIndex: {
    return 'current';
  }
  case imageIndex < contextIndex: {
    return 'past';
  }
  case imageIndex === contextIndex + 1: {
    return 'next';
  }
  case imageIndex > contextIndex + 1: {
    return 'future';
  }
  default: {
    break;
  }
  }
  return false;
};

const imageSliderMachine = new Machine({
  id: 'slideMachine',
  initial: 'idle',
  context: {
    index: 0,
    slides: [],
  },
  states: {
    idle: {
      on: {
        CLICK_RIGHT: {
          actions: assign({
            index: increment,
          }),
          cond: isNotMax,
        },
        CLICK_LEFT: {
          actions: assign({
            index: decrement,
          }),
          cond: isNotMin,
        },
      },
    },
  },
});


const ImageSlider = () => {
  const [current, send] = useMachine(imageSliderMachine);


  return (
    <div className="c-ImageSlider">
      <header>
        <h1>
          XSTATE CAROUSEL
          {current.context.index}
        </h1>
        <p>
          This is an image carousel built with the xState Finite State Machine library.
        </p>
      </header>
      <div className="ImageSlider--wrapper">
        {imageArr.map(({ src, id }, index) => (
          <MotionSlide
            initial={false}
            animate={`${current.context && evaluateClass(current.context.index, index)}`}
            variants={slideVariants}
            key={id}
            src={src}
          />
        ))}
      </div>
      <div className="slideIndicator--container">
        {imageArr.map(({ id }) => (
          <div
            key={id}
            className="slide-indicator"
          />
        ))}
      </div>
      <Button
        onClick={() => send('CLICK_LEFT')}
        orientation="left"
      />
      <Button
        onClick={() => send('CLICK_RIGHT')}
        orientation="right"
      />
    </div>
  );
};


export default ImageSlider;
