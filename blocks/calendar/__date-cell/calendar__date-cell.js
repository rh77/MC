import { Component } from '../../component';
import template from './calendar__date-cell.pug';
import _ from './calendar__date-cell.scss';
import { MagicCalendarLogic } from '../../../magicCalendarLogic';

export class CalendarDateCell extends Component {

  constructor(data) {
    super(data);
  }

  render(date) {

    let dateOptions = {};

    switch (this._options.type.toLowerCase()) {
        case "day":
            let signOfDay = MagicCalendarLogic.getSignOfDay(date);
            dateOptions = {
                day: date.getDate(),
                dayOfWeek: MagicCalendarLogic.getWeekDayShortName(date.getDay()),
                month: (date.getMonth() + 1).toString().padStart(2, '0'),
                shortSign: MagicCalendarLogic.getShortSignName(signOfDay)
            };
            break;
        case "year":
        default:
            dateOptions = {
                year: date.getFullYear(),
                yearShortSignName: MagicCalendarLogic.getYearShortName(dateOptions.year)
            };
            break;
    }

    this._el.innerHTML = template(dateOptions);

  }
}
