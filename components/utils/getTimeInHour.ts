export const getTimeInHour = (minutes: number): string => {

    const m = minutes % 60;

    const h = (minutes - m) / 60;

    var HHMM = h.toString() + " ч. " + (m > 0 ? m.toString() + " мин." : "");
    return HHMM
}