import SearchBar from "./SearchBar";

import ProfileMenu from "../../../../features/profile/ProfileMenu";




const Header = () => {
    return (
        <header className='flex items-center justify-between border border-b-cyan-700'>
            <div className="icon">ICON</div>
            <SearchBar />
            <ProfileMenu />

        </header>
    )
}

export default Header;