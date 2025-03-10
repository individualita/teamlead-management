export const formatDate = (date: string) => {

    if (!date) '';

    const [year, month, day] = date.split('-');

    return `${day}-${month} ${year}`;

};