import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { motion } from 'framer-motion';
import { isSafari } from "react-device-detect";

const mobile = {
  text: "9999",
  innerCircleSize: 100,
  innerTextCount: 18,
  outerTextCount: 30,
  outerCircleSize: 35,
  sizeShiftCutoff: 3,
  ringGapIndex: 6,
  ringSpacing: 50,
  outerRingSpacing: 70,
  textStart: 520,
  innerTextRotate: 5,
  outerTextRotate: 3,
};

const desktop = {
  text: "9999",
  innerCircleSize: 250,
  innerTextCount: 33,
  outerTextCount: 45,
  outerCircleSize: 172,
  textStart: 800,
  sizeShiftCutoff: 5,
  ringGapIndex: 8,
  ringSpacing: 50,
  outerRingSpacing: 70,
  innerTextRotate: 2.75,
  outerTextRotate: 2,
};

var magi = [
  {
    title: "frontend",
    languages: ["React", "Typescript", "SASS/CSS", "three.js"],
  },
  {
    title: "tools",
    languages: ["Firebase", "figma", "Auth0", "AWS"],
  },
  {
    title: "backend",
    languages: ["Serverless", "Express.js", "Node.Js", "Python"],
  },
];

var cornerElementData = [
  { top: "Designed By", bottom: "Rey Sanchez" },
  { top: "Developed By", bottom: "Rey Sanchez" },
  { top: "Time Since Screen Raised", bottom: "" },
  {},
];

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const LoadingScreen = ({ fade }) => {
  const [percent, setPercent] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading.");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [styleDetails, setStyleDetails] = useState(
    window.innerWidth > 767 ? desktop : mobile
  );

  // sense screen size changes
  useEffect(() => {
    // console.log('ran1')

    const checkSize = () => {
      if (window.innerWidth > 767) {
        setStyleDetails(desktop);
        // setStyleDetails('desktop')
      } else {
        setStyleDetails(mobile);
        // setStyleDetails('mobile')
      }
    };

    window.addEventListener("resize", checkSize);

    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  // update percent and loading bar
  useEffect(() => {
    // console.log('ran2')
    if (Math.floor(percent * 10) < 10) {
      // loading bar
      setTimeout(() => {
        setPercent((old) => (old += 0.05));
        // console.log('up')
      }, 400);
    } else {
      setTimeout(() => {
        // console.log('reset')
        setPercent(0);
      }, 400);
    }
  }, [percent]);

  useEffect(() => {
    // loading text
    setTimeout(() => {
      if (loadingText.length < 10) {
        setLoadingText((oldVal) => (oldVal += "."));
      } else {
        setLoadingText("Loading");
      }
    }, 400);
  }, [loadingText]);

  // changes elapsedTime
  useEffect(() => {
    // console.log(Math.floor(percent*10))
    if (window.innerWidth > 430) {
      setTimeout(() => {
        setElapsedTime((old) => (old += 1));
      }, 200);
    }
  }, [elapsedTime]);

  return (
    <Container fade={fade}>
      <Wrapper>
        {/* <VidWrap>
                <VidBG id={'videoBG'}
                        autoPlay loop muted 
                        src={styleDetails === 'desktop' ? 'https://firebasestorage.googleapis.com/v0/b/vrnl-5055e.appspot.com/o/videoUrl%2F63a51c5a414a780b630fa80b%2F1677163200652?alt=media&token=b999a3e1-603a-4f59-a42c-9f37b4082a46' :''} 
                        type='video/mp4'/>
            </VidWrap> */}

        <Shader />
        {/* GRADIENT RINGS */}
        {[...Array(40)].map((v, i) => {
          return (
            <Rings
              key={i}
              index={i}
              size={
                i < styleDetails.ringGapIndex
                  ? i * styleDetails.ringSpacing + styleDetails.innerCircleSize
                  : i * styleDetails.outerRingSpacing +
                    styleDetails.outerCircleSize
              }
            />
          );
        })}

        {/* GREEN TEXT */}
        {[...Array(25)].map((v, i) => {
          return (
            <Detail
              key={i}
              index={i}
              size={
                i < styleDetails.sizeShiftCutoff
                  ? i * 70 + styleDetails.textStart
                  : i * 70 + styleDetails.textStart
              }
            >
              <DetailText>
                {styleDetails.text
                  .repeat(
                    i < styleDetails.sizeShiftCutoff
                      ? styleDetails.innerTextCount
                      : styleDetails.outerTextCount
                  )
                  .split("")
                  .map((char, j) => {
                    return (
                      <Char
                        key={j}
                        size={`0px ${
                          (styleDetails.textStart +
                            i * styleDetails.outerRingSpacing) /
                          2
                        }px`}
                        style={{
                          transform: `rotate(${
                            i < styleDetails.sizeShiftCutoff
                              ? j * styleDetails.innerTextRotate
                              : j * styleDetails.outerTextRotate
                          }deg)`,
                        }}
                      >
                        {char}
                      </Char>
                    );
                  })}
              </DetailText>
            </Detail>
          );
        })}

        {/* CORNER ELEMENTS */}
        {cornerElementData.map((data, position) => {
          return (
            <CornerElement
              key={position}
              top={data.top}
              bottom={data.bottom}
              positon={position}
              percent={percent}
              loadingText={loadingText}
              elapsedTime={elapsedTime}
            />
          );
        })}

        {/* CENTER PIECE */}
        <Align>
          {/* SVG WRAP */}
          <CenterWrap>
            {/* <svg style={{height:'100%'}} x="0" y="0" width="555" height="555" viewBox="0 0 555 555" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
            <svg
              style={{ height: "100%" }}
              x="0"
              y="0"
              width="549"
              height="554"
              viewBox="0 0 549 554"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M232.343 342.805C231.761 343.779 230.349 343.779 229.767 342.805L191.651 278.962L153.601 215.231C153.004 214.231 153.725 212.962 154.889 212.962H307.221C308.385 212.962 309.106 214.231 308.509 215.231L270.459 278.962L232.343 342.805Z"
                fill="#111111"
                fillOpacity="0.95"
                stroke="#FF771B"
                strokeWidth="2"
              />
              <path
                d="M296.09 312.518L313.993 280.825H510.84L493.681 312.518H296.09ZM511.652 279.325H314.84L332.743 247.632H528.812L511.652 279.325ZM295.243 314.018H492.869L475.922 345.318C475.791 345.56 475.538 345.711 475.262 345.711H277.34L295.243 314.018ZM313.267 214.439H349.77L331.652 246.513L312.902 279.706L294.152 312.899L275.617 345.711H235.686C235.104 345.711 234.744 345.076 235.043 344.576L312.623 214.805C312.759 214.578 313.003 214.439 313.267 214.439ZM333.59 246.132L351.493 214.439H545.524C546.092 214.439 546.454 215.047 546.184 215.547L529.624 246.132H333.59Z"
                fill="#111111"
                fillOpacity="0.95"
                stroke="#FF771B"
                strokeWidth="1.5"
              />
              <path
                d="M245.639 173.882L209.249 174.701L108.602 5.5292L144.612 4.07174L245.639 173.882ZM106.898 5.59818L207.526 174.74L171.136 175.558L70.8871 7.05566L106.898 5.59818ZM247.361 173.844L146.317 4.00276L181.881 2.56334C182.156 2.5522 182.415 2.69267 182.556 2.92925L283.752 173.025L247.361 173.844ZM152.568 209.267L133.904 177.896L170.732 177.068L208.845 176.21L246.958 175.353L284.633 174.505L305.049 208.823C305.347 209.323 304.986 209.957 304.403 209.956L153.21 209.634C152.947 209.633 152.702 209.494 152.568 209.267ZM169.413 175.597L133.023 176.416L33.816 9.66408C33.5255 9.1757 33.8625 8.55421 34.4302 8.53121L69.1828 7.12465L169.413 175.597Z"
                fill="#111111"
                fillOpacity="0.95"
                stroke="#FF771B"
                strokeWidth="1.5"
              />
              <path
                d="M150.051 285.408L169.36 316.264L75.4331 489.257L55.7686 459.054L150.051 285.408ZM76.3638 490.686L170.274 317.724L189.584 348.58L96.0282 520.888L76.3638 490.686ZM149.137 283.948L54.8379 457.625L35.4172 427.797C35.267 427.566 35.2553 427.272 35.3866 427.03L129.827 253.092L149.137 283.948ZM228.048 347.302L210.63 379.382L191.088 348.155L170.864 315.839L150.64 283.523L130.649 251.578L149.702 216.486C149.98 215.974 150.71 215.961 151.007 216.462L228.034 346.562C228.168 346.789 228.174 347.07 228.048 347.302ZM190.498 350.04L209.808 380.896L117.224 551.414C116.953 551.913 116.247 551.942 115.936 551.465L96.9589 522.318L190.498 350.04Z"
                fill="#111111"
                fillOpacity="0.95"
                stroke="#FF771B"
                strokeWidth="1.5"
              />
            </svg>
          </CenterWrap>

          <NameWrap>
            <CenterText>SKILLS 01</CenterText>
          </NameWrap>

          {magi.map((data, index) => {
            return (
              <WingWrap key={index} side={index + 1}>
                <CenterWing data={data} side={index + 1} />
              </WingWrap>
            );
          })}
        </Align>
      </Wrapper>
    </Container>
  );
};

const CenterWing = ({ data, side }) => {
  const { title, languages } = data;

  return (
    <WingContainer>
      <WingMain side={side}>{title}</WingMain>

      <WingSubWrap>
        {languages.map((value, index) => {
          return <WingSub key={index}>{value}</WingSub>;
        })}
      </WingSubWrap>
    </WingContainer>
  );
};

const CornerElement = ({
  top,
  bottom,
  positon,
  percent,
  loadingText,
  elapsedTime,
}) => {
  return (
    <CornerContiner positon={positon}>
      <CornerWrap>
        {/* left side */}
        {positon < 2 && (
          <>
            <TextTop>{top}</TextTop>
            <Bar />
            <TextBottom>{bottom}</TextBottom>
          </>
        )}

        {/* top right side */}
        {positon === 2 && (
          <>
            <TextBottom reversed={true}>{top}</TextBottom>
            <Bar reversed={true} />
            <TextTop reversed={true}>
              {elapsedTime < 10
                ? "0,00"
                : elapsedTime < 100
                ? "0,0"
                : elapsedTime < 1000
                ? "0,"
                : ""}
              {`${numberWithCommas(elapsedTime)}`}
              <span
                style={{
                  textTransform: "lowercase",
                  marginLeft: ".5rem",
                  fontSize: "1.5rem",
                }}
              >
                units
              </span>
            </TextTop>
          </>
        )}

        {/* bottom right side */}
        {positon === 3 && (
          <>
            <LoadingBar percent={percent} />
            <Bar loading={"true"} />
            <TextTop loading={"true"}>{loadingText}</TextTop>
          </>
        )}
      </CornerWrap>
    </CornerContiner>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 201;
  background: black;
  overflow: hidden;
  opacity: ${(props) => (props.fade ? "0" : "1")};
  transition: opacity 0.55s ease-in-out;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Rings = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  z-index: ${(props) => `calc(2500 - ${props.size})`};

  border: solid 6px #96b935;
  border-radius: 100%;

  /* background-color: transparent;
    background-image: linear-gradient(black, black), 
                        linear-gradient(180deg, rgba(150, 186, 53, 0.75) 13.02%, rgba(254, 172, 74, 0.75) 54.69%, rgba(254, 172, 74, 0.5) 80.73%, rgba(153, 34, 27, 0.75) 100%);
    background-origin: border-box;
    background-clip: content-box, border-box; */

  ${!isSafari &&
  `
       border: none;

         &::before {
        width: calc(100% + .5px);
        height: calc(100% + .5px);
         left: 50%;
        top: 50%;
        transform: translate(-50%,-50%); 
        content: "";
        position: absolute;
        /* top: 0;
        left: 0;
        right: 0;
        bottom: 0; */
        border-radius: 100%;
        border: 6px solid transparent;
        background: linear-gradient(180deg, rgba(150, 186, 53, 0.75) 13.02%, rgba(254, 172, 74, 0.75) 54.69%, rgba(254, 172, 74, 0.5) 80.73%, rgba(153, 34, 27, 0.75) 100%) border-box;
        mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
    }
    `}

  
`;

const Detail = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  /* background-color: red; */
  transform: translate(-50%, -50%);
  border-radius: 50%;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  /* outline: 1px solid red;  */
  /* 
      animation: fade 3s 1 ease;

     @keyframes fade {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
     } */
`;

const DetailText = styled.p`
  color: #23bc61;
  opacity: 1;

  text-shadow: 0px 0px 1px #23bc60a8;

  font-family: "DesignerGenes", "Courier New Bold", Courier, monospace;
  z-index: 20000000000000;

  opacity: 0;

  -webkit-animation: fadein 1s ease-in 0s 1; /* Safari, Chrome and Opera > 12.1 */
  animation: fadein 1s ease-in 0s 1;
  animation-fill-mode: forwards;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Char = styled.span`
  position: absolute;
  left: 50%;
  top: 0%;
  transform-origin: ${(props) => props.size};
`;

// /////// ///// CORNER UNITS  // /////// /////

const CornerContiner = styled.div`
  width: 250px;
  height: 85px;
  background-color: #111111f5;
  position: fixed;
  border: 2px #ff771b solid;
  margin: 1rem 3rem;
  border-radius: 3px;
  z-index: 200000;
  box-shadow: 0px 0px 10px #f97b39;

  ${(props) => {
    if (props.positon === 0) {
      return `
                top:0;
                left:0; 
            `;
    } else if (props.positon === 1) {
      return `
                bottom:0;
                left:0; 
            `;
    } else if (props.positon === 2) {
      return `
                top:0;
                right:0; 
            `;
    } else if (props.positon === 3) {
      return `
                bottom:0;
                right:0; 
            `;
    }
  }}

  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    width: 35%;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.xs}) {
    width: 250px;
    ${(props) => {
      if (props.positon === 0) {
        return `
                    top:0;
                    left: 50%;
                    translate: -50% 0;
                    margin: 1rem 0rem;
                `;
      } else if (props.positon === 1) {
        return `
                   display: none;
                `;
      } else if (props.positon === 2) {
        return `
                     display: none;
                    

                `;
      } else if (props.positon === 3) {
        return `
                    bottom:0;
                    left: 50%;
                    translate: -50% 0;
                    margin: 1rem 0rem;

                `;
      }
    }}
  }

  &::after,
  &::before {
    content: "";
    height: 85px;
    width: 15px;
    background-color: #ff920b;
    position: absolute;
    top: 0;
    margin: 0 1rem;
    border-radius: 15px;

    filter: drop-shadow(0px 0px 4px #ff920b);
  }
  &::before {
    right: 100%;
  }
  &::after {
    left: 100%;
  }
`;

const CornerWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* background-color: aqua; */
`;

const TextTop = styled.h5`
  color: #ff771b;
  align-self: flex-start;
  font-family: "Helvetica";
  font-size: 1.8rem;
  text-transform: uppercase;
  text-align: left;
  font-weight: bold;
  letter-spacing: 0.1rem;
  line-height: 1.8rem;
  -webkit-transform: scale(0.8, 2);
  -moz-transform: scale(0.8, 2);
  -o-transform: scale(0.8, 2);
  transform: scale(0.8, 2);
  text-shadow: 0px 0px 4px #f97c3991;

  position: relative;
  left: -10%;
  top: 10%;

  width: calc(100% * 1.2);

  ${(props) =>
    props.reversed
      ? `
        left: 3%;
        top: -2%;
        color: darkorange;
        font-size: 2.8rem;
        letter-spacing: .05rem;
        line-height: calc(1.8rem );
        -webkit-transform: scale(1, 1.1);
        -moz-transform:scale(1, 1.1);
        -o-transform:scale(1, 1.1);
        transform:scale(1, 1.1);
    `
      : ""}

  ${(props) =>
    props.loading
      ? `
        left: -10%;
        top: -6%;
        font-size: 1.8rem;
        letter-spacing: .05rem;
        line-height: calc(1.6rem );
        -webkit-transform: scale(.8, 1.8);
        -moz-transform: scale(.8, 1.8);
        -o-transform: scale(.8, 1.8);
        transform: scale(.8, 1.8);
        // background-color: red; 
        
    `
      : ""}


     @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    font-size: 1.5rem;
    line-height: 1.5rem;

    ${(props) =>
      props.reversed
        ? `
            left: 3%;
            top: -2%;
            font-size: 2.2rem;
            letter-spacing: .05rem;
            color: darkorange;
            -webkit-transform: scale(1, 1.1);
            -moz-transform:scale(1, 1.1);
            -o-transform:scale(1, 1.1);
            transform:scale(1, 1.1);

        `
        : ""}

    ${(props) =>
      props.loading
        ? `
            left: -10%;
            top: -6%; d
            -webkit-transform: scale(.8, 1.8);
            -moz-transform: scale(.8, 1.8);
            -o-transform: scale(.8, 1.8);
            transform: scale(.8, 1.8);
        `
        : ""}
  }
`;

const Bar = styled.span`
  height: 3px;
  width: 95%;
  background-color: #ff771b;
  position: relative;
  top: 7%;
  /* margin-bottom: .1rem; */

  ${(props) =>
    props.reversed
      ? `
        top:-1%;
    `
      : ""}

  ${(props) =>
    props.loading
      ? `
        top: -7%;
    `
      : ""}
`;

const TextBottom = styled.h5`
  color: #ff771b;
  align-self: flex-end;
  /* background-color: red; */
  font-family: "Helvetica";
  text-transform: uppercase;
  text-align: right;
  font-weight: bold;
  font-size: 1.1rem;
  line-height: 1rem;
  letter-spacing: 0.15rem;
  -webkit-transform: scale(0.8, 1.5);
  -moz-transform: scale(0.8, 1.5);
  -o-transform: scale(0.8, 1.5);
  transform: scale(0.8, 1.5);

  text-shadow: 0px 0px 1px #f97b39;

  position: relative;
  right: -4%;
  top: 1%;

  ${(props) =>
    props.reversed
      ? `
        align-self: flex-start;
        top: 2%;
        left: -10%;
        text-align: left;
        letter-spacing: .05rem;
        word-spacing: .1rem;
        width: calc(100% * 1.3);
    `
      : ""}

  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    /* background-color:red; */

    ${(props) =>
      props.reversed
        ? `
            // background-color:blue;
             top: 6%;
            font-size: .8rem;
            line-height: .8rem;
            -webkit-transform: scale(.8,  2);
            -moz-transform: scale(.8,  2);
            -o-transform:scale(.8,  2);
            transform:scale(.8, 2);


        `
        : ""}
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.xs}) {
    font-size: 1.1rem;
    line-height: 1rem;
    -webkit-transform: scale(0.8, 1.5);
    -moz-transform: scale(0.8, 1.5);
    -o-transform: scale(0.8, 1.5);
    transform: scale(0.8, 1.5);
  }
`;
const LoadingBar = styled.div`
  height: 1.3rem;
  background-color: darkorange;
  align-self: flex-start;
  position: relative;
  left: 2.5%;
  top: 0%;
  width: ${(props) => `calc(95% * ${props.percent})`};

  transition: width 0.5s ease;
  box-shadow: 0px 0px 2px darkorange;
`;

// /////// ///// CENTER PIECE /////// /////

const CenterWrap = styled.div`
  position: absolute;
  /* top: %; */
  /* left: 60%; */
  transform: translate(-42%, -48%);
  /* width: 566px; */
  height: 580px;
  /* background-color: rgba(255,0,0,.5); */
  z-index: 20000;

  -webkit-filter: drop-shadow(0px 0px 4px #f97c399c);
  filter: drop-shadow(0px 0px 4px #f97c399c);

  /* 
    &::before{
        content: '';
        position: absolute;
        top: 48%;
        left: 42%;
        height: 300px;
        width: 2px;
        background-color: red;
        transform: translate(-50%,-50%);
    }

     &::after{
        content: '';
        position: absolute;
        top: 48%;
        left: 42%;
        height: 300px;
        width: 2px;
        background-color: red;
        transform: translate(-50%,-50%) rotate(90deg);
    } */

  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    height: 380px;
    transform: translate(-44.55%, -48.5%);

    /* &::before{
            top: 48.5%;
            left: 44.5%;
        }

        &::after{
            top: 48.5%;
            left: 44.5%;
        } */
  }
`;

const Align = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  height: fit-content;
  /* background-color: rgba(255,0,0,.5); */
  z-index: 22000;
  transition: rotate 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
  /* rotate: calc(120deg * 1); */

  /* &::before{
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        height: 300px;
        width: 2px;
        background-color: blue;
        z-index: 2000000000 ;


    }

     &::after{
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        height: 300px;
        width: 2px;
        background-color: blue;
        transform: translate(-50%,-50%) rotate(90deg);
        z-index: 2000000000 ;

    } */
`;

const NameWrap = styled.div`
  position: absolute;
  z-index: 200005;
  translate: -50% -65%;
  /* background-color: aliceblue; */
`;

const CenterText = styled.h6`
  color: #ff771b;
  font-family: "Helvetica";
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;

  font-size: 2rem;
  line-height: 2rem;
  letter-spacing: 0rem;
  text-shadow: 0px 0px 8px #f97c39b1;

  -webkit-transform: scale(0.8, 0.9);
  -moz-transform: scale(0.8, 0.9);
  -o-transform: scale(0.8, 0.9);
  transform: scale(0.8, 0.9);

  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    font-size: 1.5rem;
    line-height: 1.4rem;
    letter-spacing: 0rem;
    text-shadow: 0px 0px 6px #f97c39b1;
  }
`;

// /////// ///// CENTER WINGS /////// /////

const WingContainer = styled.div`
  /* background-color: rgba(255,255,0,.2); */
  position: absolute;
  z-index: 22000;
  display: flex;

  width: 255px;
  height: 148px;
  top: -58px;
  left: 60px;

  color: #ff771b;
  font-family: "Helvetica";
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;

  font-size: 1.9rem;
  line-height: 1rem;
  letter-spacing: 0rem;
  text-shadow: 0px 0px 3px #ff761bc8;

  -webkit-transform: scale(0.8, 1.1);
  -moz-transform: scale(0.8, 1.1);
  -o-transform: scale(0.8, 1.1);
  transform: scale(0.8, 1.1);

  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    width: 255px;
    height: 82px;
    top: -32px;
    left: 28px;

    font-size: 1.15rem;
    line-height: 0.4rem;
    letter-spacing: 0.05rem;
    text-shadow: 0px 0px 1px #f97c396e;
  }
`;

const WingMain = styled.h5`
  position: absolute;
  transform-origin: top left;
  /* background-color: rgba(255,0,255,.2); */
  text-align: center;
  display: grid;
  place-items: center;

  transform: rotate(128deg) scaleX(0.85);
  top: 30px;
  left: 24px;
  width: 60%;
  height: 30px;

  ${(props) => {
    if (props.side === 1) {
      return `transform: rotate(128deg) scaleX(.85);`;
    } else if (props.side === 2) {
      return `transform: rotate(128deg) scaleX(.85);`;
    } else if (props.side === 3) {
      return `
            transform: rotate(127deg) scaleX(.85) translateY(2px);   
            `;
    }
  }}

  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    transform: rotate(128deg) scaleX(0.85) translate(-10px, -26px);
    width: 40%;
    top: 0px;
    left: 0px;
    width: 45%;
    height: 25px;

    ${(props) => {
      if (props.side === 1) {
        return `transform: rotate(128deg) scaleX(.85) translate(-10px ,-26px);`;
      } else if (props.side === 2) {
        return `transform: rotate(128deg) scaleX(.85) translate(-10px ,-26px);`;
      } else if (props.side === 3) {
        return `
            transform: rotate(127deg) scaleX(.85) translate(-10px ,-26px);;   
            `;
      }
    }}
  }
`;

const WingSubWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  justify-content: center;
  overflow: visible;
  /* background-color: rgba(255,255,255,.5); */

  top: 8px;
  left: 40px;
  height: 90%;
  width: 90%;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    top: 0px;
    left: 30px;
    height: 99%;
  }
`;

const WingSub = styled.h5`
  margin: 0.45rem auto;
  position: relative;

  &:nth-child(1) {
    left: -15px;
  }
  &:nth-child(2) {
    left: -30px;
  }
  &:nth-child(3) {
    left: -45px;
  }
  &:nth-child(4) {
    left: -65px;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    &:nth-child(1) {
      left: -40px;
    }
    &:nth-child(2) {
      left: -60px;
    }
    &:nth-child(3) {
      left: -70px;
    }
    &:nth-child(4) {
      left: -80px;
    }
  }
`;

const WingWrap = styled.div`
  z-index: 22000;
  /* background-color: rgba(255,0,0,.3); */
  position: absolute;
  transform-origin: left center;
  height: 1px;
  width: 1px;
  top: 0px;

  ${(props) => {
    if (props.side === 1) {
      return "";
    } else if (props.side === 2) {
      return `
                top: -11px;
                left: 6.5px;
                rotate: -120deg;
            `;
    } else if (props.side === 3) {
      return `
                top: -12px;
                left: -5px;
                rotate: -240deg;
            `;
    }
  }}
`;

const Shader = styled.div`
  position: absolute;
  height: 150%;
  width: 300px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 155;
  left: -120%;
  top: 50%;
  transform: rotate(2deg) translate(-50%, -50%);
  overflow: visible;
  mix-blend-mode: darken;
  opacity: 0.95;

  @keyframes flash {
    0% {
      left: -50%;
    }
    100% {
      left: 110%;
    }
  }

  /* @media screen and (min-width: ${(props) => props.theme.breakpoint.md}){
        animation: flash 6.5s  infinite;
        animation-delay: 5s;
    } 
    @media screen and (min-width: ${(props) => props.theme.breakpoint.xl}){
        animation: flash 8s  infinite;
        animation-delay: 11s;
    } 
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}){
        animation: flash 5s  infinite;
        animation-delay: 8s;
    } 
    @media screen and (max-width: ${(props) => props.theme.breakpoint.xs}){
        animation: flash 4s  infinite;
        animation-delay: 7s;
    } 
       */

  animation: flash 5.5s infinite linear;
  animation-delay: 0.4s;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.xs}) {
    animation: flash 4.5s infinite linear;
    animation-delay: 0.8s;
    width: 200px;
  }
`;

// const VidWrap = styled.div`
//     position: absolute;
//     top: 0;
//     left: 0;
//     transition: all .3s ease-in-out;
//     width: 100vw;
//     height: 100vh;
//     background: black;
//     opacity: 1;
// `

// const VidBG = styled.video`
//     width: 100%;
//     height: 100%;
//     -o-object-fit: cover;
//     object-fit: cover;
//     position: relative;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     top: 50%;

//     animation: fadein 2s ease-in-out 1;

//     @keyframes fadein {
//         from {
//             opacity: 0;
//              /* scale: 2; */
//         }
//         to {
//             opacity: 1;
//              /* scale: 1; */
//         }
//     }

//     @-webkit-keyframes fadein {
//         from {
//             opacity: 0;
//              /* scale: 2; */
//         }
//         to {
//             opacity: 1;
//              /* scale: 1; */
//         }
//     }

// `
