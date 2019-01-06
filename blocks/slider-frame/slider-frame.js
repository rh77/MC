import { Component } from '../component';
import template from './slider-frame.pug';
import _ from './slider-frame.scss';

export class SliderFrame extends Component {

  constructor(data) {
    super(data);
  }

  render() {

    this._el.innerHTML = template();
  }
}
