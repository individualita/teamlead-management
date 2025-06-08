import SearchBar from './components/searchBar/SearchBar';
import Logo from './components/logo/Logo';

import ProfileMenu from '../../../../../features/profile/menu/ProfileMenu';


const Header = () => {
    return (
        <header className='p-2 flex items-center justify-between border-b-2 border-b-gray-100'>
            <Logo />
            <SearchBar />
            <ProfileMenu />

        </header>
    )
}

export default Header;