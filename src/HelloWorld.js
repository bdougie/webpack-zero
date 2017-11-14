import React from 'react';
import {cube} from './lib/math';

export default class HelloWorld extends React.Component {
  render() {
    const cubed = cube(6);
    return <h1>Hello, `${cubed}` World!</h1>;
  }
}
