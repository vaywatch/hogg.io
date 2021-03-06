/* eslint-disable react/no-find-dom-node */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import { Flex, Text } from 'preshape';
import './Element.css';

export default class Element extends Component {
  static propTypes = {
    active: PropTypes.bool,
    code: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    number: PropTypes.number,
    onClick: PropTypes.func,
    size: PropTypes.string.isRequired,
  };

  static defaultProps = {
    size: '6rem',
  };

  render() {
    const {
      active,
      code,
      disabled,
      name,
      number,
      onClick,
      size,
    } = this.props;

    const classes = classnames('Element', {
      'Element--active': active,
      'Element--disabled': disabled,
      'Element--inactive': !active,
    });

    return (
      <Flex
          borderColor
          borderSize="x2"
          className={ classes }
          clickable={ !disabled && !!onClick }
          container
          direction="vertical"
          height={ size }
          onClick={ disabled ? null : onClick }
          padding="x2"
          width={ size }>
        <Flex grow><Text align="end" size="x1">{ number }</Text></Flex>
        <Flex><Text size="x5" strong>{ code }</Text></Flex>
        { name && <Flex><Text size="x1">{ name }</Text></Flex> }
      </Flex>
    );
  }
}
