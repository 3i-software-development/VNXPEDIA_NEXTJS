export function randomDate() {
    // function randomValueBetween(min, max) {
    //     return Math.random() * (max - min) + min;
    // }
    // var date1 = date1 || '01-01-2019'
    // var date2 = date2 || new Date().toLocaleDateString()
    // date1 = new Date(date1).getTime()
    // date2 = new Date(date2).getTime()
    // if (date1 > date2) {
    //     return changeLongdate(new Date(randomValueBetween(date2, date1)).toLocaleDateString())
    // } else {
    //     return changeLongdate(new Date(randomValueBetween(date1, date2)).toLocaleDateString())

    // }
    var start = new Date(2023, 0, 1); // Ngày bắt đầu (01/01/2023)
    var end = new Date(2023, 2, 3); // Ngày kết thúc (03/03/2022)
    var rdDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return (rdDate); // Lấy định dạng yyyy-mm-dd
}

export const changeLongdate = (date) => {
    var date = new Date(date);

    // Lấy giá trị tháng từ đối tượng Date (lưu ý giá trị tháng bắt đầu từ 0)
    var month = date.getMonth();

    // Tạo một mảng chứa tên các tháng
    var monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    // Lấy giá trị ngày từ đối tượng Date
    var day = date.getDate();

    // Lấy giá trị năm từ đối tượng Date
    var year = date.getFullYear();
    return monthNames[month] + " " + day + ", " + year;
}