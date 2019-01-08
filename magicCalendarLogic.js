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

const everyDayCicle = [ kr, kb, sb, pt, ob, kz, ls, zm, dr, kt, tg, bk ];

export class MagicCalendarLogic {

    static get TOTAL_SIGNS() { return 12 };
    static get TOTAL_PREDICTIONS() { return 9 };

    static getPredictionsForDay(signOfDay) {

        let predictions = [];
        for (let i = 1; i <= MagicCalendarLogic.TOTAL_SIGNS; i++)
        {
            predictions.push(MagicCalendarLogic._getMagicEffect(i, signOfDay));
        }
        return predictions;
    }

    static getPredictionsForMonth(month) {

    }

    static getPredictionsForYear(year) {

    }

    static getYearShortName(year) {
        // TODO: implement getting year sign
        return "КБ";
    }

    static getShortSignName(sign) {
        return shortSignNames[sign - 1];
    }

    static getMonthShortName(month) {
        switch (month) {
            case 1 : return "янв";
            case 2 : return "фев";
            case 3 : return "мар";
            case 4 : return "апр";
            case 5 : return "май";
            case 6 : return "июн";
            case 7 : return "июл";
            case 8 : return "авг";
            case 9 : return "сен";
            case 10 : return "окт";
            case 11 : return "ноя";
            case 12 : return "дек";
            default: return "";
        }
    }

    static getYearNames() {
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
        ];
    }

    static getSignOfDay(date) {

        let daysPast = (new Date(date.getFullYear(), date.getMonth(), date.getDate()) - krDay) / 1000 / 60 / 60 / 24;
        let offsetSign = daysPast % MagicCalendarLogic.TOTAL_SIGNS;
        return everyDayCicle[offsetSign];
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