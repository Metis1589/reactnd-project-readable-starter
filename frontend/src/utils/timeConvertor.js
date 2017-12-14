export default function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    hour = ("0" + hour).slice(-2);
    let min = a.getMinutes();
    min = ("0" + min).slice(-2);
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min ;
    return time;
}