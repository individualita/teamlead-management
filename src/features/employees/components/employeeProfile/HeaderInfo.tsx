import dayjs from 'dayjs';
import { getEmployeeBadgeInfo } from '../../utils/getEmployeesBadgeInfo';

interface HeaderInfoProps {
    name: string;
    position: string;
    startDate: Date;
}

const HeaderInfo = ({ name, position, startDate }: HeaderInfoProps) => {
    const years = dayjs().diff(startDate, 'years');
    const { title, icon } = getEmployeeBadgeInfo(years);

    return (
        <div className='text-center'>
            <h2 className='text-2xl font-semibold text-gray-800'>{name}</h2>
            <p className='text-gray-500'>{position}</p>
            <p className='text-xs'>
                {title} {icon}
            </p>
        </div>
    );
};

export default HeaderInfo;
