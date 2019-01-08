import { MagicCalendarLogic } from "../../magicCalendarLogic";

export class SliderViewStrategy {

    get displayType() {}

    getSign(date) {}

    getPredictions(sign) { return MagicCalendarLogic.getPredictions(sign); }

    getNextDate(date, offset) { }
}