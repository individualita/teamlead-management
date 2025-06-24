import { ToastContainer } from 'react-toastify';
import Header from '../../../header/Header';
const HeaderSection = () => {
    return (
        <>
            <Header />
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default HeaderSection;