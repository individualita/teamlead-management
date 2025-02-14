import SearchBar from './components/searchBar/SearchBar';
import Logo from './components/logo/Logo';

import ProfileMenu from '../../../../features/profile/ProfileMenu';

import styles from './header.module.css';


const Header = () => {
    return (
        <header className={styles.header}>
            <Logo />
            <SearchBar />
            <ProfileMenu />

        </header>
    )
}

export default Header;