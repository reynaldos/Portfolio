import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Navigation } from "swiper/modules";
import ProjectBuild from "./projectBuild/v2";

import styled from "styled-components";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProjectSwiper = ({ projects, currentBuild }) => {



  return (
    <SwiperWrap>
      <StyledSwiper
        modules={[Navigation, Mousewheel, Autoplay]}
        navigation={{
          prevEl: ".prev",
          nextEl: ".next",
        }}
        loop={true}
        autoplay={{
          delay: 20000,
        }}
        slidesPerView={1}
        spaceBetween={"20px"}
        lazyPreloadPrevNext={1}
        mousewheel={{
          forceToAxis: true,
        }}
        breakpoints={{
          // when window width is >= 850
          850: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 1200
          1200: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {projects.map((project, index) => (
          <StyledSwiperSlide key={index}>
            <ProjectBuild project={project} currentBuild={currentBuild} />
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>

      <BtnWrap>
        <button aria-label={`Show previous project`} className="prev">
          <h2>{"<"}</h2>
        </button>

        <button aria-label={`Show next project`} className="next">
          <h2>{">"}</h2>
        </button>
      </BtnWrap>
    </SwiperWrap>
  );
};

export default ProjectSwiper;

const SwiperWrap = styled.div`
  min-height: 400px;
  width: calc(100% - 8.5rem);
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow-x: hidden;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    width: calc(100% - 1rem);
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
`;

const StyledSwiperSlide = styled(SwiperSlide)`

`;

const BtnWrap = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 16px;

  button {
    min-width: 56px;
    min-height: 56px;
    outline: none;
    border: none;

    h2 {
      position: relative;
      top: -2px;
      color: #bcd167;
      width: 100%;
    }

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #221a2b;
    border-radius: 2;
    clip-path: polygon(0 28%, 50% 0, 100% 28%, 100% 72%, 50% 100%, 0 72%);
    -webkit-clip-path: polygon(
      0 28%,
      50% 0,
      100% 28%,
      100% 72%,
      50% 100%,
      0 72%
    );
  }
`;
