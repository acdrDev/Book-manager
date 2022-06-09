import { useEffect, useState } from 'react';
import BooksList from './components/BooksList';
import Form from './components/Form';
import { getBooks } from './libs/Api';

function App() {
  const [openModal, setOpenModal] = useState(false)
  const [formData, setFormData] = useState(null)

  const editBookHandler = (data) => {
    setFormData(data);
    setOpenModal(true);
  }
  return (
    <div>
      <nav className="navbar bg-light px-5 mb-2">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Book Manager</span>
          <button onClick={() => setOpenModal(true)} className="btn btn-primary">Add Book</button>
        </div>   
      </nav>
      <Form action={'Add'} open={openModal} setOpen={setOpenModal} formData={formData ? formData : null} setFormData={setFormData}/>
      <div className="container">
        <BooksList editHandler={editBookHandler} />  
      </div>
    </div>
  );
}

export default App;
