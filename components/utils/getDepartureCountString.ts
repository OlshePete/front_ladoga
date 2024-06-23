export const getDepartureCountString = (length: number): string => {
    let wordEnd = 'ий';
    if (length === 1) wordEnd = 'ие';
    if (length >= 2 && length <= 4) wordEnd = 'ия';
    if (length >= 5 && length <= 20) wordEnd = 'ий';
    if (length % 10 === 1 && length !== 11) wordEnd = 'ие';
    if (length % 10 >= 2 && length % 10 <= 4 && (length < 10 || length >= 20)) wordEnd = 'ия';
    return `${length} отправлен${wordEnd} в день`;
}