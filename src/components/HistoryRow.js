import { useState } from 'react';
import m from 'moment';
import path from 'path';

function HistoryRow({ data }) {
  const [playing, setPlaying] = useState(false);
  const audio = new Audio(path.resolve(process.cwd(), 'audio-responses', `${data.timestamp}.wav`));

  audio.onended = function () {
    setPlaying(false);
  };

  audio.onpause = function () {
    setPlaying(false);
  };

  audio.onplay = function () {
    setPlaying(true);
  };

  audio.onerror = function () {
    setPlaying(false);
  };

  function execute() {
    if (playing) return audio.pause();
    audio.play();
  }

  const stopSvg = (
    <svg
      className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-600 hover:text-blue-900"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
        clipRule="evenodd"
      />
    </svg>
  );

  const playSvg = (
    <svg
      className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-600 hover:text-blue-900"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <li>
      <div className="px-4 py-4 sm:px-6 border-b border-gray-200 last:border-b-0">
        <div className="flex items-center justify-between">
          <div
            className="text-base flex leading-5 font-medium text-blue-600 truncate"
            onClick={() => execute()}
          >
            {data.type === 'command' ? (playing ? stopSvg : playSvg) : null}
            <span>{data.command}</span>
          </div>
          <div className="ml-2 flex-shrink-0 flex">
            <div className="mr-6 flex items-center text-sm leading-5 text-gray-500">
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              {data.user}
            </div>
            <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                  data.type === 'command'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-orange-100 text-orange-800'
                }`}
              >
                {data.type}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:flex sm:justify-between">
          <div className="sm:flex w-2/3">
            {data.response ? (
              <p className="pl-5">{data.response}</p>
            ) : (
              <p className="pl-5 italic">No Response</p>
            )}
          </div>
          <div className="mt-2 flex items-center justify-end text-sm leading-5 text-gray-500 sm:mt-0 w-1/3">
            <svg
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              <time dateTime="2020-01-07"> {m(data.timestamp).format(`HH:mm on MMM Do 'YY`)}</time>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default HistoryRow;
