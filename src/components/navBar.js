import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Data } from './data';
import { AccentButton } from './accentButton';
import { SocialIcons } from './socials';

const navTransitonTime = .8;

export const NavBar = ({currentBuild,onClick}) => {

    const [navStatus, setNavStatus] = useState('default');


    // useEffect(() => {

    // window.addEventListener("", mouseMove);

    // return () => {
    //     window.removeEventListener("mousemove", mouseMove);
    // }
    // }, []);

    const toggleNav = () =>{
        if (navStatus === 'default'){
            setNavStatus('open');
        }else if(navStatus === 'open'){
            setNavStatus('close');
            setTimeout(() => {
                setNavStatus('default');
            }, 700);   
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

  return (
    <>  

        {/* navbar desktop */}
        <Container>
            <Wrapper>
                {/* logo */}
                <LogoWrap>
                    <Logo src={'./assets/logo.png'}/>
                </LogoWrap>

                <NavDesktop 
                    currentBuild={currentBuild}>
            <Metal/>

                    <NavBtnWrap>
                        {Data.nav.map((navItem,i)=>{
                            return <NavBtn key={i} currentBuild={currentBuild}>
                                        <BtnText currentBuild={currentBuild}>
                                            {navItem.title}
                                        </BtnText>
                                    </NavBtn>
                            
                        })}
                    </NavBtnWrap>
                
                    
                    {/* mobile view */}
                    <HamburgerWrap onClick={toggleNav}>
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

                {/* colorway btn */}
                    <AccentBtnWrap status={navStatus}>
                        <AccentButton
                            text={`Build-0${currentBuild}`}
                            currentBuild={currentBuild} 
                            onClick={onClick}
                        />
                    </AccentBtnWrap>



            </Wrapper>
        </Container>

        {/* /////// nav menu mobile //////////*/}
          <TopContainer 
                currentbuild={currentBuild}
                animate={navStatus}
                variants={topVariants}
                transition={{ duration: navTransitonTime }}
                >
            <Metal/>

            <TopWrap>
                <NavBtn currentBuild={currentBuild}>
                    <BtnText currentBuild={currentBuild}>
                        Home
                    </BtnText>
                </NavBtn>
                {Data.nav.map((navItem,i)=>{
                        return <NavBtn key={i} currentBuild={currentBuild}>
                                    <BtnText currentBuild={currentBuild}>
                                        {navItem.title}
                                    </BtnText>
                                </NavBtn>
                        
                    })}

            </TopWrap>
        </TopContainer>

        <BottomContainer 
            currentbuild={currentBuild}
            animate={navStatus}
            variants={bottonvVariants}
            transition={{ duration: navTransitonTime }}
            >
            
            <Metal/>

            <BottomWrap>
                <EmailWrap>
                    <Email currentBuild={currentBuild}>rey.sanchez.dev@gmail.com</Email>
                </EmailWrap>

                <SocialWrap>
                    {Data.socials.map((item,i)=>{
                        return <IconWrap key={i}>
                                <SocialIcons 
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
    max-width: ${props => props.theme.maxWidth};

    display: flex;
    align-items: center;
    justify-content: space-between;
`

const LogoWrap = styled.div`
    height: 110%;
    margin: auto .5rem;
`

const Logo = styled.img`
    height: 100%;

    object-fit: contain;
`

const NavDesktop = styled.div`
    position: relative;
    width: 600px;
    height: 100%;

    /* border: ${props => (props.currentBuild !== 1 ? '1px solid #1E1E1E;' : '')}; */
    background-color:  ${props => (props.currentBuild === 0 ? '#A5B091' : props.theme[props.currentBuild].btnText)};
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
    justify-content: space-evenly;
    margin: auto;



    @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
        transform: all .5 ease;
        display: none;
    } 


`

const NavBtn = styled.div`
    height: min-content;
    padding: .5rem .8rem;
    background-color: ${props => props.theme[props.currentBuild].btn};
    transition: background-color ${props => props.theme.transitionStyleTop};
    border-radius: 1.5px;
    border: 1px black solid;
    width: 25%;

`

const BtnText = styled.h2`
    text-transform: uppercase;
    font-size: 1rem;
    text-align: center;
    color: ${props => props.theme[props.currentBuild].btnText};
    -webkit-text-stroke-width: ${props => (props.currentBuild !== 1 ? '.5px' : '0')};
    -webkit-text-stroke-color:  ${props => (props.currentBuild !== 1 ? 'black' : '')};
    transition: all ${props => props.theme.transitionStyleTop};
`


const AccentBtnWrap = styled.div`
    position:fixed;
    top:  ${props=> props.status === 'open'? 'auto' : 'calc(1rem + 64px)'}  ;
    bottom:  ${props=> props.status === 'open'? '30%' : 'auto'}  ;

    right: 0%;
    margin: 1rem;
    transition: all 1s ease-in;


`


const HamburgerWrap = styled.div`
    position: absolute;
    height: 48px;
    width: 60px;
    /* background-color: red; */
    top: 50%;
    left: 10%;
    transform: translate(0,-50%);
    
    z-index: 55;
    display: none;

    @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
       display: flex;
        align-items: flex-start;
        justify-content: space-around;
        flex-direction: column;

    } 

`


const HamburgerLine = styled.span`

    width: 100%;
    height: 4px;
    transform: all .5 ease;
    background-color: ${props => props.theme[props.currentBuild].btn};
    border-radius: 4px;
     /* border: .5px black solid; */
    transition: all .5s ease,background-color ${props => props.theme.transitionStyleTop};

    &:nth-child(2){
        width: 75%;

    }

    ${props=> props.status === 'open' ? `
        
        &:nth-child(1){
            transform-origin: center left;
            transform: rotate(30deg);
            width: 110%
        }

        &:nth-child(2){
            opacity:0;
        }

        &:nth-child(3){
            transform-origin: center left;
            transform: rotate(-30deg);
            width: 110%
        }
        }
    
    `:`
       
    
    `}
    
    
    



`

// ////////// top nav styling // /////////////        

const TopContainer = styled(motion.div)`
    position: fixed;
    width: 120vw;
    height: 70%;
    top: 0;
    right: 0;
    z-index: 49;
    background-color:  ${props => (props.currentbuild === 0 ? '#A5B091' : props.theme[props.currentbuild].btnText)};
    clip-path: polygon(0 0, 92% 0, 100% 100%, 8% 100%);
    -webkit-clip-path: polygon(0 0, 92% 0, 100% 100%, 8% 100%);
    clip-path: polygon(0 0, 92% 0, 100% 100%, 8% 100%);

    transition: background-color ${props => props.theme.transitionStyleTop};

`

const TopWrap= styled.div`
    width: 100vw;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

// ////////// bottom nav styling // /////////////        

const BottomContainer = styled(motion.nav)`
    clip-path: polygon(0 0, 92% 0, 100% 100%, 8% 100%);
    position: fixed;
    top: 70%;
    width: 120vw;
    height: 30%;
    clip-path: polygon(0 0, 92% 0, 100% 100%, 8% 100%);
    -webkit-clip-path: polygon(0 0, 92% 0, 100% 100%, 8% 100%);
    z-index: 50;
    /* outline: 2px solid black; */
    transition: background-color ${props => props.theme.transitionStyleBottom};


`

const BottomWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

`

const EmailWrap = styled.div`
    width: 100%;
    height: 2rem;
    /* background-color: green; */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .5rem 0;
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

const IconWrap = styled.div`
    height: 100%;
    width: calc(100vw/ 5);
    /* outline: 1px black solid; */
    display: grid;
    place-items: center;

`

const Icon = styled.img`
    color: ${props => props.theme[props.currentBuild].accent};

`



const Metal = styled.div`
    position: absolute;
    width: 120vw;
    height: 100vh;
    /* left: 8%; */
    background-image: url('./assets/metal.jpg');
    background-repeat: repeat-x;
    background-position: center; 
    background-size: auto 100vh ;
    /* z-index: 49; */
    opacity: .1;
    background-color: transparent;
`

