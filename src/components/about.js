import React, {useState,useEffect} from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";


const bioDesc = [
  ['I build really cool things for really cool people.'],
  ['I enjoy using my problem solving skills to help startups launch and grow their products.'],
  ['I have recently graduated with a Computer Science degree and have a passion for all things technology and design.'],
  ['I have recently completed a Bachelor of Engineering, majoring in Computer Science at the University of South Florida. I have a passion for all things technology and design, from software engineering to UI/UX.'],
  ['I have recently completed a Bachelor of Engineering, majoring in Computer Science at the University of South Florida. I have a passion for all things technology and design, from software engineering to UI/UX.',
    ' In addition to my love of technology and design. I am also interested in anime, basketball, and art. Below are details of some of projects I have developed over the years.']
]

const portaitVariants = {
  offscreen: {
    opacity: 0,
    x: 100,
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      delay: .1,
      type: "ease",
      duration: 0.8
    }
  }
};

const bioVariants = {
  offscreen: {
    opacity: 0,
    x: -100,
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      delay: .2,
      type: "ease",
      duration: 0.8
    }
  }
};


function asyncCall(time) {
  return new Promise((resolve) => setTimeout(() => resolve(), time));//1500
}



export const About = ({currentBuild}) => {

  const [bioLength, setBioLength] = useState(3);
  const [portrait, setPortrait] = useState(0);
  const [portraitID, setPortraitID] = useState(2);



   const togglePixel = async(skip) =>{
      
      if(portrait === 0 ){
       
        if(skip === true){
           // pixalate photo for me btn
          for(let i = 0; i <= 3; i++){
            setPortrait(i);
            await asyncCall(100);
          } 
        }else{
          // already pixalted for transition 
          setPortrait(4);
          await asyncCall(300);
        }

        // clear up photo
        for(let i = 4; i >= 1; i--){
          setPortrait(i);
          await asyncCall(125);
        }

         // pixalate photo
        for(let i = 2; i <= 4; i++){
          setPortrait(i);
          await asyncCall(100);
        }

        // photo switch
        setPortraitID(portraitID === 1 ? 2 : 1);

         // final clear up
        for(let i = 3; i >= 1; i--){
          setPortrait(i);
          await asyncCall(125);
        }
      
        setPortrait(0);
      }
    }
     

  return (
    <Container 
        id={'about'}
        currentBuild={currentBuild}>
        <Wrappper>

          {/* left bio text section */}
          <BioSection>
            <AdjusterWrap
              initial='offscreen'
              whileInView='onscreen'
              variants={bioVariants}
            >
              <AdjusterText style={{margin:'auto 18px'}}>Adjust Bio Length</AdjusterText>

              <BubbleWrap>
                {[...Array(5)].map((value,index)=>{
                return <BubbleBtn 
                    
                          type={'checkbox'} 
                          checked={ index===bioLength-1}
                          onClick={()=>setBioLength(index+1)}
                          key={index} 
                          currentBuild={currentBuild}
                          onChange={()=>{}}
                          // selected={index===bioLength-1}
                          />
              })}
              </BubbleWrap>
              

              <LabelWrap>
                   <AdjusterText>Shortest</AdjusterText>
                    <AdjusterText>Longest</AdjusterText>
              </LabelWrap>
             
            </AdjusterWrap>


            <BioWrap
              initial='offscreen'
              whileInView='onscreen'
              variants={bioVariants}>
              <BioText>
                 Hi I'm Rey!<br/>
                 
                 {bioDesc[bioLength-1].map((value)=>{
                  return <span key={value}>{value}<br/><br/></span>;
                 })}
                
                
              </BioText>
            </BioWrap>
          </BioSection>

          {/* right portrait section */}
          <PortraitSection>

                 <PortraitWrap
                   initial='offscreen'
                    whileInView='onscreen'
                    variants={portaitVariants}
                     onViewportEnter={togglePixel}>
                      
                    <CustomSvg 
                    x="0" y="0"
                    width="350" height="330" viewBox="0 0 525 487" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <CustomPath 
                        currentBuild={currentBuild}
                        d="M521.37 38.5456L488.114 448.226C488.071 448.746 487.638 449.146 487.117 449.146H258H233.083C232.604 449.146 232.14 449.318 231.777 449.631L189.306 486.257C189.124 486.414 188.893 486.5 188.653 486.5H130.949C130.723 486.5 130.503 486.423 130.326 486.282L84.2215 449.581C83.8675 449.299 83.4284 449.146 82.9759 449.146H1.60329C1.02483 449.146 0.567035 448.656 0.605496 448.079L27.9056 38.3982C27.9406 37.8729 28.3769 37.4647 28.9034 37.4647H288.935C289.384 37.4647 289.82 37.3136 290.173 37.0358L336.281 0.714454C336.458 0.575537 336.676 0.5 336.9 0.5H395.934C396.177 0.5 396.412 0.58864 396.595 0.749328L437.745 36.9661C438.11 37.2874 438.58 37.4647 439.066 37.4647H520.373C520.957 37.4647 521.417 37.9634 521.37 38.5456Z" />
                    </CustomSvg>

                  
                    <LabelContainer>
                        {/* top */}
                      <PortraitLabelWrap 
                          whileHover={{
                            scale: 1.2,
                            transition: { type: "spring",bounce: 0.25, duration: .3 },
                          }}
                          whileTap={{ scale: 0.9, transition:{ type: "spring",bounce: 0.25,} }}
                          onClick={()=>togglePixel(true)}
                          currentbuild={currentBuild}>
                        <Label currentBuild={currentBuild}>Me</Label>
                      </PortraitLabelWrap>
                       

                      {/* bottom */}
                      <PortraitLabelWrap 
                              whileHover={{
                                  scale: 1.2,
                                  transition: { type: "spring",bounce: 0.25, duration: .3 },
                                }}
                                whileTap={{ scale: 0.9, transition:{ type: "spring",bounce: 0.25,} }}
                             onClick={()=>togglePixel(true)}
                            currentbuild={currentBuild}
                            bottom={'true'}>
                        <Label currentBuild={currentBuild}>Me</Label>
                      </PortraitLabelWrap>
                      

                      {/* photo */}
                      <PhotoWrap>
                          <Photo 
                            pic={portraitID}
                            src={`./me/v${portraitID}/${portrait}.${portraitID !== 1 ? 'jpg': 'png'}`}/>
                      </PhotoWrap>

                      {/* portrait id bubbles */}
                      <PortraitBubbleWrap>
                            {[...Array(2)].map((value,index)=>{
                            return <BubbleBtn 
                                      style={{height: '20px',width:'20px'}}
                                      type={'checkbox'} 
                                      checked={ index===portraitID-1}
                                      key={index} 
                                      currentBuild={currentBuild}
                                      onChange={()=>{}}
                                      // selected={index===bioLength-1}
                                      />
                          })}
                         </PortraitBubbleWrap>
                    </LabelContainer>
                    

                  
                    
                 </PortraitWrap>
                  
                  
               
          </PortraitSection>

        </Wrappper>
    </Container>
  )
}

const Container = styled.section`
    width: 100%;
    display: grid;
    place-items: center;
    z-index: 15;
    overflow: hidden;
    position:relative;
    margin-top: 3rem;
`


const Wrappper = styled.div`
  width: calc(100% - 8rem);
  max-width: 1200px;
  height: 500px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin:  4rem 4rem 0rem 4rem;
  /* background-color: red; */


  @media screen and (max-width: calc(${props => props.theme.breakpoint.md} + 100px)){
        height: min-content;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

    } 

    @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
        width: 100%;
        margin: 4rem auto 1rem auto;
    } 

`

// ///////// BIO STYLES  // /////////

const BioSection = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* overflow: hidden; */

  
   @media screen and (max-width: calc(${props => props.theme.breakpoint.md} + 100px)){
        order: 2;
        margin: 0 1rem;

    } 

`


const AdjusterWrap = styled(motion.div)`
  width: 330px;
  margin-bottom: 2rem;
  margin-top: 4rem;
  
`

const LabelWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;


`


const AdjusterText = styled.h6`
  width: fit-content;
  color: white;
  font-size: .5rem;
  text-align: center;
  margin: auto 8px;
  text-transform: uppercase;

   @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
      font-size: 8px;

    } 
`   


const BubbleWrap = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: .75rem auto;
  margin-top: 1.5rem;

`


const BubbleBtn = styled.input`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    
    /* create custom checkbox appearance */
    display: inline-block;
    width: 25px;
    height: 25px;
    padding: 2px;
    /* background-color only for content */
    background-clip: content-box;
    border: 2px solid ${props=> props.theme[props.currentBuild].accent};
    border-radius: 100%;
    background-color: transparent;
    /* margin: 0 1rem; */
   

    &:checked{
        background-color:  ${props=> props.theme[props.currentBuild].accent};
    }

    &:focus{
        outline: none !important;
    }


     transition: 
          border ${props => props.theme.transitionStyleMid},
          background-color ${props => props.theme.transitionStyleMid},
          transform .3s cubic-bezier(0.39, 0.575, 0.565, 1);
&:hover{
        transform-origin:center;
       transform: translateY(-.2rem) scale(1.1);
    }
`


const BioWrap = styled(motion.div)`
  width: 85%;
  max-width: 475px;
  min-width: 355px;
  height: 300px;

  @media screen and (max-width: calc(${props => props.theme.breakpoint.md} + 100px)){
     height: min-content;
  } 

  @media screen and (max-width: calc(${props => props.theme.breakpoint.xs})){
      min-width: 355px;
  } 

`
const BioText = styled.p`
   width: 100%;

`



// ///////// PORTRAIT STYLES  // /////////

const PortraitSection = styled.div`
    /* width: 350px; */
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    


    @media screen and (max-width: calc(${props => props.theme.breakpoint.md} + 100px)){
        order: 1;
        width: 100%;

    } 

`


const PortraitWrap = styled(motion.div)`
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 535px;
  /* background-color: greenyellow; */
  


    @media screen and (max-width: calc(${props => props.theme.breakpoint.md} + 100px)){
        width: 80%;

    } 

    @media screen and (max-width: ${props => props.theme.breakpoint.xs}){
        width: 160%;
        max-width: none;

    } 
  

`

const PortraitBubbleWrap = styled.div`
  position: absolute;
  height: 30px;
  width:50px;
  right: 15%;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;

  @media screen and (max-width: ${props => props.theme.breakpoint.lg}){
       bottom: -10px;

  } 

`

const CustomSvg = styled.svg`
    position: absolute;
    /* left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); */
    width: 100%;
    height: 100%;
    /* background-color: darkblue; */

`


const CustomPath = styled.path`
    fill: ${props => (props.currentBuild === 0 ? '#A5B091' : props.theme[props.currentBuild].btnText)};
    stroke: black;
    stroke-width: 1px;

    transition: fill ${props => props.theme.transitionStyleMid};
`


const PhotoWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 49.75%;
  transform: translate(-50%, -50%);
  clip-path: polygon(5.5% 0, 100% 0, 93.5% 100%, 0 100%);
  -webkit-clip-path:  polygon(5.5% 0, 100% 0, 93.5% 100%, 0 100%);
  /* border: 1px solid black; */

  width: 78%;
  aspect-ratio: 1.25/1;
  overflow: hidden;
  /* background-color: red; */


  @media screen and (max-width: ${props => props.theme.breakpoint.xs}){
      
    } 
`

const Photo = styled.img`
  height: 100%;
  position: relative;
  object-fit: contain;
  top:  ${props=>(props.pic !== 1 ? '-20%': '-3%')};
  left: 50%;
  transform: translate(-50%,0%) scale(1.5);
`

const LabelContainer = styled.div`
    position: relative;
    width: 115%;
    aspect-ratio: 1.25/1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media screen and (max-width: calc(${props => props.theme.breakpoint.md} + 100px)){
      transform: translate(-50%, 0%);
      width: 100%;
    } 

`

const PortraitLabelWrap = styled(motion.div)`
  position: absolute;
  width: 16%;
  height: 4.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;

  /* border: 1px solid black; */

  /* top: 50%;
  left: 50%;
  transform: translate(); */
  background-color:  ${props=> props.theme[props.currentbuild].btn};
   transition:  background-color ${props => props.theme.transitionStyleMid};
  
  ${props => props.bottom !== 'true' ? `
    clip-path: polygon(28.5% 0%, 71.5% 0%, 100% 100%, 0% 100%);
    -webkit-clip-path: polygon(28.5% 0%, 71.5% 0%, 100% 100%, 0% 100%);
    top: 2.5%;
    right: 25%;
  
  ` : `
    clip-path: polygon(0% 0%, 100% 0%, 71.5% 100%, 28.5% 100%);
    -webkit-clip-path:  polygon(0% 0%, 100% 0%, 71.5% 100%, 28.5% 100%);
    bottom: 2.5%;
    left: 25%;
  
  `}
`



const Label = styled.h6`
  color:  ${props=> props.theme[props.currentBuild].btnText};
  text-transform: uppercase;
  font-size: .6rem;
  margin-bottom: .1rem;

   -webkit-text-stroke-width: ${props => (props.currentBuild !== 1 ? '.2px' : '0')};
  -webkit-text-stroke-color:  ${props => (props.currentBuild !== 1 ? 'black' : '')};

  transition:  color ${props => props.theme.transitionStyleMid};
  

   @media screen and (max-width: ${props => props.theme.breakpoint.md}){
        font-size: .5rem;

    } 

    

`