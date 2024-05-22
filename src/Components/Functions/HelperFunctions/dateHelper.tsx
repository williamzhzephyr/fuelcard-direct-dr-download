export interface DateObject {
    day: string,
    month: string,
    year: string
}

export const uploadDateHelper = (): DateObject => {
    let uploadDate = new Date();
    let uploadDay = String(uploadDate.getDate()).padStart(2, "0");
    let uploadMonth = String(uploadDate.getMonth() + 1).padStart(2, "0");
    let uploadYear = String(uploadDate.getFullYear());

    let object: DateObject = {
        day: uploadDay,
        month: uploadMonth,
        year: uploadYear
    };

    return object;
};

export const inputDateHelper = (date: string): DateObject => {

    let invoiceDate = new Date(date);

    //Extract the day, month, year invoiceDate
    let day = invoiceDate.getDate();
    let month = invoiceDate.getMonth() + 1;
    let year = invoiceDate.getFullYear().toString();

    //Add 0 to front of day/month if they are single digit
    let dayString = day < 10 ? '0' + day : day.toString();
    let monthString = month < 10 ? "0" + month : month.toString();

    let object: DateObject = {
        day: dayString,
        month: monthString,
        year
    };

    return object;
    
};