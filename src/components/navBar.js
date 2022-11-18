import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Data } from './data';
import { AccentButton } from './accentButton';
import { SVGicons } from './icons';

import { Link as LinkS } from 'react-scroll';
import { animateScroll as scroll } from 'react-scroll/modules';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';


const navTransitonTime = .8;

export const NavBar = ({currentBuild,onClick,showElements}) => {

    const [navStatus, setNavStatus] = useState('default');
    const buttonRef = useRef(null);

     const checkResize = () => {
        // console.log('check')
        // console.log(navStatus)
        if(navStatus === 'open' && window.innerWidth > 576){
            toggleNav(true);
        }

    }

    useEffect(() => {

        window.addEventListener('resize', checkResize);

         return () => {
            window.removeEventListener('resize', checkResize);
        }
    });


    const toggleHome = () =>{

        if (navStatus === 'open'){
            toggleNav();
            setTimeout(() => {
             scroll.scrollToTop();
        }, 500);
        }else{
            scroll.scrollToTop();
        }
    
    }



    const toggleNav = (windowChange) =>{
         var targetElement = document.querySelector('#root');

        const resetBtn = (time) => {
            setTimeout(() => {
                 buttonRef.current.disabled = false;
            }, time);
        }
       

        if (!windowChange){
          
            if(!buttonRef.current.disabled){
                buttonRef.current.disabled = true;

                 if (navStatus === 'default'){
                   
                    disableBodyScroll(targetElement);
                    setNavStatus('open');
                    resetBtn(600);
                }else if(navStatus === 'open'){
                    setNavStatus('close');
                    enableBodyScroll(targetElement);

                    setTimeout(() => {
                        setNavStatus('default');
                        resetBtn(550);
                    }, 900);   
                }
            }
        }else{
            setNavStatus('close');
                setTimeout(() => {
                setNavStatus('default');
            }, 1000); 
        }
    }

    const topVariants = {
        default: {
            display: 'none',
            right: '-120%',
            // height:'0'  ,
            // top: '1rem'  
        },
        open: {
            display: 'block',
            right: '-10%',
            // height:'70%',
            // top:0
        },
        close: {
            display: 'block',
            right: '120%',
            // height:'0%',
            // top:'70%'
            // top: '1rem',
            // right:0,
            // width:0,
            // display: 'block',
            // right: '120%',
            // height:'64px'  

        }
    }

    const bottonvVariants = {
        default: {
            display: 'none',
            left:' -120vw',
        },
        open: {
            display: 'block',
            left: '-10%',

        },
        close: {
            display: 'block',
            left: '120vw',

        }
    }


    const barVariants = {
        offscreen: {
            x: 700
        },
        onscreen: {
            x: 0,
            transition: {
                delay: 1.2,
                type: "spring",
                bounce: 0.25,
                duration: .8
            }
        }
    };

    const logoVariants = {
        default: {transform:{ duration: .3}},
        offscreen: {
            opactiy:0,
            scale:0,
            rotate: 360,
            transformOrigin: 'center'
        },
        onscreen: {
            opactiy:1,
            scale:1,
            rotate: 0,
            transition: {
                delay: 0,
                type: "ease",
                bounce: 0.4,
                duration: .8,
                scale:{duration: .3}
            }
        }
    };

  return (
    <>  

        {/* navbar desktop */}
        <Container>
            <Wrapper>
                {/* logo */}
                    <LogoWrap 
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: .3 },
                        }}
                        whileTap={{ 
                            scale: 0.9,
                            rotate:360,
                            transition: { duration: .5 },
                        }}
                        initial={'offscreen'}
                        animate = {showElements ? 'onscreen' : "offscreen"}
                        variants={logoVariants}

                        onClick={toggleHome}>               
                        <Logo  alt={'logo'} src={'./logo/logo.png'}/>
                    </LogoWrap>  

                    <NavDesktop 
                        initial={'offscreen'}
                        animate = {showElements ? 'onscreen' : "offscreen"}
                        variants={barVariants}
                        currentbuild={currentBuild}>

                        <NavBtnWrap>
                            {Data.nav.map((navItem,i)=>{
                                return <NavBtn 
                                    to={navItem.title} 
                                    smooth={true} 
                                    duration={500} 
                                    spy={true} 
                                    exact={'true'} 
                                    activeClass='active'
                                    offset={-74}
                                    key={i} 
                                    currentbuild={currentBuild} >
                                            <BtnText currentBuild={currentBuild}>
                                                {navItem.title}
                                            </BtnText>
                                    </NavBtn>
                                
                            })}

                            {/* resume */}
                            <NavBtnA
                                href="./resume.pdf" 
                                target={'true'}
                                currentbuild={currentBuild} >
                                    <BtnText currentBuild={currentBuild}>
                                        resume
                                    </BtnText>
                                </NavBtnA>
                        </NavBtnWrap>
                    
                        
                        {/* mobile view */}
                        <HamburgerWrap
                            ref={buttonRef}
                            currentBuild={currentBuild}
                            onClick={(e)=>toggleNav(false)}>
                            <HamburgerLine 
                                status={navStatus}
                                currentBuild={currentBuild}/>
                            <HamburgerLine 
                                status={navStatus}
                                currentBuild={currentBuild}/>
                            <HamburgerLine 
                                status={navStatus}
                                currentBuild={currentBuild}/>       
                        </HamburgerWrap>
                    </NavDesktop>
    
             


            </Wrapper>


            {/* colorway btn */}
                <AccentBtnWrap 
                    initial={'offscreen'}
                    animate = {showElements ? 'onscreen' : "offscreen"}
                    variants={barVariants}
                    status={navStatus}>
                    <AccentButton
                        text={`Build-0${currentBuild}`}
                        currentBuild={currentBuild} 
                        onClick={onClick}
                    />
                </AccentBtnWrap>


        </Container>

        {/* /////// nav menu mobile //////////*/}


          <TopContainer 
                currentbuild={currentBuild}
                animate={navStatus}
                variants={topVariants}
                transition={{ duration: navTransitonTime }}
                >
            {/* <Metal/> */}

            <TopWrap>
                <NavBtn 
                    to='/'
                    onClick={toggleHome}
                    mobilenav={'true'} 
                    currentbuild={currentBuild}>
                    <BtnText mobileNav={true} currentBuild={currentBuild}>
                        Home
                    </BtnText>
                </NavBtn>

                {Data.nav.map((navItem,i)=>{
                    return <NavBtn 
                            to={navItem.title} 
                            smooth={true} 
                            duration={500} 
                            delay={500}
                            spy={true} 
                            exact={'true'} 
                            activeClass='active'
                            offset={-74}
                            onClick={(e)=>toggleNav(false)}
                          
                            key={i} 
                            mobilenav={'true'} 
                            currentbuild={currentBuild}>
                                <BtnText mobileNav={true} currentBuild={currentBuild}>
                                    {navItem.title}
                                </BtnText>
                            </NavBtn>
                    })}

                <NavBtnA
                    mobilenav={'true'} 
                    href="./resume.pdf" target={'true'}
                    currentbuild={currentBuild}>
                        <BtnText mobileNav={'true'} currentBuild={currentBuild}>
                            Resume
                        </BtnText>
                    </NavBtnA>

                
                <AccentBtnWrap nav={'true'} status={navStatus}>
                    <AccentButton
                        text={`Build-0${currentBuild}`}
                        currentBuild={currentBuild} 
                        onClick={onClick}
                    />
                </AccentBtnWrap>
            </TopWrap>
        </TopContainer>

        <BottomContainer 
            currentbuild={currentBuild}
            animate={navStatus}
            variants={bottonvVariants}
            transition={{ duration: navTransitonTime }}
            >
            
            {/* <Metal/> */}

            <BottomWrap>
                <EmailWrap
                 href={`mailto:${Data.email}?subject=Possible Collab?`}>
                <Email currentBuild={currentBuild}>{Data.email}</Email>
                </EmailWrap>

                <SocialWrap>
                    {Data.socials.map((item,i)=>{
                        return <IconWrap 
                                    href={item.link}
                                    target="_blank"
                                    key={i}>
                                <SVGicons 
                                    alt={item.name}
                                    index={i}
                                    currentBuild={currentBuild}
                                    />
                        </IconWrap>
                     })}
                </SocialWrap>
            </BottomWrap>               
        </BottomContainer>

    </>
  )
}


// ////////// nav bar styling // /////////////        
const Container = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    margin-top: 1rem;
    z-index: 50;

`

const Wrapper = styled.div`
    position: relative;
    margin: auto auto;
    height: 100%;
    /* margin: auto 1rem; */
    /* max-width: ${props => props.theme.maxWidth}; */
    display: flex;
    align-items: center;
    justify-content: space-between;

    filter: drop-shadow(0px 0px 4px #000);
    -webkit-filter: drop-shadow(0px 0px 4px #000);
     will-change: filter;


      @media screen and (min-width: ${props => props.theme.breakpoint.xl}){
        margin: auto 1rem;
    } 
`

const LogoWrap = styled(motion.div)`
    height: 110%;
    margin: auto .5rem;
`

const Logo = styled.img`
    height: 100%;

    object-fit: contain;
`

const NavDesktop = styled(motion.div)`
    position: relative;
    width: 600px;
    height: 100%;

    /* border: ${props => (props.currentBuild !== 1 ? '1px solid #1E1E1E;' : '')}; */
    background-color:  ${props => (props.currentbuild === 0 ? '#A5B091' : props.theme[props.currentbuild].btnText)};
    transition: background-color ${props => props.theme.transitionStyleTop} , 
                margin .5s ease;

    clip-path: polygon(0 0, 92% 0, 100% 100%, 8% 100%);
    -webkit-clip-path: polygon(0 0, 92% 0, 100% 100%, 8% 100%);
    margin-right: calc(-600px * .08);

   

    @media screen and (min-width: ${props => props.theme.breakpoint.xl}){
         margin-right: 0;
    } 

    @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
        margin-right: calc(-600px * .75);
    } 
`

const NavBtnWrap = styled.div`
    display: flex;
    height: 100%;
    width: 80%;
    align-items: center;
    justify-content: space-around;
    margin: auto;

    @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
        transform: all .5 ease;
        display: none;
    } 


`

const NavBtn = styled(LinkS)`
    height: min-content;
    padding: .3rem .8rem;
    background-color: ${props => props.theme[props.currentbuild].btn};
    transition: 
        transform .25s ease,
        background-color ${props => props.theme.transitionStyleTop};
    border-radius: 1.5px;
    border: 1px black solid;
    width: 25%;

    &:hover{
        transform-origin:center;
        transform: scale(1.05);
    }


     ${props => props.mobilenav === 'true'? `

        &:nth-child(1){
            margin-top:calc(48px + 3rem);
        }

        width: 75%;
        margin: .5rem auto;
        padding: 1rem .8rem;

        @media screen and (max-height: 600px){
            padding: .5rem .8rem;
              width: 65%;
              max-width: 250px;

        } 

        &:hover{
            transform-origin:center;
            transform: skew(-15deg) scale(1.05);
        }
       
    `:`
        
    `}

`

const NavBtnA = styled.a`
    height: min-content;
    padding: .3rem .8rem;
    background-color: ${props => props.theme[props.currentbuild].btn};
    transition: 
        transform .25s ease,
        background-color ${props => props.theme.transitionStyleTop};
    border-radius: 1.5px;
    border: 1px black solid;
    width: 25%;

    &:hover{
        transform-origin:center;
        transform: scale(1.05);
    }


     ${props => props.mobilenav === 'true'? `

        &:nth-child(1){
            margin-top:calc(48px + 3rem);
        }

        width: 75%;
        margin: .5rem auto;
        padding: 1rem .8rem;

        @media screen and (max-height: 600px){
            padding: .5rem .8rem;
              width: 65%;
              max-width: 250px;

        } 

        &:hover{
            transform-origin:center;
            transform: skew(-15deg) scale(1.05);
        }
       
    `:`
        
    `}


`

const BtnText = styled.h2`
    width: min-content;
    margin: auto;
    text-transform: uppercase;
    font-size: 1rem;
    text-align: center;
    color: ${props => props.theme[props.currentBuild].btnText};
    -webkit-text-stroke-width: ${props => (props.currentBuild !== 1 ? '.5px' : '0')};
    -webkit-text-stroke-color:  ${props => (props.currentBuild !== 1 ? 'black' : '')};
    transition: all ${props => props.theme.transitionStyleTop};

    ${props => props.mobileNav? `
        font-size: 1.2rem;
        text-align: left;
        margin: auto .5rem;

         @media screen and (max-height: 600px){
            font-size: 1em;

        } 
    `:`
        
    `}
`


const AccentBtnWrap = styled(motion.div)`
    filter: drop-shadow();
    right: 0%;
    margin: 1rem;
    transition: right .6s ease;

     ${props => props.status === 'open'? `
        right:-100%;
     `:``}

    ${props => props.nav === 'true'? `
        
        position: absolute;
        top: auto;
        bottom: 0;
        right: 0%;
    `:`
        position:fixed;
        top: calc(1rem + 64px);
    `}
`


const HamburgerWrap = styled.button`
    position: absolute;
    height: 48px;
    width: 60px;
    /* background-color: red; */
    top: 50%;
    left: 10%;
    transform: translate(0,-50%);
    
    z-index: 55;
    display: none;

    background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;

    @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
       display: flex;
        align-items: flex-start;
        justify-content: space-around;
        flex-direction: column;

    } 


    &:hover{
        span{
            &:nth-child(2){
                background-color:  ${props => props.theme[props.currentBuild].btn};
                animation: back_forth 1s ease-in-out infinite;
                  transition: width 1s ease-in-out;

                @keyframes back_forth {
                    0% {
                        width: 75%;
                    }   
                    50%{   
                        width: 10%;
                    
                    }
                    100% {
                        width: 75%;
                    }
                }


            &::after{   
                content: '';
                position: absolute;
                right: 0;
                height: 4px;
                border-radius: 4px;
                width: 5%;
                background-color:  ${props => props.theme[props.currentBuild].btn};
                animation: back_forth_right 1s ease-in-out infinite;
               


                @keyframes back_forth_right {
                0% {
                    width: 10%;
                }   
                50%{   
                    width: 75%;
                
                }
                100% {
                    width: 10%;
                }
            }

            }
        }
    }
}

`


const HamburgerLine = styled.span`

    width: 100%;
    height: 4px;
    background-color: ${props => props.theme[props.currentBuild].btn};
    border-radius: 4px;
     /* border: .5px black solid; */
    transition: opacity .1s ease,transform .5s ease, 
                background-color ${props => props.theme.transitionStyleTop};

    &:nth-child(2){
        width: 75%;
       

    }

    transform-origin: center left;

    ${props=> props.status === 'open' ? `
        
        &:nth-child(1){
            transform: rotate(30deg);
            width: 110%
        }

        &:nth-child(2){
            opacity:0;
            width: 0%

        }

        &:nth-child(3){
            transform: rotate(-30deg);
            width: 110%
        }
        }
    
    `:`
       
    
    `}
    
    
    



`

// ////////// top nav styling // /////////////        

const TopContainer = styled(motion.nav)`
    position: fixed;
    width: 120vw;
    height: 70%;
    top: 0;
    right: 0;
    z-index: 49;
    background-color:  ${props => (props.currentbuild === 0 ? '#A5B091' : props.theme[props.currentbuild].btnText)};
    clip-path: polygon(0 0, 92% 0, 100% 100%, 8% 100%);
    -webkit-clip-path: polygon(0 0, 92% 0, 100% 100%, 8% 100%);
    transition: background-color ${props => props.theme.transitionStyleTop};
    filter: drop-shadow(0px 0px 4px #000);
`

const TopWrap= styled.div`
    position: relative;
    width: 100vw;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; 
    
   
`

// ////////// bottom nav styling // /////////////        

const BottomContainer = styled(motion.nav)`
    clip-path: polygon(0 0, 92% 0, 100% 100%, 8% 100%);
    -webkit-clip-path: polygon(0 0, 92% 0, 100% 100%, 8% 100%);
    position: fixed;
    top: 69.9%;
    width: 120vw;
    height: 30.1%;
    z-index: 50;
    /* outline: 2px solid black; */
    transition: background-color ${props => props.theme.transitionStyleBottom};
    background-color: ${props => props.theme[props.currentbuild].mainNav};
    filter: drop-shadow(0px 0px 4px #000);
`

const BottomWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

`

const EmailWrap = styled.a`
    margin: 1rem auto;
    height: 2rem;
    width: min-content;
    /* background-color: green; */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .5rem 3rem;
    text-decoration: none;


     transition: transform .3s cubic-bezier(0.39, 0.575, 0.565, 1);

    &:hover{
        /* transform-origin:  center; */
        transform: translateY(-.3rem) scale(1.05, 1.05);
        
    }
`


const Email = styled.h6`
    /* background-color: aliceblue; */
    font-size: .6rem;
    color: ${props => props.theme[props.currentBuild].accent};
    transition: color ${props => props.theme.transitionStyleBottom};


`

const SocialWrap = styled.div`
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2C293A75;

`

const IconWrap = styled.a`
    height: 100%;
    width: calc(100vw/ 5);
    z-index: 10;
    /* outline: 1px black solid; */
    display: grid;
    place-items: center;
   transition: transform .3s cubic-bezier(0.39, 0.575, 0.565, 1);

    &:hover{
        transform-origin:  center;
        transform: translateY(-.4rem) scale(1.2); 
    }

`




// const Metal = styled.div`
//     position: absolute;
//     width: 120vw;
//     height: 100vh;
//     /* left: 8%; */
//     background-image: url('./assets/metal.jpg');
//     background-repeat: repeat-x;
//     background-position: center; 
//     background-size: auto 100vh ;
//     /* z-index: 49; */
//     opacity: .1;
//     background-color: transparent;
// `
