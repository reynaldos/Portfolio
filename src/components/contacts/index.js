import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import bgDesktop from './contactBG_desktop.svg';
import bumpersdesktop from './bumpers_desktop.svg';
import bgMobile from './contactBG_mobile.svg';
import bumpersMobile from './bumpers_mobile.svg';



export const Contact = () => {

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 767);

  useEffect(()=>{
    const checkSize = (e) =>{
      if (window.innerWidth > 767) {setIsDesktop(true);}
      else  {setIsDesktop(false);}
    }

    window.addEventListener('resize',checkSize);

    return ()=>{window.removeEventListener('resize',checkSize);} 
  },[])

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

        <FormWrap>
            <h3>New message to Rey</h3>
            <span>
              {/* from field */}
              <InputWrap>
                  <span style={{position: 'absolute', pointerEvents:'none'}}>From:</span>
                  <input type='email' name='email' placeholder='john@doe.com'></input>
              </InputWrap> 

              {/* to field */}
              <InputWrap>
                 <span>To: Rey Sanchez</span>
              </InputWrap> 
            </span>

            <span>
              {/* subject field */}
              <InputWrap>
                <select name='topics' defaultValue={'Please select a topic...'}>
                    <option value="defaultValue">Please select a topic...</option>
                    <option value="project">I have a cool project idea</option>
                    <option value="connect">I want to connect</option>
                    <option value="question">I have a random question</option>
                    <option value="ther">Other</option>
                  </select>
              </InputWrap>  
            </span>

            <span>
              {/* message field */}
              <InputWrap>
                <textarea 
                  placeholder='Your message here...'
                  name="message">
                  </textarea>
              </InputWrap>  
            </span>
            
            {/* submit btn */}
            <SendBtn type=''><h2>Send</h2></SendBtn>
        </FormWrap>

         
      </Wrapper>
    </Container>
  )
}


const Container = styled.section`
  /* outline: 1px solid red; */
  width: 100%;
  max-width: 800px;
  display: grid;
  place-content: center;
  margin: 1rem auto; 

`

const Wrapper = styled.div`
   position: relative;
   margin: auto;
   width: calc(100%);
   height: 100%;

  @media screen and (max-width: ${props => props.theme.breakpoint.sm}){
      width: calc(100% - 2rem);
  } 


`

const BG = styled.img`
    object-fit: contain;
    width: 100%;


    &:nth-child(2){
      position: absolute;
    top: 0;
    left: 0;
    }
`


const FormWrap = styled.form`
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


  h3{
    
    width: 100%;
    height: 24px;
    color: #BCD167;
    font-size: 20px;
    line-height: 24px;
    

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
  }

  &:hover{
    border: #BCD167 2px solid;
  }

&:nth-child(2){
  &:hover{
   border: #BCD16744 2px solid;
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

