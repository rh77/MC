import { Component } from '../component';
import template from './year-sign-list.pug';
import _ from './year-sign-list.scss';
import { MagicCalendarLogic } from '../../magicCalendarLogic';

const modifierSelected = "selected";

export class YearSignList extends Component {

  constructor(data) {
    super(data);

    this._el.addEventListener('click', e => {

      let clickedSign = e.target && e.target.closest('[data-id]');
      if (clickedSign)
      {
        this._unselectAll();
        clickedSign.classList.add(modifierSelected);
        this.onSignClick(+clickedSign.dataset.id + 1);
      }
    })
  }

  render() {

    this._el.innerHTML = template({ names: MagicCalendarLogic.fullSignNames });
  }

  select(sign) {

    this._unselectAll();
    let selectingElement = this._el.querySelector(`[data-id="${sign - 1}"]`);
    selectingElement.classList.add(modifierSelected);
    this.onSignClick(sign);
  }

  _unselectAll() {

    let selectedElement = this._el.querySelector("." + modifierSelected);
    if (selectedElement)
    {
      selectedElement.classList.remove(modifierSelected);
    }
  }

  onSignClick(sign) {}
}
