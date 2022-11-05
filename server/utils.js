function getCurrentDate() {
    const currentDatetime = new Date();
    const formattedDate = currentDatetime.getDate() + "-" + (currentDatetime.getMonth() + 1) + "-" + currentDatetime.getFullYear();
    // Note: Return date as dd-mm-yyyy
    return formattedDate;
}

module.exports = {
    getCurrentDate
}