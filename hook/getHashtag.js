export const getHashtag = (d) => {
    const newdata = (JSON.parse(d).find(a => a != '#Blog'));
    return newdata
}