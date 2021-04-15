import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Xwing from './xwing';

gsap.registerPlugin(MotionPathPlugin);

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
      case 'components':
        return <Components />;
      case 'paths':
        return <Paths />;
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
        <button
          className={view === 'components' ? 'active' : ''}
          onClick={() => setView('components')}
        >
          Components
        </button>
        <button
          className={view === 'paths' ? 'active' : ''}
          onClick={() => setView('paths')}
        >
          Paths
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
    <div className="view">
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
    <div className="view">
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
    const tweenCircle = (target, y) => {
      const tl = gsap.timeline({ repeat: -1 });
      return tl
        .to(target, { duration: 2, y, ease: 'power1.out' })
        .to(target, { duration: 3, y: -y, ease: 'power1.out' })
        .to(target, { duration: 1, y: 0, ease: 'linear' });
    };
    tl.addLabel('start')
      .add(tweenCircle(circle1.current, 300))
      .add(tweenCircle(circle2.current, -300), 'start');

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
  }, [tl, changeBgColor, blueBgColor]);

  const handlePlay = () => {
    tl.play();
  };

  const handlePause = () => {
    tl.pause();
  };

  return (
    <div className="view">
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
  const bg = useRef();

  const tl = useRef(gsap.timeline({ paused: true }));

  const changeBgColor = useCallback(() => {
    setBgColorChanged(!bgColorChanged);
  }, [bgColorChanged]);

  const blueBgColor = useCallback(() => {
    setBgColor('DarkSlateBlue');
  }, []);

  useEffect(() => {
    /* Function calls in timelines */
    const tweenCircle = (target, y) => {
      const tl = gsap.timeline({ repeat: -1 });
      return tl
        .to(target, { duration: 2, y, ease: 'power1.out' })
        .to(target, { duration: 3, y: -y, ease: 'power1.out' })
        .to(target, { duration: 1, y: 0, ease: 'linear' });
    };
    tl.current
      .addLabel('start')
      .add(tweenCircle(circle1.current, 300))
      .call(blueBgColor)
      .add(tweenCircle(circle2.current, -300), 'start')
      .call(changeBgColor);

    /* Use animation library for everything you can */
    // const tweenCircle = (target, y) => {
    // const tl = gsap.timeline({ repeat: -1 });
    // return tl
    // .to(target, { duration: 2, y, ease: 'power1.out' })
    // .to(target, { duration: 3, y: -y, ease: 'power1.out' })
    // .to(target, { duration: 1, y: 0, ease: 'linear' });
    // };
    // tl.current.addLabel('start')
    // .add(tweenCircle(circle1.current, 300))
    // .add(tweenCircle(circle2.current, -300), 'start')
    // .to(bg.current, { duration: 0.5, backgroundColor: '#483D8B' }, '-=0.5')
  }, [tl, changeBgColor, blueBgColor]);

  const handlePlay = () => {
    tl.current.play();
  };

  const handlePause = () => {
    tl.current.pause();
  };

  return (
    <div className="view">
      <div
        ref={bg}
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

const Components = () => {
  const [circleColorChanged, setCircleColorChanged] = useState(false);
  const [circleColor, setCircleColor] = useState('FireBrick');
  const [paused, setPaused] = useState(false);

  const changeCircleColor = useCallback(() => {
    setCircleColorChanged(!circleColorChanged);
  }, [circleColorChanged]);

  const greenCircleColor = useCallback(() => {
    setCircleColor('MediumSpringGreen');
  }, []);

  const handlePlay = () => {
    setPaused(false);
  };

  const handlePause = () => {
    setPaused(true);
  };

  return (
    <div className="view">
      <div className="inner-content">
        {Array(2)
          .fill(null)
          .map((_, i) => (
            <ComponentsCircle
              index={i}
              key={i}
              {...{
                changeCircleColor,
                circleColor,
                circleColorChanged,
                greenCircleColor,
                paused,
              }}
            />
          ))}
      </div>
      <div className="buttons">
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </div>
  );
};

const ComponentsCircle = ({
  index,
  circleColorChanged,
  greenCircleColor,
  circleColor,
  changeCircleColor,
  paused,
}) => {
  const ref = useRef();

  const tl = useRef(gsap.timeline({ repeat: -1 }));

  useEffect(() => {
    tl.current
      .to(ref.current, {
        duration: 2,
        y: index % 2 === 0 ? -300 : 300,
        ease: 'power1.out',
      })
      .call(greenCircleColor)
      .to(ref.current, {
        duration: 2,
        y: index % 2 === 0 ? 300 : -300,
        ease: 'power1.out',
      })
      .call(changeCircleColor);
  }, [index, tl, changeCircleColor, greenCircleColor]);

  useEffect(() => {
    if (paused) {
      tl.current.pause();
    } else {
      tl.current.play();
    }
  }, [paused]);

  return (
    <div
      ref={ref}
      className={`circle ${circleColorChanged ? 'circle-color-changed' : ''} ${
        circleColor ?? ''
      }`}
    />
  );
};

const Paths = () => {
  const circle1 = useRef();
  const circle2 = useRef();
  const xwing = useRef();

  const tl = useRef(gsap.timeline({ paused: true, repeat: -1 }));

  useEffect(() => {
    tl.current
      .addLabel('start')
      .to(circle1.current, {
        duration: 10,
        motionPath: paths.ellipse,
        ease: 'linear',
      })
      .to(
        circle2.current,
        {
          reversed: true,
          duration: 10,
          motionPath: paths.ellipse,
          ease: 'linear',
        },
        'start'
      )
      .to(
        xwing.current,
        {
          duration: 10,
          motionPath: {
            path: paths.swirl,
            autoRotate: true
          },
          ease: 'linear',
        },
        'start'
      );
  }, [tl]);

  const handlePlay = () => {
    tl.current.play();
  };

  const handlePause = () => {
    tl.current.pause();
  };

  return (
    <div className="view paths">
      <div className="inner-content">
        <div ref={circle1} className="circle" />
        <div ref={circle2} className="circle" />
        <Xwing ref={xwing} size={80} />
      </div>
      <div className="buttons">
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </div>
  );
};

const paths = {
  swirl:
    'M397 54C481 54 522 92 516 130C510 168 439 221 344 251C249 281 68 275 24 209C-20 143 3 71 66 44C97.6938 30.4169 213 24 334 89C455 154 506 240 516 291C526 342 462 429 344 450C226 471 115 430 66 379C17 328 7.99998 151 77 130C146 109 234 156 276 233C318 310 337.585 447.453 298 583C265 696 155 673 109 561C74.4942 476.986 66 357 66 304C66 251 85 17.0001 188 3.00002C251 -5.56312 299 13 334 35C391.571 71.1877 402.556 169.963 371 191C344 209 285 185 285 130C285 92.6369 321 54 397 54Z',
  ellipse:
    'M274 233C274 98 202.181 1 133 1C53 0.999996 0.999944 111 0.999969 233C1 377 70 466 133 466C196 466 274 368 274 233Z',
};
