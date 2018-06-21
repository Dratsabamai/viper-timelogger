export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


export default function convertDate(utcMilliseconds, showTime) {

    if (!utcMilliseconds) {
        return "";
    }

    const dateToFormat = new Date(utcMilliseconds);

    var dateString = ("0" + dateToFormat.getDate()).slice(-2) + "-" + months[dateToFormat.getMonth()] + "-" +
        dateToFormat.getFullYear();

    if (showTime) {
        dateString += " " + ("0" + dateToFormat.getHours()).slice(-2) + ":" + ("0" + dateToFormat.getMinutes()).slice(-2);
    }

    return dateString;
}

export function getDayAndMonthFromDate(date) {
    if (!date) {
        return "";
    }
    return ("0" + date.getDate()).slice(-2) + " " + months[date.getMonth()]
}