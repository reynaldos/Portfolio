import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';


const loadTime = process.env.REACT_APP_LOADING_TIME;

export const MouseCursor = ({})=>{
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });
    
    useEffect(() => {
        const mouseMove = e => {
            setMousePosition({
            x: e.clientX,
            y: e.clientY
            })
        }

        setTimeout(() => {
            window.addEventListener("mousemove", mouseMove);
        }, loadTime);
       
        return () => {
            window.removeEventListener("mousemove", mouseMove);
        }
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 5,
            y: mousePosition.y - 5,
        },
        frame: {
            x: mousePosition.x - 25,
            y: mousePosition.y - 25,

        }
    }

    return(<>
        <MouseFrame
            animate={"frame"}
            variants={variants}>
            <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" style={{left: '234.025px',top: `12.0255px`}}>
                <path d="M33 1h13a3 3 0 013 3v13h0m0 16v6.653a3 3 0 01-1.007 2.242L40 49h0-8m-15 0H4a3 3 0 01-3-3V33h0m0-15v-7.757a3 3 0 01.879-2.122L9 1h8" 
                stroke="#fff" strokeWidth="1.5" fill="none" fillRule="evenodd"></path></svg>
        </MouseFrame>
        <MouseDot 
            animate={"default"}
            variants={variants}/>
        </>

    )
}


const MouseDot = styled(motion.div)`
    position: fixed;
    z-index: 200;
    pointer-events: none;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fffe;

    filter: drop-shadow(0px 0px 4px #000);
    -webkit-filter: drop-shadow(0px 0px 4px #000);
     will-change: filter;
`
const MouseFrame = styled(motion.div)`
    position: fixed;
    z-index: 200;
    pointer-events: none;
    transform: translate(-50%, -50%);
    /* transition: width .3s,height .3s; */
    transition: all .08s;

    filter: drop-shadow(0px 0px 4px #000);
    -webkit-filter: drop-shadow(0px 0px 4px #000);
     will-change: filter;

`




//  <div data-v-bbd3cb88="" data-v-60734246="" class="cursor morphed" style="opacity: 1;">
//         <svg 
//         data-v-bbd3cb88="" width="50" height="50" 
//         xmlns="http://www.w3.org/2000/svg" class="outline" 
//         style="left: 514px; top: 474px;">
//             <path data-v-bbd3cb88=""
//              d="M33 1h13a3 3 0 013 3v13h0m0 16v6.653a3 3 0 01-1.007 2.242L40 49h0-8m-15 0H4a3 3 0 01-3-3V33h0m0-15v-7.757a3 3 0 01.879-2.122L9 1h8" 
//              stroke="#transitionStyleTop" stroke-width="1.5" fill="none" fill-rule="evenodd">

//              </path>
//              </svg> 

//         <div data-v-bbd3cb88="" class="dot_wrapper" style="left: 514px; top: 474px;">
//             <div data-v-bbd3cb88="" class="dot">
//                 </div> 
//             <p data-v-bbd3cb88=""></p>
//         </div>
//     </div>