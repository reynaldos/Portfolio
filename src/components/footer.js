import React from 'react';
import styled from 'styled-components';
import { Data } from './data';
import { SVGicons } from './icons';
import { Contact } from './contacts';

// import { motion } from 'framer-motion';



export const Footer = ({currentBuild}) => {
  return (
    <Container >
        <Wrapper currentBuild={currentBuild}>

            {/* call to action */}
            <MessageWrap currentBuild={currentBuild}>
                <p>Available for full-time and freelance opportunities</p>
                {/* <h3>Available for full-time and<br/>freelance opportunities</h3> */}

                <p>Thanks for stopping by, I'm currently looking to join a team of creative designers and developers. If you think we might be a good fit for one another, give me a call or send me a message!</p>
            </MessageWrap>

            {/* contact box */}
            <Contact/>

            {/* socials list */}
             <SocialWrap>
                {Data.socials.map((item,i)=>{
                    return <IconWrap 
                                currentBuild={currentBuild}
                                href={item.link}
                                target="_blank"
                                key={i}>
                            <SVGicons 
                                alt={item.name}
                                index={i}
                                currentBuild={currentBuild}
                                type={'footer'}
                                />
                    </IconWrap>
                    })}
            </SocialWrap>

            {/* github link */}
            <GitLink 
                currentBuild={currentBuild}
                href={'https://github.com/reynaldos/Portfolio'} 
                target="_blank">
                   <p>Designed & Built by Rey Sanchez</p> 
            </GitLink>
            
        </Wrapper>
    </Container>
  )
}


const Container = styled.footer`
    position: relative;
    min-height: 70px;
    /* height: 70px; */
    /* width: 100%; */
    padding: 15px 0px;
   
   

`

const Wrapper = styled.div`
    position: relative;
    
    width: calc(100% - 8rem);
    max-width: 1200px;
    height: 100%;
    margin: auto;
    filter: drop-shadow(0px 4px 4px #00000071);

    
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
       width: 100%;
    } 
`


const MessageWrap = styled.div`
position: relative;
top: 50px;

    min-width: 300px;
    max-width: 450px;
    width: 100%;
    /* border: 8px solid ${props => (props.currentBuild === 0 ? '#A5B091' : props.theme[props.currentBuild].btnText)};; */
    margin: 2rem;
    border-radius: 3px;
    padding: 10px;
     /* background-color: #221A2B; */
    /* color: #BCD167; */
    color: white;

    /* background-color: ${props => props.theme[props.currentBuild].btn}; */
    /* color:  ${props => props.theme[props.currentBuild].btnText}; */

   
    /* h3{
        padding-top: 15px;
        line-height: 20px;
        font-size: 20px;
    } */

    p{ 
        /* color:  ${props => props.theme[props.currentBuild].btnText}; */
        /* color: #BCD167; */
        color: white;

        padding: 15px;
        text-align: center;
        font-weight: normal;
        line-height: 16px;
        font-size: 16px;
        letter-spacing: .075rem;

        &:nth-child(1){
            font-weight: bold;
            font-size: 24px;
            line-height: 24px;
            padding: 5px;
            text-transform: capitalize;
            letter-spacing: .1rem;
        }
    }


     @media screen and (min-width: ${props => props.theme.breakpoint.lg}){
      max-width: 550px;

        p{ 
        font-size: 1rem;
        line-height: 1.5rem;
        word-spacing: .05rem;
        letter-spacing: .05rem;

        &:nth-child(1){
         
            font-size: 32px;
            line-height: 30px;
            letter-spacing: .05rem;
        }
    }
    } 

     

`

const SocialWrap = styled.div`
    display: none;
    width: 100px;
    height: 40px;
    margin-bottom:1.5rem;

    @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
        display: flex;
        justify-content: center;
        align-items: center;
    } 


`

const IconWrap = styled.a`
    height: 100%;

    /* width: calc(100vw/ 5); */
    z-index: 10;
    /* outline: 1px red solid; */
    display: grid;
    place-items: center;
    transition: transform .3s cubic-bezier(0.39, 0.575, 0.565, 1);
    margin: auto .5rem;
    clip-path: polygon(0 28%, 50% 0, 100% 28%, 100% 72%, 50% 100%, 0 72%);
    -webkit-clip-path: polygon(0 28%, 50% 0, 100% 28%, 100% 72%, 50% 100%, 0 72%);

    div svg{

        background-color: #221A2B;
        stroke: #BCD167;
        padding: 5px 10px;

    }
    

    &:hover{
        transform: translateY(0) scale(1);
        /* stroke: red; */
        transform-origin:  center;
        transform: translateY(-.3rem) scale(1.05);
        transition: transform .3s ease;
    }
`

const GitLink = styled.a`
    transform-origin:  center;
    padding: 2px;
    transform: translateY(0) scale(1);
    transition: transform .3s ease;


    &:hover{
        /* stroke: red; */
        transform: translateY(-.15rem) scale(1.03);
    }


    p{
        /* color: ${props => props.theme[props.currentBuild].accent}; */
        color: white;

        font-size: 12px;
        transition: 
            color ${props => props.theme.transitionStyleBottom};   
    }

`