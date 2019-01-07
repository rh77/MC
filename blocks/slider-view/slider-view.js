import { Component } from '../component';
import template from './slider-view.pug';
import _ from './slider-view.scss';
import { Calendar } from '../calendar/calendar';
import { YearSignList } from '../year-sign-list/year-sign-list';
import { MagicCalendarLogic } from '../../magicCalendarLogic';

const TOTAL_COLUMNS = 14;
const HALF_DISPLAYED_COLUMNS_COUNT = 6;

export class SliderView extends Component {

  constructor(data) {
    super(data);

    this._currentDate = new Date();
  }

  render() {

    this._el.innerHTML = template();

    let prediction = SliderView._getPredictions(this._currentDate);
    this.calendar = new Calendar({
      el: this._el.querySelector(".js-calendar"),
      options: {
        width: prediction.columns.length,
        height: MagicCalendarLogic.TOTAL_SIGNS,
        content: prediction
      } 
    });

    let yearSignList = new YearSignList({
      el: this._el.querySelector(".js-sign-names")
    });

    this.calendar.render();
    this._moveWidth = this.calendar.getMoveWidth();
    yearSignList.render();
  }

  moveRight() {

    let content = this._el.querySelector(".js-calendar");
    const timeout = 250;

    content.style.transition = `margin-left ${timeout}ms`;
    content.style.marginLeft = "-" +  this._moveWidth;
    
    let currentDate = this._currentDate;
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDate();
    this._currentDate = new Date(currentYear, currentMonth, currentDay + 1);

    let newDate = new Date(currentYear, currentMonth, currentDay + HALF_DISPLAYED_COLUMNS_COUNT + 2);

    setTimeout(() => {

      this.calendar.moveRight(newDate, MagicCalendarLogic.getPredictionsForDay(newDate));
      content.style.transition = "";
      content.style.marginLeft = "0px";

    }, timeout);
  }

  static _getPredictions(currentDate) {

    let yearNow = currentDate.getFullYear();
    let monthNow = currentDate.getMonth();
    let dayNow = currentDate.getDate();

    let result = {
      columns: [],
      type: "day",
      dates: []
    };

    for (let i = 0; i < TOTAL_COLUMNS; i++)
    {
      let date = new Date(yearNow, monthNow, dayNow - HALF_DISPLAYED_COLUMNS_COUNT + i);
      result.columns.push(MagicCalendarLogic.getPredictionsForDay(date));
      result.dates.push(date);
    }

    return result;
  }
}
