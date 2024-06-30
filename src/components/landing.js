import React, { useReducer, useEffect } from "react";
import styled from "styled-components";
import { SVGicons } from "./icons";
// import Scene from "../threeJs/Scene";
// import Scene from "../threeJs/SceneV2";
import { motion } from "framer-motion";
import { ModelViewer } from "../threeJs/SceneV2";

const messages = [
  "software engineer",
  "Full-stack developer",
  "turns ideas into reality",
  "problem solver",
  "fueled by iced coffee",
  "loves learning new things",
  "has a lot of ideas",
  "innovative thinker",
  "uses comments in code",
  "watches too much anime",
  "likes sci-fi movies",
  "FrontEnd developer",
  // "currently playing basketball",
  "last seen in the metaverse",
  "wrapping up side projects",
  "technology-bender",
  "programming skills > 9000",
  // "lisan al gaib",
  "looking for more memory",
  "future AI apologist",
  "viewports === canvases",
  "UI/ux enthusiast",
];

const titleVarients = {
  offscreen: {
    scale: 0,
    opacity: 0,
    transformOrigin: "center",
    y: 5,
  },
  onscreen: {
    scale: [0, 0, 1],
    opacity: [0, 0, 1],
    y: 0,
    transition: {
      delay: 1.4,
      type: "ease",
      bounce: 0.25,
      duration: 0.8,
    },
  },
};

const btnVarients = {
  offscreen: {
    y: 200,
    x: "-50%",
  },
  onscreen: {
    y: 0,
    x: "-50%",
    transition: {
      delay: 1.7,
      type: "spring",
      bounce: 0.25,
      duration: 0.1,
      scale: { duration: 0.3 },
    },
  },
};

const randomNext = Math.floor(Math.random() * messages.length - 1) + 1;
const defaultState = {
  current: 0,
  next: randomNext,
  status: "inactive",
  stack: [0, randomNext],
};

export const Landing = ({ currentBuild, showElements }) => {
  const shuffle = () => {
    if (state.status === "inactive") {
      dispatch({ type: "ACTIVATE" });

      setTimeout(() => {
        dispatch({ type: "DEACTIVATE" });
      }, 1000);
    }
  };

  const reducer = (state, action) => {
    let stack = state.stack;
    let reset = false;
    if(stack.length === messages.length){
      stack = []
      reset = true;
    }

    if (action.type === "INITIALIZE") {
      return {
        ...state,
        currentWord: action.payload.current,
        nextWord: action.payload.next,
      };
    } else if (action.type === "ACTIVATE") {
      var newIndex = Math.floor(Math.random() * messages.length);

      while (newIndex === state.index || stack.includes(newIndex)) {
        newIndex = Math.floor(Math.random() * messages.length);
      }

      // toggle classes
      const CURRENT_CLASS = "current";
      const NEXT_CLASS = "next";

      const wrapper = document.getElementById("subtitleSlot");

      const currentWord = wrapper.childNodes[state.current];
      const nextWord = wrapper.childNodes[state.next];
      const nextNextWord = wrapper.childNodes[newIndex];

      currentWord.classList = [];
      nextWord.classList = [];
      nextWord.classList.add(CURRENT_CLASS);
      nextNextWord.classList.add(NEXT_CLASS);

      return {
        current: state.next,
        next: reset ? 0 : newIndex,
        stack: reset ? [0 , state.next] : [...stack, newIndex],
        status: "active",
      };
    } else if (action.type === "DEACTIVATE") {
      return {
        ...state,
        status: "inactive",
      };
    } else {
      return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    const wrapper = document.getElementById("subtitleSlot");
    wrapper.firstChild.classList = ["current"];
    wrapper.childNodes[state.next].classList = ["next"];

    dispatch({
      type: "INITIALIZE",
      payload: {
        current: wrapper.firstChild,
        next: wrapper.childNodes[state.next],
      },
    });
  }, []);

  return (
    <>
      <Container>
        {/* title */}
        <TitleWrap
          initial={"offscreen"}
          animate={showElements ? "onscreen" : "offscreen"}
          variants={titleVarients}
        >
          <Title currentBuild={currentBuild}>Rey Sanchez</Title>

          <SlotWrap id={"subtitleSlot"}>
            {messages.map((msg) => (
              <span key={msg}>
                <h4>{msg}</h4>
              </span>
            ))}
          </SlotWrap>
        </TitleWrap>

        {/* refresh buttom */}
        <ButtonWrap
          initial={"offscreen"}
          animate={showElements ? "onscreen" : "offscreen"}
          variants={btnVarients}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98, transition: { duration: 0.3 } }}
          onClick={() => {
            shuffle();

            if (state.status === "inactive") {
              // Dispatch the drop event.
              const dropEvent = new Event("dropItem");
              window.dispatchEvent(dropEvent);
            }
          }}
          currentbuild={currentBuild}
        >
          <IconWrap status={state.status}>
            <SVGicons currentBuild={currentBuild} index={"refresh"} />
          </IconWrap>
          <ButtonTxt currentBuild={currentBuild}>Shuffle</ButtonTxt>
        </ButtonWrap>
      </Container>
      <ThreeJsContainter>
        <ModelViewer />
        {/* <Scene status={state.status} /> */}
      </ThreeJsContainter>
    </>
  );
};

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  height: 100svh;

  display: grid;
  place-content: center;
  z-index: 15;
  position: relative;
  /* background-color: blue; */
`;

const TitleWrap = styled(motion.div)`
  /* transform: translateY(-25%); */
  max-width: 800px;
  margin: auto 3.5rem;
  display: grid;
  place-content: center;
  /* min-height: 500px; */
  /* margin-bottom: 5rem; */

  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    margin: auto;
  }
`;

const Title = styled.h1`
  width: 100%;
  color: #fcfdfa;
  transition: color 1s ease-out;
  font-size: 5rem;
  font-family: "MatissePro";
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: bold;
  text-align: right;

  transition: font-size 0.3s ease;

  @media screen and (min-width: ${(props) => props.theme.breakpoint.xl}) {
    font-size: 6.5rem;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    font-size: 3.5rem;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.xs}) {
    font-size: 3rem;
  }
`;

const SubtitleWrap = styled.div`
  /* background-color: blue; */
  overflow-x: hidden;
  margin-top: 1rem;
`;

const SlotWrap = styled.span`
  margin: 0 auto;
  margin-top: 1rem;

  overflow-y: hidden;
  display: inline-block;
  position: relative;
  vertical-align: bottom;
  width: 100%;
  height: calc(2rem + 20px);
  padding: 0x 10px;
  border-radius: 6px;
  color: black;
  box-sizing: content-box;
  transition: all 0.7s;

  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent,
    black 10px,
    black calc(100% - 10px),
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 10px,
    black calc(100% - 10px),
    transparent 100%
  );

  @media screen and (min-width: ${(props) => props.theme.breakpoint.xl}) {
    height: calc(2rem + 20px);
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    height: calc(1.2rem + 20px);
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    height: calc(18px + 20px);
    letter-spacing: 0.15rem;
  }

  span {
    padding-top: 8px;

    width: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -100%);
    transition: transform 0.7s, opacity 0.25s 0.25s;

    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-weight: 900;
    text-align: center;
    -webkit-text-stroke: 1px white;
    color: transparent;

    @media screen and (min-width: ${(props) => props.theme.breakpoint.xl}) {
      font-size: 2rem;
    }

    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      font-size: 1.2rem;
    }

    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      font-size: 18px;
      letter-spacing: 0.15rem;
    }

    &.current {
      opacity: 1;
      transform: translate(-50%, 0);
    }

    &.next {
      transform: translate(-50%, 100%);
    }
  }
`;

const Subtitle = styled.h4`
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: 900;
  text-align: center;
  -webkit-text-stroke: 1px white;
  color: transparent;

  @media screen and (min-width: ${(props) => props.theme.breakpoint.xl}) {
    font-size: 2rem;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    font-size: 18px;
    letter-spacing: 0.15rem;
  }
`;

const ButtonWrap = styled(motion.div)`
  aspect-ratio: 1/1;
  position: absolute;
  left: 50%;
  border-radius: 1.5px;
  border: 2px solid ${(props) => props.theme[props.currentbuild].accent};
  padding: 0.1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
  bottom: 2rem;

  transition: transform 0.3s cubic-bezier(0.39, 0.575, 0.565, 1),
    border ${(props) => props.theme.transitionStyleBottom},
    bottom 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);

  &:hover {
    transform-origin: center;
    transform: translate(-50%, -0.3rem) scale(1.05);
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    bottom: 1rem;
  }
`;

const IconWrap = styled.div`
  margin: 0.2rem auto;
  margin-top: 0.4rem;
  transform-origin: center;
  transition: ${(props) =>
      props.status !== "active" ? "" : " transform .9s ease"},
    width 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
  transform: ${(props) => (props.status === "active" ? "rotate(360deg)" : "")};

  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    width: 60%;
  }
`;

const ButtonTxt = styled.h3`
  margin-top: 0.3rem;
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => props.theme[props.currentBuild].accent};
  text-transform: uppercase;

  transition: color ${(props) => props.theme.transitionStyleBottom},
    font-size 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);

  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    font-size: 0.8rem;
  }
`;

const ThreeJsContainter = styled.section`
  position: absolute;
  top: 0;
  left: 0;

  background-color: black;
  /* opacity: 0.4; */
  width: 100vw;
  height: 100vh;
  z-index: 14;
  /* z-index: 1000; */

  opacity: 0;

  -webkit-animation: fadein 2s ease-in 0s 1;
  animation: fadein 2s ease-in 0s 1;
  animation-fill-mode: forwards;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.4;
      /* opacity: 1; */
    }
  }
  mask-image: -webkit-gradient(
    linear,
    center top,
    center bottom,
    from(rgba(0, 0, 0, 0.85)),
    to(rgba(0, 0, 0, 0))
  );
  -webkit-mask-image: -webkit-gradient(
    linear,
    center top,
    center bottom,
    from(rgba(0, 0, 0, 0.85)),
    to(rgba(0, 0, 0, 0))
  );
`;
