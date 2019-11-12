const handleSlide = (event) => new Promise((resolve, reject) => {
  switch (event.type) {
  case 'CLICK_RIGHT': {
    console.log('right slide animation');
    resolve();
    break;
  }
  case 'CLICK_LEFT': {
    console.log('left slide animation');
    resolve();
    break;
  }
  default: {
    resolve();
    break;
  }
  }
});


export default handleSlide;
