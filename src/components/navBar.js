import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Data } from './data';
import { AccentButton } from './accentButton';
import { SVGicons } from './icons';
import { animateScroll as scroll } from 'react-scroll'

import { Link as LinkS } from 'react-scroll';
// import { animateScroll as scroll } from '/modules';
import { unlock as enableBodyScroll, lock as disableBodyScroll  } from 'tua-body-scroll-lock';
import { Contact } from './contacts';


const navTransitonTime = .8;
var lastScrollTop = window.scrollY;
var scrollUpThreshold = 5;
var scrollDownThreshold = 5;


export const NavBar = ({currentBuild,onClick,showElements,isLinktree}) => {

    const [scrollDirection, setScrollDirction] = useState('down');
    const [navStatus, setNavStatus] = useState(isLinktree ? 'open' : 'default');
    const buttonRef = useRef(null);
    const [portrait, setPortrait] = useState(0);
    const [portraitID, setPortraitID] = useState(2);
    const portraitIDRef = useRef(2);
    const isAnimating = useRef(false);

    function asyncCall(time) {
        return new Promise((resolve) => setTimeout(() => resolve(), time));
    }

    const togglePixel = async () => {
        if (!isAnimating.current) {
            isAnimating.current = true;
            for (let i = 0; i <= 3; i++) {
                setPortrait(i);
                await asyncCall(100);
            }
            for (let i = 4; i >= 1; i--) {
                setPortrait(i);
                await asyncCall(125);
            }
            for (let i = 2; i <= 4; i++) {
                setPortrait(i);
                await asyncCall(100);
            }
            const nextID = portraitIDRef.current === 1 ? 2 : 1;
            portraitIDRef.current = nextID;
            setPortraitID(nextID);
            for (let i = 3; i >= 1; i--) {
                setPortrait(i);
                await asyncCall(i > 1 ? 125 : 50);
            }
            setPortrait(0);
            isAnimating.current = false;
        }
    };

    // lock body scroll on mount if linktree mode (menu is open)
    useEffect(() => {
        if (isLinktree) {
            disableBodyScroll();
        }
    }, []); // eslint-disable-line

    const handleLinktreeContact = () => {
        setShowContactModal(true);
    }

    const closeContactModal = () => {
        setContactModalClosing(true);
        setTimeout(() => {
            setShowContactModal(false);
            setContactModalClosing(false);
        }, 500);
    }

    // auto-toggle every 30 seconds when nav is open
    useEffect(() => {
        if (navStatus !== 'open') return;
        const interval = setInterval(() => {
            togglePixel();
        }, 30000);
        return () => clearInterval(interval);
    }, [navStatus]); // eslint-disable-line

     const checkResize = () => {
        // console.log('check')
        // console.log(navStatus)
        if(navStatus === 'open' && window.innerWidth > 576 && !isLinktree){
            toggleNav(true);
        }

    }


    const checkScroll = () => {
        let newScroll = window.scrollY;
    
        if (newScroll - lastScrollTop > scrollUpThreshold) {
            setScrollDirction('up')
        } else if (newScroll - lastScrollTop < -scrollDownThreshold) {
            setScrollDirction('down')
        } else if(newScroll < 10){
             setScrollDirction('down');
        }
        
        lastScrollTop = newScroll
    }

    useEffect(() => {

        window.addEventListener('scroll', checkScroll);

         return () => {
            window.removeEventListener('scroll', checkScroll);
        }
    });

    // navbar resizing
    useEffect(() => {

        window.addEventListener('resize', checkResize);

         return () => {
            window.removeEventListener('resize', checkResize);
        }
    });


    const [showContactModal, setShowContactModal] = useState(false);
    const [contactModalClosing, setContactModalClosing] = useState(false);

    const toggleHome = () =>{
        if (navStatus === 'open'){
            if (isLinktree) {
                // reload without linktree param so loader plays
                const url = new URL(window.location);
                url.searchParams.delete('linktree');
                window.location.href = url.toString();
                return;
            }
            toggleNav();
            setTimeout(() => {
             scroll.scrollToTop();
        }, 500);
        }else{
            scroll.scrollToTop();
        }

    }

       const resetBtn = (time) => {
            setTimeout(() => {
                 buttonRef.current.disabled = false;
            }, time);
        }

    const toggleNav = (windowChange) =>{

         if (!windowChange){
          
            if(!buttonRef.current.disabled){
                buttonRef.current.disabled = true;

                 if (navStatus === 'default'){
                   
                    disableBodyScroll();
                    setNavStatus('open');
                    resetBtn(600);
                }else if(navStatus === 'open'){
                    setNavStatus('close');
                    enableBodyScroll();

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
            y: '-50%',
            opactiy:0,
            scale:0,
            rotate: 360,
            transformOrigin: 'center'
        },
        onscreen: {
            y: '-50%',
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
        <Container scrollDirection={scrollDirection}>
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
                        initial={isLinktree ? 'onscreen' : 'offscreen'}
                        animate = {(showElements || isLinktree) ? 'onscreen' : "offscreen"}
                        variants={logoVariants}
                        onClick={toggleHome}
                        >               
                        <Logo  alt={'logo'} src={'./logo/logo.png'}/>
                    </LogoWrap>  

                    <NavDesktop
                        initial={isLinktree ? 'onscreen' : 'offscreen'}
                        animate = {(showElements || isLinktree) ? 'onscreen' : "offscreen"}
                        variants={barVariants}
                        style={isLinktree ? {display: 'none'} : {}}
                        currentbuild={currentBuild}>

                        <NavBtnWrap>
                            {Data.nav.map((navItem,i)=>{

                                if(navItem.title === 'contact' || navItem.title === 'home') {
                                    return null;
                                }
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
                            onClick={(e)=>{toggleNav(false)}}>
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
{!isLinktree && <AccentBtnWrap
                    initial={'offscreen'}
                    animate={showElements ? 'onscreen' : 'offscreen'}
                    variants={barVariants}
                    status={navStatus}>
                    <AccentButton
                        text={`Build-0${currentBuild}`}
                        currentBuild={currentBuild}
                        onClick={onClick}
                    />
                </AccentBtnWrap>}


        </Container>

        {/* /////// nav menu mobile //////////*/}


          <TopContainer
                currentbuild={currentBuild}
                isLinktree={isLinktree}
                animate={navStatus}
                variants={topVariants}
                transition={isLinktree && navStatus === 'open' ? { duration: 0 } : { duration: navTransitonTime }}
                >
           {isLinktree && <Metal/>}
            <TopWrap style={{marginTop: !isLinktree ? '124px' : '0'}}>
                {/* profile hex photo - only in linktree mode */}
                {isLinktree && (
                    <ProfileSection onClick={togglePixel}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                            <HexGlow currentBuild={currentBuild}>
                                <HexPhotoWrap currentBuild={currentBuild}>
                                    <HexPhotoInner>
                                        <HexPhoto portraitid={portraitID} src={`./me/v${portraitID}/${portrait}.webp`} alt="Rey Sanchez" />
                                    </HexPhotoInner>
                                </HexPhotoWrap>
                            </HexGlow>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}>
                            <ProfileName currentBuild={currentBuild}>Rey Sanchez</ProfileName>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}>
                            <ProfileSubtitle currentBuild={currentBuild}>software engineer</ProfileSubtitle>
                        </motion.div>
                    </ProfileSection>
                )}

                {isLinktree ? (
                    <>
                        {[
                            { label: 'Portfolio', onClick: toggleHome },
                            { label: 'Contact', onClick: handleLinktreeContact },
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + i * 0.15, duration: 0.4, ease: 'easeOut' }}
                                style={{ width: '75%' }}>
                                <LinkTreeBtn
                                    as="div"
                                    onClick={item.onClick}
                                    currentbuild={currentBuild}>
                                        <BtnText mobileNav={true} currentBuild={currentBuild}>
                                            {item.label}
                                        </BtnText>
                                </LinkTreeBtn>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9, duration: 0.4, ease: 'easeOut' }}
                            style={{ width: '75%' }}>
                            <LinkTreeBtnA
                                href="./resume.pdf" target="_blank" rel="noopener noreferrer"
                                currentbuild={currentBuild}>
                                    <BtnText mobileNav={'true'} currentBuild={currentBuild}>
                                        Resume
                                    </BtnText>
                            </LinkTreeBtnA>
                        </motion.div>
                    </>
                ) : (
                    <>
                        {Data.nav.map((navItem,i)=>{
                            return <NavBtn
                                    to={navItem.title}
                                    smooth={true}
                                    duration={500}
                                    delay={500}
                                    spy={true}
                                    exact={'true'}
                                    activeClass='active'
                                    offset={navItem.title !== 'contact' ? -74 : 0}
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
                    </>
                )}


                <AccentBtnWrap nav={'true'} status={isLinktree ? 'default' : navStatus} linktree={isLinktree ? 'true' : undefined}>
                    <AccentButton
                        text={`Build-0${currentBuild}`}
                        currentBuild={currentBuild}
                        onClick={onClick}
                    />
                </AccentBtnWrap>
            </TopWrap>
        </TopContainer>

        <BottomContainer
            isLinktree={isLinktree}
            currentbuild={currentBuild}
            animate={navStatus}
            variants={bottonvVariants}
            transition={isLinktree && navStatus === 'open' ? { duration: 0 } : { duration: navTransitonTime }}
            >
            
         {isLinktree && <Metal/>}

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

        {/* contact modal for linktree mode */}
        {showContactModal && (
            <ContactModal closing={contactModalClosing}>
                <ContactModalClose onClick={closeContactModal}>
                    <h2>&times;</h2>
                </ContactModalClose>
                <Contact hideBumpers onSubmitCallback={() => {
                    setTimeout(() => {
                        closeContactModal();
                    }, 2500);
                }}/>
            </ContactModal>
        )}

    </>
  )
}


// ////////// nav bar styling // /////////////        
const Container = styled.nav`
    /* outline: 2px solid red; */

    position: fixed;
    top: 0;
    left: 50%;
    width: 100%;
    height: 64px;
    margin-top: 1rem;
    z-index: 50;
    transform: translateX(-50%);
    transition: width ease-in-out .5s ;


    width: ${({scrollDirection})=>scrollDirection === 'down' ? '100%' : ' 400%'};

`

const Wrapper = styled.div`
    /* outline: 1px solid blue; */

    position: relative;
    margin: auto auto;
    height: 100%;
    width: 100%;
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
    height: 115%;
    margin: auto .5rem;
    /* background-color: red; */
    position: relative;
    top:50%;

    @media screen and (min-width: ${props => props.theme.breakpoint.lg}){
        height: 130%;
        top:55%;    
    } 

     @media screen and (min-width: ${props => props.theme.breakpoint.xl}){
        margin: auto 0rem;

    } 

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
         margin-right: 2rem;
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

    ${props => props.linktree === 'true' ? `
        animation: accentPulse 2.5s ease-in-out 1.5s infinite;

        @keyframes accentPulse {
            0%, 100% { filter: drop-shadow(0px 0px 0px transparent); }
            50% { filter: drop-shadow(0px 0px 8px rgba(255,255,255,0.3)); }
        }
    ` : ''}
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
    height: ${props => (props.isLinktree ? '75%' : '82%')};
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
    top: ${props => (props.isLinktree ? '74.5%' : '81.9%')};
    width: 120vw;
    height: ${props => (props.isLinktree ? '25.5%' : '18.1%')};
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




const HexGlow = styled.div`
    animation: hexFloat 3s ease-in-out 1s infinite;
    filter: drop-shadow(0px 0px 12px ${props => props.theme[props.currentBuild].accent}40);
    -webkit-filter: drop-shadow(0px 0px 12px ${props => props.theme[props.currentBuild].accent}40);
    transition: filter 0.8s ease;

    @keyframes hexFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
    }
`

const LinkTreeBtn = styled.div`
    width: 100%;
    padding: 1rem .8rem;
    margin: .4rem 0;
    background-color: ${props => props.theme[props.currentbuild].btn};
    border: 1px solid ${props => props.theme[props.currentbuild].btn}80;
    border-radius: 2px;
    transform: skew(-4deg);
    transition: transform .25s ease, box-shadow .25s ease,
        background-color ${props => props.theme.transitionStyleTop};
    text-decoration: none;
    display: block;

    &:hover, &:active {
        transform: skew(-4deg) translateY(-3px) scale(1.02);
        box-shadow: 0 6px 20px ${props => props.theme[props.currentbuild].btn}50;
    }
`

const LinkTreeBtnA = styled.a`
    width: 100%;
    padding: 1rem .8rem;
    margin: .4rem 0;
    background-color: ${props => props.theme[props.currentbuild].btn};
    border: 1px solid ${props => props.theme[props.currentbuild].btn}80;
    border-radius: 2px;
    transform: skew(-4deg);
    transition: transform .25s ease, box-shadow .25s ease,
        background-color ${props => props.theme.transitionStyleTop};
    text-decoration: none;
    display: block;

    &:hover, &:active {
        transform: skew(-4deg) translateY(-3px) scale(1.02);
        box-shadow: 0 6px 20px ${props => props.theme[props.currentbuild].btn}50;
    }
`

const ProfileSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25));
    -webkit-filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25));
    margin-top: calc(48px);
    margin-bottom: 1rem;

    @media screen and (max-height: 600px){
        margin-top: calc(48px);
        margin-bottom: .5rem;
    }
`

const HexPhotoWrap = styled.div`
    width: 106px;
    height: 122px;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    background-color: ${props =>props.currentBuild === 3 ? props.theme[props.currentBuild].mainNav : props.currentBuild === 0 ? props.theme[props.currentBuild].mainNav : props.theme[props.currentBuild].btn};
    transition: background-color ${props => props.theme.transitionStyleTop};
    display: grid;
    place-items: center;
    overflow: hidden;

    @media screen and (max-height: 600px){
        width: 83px;
        height: 96px;
    }
`

const HexPhotoInner = styled.div`
    width: 100px;
    height: 116px;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    overflow: hidden;

    @media screen and (max-height: 600px){
        width: 77px;
        height: 90px;
    }
`

const HexPhoto = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: ${props => props.portraitid === 1 ? 'center 20%' : 'center 15%'};
    transform: ${props => props.portraitid === 2 ? 'scale(3.3) translate(3%, 3%)' : 'scale(1.6) translateY(5%)'};
`

const ProfileName = styled.h2`
    color: ${props =>props.currentBuild === 0 ? props.theme[props.currentBuild].btn : props.theme[props.currentBuild].accent};
    transition: color ${props => props.theme.transitionStyleTop};
    font-size: 1.2rem;
    margin-top: .5rem;
`

const ProfileSubtitle = styled.h2`
    font-size: .5rem;
    text-transform: uppercase;
      color: ${props =>props.currentBuild === 0 ? props.theme[props.currentBuild].btn : props.theme[props.currentBuild].accent};
    transition: color ${props => props.theme.transitionStyleTop};
    margin-top: .5rem;
`

const ContactModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #221A2B;
    animation: ${props => props.closing ? 'slideOut' : 'slideIn'} 0.5s ease forwards;

    @keyframes slideIn {
        from { transform: translateY(-100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(100%); opacity: 0; }
    }
`

const ContactModalClose = styled.button`
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    z-index: 101;
    background: none;
    border: none;
    padding: .5rem;

    h2 {
        color: #BCD167;
        font-size: 1.5rem;
    }
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
