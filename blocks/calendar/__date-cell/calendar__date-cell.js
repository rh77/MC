import { Component } from '../../component';
import template from './calendar__date-cell.pug';
import _ from './calendar__date-cell.scss';

export class CalendarDateCell extends Component {

  constructor(data) {
    super(data);
  }

  render() {

    let dateOptions = {};
    let { value, type } = this._options;

    switch (type.toLowerCase()) {
        case "day":
            dateOptions.day = value.getDate();
            dateOptions.shortMonth = CalendarDateCell._getMonthShortName(value.getMonth() + 1);
            break;
        case "year":
        default:
            dateOptions.year = value.getFullYear();
            dateOptions.yearShortSignName = CalendarDateCell._getYearShortSignName(dateOptions.year);
            break;
    }

    this._el.innerHTML = template(dateOptions);

  }

  static _getYearShortSignName(year) {
      // TODO: implement getting year sign
      return "КБ"
  }

  static _getMonthShortName(month) {
      switch (month) {
          case 1 : return "янв";
          case 2 : return "фев";
          case 3 : return "мар";
          case 4 : return "апр";
          case 5 : return "май";
          case 6 : return "июн";
          case 7 : return "июл";
          case 8 : return "авг";
          case 9 : return "сен";
          case 10 : return "окт";
          case 11 : return "ноя";
          case 12 : return "дек";
          default: return "";
      }
  }
}
