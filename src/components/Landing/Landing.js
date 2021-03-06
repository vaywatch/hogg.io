import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  transitionTimeFast,
  Appear,
  Base,
  Flex,
  Icon,
  Link,
  List,
  ListItem,
  Text,
} from 'preshape';
import ProjectsTable, { projectTableTransitionTime } from '../ProjectsTable/ProjectsTable';

export default class Landing extends Component {
  static propTypes = {
    onLand: PropTypes.func.isRequired,
    visited: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      delay: !props.visited,
    };
  }

  componentDidMount() {
    this.props.onLand();
  }


  render() {
    const { delay } = this.state;

    return (
      <Flex
          alignChildrenHorizontal="middle"
          direction="horizontal"
          grow
          paddingVertical="x12">
        <Flex
            initial="none"
            maxWidth="34rem"
            paddingHorizontal="x4"
            paddingVertical="x8"
            width="auto">
          <Flex direction="horizontal" margin="x16">
            <Flex grow initial="none">
              <Appear
                  Component={ Text }
                  margin="x2"
                  size="x5"
                  strong>
                Hi.
              </Appear>

              <Appear
                  Component={ Text }
                  delay={ delay ? transitionTimeFast * 1 : 0 }
                  margin="x2"
                  size="x5"
                  strong>
                I'm Harrison Hogg, a Frontend Developer from Brighton, UK.
              </Appear>

              <Appear
                  Component={ Text }
                  delay={ delay ? transitionTimeFast * 2 : 0 }
                  margin="x4"
                  size="x3">
                Here's a collection of my professional experience and personal
                side projects.
              </Appear>
            </Flex>
          </Flex>

          <Base margin="x16">
            <ProjectsTable delay={ delay ? transitionTimeFast * 3 : 0 } />
          </Base>

          <Appear delay={ delay ? (transitionTimeFast * 3) + projectTableTransitionTime : 0 } margin="x16">
            <Flex direction="horizontal">
              <Flex grow initial="none">
                <Text margin="x3" size="x3" strong>About Me</Text>
                <Text margin="x3">I love every single part of software development but
                  most of my time is spent looking at Design Systems and
                  Pattern Libraries but I've spent a lot of time working on both
                  the frontend and backend.</Text>

                <Text margin="x3">I'm interested in your standard nerdy topics
                  like astronomy, maths, science, quirky history, anything futurology
                  but I frequently dip into my creative side with some design.</Text>

                <Text margin="x3">I studied at <Link href="https://www.open.ac.uk/" underline>The Open University</Link> where
                  I received my BSc Computing and Design Honours degree.</Text>

                <Text margin="x3">When I'm not stringing characters together, I'm
                  a less than stable climbing frame for my two daughters.</Text>

                <List alignChildren="middle" gap="x3" margin="x12">
                  <ListItem separator="~">
                    <Link href="https://github.com/HHogg">
                      <Icon name="Github" size="1.5rem" />
                    </Link>
                  </ListItem>
                </List>
              </Flex>
            </Flex>
          </Appear>
        </Flex>
      </Flex>
    );
  }
}
