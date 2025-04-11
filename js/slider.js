/* =====  FADE‑SLIDER WITH WHEEL / TOUCH CONTROL  ================= */
(() => {
    const slides   = [...document.querySelectorAll('.slide')];
    const interval = 5000;                // 5‑second cadence
    let   index    = 0;
    let   timer;
  
    /* ———  Activate the first frame  ——— */
    slides[0].classList.add('active');
    restartAuto();
  
    /* ———  Core functions  ————————————————— */
    function next(dir = 1){
      slides[index].classList.remove('active');
      index = (index + dir + slides.length) % slides.length;
      slides[index].classList.add('active');
    }
  
    function restartAuto(){
      clearInterval(timer);
      timer = setInterval(next, interval);
    }
  
    /* ———  Wheel & touch handlers  ————————— */
    let touchStartY = null;
  
    function handleWheel(e){
      e.preventDefault();
      next(e.deltaY > 0 ? 1 : -1);
      restartAuto();
    }
  
    function handleTouchStart(e){
      touchStartY = e.touches[0].clientY;
    }
  
    function handleTouchMove(e){
      if(touchStartY === null) return;
      const delta = touchStartY - e.touches[0].clientY;
      if(Math.abs(delta) > 50){           // swipe threshold
        next(delta > 0 ? 1 : -1);
        restartAuto();
        touchStartY = null;
      }
    }
  
    /* ———  Attach listeners  ———————————— */
    const slider = document.querySelector('.slider');
    slider.addEventListener('wheel',       handleWheel,      {passive:false});
    slider.addEventListener('touchstart',  handleTouchStart, {passive:true});
    slider.addEventListener('touchmove',   handleTouchMove,  {passive:true});
  })();
  