import React, {  } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';



export const AccentButton = ({currentBuild,text,onClick}) =>{

    return(
        <Container  currentbuild={currentBuild } onClick={onClick}>
            <Wrapper>
                <Text currentbuild={currentBuild}>{text}</Text>
            </Wrapper>
    </Container>
    );
}



const Container = styled(motion.div)`
    /* height: 30px; */
    /* width: 125px; */
    padding: .2rem .2rem;
    background-color: transparent;
    transition: border ${props => props.theme.transitionStyleMid};
    border-radius: 1.5px;
    border: 2px solid  ${props => props.theme[props.currentbuild].accent};

    &:hover{
       
        
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
    letter-spacing: .1rem;

    /* @media screen and (max-width: ${props => props.theme.breakpoint.xl}){
        font-size: .8rem;

    }  */


`
