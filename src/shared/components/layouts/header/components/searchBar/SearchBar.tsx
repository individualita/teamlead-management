import { CiSearch } from 'react-icons/ci';

import styles from './searchBar.module.css';

const SearchBar = () => {

    return (
        <div className='relative flex items-center'>
            <CiSearch className='absolute left-2 w-5'/>
            <input 
                name='search' 
                type='text' 
                placeholder='Search...' 
                className={styles.input}
            />
        </div>
    )

}

export default SearchBar;