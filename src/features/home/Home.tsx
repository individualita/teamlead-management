import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth/store/authStore";

import { ROUTE_PATHS } from "../../shared/constants/routePaths";

const Home = () => {

    const { logout } = useAuthStore();
    const navigate = useNavigate();


    const handLogOut = async () => {
        await logout();
        navigate(ROUTE_PATHS.SIGN_IN);
    };

    return (
        <div className='home'>
            <h1>Home page</h1>


            <button onClick={handLogOut}className='p-2 bg-blue-500'>Sign out</button>
        </div>
    )
}

export default Home;