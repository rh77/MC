import { Component } from '../component';
import template from './prediction-sign.pug';
import _ from './prediction-sign.scss';

export class PredictionSign extends Component {

  constructor(data) {
    super(data);
  }

  render() {

    this.el.innerHTML = template(this._options);

  }

}
