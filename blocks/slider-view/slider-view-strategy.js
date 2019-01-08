import { MagicCalendarLogic } from "../../magicCalendarLogic";

export class SliderViewStrategy {

    get displayType() {}

    get totalSigns() { return MagicCalendarLogic.TOTAL_SIGNS; }

    getSign(date) {}

    getPredictions(sign) { return MagicCalendarLogic.getPredictions(sign); }

    getNextDate(date, offset) { }
}