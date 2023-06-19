function numberFormat(number) {
    let options = {
        style: "decimal",
        useGrouping: true,
        minimumFractionDigits: 2,
    };
    let formattedNumber = (number || 0).toLocaleString("id", options);

    return formattedNumber;
}

function getDateTime() {
    let today = new Date();

    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, "0");
    let day = String(today.getDate()).padStart(2, "0");
    let hours = String(today.getHours()).padStart(2, "0");
    let minutes = String(today.getMinutes()).padStart(2, "0");
    let seconds = String(today.getSeconds()).padStart(2, "0");

    let formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}

function generateUniqueId() {
    var uniqueId = Date.now() + Math.random();
    return uniqueId.toString().replace(".", "");
}

export { numberFormat, getDateTime, generateUniqueId };
