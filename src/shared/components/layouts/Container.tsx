import { ReactNode } from 'react';

type ContainerProps = {
    children: ReactNode;
};
const Container = ({ children }: ContainerProps): JSX.Element => {
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>{children}</div>
    );
};

export default Container;
