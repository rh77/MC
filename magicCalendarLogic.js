import { MagicCalendarCache } from "./magicCalendarCache";

const kr = 1;
const bk = 2;
const tg = 3;
const kt = 4;
const dr = 5;
const zm = 6;
const ls = 7;
const kz = 8;
const ob = 9;
const pt = 10;
const sb = 11;
const kb = 12;

const shortSignNames = [ "КР", "БК", "ТГ", "КТ", "ДР", "ЗМ", "ЛШ", "КЗ", "ОБ", "ПТ", "СБ", "КБ" ];
const fullSignNames = [ "Крыса", "Бык", "Тигр", "Кот", "Дракон", "Змея", "Лошадь", "Коза", "Обезьяна", "Петух", "Собака", "Кабан" ];
const shortMonthNames = [ "янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек" ];
const shortWeekDayNames = [ "вс", "пн", "вт", "ср", "чт", "пт", "сб" ];

const hard = 1;
const shadow = 2;
const light = 3;
const pr = 4;
const red = 5;
const orange = 6;
const yellow = 7;
const green = 8;
const blue = 9;

const vectorCicle = [
    [kr, ob], [ob, zm], [zm, kz], 
    [kz, tg], [tg, bk], [bk, sb], 
    [sb, pt], [pt, kt], [kt, dr], 
    [dr, kb], [kb, ls], [ls, kr]];

const ideologyStructure = [[zm, bk, pt], [ob, kr, dr], [tg, ls, sb], [kt, kz, kb]];

const businessPyramid = {
    [kr]: [kt, kb, kz],
    [bk]: [kr, ob, dr],
    [tg]: [zm, pt],
    [kt]: [tg, ls, sb],
    [dr]: [kz],
    [zm]: [dr, kr],
    [ls]: [zm, bk, pt],
    [kz]: [ls, sb],
    [ob]: [kt, kz, kb],
    [pt]: [kr, ob, dr],
    [sb]: [zm],
    [kb]: [tg, sb]
};

const krDay = new Date(2019, 0, 1);
const krYear = 2020;

const everyDayCicle = [ kr, kb, sb, pt, ob, kz, ls, zm, dr, kt, tg, bk ];
const yearCicle = [ kr, bk, tg, kt, dr, zm, ls, kz, ob, pt, sb, kb ];

const TOTAL_SIGNS = 12;
const TOTAL_PREDICTIONS = 9;

export class MagicCalendarLogic {

    static get TOTAL_SIGNS() { return TOTAL_SIGNS; };
    static get TOTAL_PREDICTIONS() { return TOTAL_PREDICTIONS; };
    static get fullSignNames() { return fullSignNames; }

    static getPredictions(sign) {

        let predictions = [];
        for (let i = 1; i <= TOTAL_SIGNS; i++)
        {
            predictions.push(MagicCalendarCache.instance.getMagicEffect(i, sign));
        }

        return predictions;
    }

    static getPredictionsForMonth(month) {
        // todo
    }

    static getYearShortName(date) {
        
        let sign = MagicCalendarLogic.getSignOfYear(date);
        return shortSignNames[sign - 1];
    }

    static getShortSignName(sign) {
        return shortSignNames[sign - 1];
    }

    static getMonthShortName(month) {
        return shortMonthNames[month];
    }

    static getWeekDayShortName(day) {
        return shortWeekDayNames[day];
    }

    static getSignOfDay(date) {

        let daysPast = (new Date(date.getFullYear(), date.getMonth(), date.getDate()) - krDay) / 1000 / 60 / 60 / 24;
        let offsetSign = daysPast % TOTAL_SIGNS;
        if (offsetSign < 0)
        {
            offsetSign += TOTAL_SIGNS;
        }

        return everyDayCicle[offsetSign];
    }

    static getSignOfYear(date) {

        let yearsPast = date.getFullYear() - krYear;
        let offsetSign = yearsPast % TOTAL_SIGNS;
        if (offsetSign < 0)
        {
            offsetSign += TOTAL_SIGNS;
        }

        return yearCicle[offsetSign];
    }

    static _getMagicEffect(affectedSign, affectingSign) {

        if (affectedSign === affectingSign)
        {
            return yellow;
        }

        let vector0, vector1;
        for (let i = 0; i < vectorCicle.length; i++)
        {
            let vector = vectorCicle[i];
            if (vector[0] === affectedSign) 
            {
                vector1 = vector[1];
                if (vector1 === affectingSign)
                {
                    return red;
                }
            }

            if (vector[1] === affectedSign)
            {
                vector0 = vector[0];
                if (vector0 === affectingSign)
                {
                    return green;
                }
            }

            if (vector0 && vector1) break;
        }

        for (let i = 0; i < vectorCicle.length; i++)
        {
            let vector = vectorCicle[i];
            if (vector[0] === affectingSign && vector[1] === vector0)
            {
                return orange;
            }

            if (vector[0] === vector1 && vector[1] === affectingSign)
            {
                return blue;
            }
        }        

        if (businessPyramid[affectedSign].includes(affectingSign))
        {
            return light;
        }

        if (businessPyramid[affectingSign].includes(affectedSign))
        {
            return hard;
        }

        if (ideologyStructure.some(trinity => trinity.includes(affectedSign) && trinity.includes(affectingSign)))
        {
            return pr;
        }
        
        return shadow;
    }
}