import { Component } from '../component';
import template from './calendar.pug';
import _ from './calendar.scss';

export class Calendar extends Component {

  constructor(data) {
    super(data);
  }

  render() {

    this._el.innerHTML = template(this._options);

  }

}
