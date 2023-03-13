export const sortDate = (data) => {

    return data.sort((date1, date2) => date2.created - date1.created);

}
