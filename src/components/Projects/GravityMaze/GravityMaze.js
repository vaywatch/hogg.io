import React, { Component } from 'react';
import { Bounds, Flex, ThemeContext } from 'preshape';
import { widthMedium } from '../../Root';
import Project from '../../Project/Project';
import GravityMazeControls from './GravityMazeControls';
import GravityMazeVisual from './GravityMazeVisual';

export default class GravityMaze extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ballMass: 0.1,
      ballRestitution: -0.7,
      density: 1.22,
      drag: 0.47,
      gravity: 9.81,
      pathSize: 32,
    };
  }

  render() {
    return (
      <Project { ...this.props } maxWidth={ widthMedium }>
        <Flex direction="horizontal" grow gutter="x8">
          <Bounds
              Component={ Flex }
              container
              grow
              minHeight="37.5rem">
            { ({ width, height }) => (
              width !== undefined && height !== undefined && (
                <ThemeContext.Consumer>
                  { ({ theme }) => (
                    <GravityMazeVisual
                        config={ this.state }
                        height={ height }
                        theme={ theme }
                        width={ width } />
                  ) }
                </ThemeContext.Consumer>
              )
            ) }
          </Bounds>

          <Flex>
            <GravityMazeControls
                config={ this.state }
                onConfigChange={ (config) => this.setState(config) } />
          </Flex>
        </Flex>
      </Project>
    );
  }
}
