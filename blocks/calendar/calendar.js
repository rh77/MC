import { Component } from '../component';
import { CalendarDateCell } from './__date-cell/calendar__date-cell';
import template from './calendar.pug';
import _ from './calendar.scss';

export class Calendar extends Component {

  constructor(data) {
    super(data);
  }

  render() {

    let options = {
      width: this._options.width || 14,
      height: this._options.height|| 12
    };

    this._el.innerHTML = template(options);

    this.dateCell = new CalendarDateCell({
      el: document.querySelector('.js-date-cell-1')
    });

    this.dateCell.render({
      type: "day",
      value: new Date()
    });
  }

}
