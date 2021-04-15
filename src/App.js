import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import gsap from 'gsap';

function App() {
  const [view, setView] = useState('basic-tweens');

  const renderViews = () => {
    switch (view) {
      case 'basic-tweens':
        return <BasicTweens />;
      case 'timelines':
        return <Timelines />;
      case 'calls':
        return <Calls />;
      case 'memoization':
        return <Memoization />;
      default:
        return null;
    }
  };
  return (
    <main>
      <section className="buttons">
        <button
          className={view === 'basic-tweens' ? 'active' : ''}
          onClick={() => setView('basic-tweens')}
        >
          Basic Tweens
        </button>
        <button
          className={view === 'timelines' ? 'active' : ''}
          onClick={() => setView('timelines')}
        >
          Timelines
        </button>
        <button
          className={view === 'calls' ? 'active' : ''}
          onClick={() => setView('calls')}
        >
          Calls
        </button>
        <button
          className={view === 'memoization' ? 'active' : ''}
          onClick={() => setView('memoization')}
        >
          Memoization
        </button>
      </section>
      <section className="content">{renderViews()}</section>
    </main>
  );
}

export default App;

/****************
 * Basic Tweens *
 ****************/
const BasicTweens = () => {
  const circle1 = useRef();
  const circle2 = useRef();

  const handleStart = () => {
    /* .to */
    gsap.to(circle1.current, { y: -300 });
    gsap.to(circle2.current, { y: 300 });

    /* Easing */
    // gsap.to(circle1.current, { y: -300, ease: 'bounce.out' });
    // gsap.to(circle2.current, { y: 300, ease: 'bounce.out' });

    /* Repeat */
    // gsap.to(circle1.current, { y: -300, ease: 'bounce.out', repeat: -1 });

    /* Duration */
    // gsap.to(circle1.current, { duration: 2, y: -300, ease: 'bounce.out' });
    // gsap.to(circle2.current, { duration: 2, y: 300, ease: 'bounce.out' });

    /* Delay */
    // gsap.to(circle1.current, { duration: 2, y: -300, ease: 'bounce.out' });
    // gsap.to(circle2.current, { duration: 2, delay: 2, y: 300, ease: 'bounce.out' });
  };

  const handleReset = () => {
    /* Multiple targets and .set */
    gsap.set([circle1.current, circle2.current], { y: 0 });
  };

  return (
    <div className="view basic-tweens">
      <div className="inner-content">
        <div ref={circle1} className="circle" />
        <div ref={circle2} className="circle" />
      </div>
      <div className="buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

/*************
 * Timelines *
 *************/
const Timelines = () => {
  const circle1 = useRef();
  const circle2 = useRef();

  const handleStart = () => {
    /* Basic timeline */
    gsap
      .timeline()
      .to(circle1.current, { duration: 2, y: -300, ease: 'bounce.out' })
      .to(circle2.current, { duration: 2, y: 300, ease: 'bounce.out' });

    /* Assign to variable */
    // const tl = gsap.timeline();
    //
    // tl.to(circle1.current, { duration: 2, y: -300, ease: 'bounce.out' })
    //   .to(circle2.current, { duration: 2, y: 300, ease: 'bounce.out' });

    /* Control timing */
    // const tl = gsap.timeline();
    //
    // tl.to(circle1.current, { duration: 2, y: -300, ease: 'bounce.out' })
    //   .to(circle2.current, { duration: 2, y: 300, ease: 'bounce.out' }, '-=2');

    /* Labels */
    // const tl = gsap.timeline();
    //
    // tl.addLabel('start')
    //   .to(circle1.current, { duration: 2, y: -300, ease: 'bounce.out' })
    //   .to(circle2.current, { duration: 2, y: 300, ease: 'bounce.out' }, 'start');

    /* Longer sequence */
    // const tl = gsap.timeline();
    //
    // tl.addLabel('start1')
    //   .to(circle1.current, { duration: 2, y: -300, ease: 'bounce.out' })
    //   .to(circle2.current, { duration: 2, y: 300, ease: 'bounce.out' }, 'start1')
    //   .addLabel('start2')
    //   .to(circle1.current, { duration: 2, y: 300, ease: 'bounce.out' })
    //   .to(circle2.current, { duration: 2, y: -300, ease: 'bounce.out' }, 'start2');

    /* Master timeline */
    // const masterTl = gsap.timeline();

    // const tweenCircles = (target1, target2, y) => {
    // const tl = gsap.timeline();

    // return (
    //
    // tl.addLabel('start')
    // .to(target1, { duration: 2, y, ease: 'bounce.out' })
    // .to(target2, { duration: 2, y: -y, ease: 'bounce.out' }, 'start')
    // );
    // };

    // masterTl
    // .add(tweenCircles(circle1.current, circle2.current, 300))
    // .add(tweenCircles(circle1.current, circle2.current, -300));
  };

  const handleReset = () => {
    gsap.set([circle1.current, circle2.current], { y: 0 });
  };

  return (
    <div className="view basic-tweens">
      <div className="inner-content">
        <div ref={circle1} className="circle" />
        <div ref={circle2} className="circle" />
      </div>
      <div className="buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

/*********
 * Calls *
 *********/
const Calls = () => {
  const [bgColorChanged, setBgColorChanged] = useState(false);
  const [bgColor, setBgColor] = useState('DarkOrange');

  const circle1 = useRef();
  const circle2 = useRef();

  const tl = gsap.timeline({ paused: true });

  const changeBgColor = useCallback(() => {
    setBgColorChanged(!bgColorChanged);
  }, [bgColorChanged]);

  const blueBgColor = useCallback(() => {
    setBgColor('DarkSlateBlue');
  }, []);

  useEffect(() => {
    /* Controlling already defined timelines */
    // const tweenCircle = (target, y) => {
    // const tl = gsap.timeline({ repeat: -1 });
    // return tl
    // .to(target, { duration: 2, y, ease: 'power1.out' })
    // .to(target, { duration: 3, y: -y, ease: 'power1.out' })
    // .to(target, { duration: 1, y: 0, ease: 'linear' });
    // };
    // tl.addLabel('start')
    // .add(tweenCircle(circle1.current, 300))
    // .add(tweenCircle(circle2.current, -300), 'start');
    /* Function calls in timelines */
    // const tweenCircle = (target, y) => {
    // const tl = gsap.timeline({ repeat: -1 });
    // return tl
    // .to(target, { duration: 2, y, ease: 'power1.out' })
    // .to(target, { duration: 3, y: -y, ease: 'power1.out' })
    // .to(target, { duration: 1, y: 0, ease: 'linear' });
    // };
    // tl.addLabel('start')
    // .add(tweenCircle(circle1.current, 300))
    // .call(blueBgColor)
    // .add(tweenCircle(circle2.current, -300), 'start')
    // .call(changeBgColor);
    /* Function calls in single timeline */
    tl.to(circle1.current, { duration: 2, y: 300, ease: 'power1.out' })
      .to(circle2.current, { duration: 3, y: -300, ease: 'power1.out' })
      .call(blueBgColor)
      .to(circle1.current, { duration: 2, y: -300, ease: 'power1.out' })
      .to(circle2.current, { duration: 3, y: 300, ease: 'power1.out' })
      .call(changeBgColor)
      .to(circle1.current, { duration: 2, y: 300, ease: 'power1.out' })
      .to(circle2.current, { duration: 3, y: -300, ease: 'power1.out' })
  }, [tl, changeBgColor, blueBgColor]);

  const handlePlay = () => {
    tl.play();
  };

  const handlePause = () => {
    tl.pause();
  };

  return (
    <div className="view basic-tweens">
      <div
        className={`inner-content ${bgColorChanged ? 'bg-color-changed' : ''} ${
          bgColor ?? ''
        }`}
      >
        <div ref={circle1} className="circle" />
        <div ref={circle2} className="circle" />
      </div>
      <div className="buttons">
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </div>
  );
};

/***************
 * Memoization *
 ***************/
const Memoization = () => {
  const [bgColorChanged, setBgColorChanged] = useState(false);
  const [bgColor, setBgColor] = useState('DarkOrange');

  const circle1 = useRef();
  const circle2 = useRef();

  const tl = useRef(gsap.timeline({ paused: true }));

  const changeBgColor = useCallback(() => {
    setBgColorChanged(!bgColorChanged);
  }, [bgColorChanged]);

  const blueBgColor = useCallback(() => {
    setBgColor('DarkSlateBlue');
  }, []);

  useEffect(() => {
    /* Function calls in single timeline */
    tl.current
      .to(circle1.current, { duration: 2, y: 300, ease: 'power1.out' })
      .to(circle2.current, { duration: 3, y: -300, ease: 'power1.out' })
      .call(blueBgColor)
      .to(circle1.current, { duration: 2, y: 300, ease: 'power1.out' })
      .to(circle2.current, { duration: 3, y: -300, ease: 'power1.out' })
      .call(changeBgColor);
  }, [tl, changeBgColor, blueBgColor]);

  const handlePlay = () => {
    tl.current.play();
  };

  const handlePause = () => {
    tl.current.pause();
  };

  return (
    <div className="view basic-tweens">
      <div
        className={`inner-content ${bgColorChanged ? 'bg-color-changed' : ''} ${
          bgColor ?? ''
        }`}
      >
        <div ref={circle1} className="circle" />
        <div ref={circle2} className="circle" />
      </div>
      <div className="buttons">
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </div>
  );
};
