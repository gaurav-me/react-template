import { useEffect, useState } from 'react';

import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const PullRelease = ({ onShiftDown, onShiftUp, onShiftLeft, onShiftRight }) => {
  const [shiftedRight, setShiftedRight] = useState(false);
  const [shiftedLeft, setShiftedLeft] = useState(false);
  const [shiftedUp, setShiftedUp] = useState(false);
  const [shiftedDown, setShiftedDown] = useState(false);

  const [{ x, y }, set] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    zoom: 0,
    x: 0,
    y: 0,
    config: { mass: 5, tension: 400, friction: 80 },
  }));

  useEffect(() => {
    console.log('in useEffect shiftedRight: ', shiftedRight);
    if (shiftedRight) {
      onShiftRight?.();
    }
  }, [shiftedRight]);

  useEffect(() => {
    console.log('in useEffect shiftedLeft: ', shiftedLeft);
    if (shiftedLeft) {
      onShiftLeft?.();
    }
  }, [shiftedLeft]);

  useEffect(() => {
    console.log('in useEffect shiftedUp: ', shiftedUp);
    if (shiftedUp) {
      onShiftUp?.();
    }
  }, [shiftedUp]);

  useEffect(() => {
    console.log('in useEffect shiftedDown: ', shiftedDown);
    if (shiftedDown) {
      onShiftDown?.();
    }
  }, [shiftedDown]);

  const setXGear = (x) => {
    if (x > 65) {
      setShiftedRight(true);
      setShiftedLeft(false);
    } else if (x === 0) {
      setShiftedRight(false);
      setShiftedLeft(false);
    } else if (x < -65) {
      setShiftedLeft(true);
      setShiftedRight(false);
    }
  };

  const setYGear = (y) => {
    if (y < -85) {
      setShiftedUp(true);
      setShiftedDown(false);
    } else if (y === 0) {
      setShiftedUp(false);
      setShiftedDown(false);
    } else if (y > 85) {
      setShiftedDown(true);
      setShiftedUp(false);
    }
  };

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    // console.log('>>', Math.round(mx), Math.round(my), down);
    const x = down ? mx : 0;
    const y = down ? my : 0;
    setXGear(x);
    setYGear(y);
    set({ x, y });
  });

  return (
    <div>
      <animated.div {...bind()} style={{ x, y, touchAction: 'none' }}>
        <div
          css={{
            width: 100,
            height: 100,
            background: '#000',
            borderRadius: 5,
          }}
        />
      </animated.div>
    </div>
  );
};

export default PullRelease;
