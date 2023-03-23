import React from 'react';
import styled from 'styled-components';
import { AccentButton } from './accentButton';
import { motion } from 'framer-motion';


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
      duration: 0.8
    }
  }
};

const projects = [
    {
        id: 0,
        title: 'VRNL - Video Sharing Social Media Platform',
        image: './mockups/vrnl_mockup.png',
        codestack: ['react','node.js','mongo DB','express'],
        link: 'https://vrnl.vercel.app/',
        side: 'right'

    },
    {
        id: 1,
        title: 'GAT NFT - Immersive Web3 Dapp',
        image: './mockups/gat_mockup.png',
        codestack: ['react','node.js','three.js','firebase'],
        link: 'https://godsandtitans.io/',
        side: 'left'

    },{
        id: 2,
        title: 'TYGR NFT - Web3 Dapp',
        image: './mockups/tygr_mockup.png',
        codestack: ['next.js', 'UI design'],
        link: 'https://tygr-dev-mu.vercel.app',
        side: 'right'

    },{
        id: 3,
        title: 'Mugen Manga - Cross Platform Manga Reader',
        image: './mockups/mugen_manga_mockup.png',
        codestack: ['flutter','firebase', 'UI design', 'webscrape'],
        link: 'https://reynaldos.github.io/reynaldos-github.io/#/',
        // link: 'https://reynaldos.github.io/manga_reader_web/',
        side: 'left'

    },
]

export const Projects = ({currentBuild}) => {
  return (
    <Container id='work'>
        <Wrapper>
           {projects.map((project, index)=>{
                return <ProjectBuild 
                    key={index}
                    project={project}
                    currentBuild={currentBuild}/>
           })}
        
        </Wrapper>
    </Container>
  )
}



const ProjectBuild = ({currentBuild,project}) => {


  return (
    <BuildContainer
        initial='offscreen'
        whileInView='onscreen'
        variants={projectVariants}
        >
        <BuildWrapper currentBuild={currentBuild}>

            {/* bg image */}
            <ImageWrap>
                <ProjectImage src={project.image} project={project.id}/>
            </ImageWrap>

            {/* skrews */}
            <Screw currentBuild={currentBuild}><Cross/><Cross/></Screw>
            <Screw currentBuild={currentBuild}><Cross/><Cross/></Screw>
            <Screw currentBuild={currentBuild}><Cross/><Cross/></Screw>
            <Screw currentBuild={currentBuild}><Cross/><Cross/></Screw>

            {/* text */}
            <TextWrap side={project.side}>
                <Title 
                    currentBuild={currentBuild}
                    side={project.side}>{project.title}</Title>
                {/* <Spacer top={true}/> */}

                <Sitebtn 
                    onClick={()=>{
                        openInNewTab(project.link);
                    }}
                    currentBuild={currentBuild}>
                    
                    <AccentButton  currentBuild={currentBuild} text={'Visit Site'}/>
                    </Sitebtn>

                <Spacer/>
                
                <StackWrap >
                    {project.codestack.map((value, index)=>{
                        return <StackText 
                            currentBuild={currentBuild}
                            side={project.side}
                                key={index} >{value}</StackText>
                    })}
                </StackWrap>
            </TextWrap>

        </BuildWrapper>
    </BuildContainer>
  )
}


const Container = styled.section`
    min-height:700px;  
    width: 100%;
    display: grid;
    place-items: center;
    z-index: 15;
    overflow-x: hidden;
    position:relative;
`


const Wrapper = styled.div`
  width: calc(100% - 8.5rem);
  max-width: 1000px;
  /* height: 500px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 4rem;

   @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
        width: 95%;
    } 

`

const BuildContainer = styled(motion.div)`
    width: 100%;
    height: auto;
    margin: 1rem auto;
    aspect-ratio: 1.9/1;
    transition:  aspect-ratio  .3s ease,
                transform  .3s ease;
    border-radius: 2.5px;
    overflow: hidden;
    transform-origin: center;
    transition:  transform  .5s ease;

    &:hover{
        transform: scale(1.01);

    }


    @media screen and (max-width: ${props => props.theme.breakpoint.md}){
        aspect-ratio: 1.05/1;
        width: 100%;
        /* height: ; */
        /* background-color: red; */
    } 

      @media screen and (max-width: ${props => props.theme.breakpoint.xs}){
        aspect-ratio: 1.05/1.2;
        width: 100%;
        /* height: ; */
        /* background-color: red; */
    } 


   

`

const BuildWrapper = styled.section`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: transparent;
    border-radius: 1.5px;

    @media screen and (max-width: ${props => props.theme.breakpoint.md}){
        background-color:  ${props => (props.currentBuild === 0 ? '#A5B091' : props.theme[props.currentBuild].btnText)};
        transition: background-color ${props => props.theme.transitionStyleMid};
        
        
    } 
   

`

const ImageWrap = styled.div`
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0%;
    transform-origin: center;
    transition:  transform  .4s cubic-bezier(.56,.42,.73,.9);

    &:hover{
        transform: scale(1.05);
    }


    @media screen and (max-width: ${props => props.theme.breakpoint.md}){
        height: 50%;
        bottom: 50%;
        transition:  bottom  .3s ease;

        &:hover{
            transform: scale(1);
        }

        
    } 

`

const ProjectImage = styled.img`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;


`

const Screw = styled.div`
    position: absolute;
    width: 25px;
    height: 25px;
    background-color: ${props => props.theme[props.currentBuild].btn};
    border-radius: 100%;
    margin: .5rem;
    display: grid;
    place-content: center;
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);

    transition: transform 1s ease,
                scale 1s ease,
                background-color ${props => props.theme.transitionStyleMid};
    z-index: 15;


    &:hover{
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        transform: rotate(360deg) scale(1.1);
        -webkit-transform: rotate(360deg) scale(1.1);
        scale: 1.1;
         -ms-transform: rotate(360deg) ;
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }


    &:nth-child(2){
        right: 0%;
    } &:nth-child(3){
        bottom: 0%;
        right: 0%; 
    } &:nth-child(4){
        bottom: 0%;    
    }

    @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
        width: 18px;
        height: 18px;
       
    } 

    
`

const Cross = styled.div`
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: black;
    top: 50%;
    left: 50%;
    border-radius: 10px;

     @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
        width: 6px;
        height: 1.5px;
    } 

    &:nth-child(1){
        transform-origin: center;
        transform: translate(-50%, -50%) rotate(90deg);
        
    } &:nth-child(2){
        transform: translate(-50%, -50%) rotate(0deg);
    }

`

const TextWrap = styled.div`
    position: absolute;
    top: calc(.5rem + 25px);
    left: calc(.5rem + 25px);
    /* transform: translate(-50%, -50%); */
    width: calc(65% - 1rem - 50px);
    height: calc(90% - 1rem - 50px);
    /* outline: 1px red solid; */

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    /* background-color: rgba(0,0,255,.5); */
    pointer-events: none;


    ${props => props.side === 'right' ? `
    //    transform: translateX(90%);
            width: calc(45% - 1rem - 50px);
          right: calc(.5rem + 25px);
          left:unset;
    `:''};


    @media screen and (min-width: ${props => props.theme.breakpoint.md}){
        padding: 2rem;
         ${props => props.side === 'right' ? `
       padding: 2rem 2rem  2rem 0;

    `:''};
    } 

    @media screen and (max-width: ${props => props.theme.breakpoint.md}){
        transform: translateX(0%);
        width: calc(100% - 2rem - 50px);
        height: 50%;
        align-items: flex-start;
        top: 50%;
        padding: 0 .5rem;
    } 

    @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
        width: calc(100% - 2rem - 36px);
        left: calc(.5rem + 18px);

    } 

     @media screen and (max-width: ${props => props.theme.breakpoint.xs}){
        width: calc(100% - 1rem - 36px);
        padding: 0;

    } 

`


const Title = styled.h1`
    width: 250px;
    /* background-color: rgba(0,255,0,.5); */
    margin-bottom: calc(2rem * 1.5);
    color: white;
    text-shadow: black 0 0  4px;

    font-size: 1.4rem;
    line-height: 1.2rem;
    letter-spacing: .01rem;
    word-spacing: .25rem;
    padding-bottom: 1.6rem;;

   
    transform-origin: top left;
    -webkit-transform: scale(1.5, 1.8);
    -moz-transform: scale(1.5, 1.8);
    -o-transform: scale(1.5, 1.8);
    transform: scale(1.5, 1.8);
    
    order: 1;



    @media screen and (min-width: ${props => props.theme.breakpoint.lg}){
        font-size: 1.6rem;
        line-height: 1.4rem;
        /* width: 300px; */
    } 

    @media screen and (max-width: ${props => props.theme.breakpoint.md}){
        color: ${props => props.currentBuild === 2 ? 'black' : 'white'};
        transition: color ${props => props.theme.transitionStyleMid};
        transform-origin: top left;
        font-size: 1.5rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
        width: calc(100% / 1.5);
         text-shadow: none;

    } 

    @media screen and (max-width: ${props => props.theme.breakpoint.xs}){
        margin-bottom: 0rem;
        font-size: 1rem;
        line-height: 1rem;
        width: calc(100% / 1.5);
    } 


      ${props => props.side === 'right' ? `
            //    transform: translateX(90%);
            width: 75%;
            //    background-color: blue;
            `:''}


`

const Sitebtn = styled.div`
    pointer-events: visible;
    position: relative;
    width: fit-content; 
    order: 2;

    @media screen and (max-width: ${props => props.theme.breakpoint.md}){
        order: 3;
        margin-bottom: 1rem;
    } 

    @media screen and (max-width: ${props => props.theme.breakpoint.xs}){
        margin: 1rem auto;  
    } 


`
const StackWrap = styled.ul`
    order: 3;
    text-shadow: black 0 0  4px;
    /* ${props => props.side === 'right' ? `
        align-items: flex-end;
    `:''}; */

     @media screen and (max-width: ${props => props.theme.breakpoint.md}){
        padding: .1rem;
        order: 2;
         text-shadow: none;
        /* text-shadow: black 0 0  1px; */

    } 


     @media screen and (max-width: ${props => props.theme.breakpoint.xs}){
        margin-top: .5rem
    } 

`
const StackText = styled.p`
    text-align: center;
    text-transform: capitalize;
    list-style: none;
    display: inline-block;
    margin-right: 1rem;
    font-weight: normal;
    color: white;
     transition: color ${props => props.theme.transitionStyleMid};



    /* ${props => props.side === 'right' ? `
        margin-right: 0rem;
        margin-left: 1rem;
    `:''}; */

     @media screen and (max-width: ${props => props.theme.breakpoint.md}){
        margin-right: 1rem;
        margin-left: 0rem;
        color: ${props => props.currentBuild === 2 ? 'black' : 'white'};
        
        
    } 


`
const Spacer =styled.div`
    order: 2;
    flex: 2;
    background-color: transparent;

    ${props=>props.top? 'flex: 1.5;':''}

     @media screen and (max-width: ${props => props.theme.breakpoint.md}){
        display: none;
    } 

`


const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}