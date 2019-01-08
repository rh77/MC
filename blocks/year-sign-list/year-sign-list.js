import { Component } from '../component';
import template from './year-sign-list.pug';
import _ from './year-sign-list.scss';
import { MagicCalendarLogic } from '../../magicCalendarLogic';

export class YearSignList extends Component {

  constructor(data) {
    super(data);

    this._el.addEventListener('click', e => {

      let signElement = e.target && e.target.closest('[data-id]');
      if (signElement)
      {
        this.onSignClick(+signElement.dataset.id + 1);
      }
    })
  }

  render() {

    this._el.innerHTML = template({ names: MagicCalendarLogic.fullSignNames });
  }

  onSignClick(sign) {}
}
