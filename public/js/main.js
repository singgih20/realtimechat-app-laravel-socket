function getCurrentTime(){
    return moment().format('h:M A');
}

function getCurrentDateTime(){
    return moment().format('MM/DD/YY h:mm A');
}

function dateFormat(dateTime){
    return moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YY h:mm A');
}

function timeFormat(datetime){
    return moment(datetime, 'YYYY-MM-DD HH:mm:ss').format('h:mm A');
}
