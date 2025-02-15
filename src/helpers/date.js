import dict from "@/dictionaries/ru/date.json";

export function convertDateToString(date) {
    if (!date || date.isEmpty) {
        return "";
    }

    let str = "";

    (date.day) ? str += date.day : str += "??";

    str += ".";

    (date.month) ? str += date.month : str += "??";

    str += ".";

    (date.year) ? str += date.year : str += "??";

    return str;
}

export function convertDateToStringISO8601(date) {
    if (!date || date.isEmpty) {
        return "????-??-??";
    }

    let str = "";

    (date.year) ? str += date.year : str += "??";

    str += "-";

    (date.month) ? str += date.month : str += "??";

    str += "-";

    (date.day) ? str += date.day : str += "??";

    return str;
}

export function convertIntervalToString(interval) {
    if (!interval) {
        return "";
    }

    if (interval.y != 0) {
        let _case = getCase(interval.y);
        return interval.y + " " +  dict.year[_case];
    } else if (interval.m != 0) {
        let _case = getCase(interval.m);
        return interval.m + " " + dict.month[_case];
    } else {
        let _case = getCase(interval.d);
        return interval.d + " " + dict.day[_case];
    }
}

function getCase(interval) {
    interval = String(interval);
    if (interval.length > 2) {
        interval = interval[interval.length - 2] + interval[interval.length - 1];
    }

    if (interval > 4 && interval < 21) {
        return "plural";
    } else {
        let s = interval[interval.length - 1];
        if (s == 1) {
            return "nominative";
        } else if (s >= 2 && s <= 4) {
            return "accusative";
        } else {
            return "plural";
        }
    }
}
