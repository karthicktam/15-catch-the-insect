import React, { useState } from "react";
import "./styles.css";

const insectsArr = [
  {
    text: "Fly",
    alt: "fly",
    image: "http://pngimg.com/uploads/fly/fly_PNG3946.png"
  },
  {
    text: "Mosquito",
    alt: "mosquito",
    image: "http://pngimg.com/uploads/mosquito/mosquito_PNG18175.png"
  },
  {
    text: "Spider",
    alt: "spider",
    image: "http://pngimg.com/uploads/spider/spider_PNG12.png"
  },
  {
    text: "Roach",
    alt: "roach",
    image: "http://pngimg.com/uploads/roach/roach_PNG12163.png"
  }
];

let calculateTime = 0;

export default function App() {
  const [screen1Visible, setScreen1] = useState(false);
  const [screen2Visible, setScreen2] = useState(false);
  const [selectedInsect, setSelected] = useState({});
  const [score, setScore] = useState(0);
  const [time, setTime] = useState("00:00");
  const [insectsShow, setInsects] = useState([]);
  const [clickedId, setClicked] = useState(null);

  const increaseScore = () => {
    setScore(score + 1);
  };

  const increaseTime = () => {
    let minute = Math.floor(calculateTime / 60);
    let second = calculateTime % 60;
    minute = minute < 10 ? `0${minute}` : minute;
    second = second < 10 ? `0${second}` : second;
    setTime(`${minute}:${second}`);
    calculateTime++;
  };

  const startGame = () => {
    setInterval(increaseTime, 1000);
  };

  const getRandomLocation = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;

    return { x, y };
  };

  const createInsect = () => {
    const { x, y } = getRandomLocation();
    let insect = {
      left: `${x}px`,
      top: `${y}px`
    };

    setInsects((state) => [...state, insect]);
  };

  const addInsects = () => {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
  };

  const catchInsect = (id) => {
    increaseScore();
    setClicked(id);
    setInsects(insectsShow.filter((insect, idx) => idx !== id));
    addInsects();
  };

  const chooseInsectHandler = (image, alt) => {
    setScreen2(true);
    setSelected({ image: image, alt: alt });
    setTimeout(createInsect, 1000);
    startGame();
  };

  return (
    <div className="app">
      <div className={screen1Visible === true ? "screen up" : "screen"}>
        <h1>Catch the insect</h1>
        <button
          className="btn"
          onClick={() => {
            setScreen1(true);
          }}
        >
          Play Game
        </button>
      </div>
      <div className={screen2Visible === true ? "screen up" : "screen"}>
        <h1>What is your "favorite" insect?</h1>
        <ul className="insects_list">
          {insectsArr.map((insect, idx) => (
            <li key={idx}>
              <button
                onClick={chooseInsectHandler.bind(
                  this,
                  insect.image,
                  insect.alt
                )}
                className="choose_insect_btn"
              >
                <p>{insect.text}</p>
                <img src={insect.image} alt={insect.alt} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="screen game_container">
        <h3 id="time">Time: {time}</h3>
        <h3 id="score">Score: {score}</h3>
        <h5 id="annoying_message" className={score > 19 ? "visible" : ""}>
          Are you annoyed yet :D <br /> You are playing: <br /> The Impossible
          Game!
          <br />
          <br /> Let me knoow hw far you got. ;)
          <br />
          Twitter:{" "}
          <a
            href="https://twitter.com/karthicktamil17"
            target="_blank"
            rel="noopener noreferrer"
          >
            @karthicktamil17
          </a>
        </h5>
        {insectsShow.map((insect, idx) => (
          <div
            key={idx}
            className={clickedId === idx ? "insect catched" : "insect"}
            style={{
              left: insect.left,
              top: insect.top
            }}
            onClick={catchInsect.bind(this, idx)}
          >
            <img
              style={{
                transform: `${Math.random() * 360}deg`
              }}
              src={selectedInsect.image}
              alt={selectedInsect.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
