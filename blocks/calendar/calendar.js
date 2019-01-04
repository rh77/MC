import { Component } from '../component';
import _ from './calendar.scss';

export class Calendar extends Component {

  constructor(data) {
    super(data);
  }

  render() {

    this._el.innerHTML = `
      <button class="button button_inactive">1234 ${this.options.text}</button>
    `;

  }

}
