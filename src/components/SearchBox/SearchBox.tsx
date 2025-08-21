import css from './SearchBox.module.css';

interface SearchBoxNotesProps {
  onChange: (value: string) => void;
}

const SearchBox = ({ onChange }: SearchBoxNotesProps) => {
  return (
    <input
      onChange={(e) => {
        onChange(e.target.value);
      }}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
};

export default SearchBox;
