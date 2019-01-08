import { SliderViewStrategy } from "./slider-view-strategy";
import { MagicCalendarLogic } from "../../magicCalendarLogic";

export class SliderViewDayStrategy extends SliderViewStrategy{

    get displayType() { return "day"; }

    getSign(date) { return MagicCalendarLogic.getSignOfDay(date); }

    getNextDate(date, offset) {

        offset = offset || 1; 
        let currentYear = date.getFullYear();
        let currentMonth = date.getMonth();
        let currentDay = date.getDate();
        let nextDate = new Date(currentYear, currentMonth, currentDay + offset);
        return nextDate;
    }
}