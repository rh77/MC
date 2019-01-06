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
  }

  render() {

    this._el.innerHTML = template();

    let prediction = this._getPrediction();
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

  _getPrediction() {

    let dateNow = new Date();
    let prediction = {
      columns: [],
      type: "day",
      dates: []
    };

    for (let i = 0; i < this.TOTAL_COLUMNS; i++)
    {
      let predictions = [];
      for (let j = 0; j < this.TOTAL_SIGNS; j++)
      {
        predictions.push((j + i) % this.TOTAL_PREDICTIONS + 1);
      }

      prediction.columns.push(predictions);

      let date = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() + i);
      prediction.dates.push(date);
    }

    return prediction;
  }
}
