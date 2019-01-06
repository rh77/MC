import { Component } from '../component';
import template from './year-sign-list.pug';
import _ from './year-sign-list.scss';

export class YearSignList extends Component {

  constructor(data) {
    super(data);
  }

  render() {

    this._el.innerHTML = template({ names: YearSignList._getNamesList() });
  }

  static _getNamesList() {

    return [
      "Крыса",
      "Бык",
      "Тигр",
      "Кот",
      "Дракон",
      "Змея",
      "Лошадь",
      "Коза",
      "Обезьяна",
      "Петух",
      "Собака",
      "Кабан"
    ]
  }
}
