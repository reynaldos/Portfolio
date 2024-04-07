import React from 'react';

import styled from 'styled-components';

import ProjectBuild from './projectBuild/v2'


const ProjectGrid = ({ projects, currentBuild }) => {
  return (
    <GridWrap>
      {projects.map((project, index) => {
        return (
          <ProjectBuild
            key={index}
            project={project}
            currentBuild={currentBuild}
            type={'grid'}
          />
        );
      })}
    </GridWrap>
  );
};

export default ProjectGrid




const GridWrap = styled.div`
  width: calc(100% - 8.5rem);
  max-width: 1200px;
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center; */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(355px, 1fr));
  height: auto;
  row-gap: 8px;
  column-gap: 8px;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    width: calc(100% - 1rem);
  }
`;
