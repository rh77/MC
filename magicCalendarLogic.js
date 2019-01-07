export class MagicCalendarLogic {

    static get TOTAL_SIGNS() { return 12 };
    static get TOTAL_PREDICTIONS() { return 9 };

    static get signInteractionMatrix() {
        return [
            [  ]
        ];
    }

    static getPredictionsForDay(date) {
        // TODO: write real predictions getting instead of the stub
        let predictions = [];
        for (let i = 0; i < MagicCalendarLogic.TOTAL_SIGNS; i++)
        {
        predictions.push((date.getDate() + i) % MagicCalendarLogic.TOTAL_PREDICTIONS + 1);
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
}