import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
} from "@fortawesome/free-solid-svg-icons";
import { FaDiscord, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from './memewolf.png'

const gifArray = [
  "https://media.tenor.com/F2k3cmN7-RUAAAAM/dancing-wolf.gif",
  "https://i0.wp.com/media4.giphy.com/media/VmAjNEnSaYFvq/giphy.gif",
  "https://media.tenor.com/Dde3GlJ0fM0AAAAM/%D0%B2%D0%BE%D0%BB%D0%BA-%D0%B2%D0%BE%D0%BB%D0%BA%D0%BA%D1%80%D1%83%D0%B6%D0%B8%D1%82%D1%81%D1%8F.gif",
  "https://i.gifer.com/origin/ae/ae798289c2442cc732c403c85a9f8341_w200.webp",
  "https://media.tenor.com/IWQzQYZDONAAAAAC/wolf-head-dance.gif",
  "https://24.media.tumblr.com/de1e260e2d23500937fd099ae91a2903/tumblr_mrj469B3cZ1sf51yqo1_500.gif",
  "https://i.makeagif.com/media/8-15-2015/01bRqA.gif",
  "https://64.media.tumblr.com/bece87e0bcaab29d0bc832be7011c3b6/b45d6b66b8e66790-66/s540x810/de132be1a251e4d3fc510d1ef0646485576c3348.gifv",
'http://localhost:3000/static/media/memewolf.c1c745cd59096faea3bd.png'
  // Add more URLs as needed
];

const musicArray = [
  "https://youtu.be/r5_NvFTfAWc",

  "https://youtu.be/pzQ5d7zjOec",
];

function getRandomPosition() {
  const maxWidth = window.innerWidth - 200; // Adjust the width of the GIF
  const maxHeight = window.innerHeight - 200; // Adjust the height of the GIF

  const randomX = Math.floor(Math.random() * maxWidth);
  const randomY = Math.floor(Math.random() * maxHeight);

  return { left: randomX, top: randomY };
}

function App() {
  const [backgroundMusicIndex, setBackgroundMusicIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [gifs, setGifs] = useState([]);
  const [playerVisible, setPlayerVisible] = useState(true);

  useEffect(() => {
    // Display a new GIF every second
    const intervalId = setInterval(() => {
      const newIndex = Math.floor(Math.random() * gifArray.length);
      setGifs((prevGifs) => [
        ...prevGifs,
        { index: newIndex, position: getRandomPosition() },
      ]);
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  const goBackward = () => {
    setBackgroundMusicIndex(
      (prevIndex) => (prevIndex - 1 + musicArray.length) % musicArray.length
    );
  };

  const goForward = () => {
    setBackgroundMusicIndex((prevIndex) => (prevIndex + 1) % musicArray.length);
  };

  const togglePlayerVisibility = () => {
    setPlayerVisible(!playerVisible);
  };

  return (
    <div className="App  ">
      <div className="  items-center top-10 w-[96vw] absolute  left-[2vw] z-[1000]  bg-white p-4 rounded-lg shadow-md ">
        <div className="flex items-center justify-between">
          <img src={logo} className="w-20 absolute" alt='logo'/>
          <p className="font-bold p-2   ">$dolf</p>
          <p className="font-bold p-2 text-[0.6rem]  ">Welcome to $DOLF = Dancing Wolf </p>
          <div className="flex gap-4 items-center">
            <FaDiscord className="text-[1.5rem] text-purple-500" />
            <FaTelegram className="text-[1.5rem] text-sky-400" />
            <FaXTwitter className="text-[1.5rem]" />
          </div>
        </div>
      </div>
      <div className="p-4 top-[46vh] shadow-lg left-[44vw] z-[100] absolute  cursor-pointer rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 ">Buy Pre-sale</div>
      <div className=" items-center  absolute bottom-10 w-[96vw] z-[1000]  left-[2vw]  bg-white p-4 rounded-lg shadow-md border-2 ">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <button className="font-bold  text-slate-600 hover:bg-orange-400 p-2 rounded-lg hover:text-white transition-all 2s">
              Tokenomics
            </button>
            <button className="font-bold text-slate-600 hover:bg-orange-400 p-2 rounded-lg hover:text-white transition-all 2s">
              Chart
            </button>
            <button className="font-bold text-slate-600 hover:bg-orange-400 p-2 rounded-lg hover:text-white transition-all 2s">
              Buy now
            </button>
          </div>
          <div className="flex items-center mr-40 text-gray-700">
            CA: WULjeiZZXiBb8fBvSjmEqoeBX57NFEAGmMdftqPPtJj
          </div>
          <div className="flex gap-4">
            <button onClick={() => goBackward()}>
              <FontAwesomeIcon className="text-[1.2rem]" icon={faStepBackward} />
            </button>
            <button onClick={() => toggleMusic()}>
              {isPlaying ? (
                <FontAwesomeIcon className="text-[1.2rem]" icon={faPause} />
              ) : (
                <FontAwesomeIcon className="text-[1.2rem]" icon={faPlay} />
              )}
            </button>
            <button onClick={() => goForward()}>
              <FontAwesomeIcon className="text-[1.2rem]" icon={faStepForward} />
            </button>
          </div>
        </div>
      </div>
      <div className="gif-container">
        {gifs.map((gif, index) => (
          <img
            key={index}
            src={gifArray[gif.index]}
            alt={`Gif ${index}`}
            className="animated-gif"
            style={{ ...gif.position }}
          />
        ))}
      </div>

      <div className="music-container">
        <ReactPlayer
          url={musicArray[backgroundMusicIndex]}
          playing={isPlaying}
          loop
          volume={0.5}
          width="0"
          height="0"
        />
      </div>
    </div>
  );
}

export default App;
