import React from "react";

import styled from "styled-components";
import { motion } from "framer-motion";

const projectVariants = {
  offscreen: {
    opacity: 0,
    // x: 1000,
  },
  onscreen: {
    opacity: 1,
    // x: 0,
    // rotate: -10,
    transition: {
      type: "ease",
      duration: 0.8,
    },
  },
};

const ProjectBuild = ({ currentBuild, project, type }) => {
  return (
    <BuildContainer
      initial="offscreen"
      whileInView="onscreen"
      variants={projectVariants}
      isGrid={type === "grid"}
    >
      <BuildWrapper currentBuild={currentBuild}>
        {/* bg image */}
        <ImageWrap side={project.side} isGrid={type === "grid"}>
          <ProjectImage
            side={project.side}
            src={project.image}
            project={project.id}
          />
          <span />
        </ImageWrap>

        {/* skrews */}
        <Screw currentBuild={currentBuild}>
          <Cross />
          <Cross />
        </Screw>
        <Screw currentBuild={currentBuild}>
          <Cross />
          <Cross />
        </Screw>
        <Screw currentBuild={currentBuild}>
          <Cross />
          <Cross />
        </Screw>
        <Screw currentBuild={currentBuild}>
          <Cross />
          <Cross />
        </Screw>

        {/* text */}
        <TextWrap side={project.side} isGrid={type === "grid"}>
          <Title currentBuild={currentBuild} side={project.side}>
            {project.title}
          </Title>

          <StackWrap>
            {project.codestack.map((value, index) => {
              return (
                <StackText
                  currentbuild={currentBuild}
                  side={project.side}
                  key={index}
                >
                  {value}
                </StackText>
              );
            })}
          </StackWrap>

          <Subtitle currentbuild={currentBuild}>{project.subtitle}</Subtitle>

          <BottomRow currentBuild={currentBuild}>
            <button
              data-isdisabled={project.code ? `false` : `true`}
              onClick={() => {
                if(project.code )
                openInNewTab(project.code);
              }}
            >
              {`</>`}
              {/* <AccentButton currentBuild={currentBuild} text={"Visit Site"} /> */}
            </button>

            <button
              onClick={() => {
                openInNewTab(project.link);
              }}
            >
              Visit Site
              {/* <AccentButton currentBuild={currentBuild} text={"Visit Site"} /> */}
            </button>
          </BottomRow>
        </TextWrap>
      </BuildWrapper>
    </BuildContainer>
  );
};

const BuildContainer = styled(motion.div)`
  width: 355px;
  height: max-content;
  margin: 1rem auto;
  transition: aspect-ratio 0.3s ease, transform 0.3s ease;
  border-radius: 2.5px;
  overflow: hidden;
  transform-origin: center;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.01);
  }

  aspect-ratio: ${({ isGrid }) => (isGrid ? "1/1.05" : "1/1.6")};
`;

const BuildWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 1.5px;


  background-color: ${(props) =>
    props.currentBuild === 0
      ? "#A5B091"
      : props.theme[props.currentBuild].btnText};

  transition: background-color ${(props) => props.theme.transitionStyleMid};
`;

// -- PROJECT IMAGE --
const ImageWrap = styled.div`
  position: absolute;

  transform-origin: center;
  display: flex;

  ${(props) =>
    props.side === "right"
      ? " justify-content: flex-start;"
      : " justify-content: flex-end;"}

  width: 100%;
  top: 0;
  height: ${({ isGrid }) => (isGrid ? "40%" : "60%")};
  transition: bottom 0.3s ease;

  &:hover {
    transform: scale(1);
  }

  img {
    height: ${({ isGrid }) => (isGrid ? "auto" : "100%")};
    width: ${({ isGrid }) => (isGrid ? "100%" : "auto")};
  }
`;

const ProjectImage = styled.img`
  margin: 0 auto;
  object-fit: cover;
  object-position: right;
`;

// -- SKREWS --
const Screw = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: ${(props) => props.theme[props.currentBuild].btn};
  border-radius: 100%;
  margin: 0.5rem;
  display: grid;
  place-content: center;
  transform: rotate(0deg);
  -webkit-transform: rotate(0deg);

  transition: transform 1s ease, scale 1s ease,
    background-color ${(props) => props.theme.transitionStyleMid};
  z-index: 15;


  &:hover {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform: rotate(360deg) scale(1.1);
    -webkit-transform: rotate(360deg) scale(1.1);
    scale: 1.1;
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }

  &:nth-child(2) {
    right: 0%;
  }
  &:nth-child(3) {
    bottom: 0%;
    right: 0%;
  }
  &:nth-child(4) {
    bottom: 0%;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    width: 18px;
    height: 18px;
  }
`;

const Cross = styled.div`
  position: absolute;
  width: 10px;
  height: 2px;
  background-color: black;
  top: 50%;
  left: 50%;
  border-radius: 10px;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    width: 6px;
    height: 1.5px;
  }

  &:nth-child(1) {
    transform-origin: center;
    transform: translate(-50%, -50%) rotate(90deg);
  }
  &:nth-child(2) {
    transform: translate(-50%, -50%) rotate(0deg);
  }
`;

const TextWrap = styled.div`
  position: absolute;
  left: calc(0.5rem);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;

  transform: translateX(0%);
  width: calc(100% - 2rem);
  align-items: flex-start;
  padding: 0 0.5rem;

  top: ${({ isGrid }) => (isGrid ? "calc(40% + 1rem)" : "calc(60% + 1rem)")};
  height: ${({ isGrid }) => (isGrid ? "calc(60% - 48px)" : "calc(40% - 48px)")};
`;

const Title = styled.h1`
  width: 100%;
  /* background-color: rgba(0,255,0,.5); */
  color: white;
  text-shadow: black 0 0 4px;

  font-size: 14px;
  line-height: 14px;
  margin-bottom: 10px;
  letter-spacing: 0.01rem;
  word-spacing: 0.25rem;

  transform-origin: top left;
  -webkit-transform: scale(1.5, 1.8);
  -moz-transform: scale(1.5, 1.8);
  -o-transform: scale(1.5, 1.8);
  transform: scale(1.5, 1.8);

  white-space: pre-wrap;

  color: ${(props) => (props.currentBuild === 2 ? "black" : "white")};
  transition: color ${(props) => props.theme.transitionStyleMid};
  transform-origin: top left;
  width: calc(100% / 1.5);
  text-shadow: none;

`;

const Subtitle = styled.p`
  width: 100%;

  flex: 2;

  text-shadow: black 0 0 4px;

  font-size: 1rem;
  font-weight: normal;
  text-transform: capitalize;

  transform-origin: top left;
  -webkit-transform: scale(1, 1);
  -moz-transform: scale(1, 1);
  -o-transform: scale(1, 1);
  transform: scale(1, 1);

  white-space: pre-wrap;


  text-align: left;
  color: ${(props) =>
    props.currentbuild !== 2 ? "white" : "black"} !important;
  transition: color ${(props) => props.theme.transitionStyleMid};
  transform-origin: top left;
  text-shadow: none;
`;

const BottomRow = styled.div`
  text-shadow: none;

  width: 100%;

  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  button {
    background-color: ${(props) =>
      props.currentBuild === 0 ? "#d93b31" : "#d93b31"};
    transition: background-color ${(props) => props.theme.transitionStyleMid},
      color ${(props) => props.theme.transitionStyleMid};
    transform-origin: top center;

    border: 2px solid #d93b31;
    color: ${(props) => (props.currentBuild === 1 ? "white" : "white")};

    padding: 0.2rem;

    border-radius: 1.5px;

    font-size: 16px;
    line-height: 16px;
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;   
  }

  button:first-child {
    border: 2px solid black;
    background-color: white;
    color: black;
  }
  button:last-child {
    flex: 1;
  }


  button:first-child[data-isdisabled=true]{
    pointer-events: none;
    opacity: .4;
}

`;
const StackWrap = styled.ul`
  text-shadow: black 0 0 4px;
  text-shadow: none;

  width: 100%;

  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
const StackText = styled.p`
  width: max-content;
  list-style: none;
  display: inline-block;
  font-weight: normal;

  color: ${(props) => props.theme[props.currentbuild].accent};

  padding: 0.2rem;
  background-color: ${({ currentbuild }) =>
    currentbuild === 1 ? "transparent" : "white"};

  border-radius: 1.5px;
  border: 2px solid ${(props) => props.theme[props.currentbuild].accent};

  font-size: 12px;
  line-height: 12px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  /* padding-top: 0.05rem; */

  color: ${(props) => props.theme[props.currentbuild].accent};
  transition: border ${(props) => props.theme.transitionStyleMid},
    color ${(props) => props.theme.transitionStyleMid},
    background-color ${(props) => props.theme.transitionStyleMid};
`;

const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export default ProjectBuild;
