import { Component } from '../component';
import template from './slider-view.pug';
import _ from './slider-view.scss';
import { Calendar } from '../calendar/calendar';
import { YearSignList } from '../year-sign-list/year-sign-list';

export class SliderView extends Component {

  constructor(data) {
    super(data);

    this.TOTAL_SIGNS = 12;
    this.TOTAL_COLUMNS = 14;
    this.TOTAL_PREDICTIONS = 9;
    this.HALF_DISPLAYED_COLUMNS_COUNT = 6;
    this._currentDate = new Date();
  }

  render() {

    this._el.innerHTML = template();

    let prediction = this._getPredictions();
    this.calendar = new Calendar({
      el: this._el.querySelector(".js-calendar"),
      options: {
        width: prediction.columns.length,
        height: this.TOTAL_SIGNS,
        content: prediction
      } 
    });

    let yearSignList = new YearSignList({
      el: this._el.querySelector(".js-sign-names")
    });

    this.calendar.render();
    yearSignList.render();
  }

  moveRight() {

    let content = this._el.querySelector(".js-calendar");
    const timeout = 250;

    content.style.transition = `margin-left ${timeout}ms`;
    content.style.marginLeft = "-" +  this.calendar.getMoveWidth();
    
    let currentDate = this._currentDate;
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDate();

    this._currentDate = new Date(currentYear, currentMonth, currentDay + 1);

    setTimeout(() => {

      let newDate = new Date(currentYear, currentMonth, currentDay + this.HALF_DISPLAYED_COLUMNS_COUNT + 2);
      this.calendar.moveRight(newDate, this._getPredictionForDay(newDate));
      content.style.transition = "";
      content.style.marginLeft = "0px";

    }, timeout);
  }

  _getPredictions() {

    let dateNow = this._currentDate;
    let yearNow = dateNow.getFullYear();
    let monthNow = dateNow.getMonth();
    let dayNow = dateNow.getDate();

    let result = {
      columns: [],
      type: "day",
      dates: []
    };

    for (let i = 0; i < this.TOTAL_COLUMNS; i++)
    {
      let date = new Date(yearNow, monthNow, dayNow - this.HALF_DISPLAYED_COLUMNS_COUNT + i);
      result.columns.push(this._getPredictionForDay(date));
      result.dates.push(date);
    }

    return result;
  }

  _getPredictionForDay(date) {

    let predictions = [];
    for (let i = 0; i < this.TOTAL_SIGNS; i++)
    {
      predictions.push((date.getDate() + i) % this.TOTAL_PREDICTIONS + 1);
    }
    return predictions;
  }
}
