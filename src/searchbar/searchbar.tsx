/* eslint-disable @typescript-eslint/no-unused-vars */
import './searchbar.css'

export interface SearchBarProps {
    searchValue: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAddUserClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchValue, onSearchChange, onAddUserClick }) => {

    return (
        <div className="search">
            <input style={{ paddingLeft: '2em' }} type="text" placeholder="Cerca dipendenti..." value={searchValue} onChange={onSearchChange} />
            <button onClick={(e) => onAddUserClick(e)} className='add-person'>+</button>
        </div>
    )
}

export default SearchBar