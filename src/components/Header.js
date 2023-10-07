import React, { useEffect, useRef, useState } from "react";
import navIcon from "../assets/icons/nav-icon.png";
import searchIcon from "../assets/icons/search-icon.png";
import point from "../assets/icons/point.png";
import Turnstone from "turnstone";
import { listbox, styles } from "../utils/turnstoneUtil";

function Header({ setCity }) {
  const [searchValue, setSearchValue] = useState("Tashkent");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchRef = useRef();
  const searchBoxRef = useRef();

  const onEnter = (value) => {
    if (searchValue.trim()) {
      setCity(searchValue);
    }
  };

  const onSelected = (item) => {
    if(item?.name) {
      setCity(item?.name)
    }
  }

  const handleChange = (value) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (isSearchActive) {
      searchRef.current.focus();
    }

    const closeSearch = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setIsSearchActive(false);
      }
    };

    document.body.addEventListener("click", closeSearch, true);

    return () => document.body.removeEventListener("click", closeSearch, true);
  }, [isSearchActive]);

  return (
    <header className="w-full h-[60px] sm:h-[48px] flex justify-between items-center py-[16px] sm:py-[12px] px-[15px] sm:px-[11px] ">
      <div>
        <button
          onClick={() => setIsSearchActive(true)}
          className="main-header-icon relative z-[50]"
        >
          <img
            className="w-[20px] h-[20px] sm:w-[14.99px] sm:h-[14.56px]"
            src={searchIcon}
            alt="search-icon"
          />
        </button>
        {isSearchActive && (
          <div
            ref={searchBoxRef}
            className="absolute top-0 left-0 z-[100] w-full bg-[#ecc09e] flex items-center h-[55px] sm:h-[40px] pr-[5px]"
          >
            <button
              onClick={() => onEnter()}
              className="flex w-[40px] h-full text-[14px] items-center justify-center overflow-hidden text-center transition-all hover:bg-[#fee2bc76] bg-transparent text-white "
            >
              <img
                className="w-[17px] h-[17px]"
                src={searchIcon}
                alt="search-icon"
              />
            </button>
            <Turnstone
              ref={searchRef}
              id="autocomplete"
              placeholder="Enter a city"
              clearButton={true}
              listbox={listbox}
              styles={styles}
              debounceWait={800}
              typehead={true}
              matchText={true}
              onEnter={onEnter}
              onChange={handleChange}
              onSelect={onSelected}
              noItemsMessage="No matching city"
            />
          </div>
        )}
      </div>
      <div className="w-[60px] h-[4px] sm:w-[53px] ">
        <img className="w-full sm:w-auto" src={point} alt="point" />
      </div>
      <div className="main-header-icon">
        <img
          className="w-[20px] h-[20px] sm:w-[14.99px] sm:h-[14.56px]"
          src={navIcon}
          alt="nav-icon"
        />
      </div>
    </header>
  );
}

export default Header;
