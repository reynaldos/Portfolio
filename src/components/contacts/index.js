import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';

import bgDesktop from './contactBG_desktop.svg';
import bumpersdesktop from './bumpers_desktop.svg';
import bgMobile from './contactBG_mobile.svg';
import bumpersMobile from './bumpers_mobile.svg';


export const Contact = () => {

  const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY
  const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 767);

  const form = useRef();

  useEffect(()=>{
    const checkSize = (e) =>{
      if (window.innerWidth > 767) {setIsDesktop(true);}
      else  {setIsDesktop(false);}
    }

    window.addEventListener('resize',checkSize);

    return ()=>{window.removeEventListener('resize',checkSize);} 
  },[]);


  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const result = await emailjs.sendForm(serviceID, templateID, form.current, publicKey);
      // console.log(result.text);
      form.current.reset();

    } catch (error) {
      console.log(error.text);
    }
    
  };

  return (
    <Container>
      <Wrapper>

        {isDesktop ?
        <>
          <BG src={bgDesktop}/>
          <BG src={bumpersdesktop}/>
        </> : <>
          <BG src={bgMobile}/>
          <BG src={bumpersMobile}/>
        </>}

        <FormWrap ref={form} onSubmit={sendEmail}>
            <h3>New message to Rey</h3>
            <span>
              {/* from field */}
              <InputWrap>
                  <span style={{position: 'absolute', pointerEvents:'none'}}>From:</span>
                  <input type='email' name='user_email' placeholder='john@gmail.com' required></input>
              </InputWrap>  

              {/* to field */}
              <InputWrap>
                 <span>To: Rey Sanchez</span>
              </InputWrap> 
            </span>

            <span>
              {/* subject field */}
              <InputWrap>
                <select name='subject' defaultValue={'Please select a topic...'} required>
                    <option value="">Please select a topic...</option>
                    <option value="I have a cool project idea">I have a cool project idea</option>
                    <option value="I want to connect">I want to connect</option>
                    <option value="I have a random question">I have a random question</option>
                    <option value="Other">Other</option>
                  </select>
              </InputWrap>  
            </span>

            <span>
              {/* message field */}
              <InputWrap>
                <textarea 
                  required
                  placeholder='Your message here...'
                  name="message">
                  </textarea>
              </InputWrap>  
            </span>
            
            {/* submit btn */}
            <SendBtn type='submit' value={'send'}><h2>Send</h2></SendBtn>
        </FormWrap>

         
      </Wrapper>
    </Container>
  )
}


const Container = styled.section`
  /* outline: 3px solid red; */
  
  width: 100%;
  height: 100%;
  max-width: 800px;
  aspect-ratio: 1.48;


  @media screen and (max-width: ${props => props.theme.breakpoint.md}){
      aspect-ratio: 0.77;
  } 

   @media screen and (max-width: ${props => props.theme.breakpoint.xs}){
      width: 125%;
  } 
  
`

const Wrapper = styled.div`
  /* outline: 2px solid blue; */

   position: relative;
   margin: auto;
   width: 100%;
   height: 100%;

  @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
      width: calc(100% - 2rem);
  } 

   @media screen and (max-width: ${props => props.theme.breakpoint.xs}){
      /* width: 120%; */

  } 


`

const BG = styled.img`
    /* outline: 1px solid limegreen; */
    object-fit: contain;
    width: 100%;
    height: 100%;


    &:nth-child(2){
      position: absolute;
      top: 0;
      left: 0;
    }
`


const FormWrap = styled.form`
  /* outline: 2px solid white; */

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 82%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  
  /* outline: hotpink 1px solid; */


 @media screen and (max-width: ${props => props.theme.breakpoint.md}){
    width: 80%;
    height: 85%;
  } 

  @media screen and (max-width: ${props => props.theme.breakpoint.xs}){
      height: 80%;
  } 


  h3{
    /* outline: 1px solid aquamarine; */

    font-family: 'DesignerGenes', 'Courier New Bold', Courier, monospace;
    font-weight: normal;
    font-size:1rem;
    line-height: 1.4rem;
    letter-spacing: .1rem;
    /* vertical-align: center; */

    width: 100%;
    height: 24px;
    color: #BCD167;
    
    ::after, ::before{
      content: "";
      height: 20px;
      width: 30px;
      border: #BCD167 2px solid;
      border-radius: 1.5px;

      position: absolute;
    }
    ::before{ left: 0; }
    ::after{ right: 0; }

    @media screen and (max-width: ${props => props.theme.breakpoint.md}){
      font-size: .5rem;
      letter-spacing: .1rem;
    } 

  }



  span{
    width: 100%;
    height: 32px;
    display: flex;
    gap: 5px;
    justify-content: space-between;

    &:nth-child(4){
      height: max-content;
      flex-grow: 2;
    }
    
  }
`

const InputWrap = styled.div`
  position: relative;
  background-color: #BCD16724;
  width: 100%;
  height: 100%;;
  border: #BCD16744 2px solid;
  border-radius: 1.5px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: .5rem;

  color: #BCD167;
  font-weight: bold;
  font-family: 'Helvetica';


  input, textarea, span, select{
    color: #BCD167;
    font-weight: bold;
    font-family: 'Helvetica';
    
    height: calc(100% - 1rem);
    width: calc(100% - 1rem);
    padding: .5rem;
    transition: all ease-in-out .15s;

    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    background-color: transparent;
    resize: none;

    &::placeholder{
      font-weight: normal;
      color: #BCD167;
      font-family: 'Helvetica';
      filter: brightness(70%);
      -webkit-filter: brightness(70%);
    }
  }

  input[type=email]{
    padding: .5rem 3.75rem;
    width: calc(100% - 7.5rem);
    }

  &:hover{
    border: #BCD167 2px solid;
  }

  &:nth-child(2){
    &:hover{
    border: #BCD16744 2px solid;
    }

    @media screen and (max-width: ${props => props.theme.breakpoint.xs}){
     display: none;
    } 
  }

  input:focus, textarea:focus, select:focus {
    -webkit-box-shadow:0px 0px 10px 2px rgba(188,209,103,0.4);
    -moz-box-shadow: 0px 0px 10px 2px rgba(188,209,103,0.4);
    box-shadow: 0px 0px 10px 2px rgba(188,209,103,0.4);
  }


select{
    height: 100%;
    width: 100%;
  }

`


const SendBtn = styled.button`
    border: none;
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 5;
    height: min-content;
    padding: .6rem 1rem;
    background-color: #BCD167;
    transition: 
      transform .25s ease;
    border-radius: 1.5px;
    /* width: 25%; */

    &:hover{
        transform-origin:center;
        transform: scale(1.05);
    }


   h2{
    width: min-content;
    margin: auto;
    text-transform: uppercase;
    font-size: .75rem;
    line-height: .75rem;
    text-align: center;
    color: #221A2B;
    
   }


`

