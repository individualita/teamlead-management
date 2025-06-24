import '../../../../styles/employees.css';

interface ContactInfoProps {
    phone: string;
    email: string;
}

const ContactInfo = ({ phone, email }: ContactInfoProps): JSX.Element => (
    <div className='mt-6'>
        <h3 className='text-lg font-medium text-gray-700'>Contact</h3>
        <div className='mt-2 space-y-2'>
            <p>
                <span className='text-gray-600'>Phone: </span>
                <a
                    href={`tel:${phone}`}
                    className='employees-link'
                >
                    {phone}
                </a>
            </p>
            <p>
                <span className='text-gray-600'>Email: </span>
                <a
                    href={`mailto:${email}`}
                    className='employees-link'
                >
                    {email}
                </a>
            </p>
        </div>
    </div>
);

export default ContactInfo;
