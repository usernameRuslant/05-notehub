import { keepPreviousData, useQuery } from '@tanstack/react-query';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';
import { fetchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import NoteForm from '../NoteForm/NoteForm';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useDebouncedCallback } from 'use-debounce';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: keepPreviousData,
  });

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onOpenModal = () => {
    setModalIsOpen(true);
  };

  const onCloseModal = () => {
    setModalIsOpen(false);
  };
  const onChangeSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 1000);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={onChangeSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onChange={onPageChange}
          />
        )}
        <button className={css.button} onClick={onOpenModal} type="button">
          Create note +
        </button>
      </header>
      {isSuccess && data && data?.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>Notes not found</p>
      )}
      {isLoading && !data && <Loader />}
      {isError && <ErrorMessage />}
      {modalIsOpen && (
        <Modal closeModal={onCloseModal}>
          <NoteForm closeModal={onCloseModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
