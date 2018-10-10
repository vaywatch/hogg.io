import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Two from 'two.js';
import { themes, Appear, Flex } from 'preshape';
import Maze from './Maze';
import getLineRectIntersection from './getLineRectIntersection';
import moveEvent from '../../../utils/moveEvent';
import {
  createCircle,
  createRectangle,
  onMouseDownGlobal,
  onMouseUpGlobal,
} from '../../../utils/Two';

const delta = (n) => n / Math.abs(n);

export default class GravityMazeVisual extends Component {
  static propTypes = {
    config: PropTypes.shape({
      ballMass: PropTypes.number.isRequired,
      ballRestitution: PropTypes.number.isRequired,
      density: PropTypes.number.isRequired,
      drag: PropTypes.number.isRequired,
      gravity: PropTypes.number.isRequired,
      pathSize: PropTypes.number.isRequired,
    }).isRequired,
    height: PropTypes.number.isRequired,
    theme: PropTypes.string,
    width: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      width: '100%',
      height: '100%',
    };
  }

  componentDidMount() {
    const { height, width } = this.props;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('touchend', this.handleMouseUp);
    document.body.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    document.addEventListener('touchstart', this.handleMouseDown);

    this.two = new Two({
      autostart: true,
      type: 'CanvasRenderer',
      height: height,
      width: width,
    }).appendTo(this.container);

    this.init();
  }

  componentDidUpdate(prevProps) {
    const {
      config,
      height,
      theme,
      width,
    } = this.props;

    if (height !== prevProps.height ||
          width !== prevProps.width ||
          config.pathSize !== prevProps.config.pathSize) {
      this.uninit();
      this.init();
    } else if (theme !== prevProps.theme) {
      this.draw();
    }
  }

  componentWillUnmount() {
    this.uninit();

    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('touchend', this.handleMouseUp);
    document.body.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchstart', this.handleMouseDown);
  }

  init() {
    const { config, width, height } = this.props;

    this.maze = new Maze(width, height, { size: config.pathSize });

    this.two.renderer.setSize(this.maze.width, this.maze.height);
    this.two.width = this.two.renderer.width;
    this.two.height = this.two.renderer.height;

    this.initBall();
    this.draw();

    this.two.on('update', this.handleUpdate);
  }

  initBall() {
    const { config } = this.props;

    this.r = (config.pathSize / 4);
    this.vx = 5;
    this.vy = 0;
    [this.x, this.y] = this.maze.getCellCenter(0, 0);
  }

  uninit() {
    this.two.off('update', this.handleUpdate);
  }

  getRelativeCoordinates(x, y) {
    const { left, top } = this.two.renderer.domElement.getBoundingClientRect();

    return {
      containerX: left,
      containerY: top,
      x: x - left,
      y: y - top,
    };
  }

  handleUpdate(frameCount, timeDelta) {
    /**
     * FD,x = -0.5 * CD * A * p * vx2
     * FD,y = -0.5 * CD * A * p * vy2
     *
     * A,x = Agx + (Fx / m)
     * A,y = Agy + (Fy / m)
     */

    if (!this.isMouseDown) {
      const {
        ballMass: m,
        ballRestitution: b,
        density: p,
        drag: CD,
        gravity: Agy,
      } = this.props.config;

      const deltaVx = delta(this.vx);
      const deltaVy = delta(this.vy);

      const A = (Math.PI * this.r ** 2) / 10000;
      const Fdx = (-0.5 * CD * A * p * this.vx * this.vx * deltaVx) || 0;
      const Fdy = (-0.5 * CD * A * p * this.vy * this.vy * deltaVy) || 0;
      const Ax = 0 /* Agx */ + (Fdx / m);
      const Ay = Agy + (Fdy / m);
      let intersection;

      const x1 = this.x;
      const y1 = this.y;
      const x2 = this.x += (this.vx += Ax * (timeDelta / 1000));
      const y2 = this.y += (this.vy += Ay * (timeDelta / 1000));

      const rx = this.r * deltaVx;
      const ry = this.r * deltaVy;

      for (const { x, y, width, height } of this.maze.rects) {
        if ((intersection = getLineRectIntersection(x1 + rx, y1 + ry, x2 + rx, y2 + ry, x, y, width, height))) {
          console.log(intersection);
          // this.x = intersection[0];
          // this.y = intersection[1];
        }
      }
    }

    this.ballShape.translation.set(this.x, this.y);
  }

  handleMouseDown({ clientX, clientY }) {
    const { x, y } = this.getRelativeCoordinates(clientX, clientY);

    this.isMouseDown = true;
    this.x = x;
    this.y = y;
    onMouseDownGlobal();
  }

  handleMouseUp({ clientX, clientY }) {
    const { x, y } = this.getRelativeCoordinates(clientX, clientY);

    this.isMouseDown = false;
    this.vx = (this.x - x);
    this.vy = (this.y - y);
    onMouseUpGlobal();
  }

  handleMouseMove(event) {

  }

  handleTouchMove(event) {
    if (event.target === this.two.renderer.domElement) {
      event.preventDefault();
    }
  }

  draw() {
    const { theme } = this.props;

    this.two.add(createRectangle({
      fill: themes[theme].colorBackgroundShade2,
      height: this.maze.height,
      width: this.maze.width,
      x: 0,
      y: 0,
    }));

    this.maze.rects.forEach(({ x, y, height, width }) => {
      this.two.add(createRectangle({
        fill: themes[theme].colorTextShade1,
        height: height,
        width: width,
        x: x,
        y: y,
      }));
    });

    this.two.add(this.ballShape = createCircle({
      fill: themes[theme].colorAccentShade2,
      radius: this.r,
      x: this.x,
      y: this.y,
    }));
  }

  render() {
    return (
      <Appear Component={ Flex }
          absolute="fullscreen"
          alignChildrenHorizontal="start"
          alignChildrenVertical="middle"
          animation="Fade"
          clickable
          direction="vertical"
          onMouseDown={ (e) => this.handleMouseMove(moveEvent(e)) }
          onMouseMove={ (e) => this.handleMouseMove(moveEvent(e)) }
          onTouchMove={ (e) => this.handleMouseMove(moveEvent(e)) }
          onTouchStart={ (e) => this.handleMouseMove(moveEvent(e)) }
          ref={ (container) => this.container = findDOMNode(container) }
          time="base" />
    );
  }
}
