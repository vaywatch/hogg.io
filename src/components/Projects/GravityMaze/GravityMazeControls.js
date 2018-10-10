import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Base, Input, Text } from 'preshape';

export default class GravityMazeControls extends Component {
  static propTypes = {
    config: PropTypes.shape({
      ballMass: PropTypes.number.isRequired,
      ballRestitution: PropTypes.number.isRequired,
      density: PropTypes.number.isRequired,
      drag: PropTypes.number.isRequired,
      gravity: PropTypes.number.isRequired,
      pathSize: PropTypes.number.isRequired,
    }).isRequired,
    onConfigChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      ballMass: props.config.ballMass,
      ballRestitution: props.config.ballRestitution,
      density: props.config.density,
      drag: props.config.drag,
      gravity: props.config.gravity,
      pathSize: props.config.pathSize,
    };
  }

  handleNumberChange(event, prop, min = -Infinity, max = Infinity) {
    const { value } = event.target;
    const number = Math.max(min, Math.min(max, parseFloat(value)));

    this.setState({ [prop]: value });

    if (!isNaN(number)) {
      this.props.onConfigChange({ [prop]: number });
    }
  }

  render() {
    const {
      ballMass,
      ballRestitution,
      density,
      drag,
      gravity,
      pathSize,
    } = this.state;

    return (
      <Fragment>
        <Base margin="x8">
          <Text margin="x4" strong>Physics</Text>
          <Input
              label="Density"
              margin="x2"
              onChange={ (e) => this.handleNumberChange(e, 'density', 0, 0.01) }
              placholder="Density..."
              step="0.001"
              type="number"
              value={ density } />

          <Input
              label="Drag"
              margin="x2"
              onChange={ (e) => this.handleNumberChange(e, 'drag', 0, 0.01) }
              placholder="Drag..."
              step="0.001"
              type="number"
              value={ drag } />

          <Input
              label="Gravity"
              margin="x2"
              onChange={ (e) => this.handleNumberChange(e, 'gravity', 0, 1) }
              placholder="Gravity..."
              step="0.1"
              type="number"
              value={ gravity } />
        </Base>

        <Base margin="x8">
          <Text margin="x4" strong>Ball Properties</Text>
          <Input
              label="Ball Mass"
              margin="x2"
              onChange={ (e) => this.handleNumberChange(e, 'ballMass', 0, 1) }
              placholder="Ball Mass..."
              step="0.1"
              type="number"
              value={ ballMass } />
          <Input
              label="Ball Restitution"
              margin="x2"
              onChange={ (e) => this.handleNumberChange(e, 'ballRestitution', 0, 1) }
              placholder="Ball Restitution..."
              step="0.1"
              type="number"
              value={ ballRestitution } />
        </Base>

        <Base margin="x8">
          <Text margin="x4" strong>Maze Properties</Text>
          <Input
              label="Maze Path Size"
              margin="x2"
              onChange={ (e) => this.handleNumberChange(e, 'pathSize', 16, 32) }
              placholder="Maze Path Size..."
              step="4"
              type="number"
              value={ pathSize } />
        </Base>
      </Fragment>
    );
  }
}
