import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdClear } from 'react-icons/md'
import logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom';
import { currencyConversion } from '../../utilities/currencyConversion';
import CurrencyConvertComp from '../currencyConvertComp';

const SearchComponent = ({ SearchKeyword, setSearchKeyword, toggleSearchInput, products, searchInputVisible }) => {
    const navigate = useNavigate()
    const handleNavigat = (item) => {
        navigate(item?.brand !== "Pick 'n' Mix" ? `/product-page/${item?.name || item?.productName}` : `/mix-match/${item?.id || item?.productId}`)
        setSearchKeyword('')
        toggleSearchInput()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search-results?search=${SearchKeyword}`);
            toggleSearchInput();
        }
    }

    return (
        <div className='full-screen-search'>
            <div className="full-screen-search-input" style={{}}>
                <div><img className='search-logo-container' src={logo} style={{ width: '200px' }} alt="Logo" /></div>
                <div className=" main-search-input" style={{}}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={SearchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="search-input"
                        style={{ width: "100%" }}
                    />
                    <BsSearch
                        className="text-dark search-icon"
                        onClick={toggleSearchInput}
                        style={{ fontSize: "20px" }}
                    />
                </div>
                <div className="cancel-button" onClick={toggleSearchInput} style={{ display: "flex", }}>
                    <MdClear className="cancel-icon text-dark" style={{ fontSize: '34px' }} />
                </div>
            </div>
            <div className='full-screen-search-cards' style={{ backgroundColor: "white", color: "black", paddingBottom: '20px' }}>
                <div className='search-div-1' ></div>
                <div className='search-div-2' style={{ alignItems: "center" }}>
                    {!SearchKeyword && <div style={{ fontSize: '19px', marginBottom: '7px' }}>Trending Products</div>}

                    {products.length ? <div>
                        {products.map((product, index) => (
                            <div onClick={() => handleNavigat(product)} key={index} style={{ display: "flex", justifyContent: '', padding: '12px 0' }}>
                                <div style={{ display: "flex" }}>
                                    <img src={product?.productImageUrl} style={{ width: "50px", height: "50px" }}></img>
                                    <div className='mx-4'>
                                        <div style={{ fontSize: "16px" }}>{product?.name || product?.productName}</div>
                                        <div className='' style={{ fontSize: '12px' }}><span className='me-1'>Price:</span> <CurrencyConvertComp amount={product?.price} /></div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div> : <div style={{ padding: "20px 0", fontSize: '18px', paddingBottom: "50px" }}>No Product Found...</div>}


                </div>
                <div className='search-div-1' ></div>
            </div>
        </div>
    );
}

export default SearchComponent;
