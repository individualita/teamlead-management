import { Outlet, useLocation } from 'react-router-dom';

import { getPageTitle } from '../../../utils/getPageTitle';

import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';


const MainLayout = () => {

    const {pathname} = useLocation();

    return (
        <div className='h-dvh'>
            <Header />

            <main className='flex h-full'>

                {/* либо флекс бейсис 260*/}
                <Sidebar  />
                


                <div className='content grow-1'>
                    <h1 className='text-3xl text-gray-500 opacity-20'>{getPageTitle(pathname)}</h1>
                    <Outlet />
                </div>

            </main>

        </div>
    )
}

export default MainLayout;