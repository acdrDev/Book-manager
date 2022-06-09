import { isNull } from "lodash";
import { useRef, useEffect, useState } from "react";
import { editBook, setBook } from "../libs/Api";

function Form({ action, open, setOpen, formData, setFormData }) {
  const formRef = useRef(null)
  const [editing, setEditing] = useState(false);

  const saveBookHandler = async (bookId) => {
    let data = new FormData(formRef.current);
    if (editing) {
      editBook(data, bookId);
      setFormData(null);
      setEditing(false);
    } else {
      setBook(data);
    }
    formRef.current.reset();
    setOpen(false);
  }

  useEffect(() => {
    if (formData) {
      setEditing(true);
    }else{
      setEditing(false)
    }
  }, [formData])

  return (
    <div className={(open ? 'd-block' : '') + ' modal bg-black'} style={{ '--bs-bg-opacity': .5 }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{action} book</h5>
            <button onClick={() => { setOpen(false); setFormData(null) }} type="button" className="btn-close"></button>
          </div>
          <form ref={formRef} className="modal-body">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input defaultValue={formData ? formData.title : ''} type="text" className="form-control" id="title" name="title" />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image</label>
              <input type="file" className="form-control" id="image" name="image" />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea defaultValue={formData ? formData.description : ''} className="form-control" id="description" name="description"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input defaultValue={formData ? parseInt(formData.price) : ''} type="number" className="form-control" id="price" name="price" />
            </div>
          </form>
          <div className="modal-footer">
            <button onClick={() => saveBookHandler((editing ? formData.id : null))} type="button" className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form