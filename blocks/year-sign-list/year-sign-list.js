import { Component } from '../component';
import template from './year-sign-list.pug';
import _ from './year-sign-list.scss';
import { MagicCalendarLogic } from '../../magicCalendarLogic';

export class YearSignList extends Component {

  constructor(data) {
    super(data);

    this._el.addEventListener('click', () => {
      this.onSignClick(3);
    })
  }

  render() {

    this._el.innerHTML = template({ names: MagicCalendarLogic.fullSignNames });
  }

  onSignClick(sign) {}
}
