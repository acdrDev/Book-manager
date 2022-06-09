import { useState, useEffect } from "react";
import { deleteBook, getBooks } from "../libs/Api";

function BooksList({ editHandler }) {
  const ITEMS_PER_PAGE = 5;
  const [booksLength, setBooksLength] = useState([])
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const getData = async () => {
    let data = await getBooks()
    let firstIndex = currentPage * ITEMS_PER_PAGE;
    setBooksLength([data.length, (currentPage + 1) * ITEMS_PER_PAGE]);
    setItems([...data].splice(firstIndex, ITEMS_PER_PAGE));
  }

  const deleteBookHandler = async (bookId) => {
    await deleteBook(bookId);
    getData();
  }

  useEffect(() => {
    getData()
  }, [currentPage])

  return (
    <div>
      <div className="mb-2">
        <button onClick={() => currentPage == 0 ? setCurrentPage(0) : setCurrentPage(currentPage - 1)} className="btn btn-primary me-4">&#9668; Prev</button>
        <button onClick={() => booksLength[0] <= booksLength[1] ? '' : setCurrentPage(currentPage + 1)} className="btn btn-primary me-4">Next &#9658;</button>
        <button onClick={() => getData()} className="btn btn-warning">Actualizar</button>
      </div>
      <div className="row">
        {items.map((book) => (
          <div key={book.id} className="col-4 mb-2 px-1">
            <div className="card w-100 h-100">
              <img src={'storage/' + book.image} style={{ 'height': '16rem', 'objectFit': 'cover' }} className="card-img-top" alt={book.title} />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.description}</p>
                <p className="text-success">
                  {book.price.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })
                  }
                </p>
                <button className="btn btn-primary me-2" onClick={() => editHandler(book)}>Editar</button>
                <button className="btn btn-danger" onClick={() => deleteBookHandler(book.id)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksList;
