import path from 'path';

function AudioPlayback({ timestamp }) {
  const audio = new Audio(path.resolve(process.cwd(), 'audio-responses', `${timestamp}.wav`));
  audio.play();
  return <div></div>;
}

export default AudioPlayback;
