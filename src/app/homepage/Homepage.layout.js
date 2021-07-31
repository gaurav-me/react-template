import { useMemo, useEffect, useState } from 'react';

import PullRelease from './PullRelease';

const TEXT =
  "There beside the marshes lies a tree. That tree used to give shade to the weary travellers that crossed this parched ridge. But the lumberjacks chopped off its branches. Now all that's left is the lonely trunk.";

let utterance = new SpeechSynthesisUtterance();
utterance.rate = 1;
utterance.lang = 'en-UK';

const HomepageLayout = () => {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const sentences = useMemo(
    () =>
      TEXT.replace(/(\.\s)/g, '.')
        // .replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
        .split('.')
        .slice(0, -1),
    [TEXT],
  );

  useEffect(() => {
    utterance.text = sentences[sentenceIndex];
  }, [sentenceIndex, sentences]);

  useEffect(() => {
    utterance.onpause = (e) => {
      console.log('e.charIndex on pause', e.charIndex);
      setCharIndex(e.charIndex);
    };

    utterance.onend = (e) => {
      console.log('e.charIndex on end', e.charIndex);
      if (sentenceIndex + 1 !== sentences.length) {
        setSentenceIndex((curr) => curr + 1);
        speechSynthesis.speak(utterance);
      }
    };
  }, []);

  const handleStart = () => {
    console.log('handleStart');
    speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    console.log('handlePause');
    speechSynthesis.pause();
  };

  const handleResume = () => {
    console.log('handleResume');
    speechSynthesis.resume();
  };

  const handleEnd = () => {
    console.log('handleEnd');
    speechSynthesis.end();
  };

  const handleShiftRight = () => {
    console.log('handleShiftRight');
    if (speechSynthesis.paused) {
      handleResume();
    } else {
      handleStart();
    }
  };

  const handleShiftLeft = () => {
    console.log('handleShiftLeft');
    if (speechSynthesis.speaking) {
      handlePause();
    }
  };

  const handleSentenceChange = () => {};

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        position: 'relative',
      }}
    >
      <div
        css={{ position: 'absolute', top: 20, left: 50 }}
        onClick={handleEnd}
      >
        Click me
      </div>
      <PullRelease
        onShiftRight={handleShiftRight}
        onShiftLeft={handleShiftLeft}
        // onShiftUp={handleShiftUp}
        // onShiftDown={handleShiftDown}
      />
    </div>
  );
};

export default HomepageLayout;
