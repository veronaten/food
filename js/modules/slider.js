function slider() {
  //Slider

  const slides = document.querySelectorAll('.offer__slide');
  const slider = document.querySelector('.offer__slider')
  const prev = document.querySelector('.offer__slider-prev');
  const next = document.querySelector('.offer__slider-next');
  const total = document.querySelector('#total');
  const current = document.querySelector('#current');
  const slidesWrapper = document.querySelector('.offer__slider-wrapper');
  const sliedesField = document.querySelector('.offer__slider-inner');
  const width = window.getComputedStyle(slidesWrapper).width;
  let numberSlides = 1;
  let offset = 0;
  
  if (slides.length < 10 ) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${numberSlides}`;
  } else {
      total.textContent = slides.length;
      current.textContent = numberSlides;
  }
  
  sliedesField.style.width = 100 * slides.length + '%';
  sliedesField.style.display = 'flex';
  sliedesField.style.transition = '0.5s all';
  
  slidesWrapper.style.overflow = 'hidden';
  
  slides.forEach(slide => {
    slide.style.width = width;
  })
  
  slider.style.position = 'relative';
  
  const indicators = document.createElement('ol');
  const dots = [];
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  
  slider.append(indicators);
  
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;
      
    if (i == 0) {
      dot.style.opacity = 1;
    }
  
    indicators.append(dot);
    dots.push(dot);
  }
  
  function makeDotsActive(arr) {
    arr.forEach(dot => dot.style.opacity = '.5');
  
    arr[numberSlides - 1].style.opacity = 1;
  }
    
  function makeNumberOfSlide(a) {
    if (slides.length < 10) {
      a.textContent = `0${numberSlides}`;
    } else {
      a.textContent = numberSlides;
    }
  }
    
  makeNumberOfSlide(current);
  
  function makeNumber(str) {
    return +str.replace(/\D/g, '');
  }
  
  next.addEventListener('click', () => {
    if (offset == makeNumber(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += makeNumber(width);
    }
  
    sliedesField.style.transform = `translateX(-${offset}px)`;
  
    if (numberSlides == slides.length) {
      numberSlides = 1;
    } else {
      numberSlides++;
    }
  
    makeNumberOfSlide(current);
  
    makeDotsActive(dots);
  })
  
  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = makeNumber(width) * (slides.length - 1);
    } else {
      offset -= makeNumber(width);
    }
  
    sliedesField.style.transform = `translateX(-${offset}px)`;
  
    if (numberSlides == 1) {
      numberSlides = slides.length;
    } else {
      numberSlides--;
    }
  
    makeNumberOfSlide(current);
  
    makeDotsActive(dots);
  })
  
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');
  
      numberSlides = slideTo;
      offset = makeNumber(width) * (slideTo - 1);
    
      sliedesField.style.transform = `translateX(-${offset}px)`;
  
      makeNumberOfSlide(current);
    
      makeDotsActive(dots);
    })
  })
  
    // if (sliders.length < 10 ) {
    //   total.textContent = `0${sliders.length}`;
    // } else {
    //   total.textContent = sliders.length;
    // }
  
    // showSlides(numberSlides);
  
    // function showSlides(n) {
    //   if (n > sliders.length) {
    //     numberSlides = 1;
    //   }
  
    //   if (n < 1) {
    //     numberSlides = sliders.length;
    //   }
  
    //   sliders.forEach(item => item.style.display = 'none');
    //   sliders[numberSlides - 1].style.display = 'block';
  
    //   if (sliders.length < 10 ) {
    //     current.textContent = `0${numberSlides}`;
    //   } else {
    //     current.textContent = numberSlides;
    //   }
    // }
  
    // function plusSlides(n) {
    //   showSlides(numberSlides += n);
    // }
  
    // prev.addEventListener('click', () => {
    //   plusSlides(-1);
    // })
  
    // next.addEventListener('click', () => {
    //   plusSlides(1);
    // })
}

module.exports = slider;