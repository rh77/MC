import { Component } from '../component';
import template from './slider-view.pug';
import _ from './slider-view.scss';

export class SliderView extends Component {

  constructor(data) {
    super(data);
  }

  render() {

    this._el.innerHTML = template();
  }
}
