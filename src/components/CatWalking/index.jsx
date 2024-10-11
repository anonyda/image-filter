import { useEffect, useRef, useState } from "react";
import "./CatWalking.css"; // Ensure you link your CSS

const CatWalking = () => {
  const catWrapperRef = useRef(null);
  const wrapperRef = useRef(null);
  const catRef = useRef(null);
  const headRef = useRef(null);
  const legsRefs = useRef([]);

  const [pos, setPos] = useState({ x: null, y: null });

  const walk = () => {
    catRef.current.classList.remove("first_pose");
    legsRefs.current.forEach((leg) => leg.classList.add("walk"));
  };

  const handleMouseMotion = (e) => {
    setPos({ x: e.clientX, y: e.clientY });
    walk();
  };

  const handleTouchMotion = (e) => {
    if (!e.targetTouches) return;
    setPos({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
    walk();
  };

  const turnRight = () => {
    catRef.current.style.left = `${pos.x - 90}px`;
    catRef.current.classList.remove("face_left");
    catRef.current.classList.add("face_right");
  };

  const turnLeft = () => {
    catRef.current.style.left = `${pos.x + 10}px`;
    catRef.current.classList.remove("face_right");
    catRef.current.classList.add("face_left");
  };

  const decideTurnDirection = () => {
    if (catRef.current.getBoundingClientRect().x < pos.x) {
      turnRight();
    } else {
      turnLeft();
    }
  };

  const headMotion = () => {
    if (pos.y > wrapperRef.current.clientHeight - 100) {
      headRef.current.style.top = "-15px";
    } else {
      headRef.current.style.top = "-30px";
    }
  };

  const jump = () => {
    catWrapperRef.current.classList.remove("jump");
    if (pos.y < wrapperRef.current.clientHeight - 250) {
      setTimeout(() => {
        catWrapperRef.current.classList.add("jump");
      }, 100);
    }
  };

  const decideStop = () => {
    if (
      (catRef.current.classList.contains("face_right") &&
        pos.x - 90 === catRef.current.offsetLeft) ||
      (catRef.current.classList.contains("face_left") &&
        pos.x + 10 === catRef.current.offsetLeft)
    ) {
      legsRefs.current.forEach((leg) => leg.classList.remove("walk"));
    }
  };

  useEffect(() => {
    const directionInterval = setInterval(() => {
      if (!pos.x || !pos.y) return;
      decideTurnDirection();
      headMotion();
      decideStop();
    }, 100);

    const jumpInterval = setInterval(() => {
      if (!pos.x || !pos.y) return;
      jump();
    }, 1000);

    return () => {
      clearInterval(directionInterval);
      clearInterval(jumpInterval);
    };
  }, [pos]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMotion);
    document.addEventListener("touchmove", handleTouchMotion);

    return () => {
      document.removeEventListener("mousemove", handleMouseMotion);
      document.removeEventListener("touchmove", handleTouchMotion);
    };
  }, []);

  return (
    <div className="outer_wrapper" ref={wrapperRef}>
      <div className="wrapper">
        <div className="cat_wrapper" ref={catWrapperRef}>
          <div className="cat first_pose" ref={catRef}>
            <div className="cat_head" ref={headRef}>
              <svg
                x="0px"
                y="0px"
                width="100%"
                height="100%"
                viewBox="0 0 76.4 61.2"
              >
                <polygon
                  className="eyes"
                  points="63.8,54.1 50.7,54.1 50.7,59.6 27.1,59.6 27.1,54.1 12.4,54.1 12.4,31.8 63.8,31.8 "
                />
                <path
                  d="M15.3,45.9h5.1V35.7h-5.1C15.3,35.7,15.3,45.9,15.3,45.9z M45.8,56.1V51H30.6v5.1H45.8z M61.1,35.7H56v10.2h5.1
                    V35.7z M10.2,61.2v-5.1H5.1V51H0V25.5h5.1V15.3h5.1V5.1h5.1V0h5.1v5.1h5.1v5.1h5.1v5.1c0,0,15.2,0,15.2,0v-5.1h5.1V5.1H56V0h5.1v5.1
                    h5.1v10.2h5.1v10.2h5.1l0,25.5h-5.1v5.1h-5.1v5.1H10.2z"
                />
              </svg>
            </div>
            <div className="body">
              <svg
                x="0px"
                y="0px"
                width="100%"
                height="100%"
                viewBox="0 0 91.7 40.8"
              >
                <path
                  className="st0"
                  d="M91.7,40.8H0V10.2h5.1V5.1h5.1V0h66.2v5.1h10.2v5.1h5.1L91.7,40.8z"
                />
              </svg>
              <div className="tail">
                <svg
                  x="0px"
                  y="0px"
                  width="100%"
                  height="100%"
                  viewBox="0 0 25.5 61.1"
                >
                  <polygon
                    className="st0"
                    points="10.2,56 10.2,50.9 5.1,50.9 5.1,40.7 0,40.7 0,20.4 5.1,20.4 5.1,10.2 10.2,10.2 10.2,5.1 15.3,5.1
                    15.3,0 25.5,0 25.5,10.2 20.4,10.2 20.4,15.3 15.3,15.3 15.3,20.4 10.2,20.4 10.2,40.7 15.3,40.7 15.3,45.8 20.4,45.8 20.4,50.9
                    25.5,50.9 25.5,61.1 15.3,61.1 15.3,56 "
                  />
                </svg>
              </div>
            </div>
            <div className="front_legs">
              <div className="leg one" ref={(el) => (legsRefs.current[0] = el)}>
                <svg
                  x="0px"
                  y="0px"
                  width="100%"
                  height="100%"
                  viewBox="0 0 14 30.5"
                >
                  <polygon points="15.3,30.5 5.1,30.5 5.1,25.4 0,25.4 0,0 15.3,0 " />
                </svg>
              </div>
              <div className="leg two" ref={(el) => (legsRefs.current[1] = el)}>
                <svg
                  x="0px"
                  y="0px"
                  width="100%"
                  height="100%"
                  viewBox="0 0 14 30.5"
                >
                  <polygon points="15.3,30.5 5.1,30.5 5.1,25.4 0,25.4 0,0 15.3,0 " />
                </svg>
              </div>
            </div>
            <div className="back_legs">
              <div
                className="leg three"
                ref={(el) => (legsRefs.current[2] = el)}
              >
                <svg
                  x="0px"
                  y="0px"
                  width="100%"
                  height="100%"
                  viewBox="0 0 14 30.5"
                >
                  <polygon points="15.3,30.5 5.1,30.5 5.1,25.4 0,25.4 0,0 15.3,0 " />
                </svg>
              </div>
              <div
                className="leg four"
                ref={(el) => (legsRefs.current[3] = el)}
              >
                <svg
                  x="0px"
                  y="0px"
                  width="100%"
                  height="100%"
                  viewBox="0 0 14 30.5"
                >
                  <polygon points="15.3,30.5 5.1,30.5 5.1,25.4 0,25.4 0,0 15.3,0 " />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatWalking;
