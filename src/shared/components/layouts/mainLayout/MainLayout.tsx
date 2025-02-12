import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../sidebar/Sidebar';


const MainLayout = () => {



    return (
        <div className=' border border-amber-600 py-4 h-dvh'>
            <h1 className='text-center'>dashboard</h1>
            <Header />

            <main className='flex h-full'>

                {/* либо флекс бейсис 260*/}
                { <Sidebar  />}
                


                <div className='content grow-1'>
                    <Outlet />
                </div>

            </main>

        </div>
    )
}

export default MainLayout;