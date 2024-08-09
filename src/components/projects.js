import React, { useState } from "react";
import styled from "styled-components";

import SwiperIcon from "../icons/view_swiper.js";
import GridIcon from "../icons/view_grid.js";

import { BuildStyles } from "../ThemeContext.js";

import ProjectSwiper from "./projectSwiper.js";
import ProjectGrid from "./projectGrid.js";

const projects = [
  {
    id: -2,
    title: "Service.ly",
    subtitle: "HVAC Digital Media Manager",
    image: "./mockups/servicely2.png",
    codestack: ["next.js", "AWS", "Contentful", "UI design"],
    link: "https://hub.service.ly/",
    side: "left",
    type: "work",
  },
  {
    id: -1,
    title: "Clari's Cleaning ",
    subtitle: "Maid Service Storefront",
    image: "./mockups/claris_cleaning.png",
    codestack: ["next.js", "Firebase", "UI design", "Figma"],
    link: "https://www.clariscleaning.com/",
    side: "right",
    type: "work",
  },
  {
    id: 1,
    title: "GAT NFT",
    subtitle: "Immersive Web3 Dapp",
    image: "./mockups/gat_mockup.png",
    codestack: ["react", "node.js", "three.js", "firebase"],
    link: "https://godsandtitans.io/",
    side: "left",
    type: "work",
  },
  {
    id: 0,
    title: `KennyCuts`,
    subtitle: "Baber Portfolio",
    image: "./mockups/kenymock.png",
    codestack: ["React", "UI design", "Figma"],
    link: "https://www.thekennycuts.com/",
    side: "right",
    type: "work",
  },
  // {
  //     id: 0,
  //     title: 'VRNL - Video Sharing Social Media Platform',
  //     image: './mockups/vrnl_mockup.png',
  //     codestack: ['react','node.js','mongo DB','express'],
  //     link: 'https://vrnl.vercel.app/',
  //     side: 'right'
  //  type: 'personal'

  // },

  {
    id: 3,
    title: "Mugen Manga",
    subtitle: "Cross Platform Manga Reader",
    image: "./mockups/mugen_manga_mockup.png",
    codestack: ["flutter", "firebase", "UI design"],
    link: "https://reynaldos.github.io/reynaldos-github.io/#/",
    // link: 'https://reynaldos.github.io/manga_reader_web/',
    side: "left",
    type: "personal",
  },

  {
    id: 2,
    title: "TYGR NFT",
    subtitle: "Web3 Dapp",
    image: "./mockups/tygr_mockup.png",
    codestack: ["next.js", "UI design", "Figma"],
    link: "https://tygr-dev-mu.vercel.app",
    side: "right",
    type: "work",
  },
];

export const Projects = ({ currentBuild }) => {
  const [currentTab, setCurrentTab] = useState("all");
  const [currentView, setCurrentView] = useState("swiper");

  const tabs = [
    {
      label: "All",
      type: "all",
    },
    {
      label: "Experience",
      type: "work",
    },
    {
      label: "My Projects",
      type: "personal",
    },
  ];

  const views = [
    {
      name: "swiper",
      icon: <SwiperIcon color={BuildStyles[currentBuild].accent} />,
    },
    {
      name: "grid",
      icon: <GridIcon color={BuildStyles[currentBuild].accent} />,
    },
  ];

  const filterProjects = projects.filter(
    (project) => project.type === currentTab || currentTab === "all"
  );

  return (
    <Container id="work">
      <SectionTitle>
        <h2> {`<WORK />`}</h2>
      </SectionTitle>
      <ToggleBar currentbuild={currentBuild}>
        <div>
          {tabs.map((tab, index) => (
            <button
              key={index}
              data-isactive={tab.type === currentTab}
              onClick={() => {
                setCurrentTab(tab.type);
              }}
            >
              <h3> {tab.label}</h3>
            </button>
          ))}
        </div>
        <div>
          <h3>View by: </h3>

          <span className="viwBtns">
            {views.map((view, index) => (
              <button
                onClick={() => {
                  setCurrentView(view.name);
                }}
                key={index}
                data-isactive={view.name === currentView}
              >
                {view.icon}
              </button>
            ))}
          </span>
        </div>
      </ToggleBar>

      {currentView === "swiper" ? (
        <ProjectSwiper currentBuild={currentBuild} projects={filterProjects} />
      ) : (
        <ProjectGrid currentBuild={currentBuild} projects={filterProjects} />
      )}
    </Container>
  );
};

const Container = styled.section`
  min-height: 700px;
  width: 100%;
  display: grid;
  place-items: center;
  z-index: 15;
  overflow-x: hidden;
  position: relative;
`;

const SectionTitle = styled.div`
  width: calc(100% - 8rem);
  max-width: 1200px;
  margin: 4rem auto 1rem auto;

  h2 {
    position: relative;
    left: 120px;
    font-size: 32px;
    text-transform: uppercase;
    color: white;

    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      left: 40px;
    }
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.xs}) {
    h2 {
      left: 0px;
    }
  }
`;

const ToggleBar = styled.div`
  margin-top: 16px;
  width: calc(100% - 8.5rem);
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: fit-content;

  @media screen and (max-width: 680px) {
    width: calc(100% - 2rem);
    justify-content: center;
    gap: 16px;
  }

  button {
    background: transparent;
    outline: none;
    border: none;
  }

  h3 {
    font-size: 1rem;
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    padding-top: 0.05rem;
    letter-spacing: 0px;
    -webkit-transform: unset;
    -moz-transform: unset;
    -o-transform: unset;
    transform: unset;

    color: ${(props) => props.theme[props.currentbuild].accent};
    transition: font-size 0.1s ease,
      color ${(props) => props.theme.transitionStyleMid},
      letter-spacing 0.3s ease-in;
  }

  /* tabs */
  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 16px;

    @media screen and (max-width: 680px) {
      justify-content: center;
      width: 100%;
      gap: 24px;
    }

    button {
      border-bottom: 2px solid transparent;

      transition: font-size 0.1s ease,
        border ${(props) => props.theme.transitionStyleBottom},
        letter-spacing 0.3s ease-in;
    }

    button[data-isactive="true"] {
      border-bottom: 2px solid
        ${(props) => props.theme[props.currentbuild].accent};
    }
  }

  /* view by */
  & > div:last-child {
    height: fit-content;
    display: flex;
    align-items: center;
    gap: 8px;

    .viwBtns {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: fit-content;

      button {
        height:54px;
        border: 2px solid transparent;
        border-radius: 1.5px;

        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          path {
            transition: fill ${(props) => props.theme.transitionStyleBottom};
          }
        }
      }

      button[data-isactive="true"] {
        border: 2px solid ${(props) => props.theme[props.currentbuild].accent};
      }
    }
  }
`;
