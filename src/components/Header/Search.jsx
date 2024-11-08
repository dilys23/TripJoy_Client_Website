import HeaderTippy from '@tippyjs/react/headless';
import Wrapper from '../Popper/Wrapper';
import AccountItem from "../AccountItem"
import { useEffect, useRef, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { searchUserRequest } from '../../services/searchAccount';
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef();
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const debouncedValue = useDebounce(searchValue, 500)

    const handleChange = (e) => {
        const searchInput = e.target.value;
        if (!searchInput.startsWith(' ')) {
            setSearchValue(searchInput);
        }
    }
    const handleHideResult = () => {
        setShowResult(false)
    }
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([])
            return
        }
        const fetchApi = async () => {
            console.log(debouncedValue);
            const result = await searchUserRequest(debouncedValue);
            setSearchResult(result);
            console.log(result);
        }
        fetchApi()
    }, [debouncedValue])

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
        setShowResult(false)
    }
    return (
        <HeaderTippy
            onClickOutside={handleHideResult}
            visible={showResult && searchResult.length > 0}
            interactive
            placement='bottom-end'
            render={(attrs) => (
                <div className='w-[300px] items-start flex' tabIndex="-1" {...attrs}>
                    <Wrapper>
                        {searchResult.map((account) => (
                            <AccountItem key={account.id} account={account} />
                        ))}
                    </Wrapper>
                </div>
            )}
        >
            <div className="hidden md:flex">
                <div className="ml-3 flex w-[30%] items-center justify-between">
                    <input
                        ref={inputRef}
                        value={searchValue}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                        type="search"
                        className="border-secondary-200 text-surface focus:text-gray-700 focus:shadow-inset dark:bg-body-dark dark:autofill:shadow-autofill relative m-0 block flex-auto rounded-full border border-zinc-200 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal transition duration-300 ease-in-out focus:border-primary focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-300"
                        placeholder="Tìm kiếm"
                        aria-label="Search"
                        aria-describedby="button-addon2"
                    />

                    <span
                        onClick={handleClear}
                        className="text-gray-600 flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal dark:text-white [&>svg]:w-5"
                        id="basic-addon2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </HeaderTippy>
    );
}

export default Search;