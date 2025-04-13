import dayjs from 'dayjs';
import { DATE_FORMAT } from '../constants/dateFormat';


export const formatDate = (date: Date, format:string = DATE_FORMAT): string => {
    return date? dayjs(date).format(format) : '-';
};