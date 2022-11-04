import React, {  } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';



export const AccentButton = ({currentBuild,text,onClick}) =>{
        // <BTN href="#"></CustomSpan>Button</BTN>

    return(
        <Container  currentbuild={currentBuild} onClick={onClick}>
            <CustomSpan currentbuild={currentBuild}/>
            <Wrapper>
                <Text currentbuild={currentBuild}>{text}</Text>
            </Wrapper>
    </Container>
    );
}



const Container = styled(motion.div)`

    /* height: 30px;
    width: 125px; */
    padding: .2rem .2rem;
    background-color: transparent;
    transition: border ${props => props.theme.transitionStyleMid},
                transform .3s ease
                ;
    border-radius: 1.5px;
    border: 2px solid  transparent;

    &::before, &::after{
        content: '';
        position: absolute;
        width: calc( 180px / 2);
        height: calc( 50px / 2);
        background: transparent;
        transition: .55s ease;
    }

    &::before {
        top: -0px;
        left: -0px;
        border-top: 2px solid ${props => props.theme[props.currentbuild].accent};
        border-left: 2px solid ${props => props.theme[props.currentbuild].accent};
        border-radius: 1.5px;

    }
    &::after {
        top: -0px;
        right: -0px;
        border-top: 2px solid ${props => props.theme[props.currentbuild].accent};
        border-right: 2px solid ${props => props.theme[props.currentbuild].accent};
        border-radius: 1.5px;
    
    }


    &:hover::before,
    &:hover::after,
    &:hover span::before,
    &:hover span::after  {
    width: 8px;
    height: 8px;    
    border-radius: 0px;
    }
    
`

const CustomSpan = styled.span`
    &::before, &::after{
        content: '';
        position: absolute;
        width: calc( 180px / 2);
        height: calc( 50px / 2);
        background: transparent;
        transition: .55s ease;

  }

    &::before {
    bottom: 0px;
    left: 0px;
    border-bottom: 2px solid ${props => props.theme[props.currentbuild].accent};
    border-left: 2px solid ${props => props.theme[props.currentbuild].accent};
    border-radius: 1.5px;

    
    }
    &::after {
    bottom: 0px;
    right: 0px;
    border-bottom: 2px solid ${props => props.theme[props.currentbuild].accent};
    border-right: 2px solid ${props => props.theme[props.currentbuild].accent};
    border-radius: 1.5px;

    }



`


const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    place-content: center;


`
const Text = styled.h3`
    font-size: 1rem;
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    padding-top: 0.05rem;

    color:  ${props => props.theme[props.currentbuild].accent};
    transition: 
        font-size .1s ease,
        color ${props => props.theme.transitionStyleMid}, letter-spacing .3s ease-in;


    /* @media screen and (max-width: ${props => props.theme.breakpoint.xl}){
        font-size: .8rem;

    }  */

`







