import { STATUS_TEXT_COLORS } from '../../../../../../shared/constants/statusTextColors';
import { getEmployeeStatusColor } from '../../../../../../shared/utils/getEmployeeStatusColor';

interface DetailsInfoProps {
    startDate: Date;
    status: string;
}

const DetailsInfo = ({ startDate, status }: DetailsInfoProps) => (
    <div className='mt-6'>
        <h3 className='text-lg font-medium text-gray-700'>Details</h3>
        <div className='mt-2 space-y-2'>
            <p>
                <span className='text-gray-600'>Start date: </span>
                {new Date(startDate).toLocaleDateString('ru-RU')}
            </p>
            <p>
                <span className='text-gray-600'>Status: </span>
                <span
                    style={{ color: STATUS_TEXT_COLORS[status] }}
                    className={`${getEmployeeStatusColor(status)} p-1 rounded-md`}
                >
                    {status}
                </span>
            </p>
        </div>
    </div>
);

export default DetailsInfo;
