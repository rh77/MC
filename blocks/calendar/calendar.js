import { Component } from '../component';
import template from './calendar.pug';
import _ from './calendar.scss';

export class Calendar extends Component {

  constructor(data) {
    super(data);
  }

  render(data) {

    let options = {
      width: this._options.width || 14,
      height: this._options.height|| 12
    };

    this._el.innerHTML = template(options);

  }

}
