import { Component } from '../component';
import template from './slider-view.pug';
import _ from './slider-view.scss';
import { Calendar } from '../calendar/calendar';
import { YearSignList } from '../year-sign-list/year-sign-list';
import { SliderViewDayStrategy } from './slider-view-day-strategy';

const TOTAL_COLUMNS = 14;
const HALF_DISPLAYED_COLUMNS_COUNT = 6;

export class SliderView extends Component {

  constructor(data) {
    super(data);

    this._currentDate = new Date();
    this._strategy = data.strategy || new SliderViewDayStrategy(); 
  }

  render() {

    this._el.innerHTML = template();

    let date = this._currentDate;
    let strategy = this._strategy;

    let prediction = this._getPredictions(strategy.getNextDate(date, -HALF_DISPLAYED_COLUMNS_COUNT));
    this.calendar = new Calendar({
      el: this._el.querySelector(".js-calendar"),
      options: {
        width: prediction.columns.length,
        height: prediction.columns[0].length,
        content: prediction
      } 
    });

    let yearSignList = new YearSignList({
      el: this._el.querySelector(".js-sign-names")
    });

    yearSignList.onSignClick = sign => this.moveOverlap(sign);

    this.calendar.render();
    yearSignList.render();

    yearSignList.select(6);
  }

  moveOverlap(sign) {

    let overlapBottomLeft = this._el.querySelector(".js-overlap-bottom-left");
    let overlapBottomRight = this._el.querySelector(".js-overlap-bottom-right");
    let overlapTopLeft = this._el.querySelector(".js-overlap-top-left");
    let overlapTopRight = this._el.querySelector(".js-overlap-top-right");

    this._calendarMetrics = this._calendarMetrics || this.calendar.predictionsMetrics;
    this._overlapOffset = this._overlapOffset || parseInt(getComputedStyle(overlapTopLeft).height);
    let bottomOverlapHeight = this._calendarMetrics.predictionHeight * (this._strategy.totalSigns - sign) + "px";
    let topOverlapHeight = this._overlapOffset + this._calendarMetrics.predictionHeight * (sign - 1) + "px";
    overlapTopLeft.style.height = overlapTopRight.style.height = topOverlapHeight;
    overlapBottomLeft.style.height = overlapBottomRight.style.height = bottomOverlapHeight;
  }

  moveRight() {

    let content = this._el.querySelector(".js-calendar");
    const timeout = 250;

    this._calendarMetrics = this._calendarMetrics || this.calendar.predictionsMetrics;
    content.style.transition = `margin-left ${timeout}ms`;
    content.style.marginLeft = "-" + this._calendarMetrics.predictionWidth + "px";
    
    let date = this._currentDate;
    let strategy = this._strategy;

    this._currentDate = strategy.getNextDate(date);
    let newDate = strategy.getNextDate(date, HALF_DISPLAYED_COLUMNS_COUNT + 2);
    let signOfNewDate = strategy.getSign(newDate);

    setTimeout(() => {

      this.calendar.moveRight(newDate, strategy.getPredictions(signOfNewDate));
      content.style.transition = "";
      content.style.marginLeft = "0px";

    }, timeout);
  }

  _getPredictions(date) {

    let strategy = this._strategy;
    let result = {
      columns: [],
      type: strategy.displayType,
      dates: []
    };

    for (let i = 0; i < TOTAL_COLUMNS; i++)
    {
      let signOfDay = strategy.getSign(date);
      result.columns.push(strategy.getPredictions(signOfDay));
      result.dates.push(date);
      date = strategy.getNextDate(date);
    }

    return result;
  }
}
