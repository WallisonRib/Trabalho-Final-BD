import { BsSearch } from 'react-icons/bs'
import { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './SearchBar.css'
import fetchProducts from '../../api/fetchProducts';
import AppContext from '../../context/AppContext';

function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const { setProducts, setLoading } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSearch = async (event) => {
        event.preventDefault();
        setLoading(true);
        const products = await fetchProducts(searchValue);
        setProducts(products);
        console.log(products);
        setLoading(false);
        navigate(`/search?q=${searchValue}`);
        setSearchValue('');
    };
    
    return (
        <form className='search-bar' onSubmit={handleSearch}>
            <input
                className='search_input'
                type="search"
                placeholder='Buscar Livros'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                required />
            <button
                type='submit'
                className='search_button'> <BsSearch />
            </button>

        </form>
    );
}

export default SearchBar;