import { Component } from '../component';
import template from './year-sign-list.pug';
import _ from './year-sign-list.scss';
import { MagicCalendarLogic } from '../../magicCalendarLogic';

const modifierSelected = "year-sign-list__sign-name_selected";

export class YearSignList extends Component {

  constructor(data) {
    super(data);

    this._el.addEventListener('click', e => {

      let clickedSign = e.target && e.target.closest('[data-id]');
      if (clickedSign)
      {
        let selectedElement = this._el.querySelector("." + modifierSelected);
        if (selectedElement)
        {
          selectedElement.classList.remove(modifierSelected);
        }

        clickedSign.classList.add(modifierSelected);
        this.onSignClick(+clickedSign.dataset.id + 1);
      }
    })
  }

  render() {

    this._el.innerHTML = template({ names: MagicCalendarLogic.fullSignNames });
  }

  select(sign) {

    let selectingElement = this._el.querySelector(`[data-id="${sign - 1}"]`);
    selectingElement.classList.add(modifierSelected);
  }

  onSignClick(sign) {}
}
