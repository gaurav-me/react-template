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
  const [speak, setSpeak] = useState(false);

  const sentences = useMemo(
    () =>
      TEXT.replace(/(\.\s)/g, '.')
        // .replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
        .split('.')
        .slice(0, -1),
    [TEXT],
  );

  useEffect(() => {
    console.log(
      'in sentenceChange useEffect, sentence: ',
      sentences[sentenceIndex],
    );
    utterance.text = sentences[sentenceIndex];
    if (speak) {
      console.log('in speak, going to handleStart');
      handleStart();
    }
  }, [sentenceIndex, sentences, speak]);

  useEffect(() => {
    utterance.onpause = (e) => {
      setCharIndex(e.charIndex);
    };

    utterance.onend = (e) => {
      if (sentenceIndex + 1 < sentences.length) {
        handleSentenceChange(true);
      } else {
        handleEnd();
      }
    };
  }, [handleSentenceChange, handleEnd, sentenceIndex, sentences]);

  const handleSentenceChange = (down) => {
    console.log('in handleSentenceChange');
    console.log('cancelling speech');
    speechSynthesis.cancel();

    if (down) {
      console.log('in down');
      if (sentenceIndex + 1 < sentences.length) {
        console.log(
          'increasing sentenceIndex, old sentenceIndex: ',
          sentenceIndex,
        );
        setSentenceIndex((curr) => curr + 1);
      }
    } else {
      console.log('in down else');
      if (sentenceIndex - 1 >= 0) {
        console.log(
          'decreasing sentenceIndex, old sentenceIndex: ',
          sentenceIndex,
        );
        setSentenceIndex((curr) => curr - 1);
      }
    }
  };

  const handleStart = () => {
    console.log('handleStart');
    setSpeak(true);
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
    setSpeak(false);
    speechSynthesis.cancel();
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

  const handleShiftUp = () => {
    console.log('handleShiftUp');
    handleSentenceChange(false);
  };

  const handleShiftDown = () => {
    console.log('handleShiftDown');
    handleSentenceChange(true);
  };

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
        // onShiftRight={() => console.log('righted')}
        // onShiftLeft={() => console.log('lefted')}
        // onShiftUp={() => console.log('uped')}
        // onShiftDown={() => console.log('downed')}
        onShiftRight={handleShiftRight}
        onShiftLeft={handleShiftLeft}
        onShiftUp={handleShiftUp}
        onShiftDown={handleShiftDown}
      />
    </div>
  );
};

export default HomepageLayout;
