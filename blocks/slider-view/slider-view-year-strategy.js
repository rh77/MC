import { SliderViewStrategy } from "./slider-view-strategy";
import { MagicCalendarLogic } from "../../magicCalendarLogic";

export class SliderViewYearStrategy extends SliderViewStrategy{

    get displayType() { return "year"; }

    getSign(date) { return MagicCalendarLogic.getSignOfYear(date); }

    getNextDate(date, offset) {

        offset = offset || 1; 
        let currentYear = date.getFullYear();
        let currentMonth = date.getMonth();
        let currentDay = date.getDate();
        let nextDate = new Date(currentYear + offset, currentMonth, currentDay);
        return nextDate;
    }
}