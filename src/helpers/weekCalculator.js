export function getWeekStart(date) {
    const positionInWeek = date.getDay();
    const positionInWeekAdjustment = positionInWeek == 0 ? -7 : 1;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - positionInWeek + positionInWeekAdjustment);
}

export function getWeekEnd(date) {
    const positionInWeek = date.getDay();
    const positionInWeekAdjustment = positionInWeek == 0 ? -7 : 1;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - positionInWeek + positionInWeekAdjustment + 6);
}