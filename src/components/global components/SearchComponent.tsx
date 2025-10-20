import { useClickAway } from "react-use";
import { useAutocomplete } from "../../store/Autocomplete";
import { useSearch } from "../../store/Search";
import "../../styles/search-component.css";
import { useAutocompleteHook } from "../../utilities/Hooks/useAutoComplete";
import { useDebounce } from "../../utilities/Hooks/useDebounce";
import { useRef } from "react";
import { detectOS, getCountrySvg } from "../../utilities";
import { useNavigate } from "react-router-dom";
import { LocalStorageToolkit } from "../../utilities/localStorage";
import { useKeyboardShortcut } from "../../utilities/Hooks/useControlPress";

export default function SearchComponent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { searchTerm, setSearchTerm } = useSearch();
    const debounceSearchTerm = useDebounce(searchTerm, 500);

    const [isLoading] = useAutocompleteHook({ searchTerm: debounceSearchTerm });
    const { autocomplete, clear } = useAutocomplete();

    const getCurrentOS = detectOS()

    useClickAway(containerRef, () => clear());

    useKeyboardShortcut({
        onTrigger: () => inputRef.current?.focus(),
        shortcuts: getCurrentOS === "macos" ? 
        [
            { key: 'k', metaKey: true },
            { key: 'l', metaKey: true },
            { key: 'f', metaKey: true },
        ] 
        :
        [
            { key: 'k', ctrlKey: true },
            { key: 'l', ctrlKey: true },
            { key: 'f', ctrlKey: true },
        ]
    })

    return (
        <div ref={containerRef} className="search-wrapper no-blur">
            <div className="filter flip-y rounded"></div>
            <div className="search-component">
                {/* Search Icon */}
                <img
                    src="/assets/images/search-alt-2.png"
                    className="icon switch-light-mode"
                />

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder={`Look up a city...`}
                    value={searchTerm}
                    ref={inputRef}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Loading Indicator */}
                {isLoading && <img
                    src="\assets\svgs\Loader\tail-spin.svg"
                    className="loader switch-light-mode"
                />}

                {/* Shortcut tip */}
                {!isLoading && <kbd className="shortcut-tip flex items-center">
                    {getCurrentOS === "macos" ? <span><span className="cmd">⌘</span> + K</span> : <span>CTRL + K</span>}
                </kbd>}

                {/* Search Suggestions */}
                {!!(autocomplete.length > 0) && <SearchSuggestions autocomplete={autocomplete} clear={clear} />}
            </div>
        </div>
    )
}

const SearchSuggestions = ({
    autocomplete,
    clear
}: {
    autocomplete: string[];
    clear: () => void;
}) => {
    console.log({
        autocomplete
    })
    const { setSelectedCity, setSearchTerm } = useSearch();
    const navigate = useNavigate();


    const handleSuggestionClick = (suggestion: string) => {
        const keys = LocalStorageToolkit.getKeys();
        const createCacheKey = `weather-${suggestion.split(', ').join('-').toLowerCase()}`;

        const cacheKeyExists = keys.find((key) => key.toLowerCase() === createCacheKey);

        setSelectedCity(suggestion);
        setSearchTerm(suggestion);
        clear();
        navigate(`/details?query=${suggestion}&type=${cacheKeyExists ? 'known' : 'unknown'}`);
    }

    return (
        <div className="search-suggestions">
            {autocomplete.map((suggestion, index) => (
                <div key={index} className="suggestion" onClick={() => handleSuggestionClick(suggestion)}>
                    <img className="ignore-light-mode" src={getCountrySvg(suggestion.split(',').splice(-1)[0])} alt="" />
                    <span>{suggestion}</span>
                </div>
            ))}
        </div>
    )
}