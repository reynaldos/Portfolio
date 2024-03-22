import React from 'react';
import styled from 'styled-components';

export const ProgressIcon = ({currentBuild,name}) => {


  return (
    <Wrapper>
      <CustomSVG
        currentBuild={currentBuild}
        name={name}
        width="39"
        height="28"
        viewBox="0 0 39 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* filled bar */}
        {name === "filled" && (
          <>
            <CustomPath d="M17.8443 26.4225L36.487 1.46182H21.2158L2.57302 26.4225H17.8443Z" />
          </>
        )}

        {/* empty bar */}
        {name === "outline" && (
          <>
            <CustomPath d="M17.5928 26.4225L36.2356 1.46182H20.9643L2.32156 26.4225H17.5928Z" />
          </>
        )}
      </CustomSVG>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content:center;
  align-items: center;
   
`

const CustomSVG = styled.svg`
  height: 100%;
  fill: ${(props) =>
    props.name === "filled" ? props.theme[props.currentBuild].accent : "none"};
  stroke: ${(props) => props.theme[props.currentBuild].accent};
  transition: stroke ${(props) => props.theme.transitionStyleBottom},
    fill ${(props) => props.theme.transitionStyleBottom};
`;

const CustomPath = styled.path`
  stroke-width: 2px;
`