import React from 'react';
import styled from 'styled-components';
import { Data } from './data';
import { SVGicons } from './icons';


export const SideRails = ({currentBuild}) => {
  return (
    <>
      <Container side={'left'} >
        <Wrap>
            <Holder>
                {Data.socials.map((item, index)=>{
                    return <IconWrap key={index}>
                            <SVGicons 
                                currentBuild={currentBuild}
                                index={index}/>
                </IconWrap>
                })}
            </Holder>

            <Line currentBuild={currentBuild}/>
        </Wrap>
    </Container>


    {/* ////////////////////////////////////  */}
      <Container side={'right'}  >
        <Wrap>
            <EmailWrap>
                <Email currentBuild={currentBuild}>rey.sanchez.dev@gmail.com</Email>
            </EmailWrap>

            <Line currentBuild={currentBuild}/>
        </Wrap>
    </Container>
    
     </>
  )
}

const Container = styled.section`
    /* background-color: aliceblue; */
    position: fixed;
    bottom: 0;
    margin: 0 1rem;
    width: 48px;
    height: calc(64px * 5);
    right: ${props => props.side === 'right' ? '0' : ''};
    left: ${props => props.side === 'left' ? '0' : ''};
    transition:  bottom  .5s ease;

    @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
       bottom: calc(64px * -8);
    } 

    @media screen and (max-height: 550px){
        bottom: calc(64px * -8);
    } 

     @media screen and (min-width: ${props => props.theme.breakpoint.xl}){
       left: ${props => props.side === 'left' ? 'calc(50% - 675px)' : ''};
       right: ${props => props.side === 'right' ? 'calc(50% - 675px )' : ''};
       transform:  ${props => props.side === 'left' ? 'translate(-50%)' : 'translate(50%)'};


    } 
`

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`


const Holder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
`
const IconWrap = styled.div`
    /* outline: 1px solid black; */
    height: 48px;
    margin-bottom: .5rem;
    aspect-ratio: 1 / 1;
    display: grid;
    place-items: center;

     transition: transform .3s cubic-bezier(0.39, 0.575, 0.565, 1);

    &:hover{
        transform-origin:  center;
        transform: translateY(-.5rem) scale(1.2);
        
    }


`

const Line = styled.div`
    height: 10%;
    width: 2px;
    border-radius: 2px;
    background-color:  ${props => props.theme[props.currentBuild].accent};
    transition: 
        background-color ${props => props.theme.transitionStyleBottom};
`

const EmailWrap = styled.div`
    width: 100%;
    height: 100%;
    transition: transform .3s ease;

    &:hover{
        transform-origin:  center;
        transform: translateY(-.5rem) scale(1.05);
        
    }

   
`

const Email = styled.h6`
    /* font-size: .8rem; */
    color:  ${props => props.theme[props.currentBuild].accent};
    transition: color ${props => props.theme.transitionStyleBottom};
    /* transform-origin: 0 100%; */
    /* text-align: left; */
    transform: translateY(-50%) rotate(90deg);
        letter-spacing: .1rem;

`