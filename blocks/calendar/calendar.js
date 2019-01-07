import { Component } from '../component';
import { CalendarDateCell } from './__date-cell/calendar__date-cell';
import { PredictionSign } from '../common/prediction-sign/prediction-sign';
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

    let content = this._options.content;
    let columns = this._el.querySelectorAll('.js-column');
    this._columnObjects = [];

    for (let i = 0; i < columns.length; i++)
    {
      let column = columns[i];
      let dateCell = new CalendarDateCell({
        el: column.querySelector('.js-date-cell'),
        options: { 
          type: content.type 
        }
      });

      dateCell.render(content.dates[i]);

      let columnData = content.columns[i];
      let predictionElements = column.querySelectorAll('.js-prediction-cell');
      let predictionObjects = [];
      for (let j = 0; j < predictionElements.length; j++)
      {
        let predictionCell = new PredictionSign({
          el: predictionElements[j]
        });

        predictionCell.render({
          prediction: columnData[j]
        });

        predictionObjects.push(predictionCell);
      }

      this._columnObjects.push({
        date: dateCell,
        predictions: predictionObjects
      });
    }
  }

  moveRight(date, predictions) {   
    let firstColumnObject = this._columnObjects.shift();
    firstColumnObject.date.render(date);
    firstColumnObject.predictions.forEach((prediction, i) => prediction.render({ prediction: predictions[i] }));
    this._columnObjects.push(firstColumnObject);
    let firstColumn = this._el.querySelector('.js-column');
    firstColumn.parentNode.appendChild(firstColumn);
  }

  getMoveWidth() {
    let firstColumn = this._el.querySelector('.js-column');
    return getComputedStyle(firstColumn).width;
  }
}
