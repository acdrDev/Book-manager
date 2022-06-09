import axios from "axios";

const URI = 'http://localhost:8000/api/';

export async function getBooks(){
  let books = await axios.get(URI + 'books');
  return books.data;
}

export async function setBook(data){
  await axios.post(URI + 'books/create', data);
}

export async function editBook(data, bookId){
  let response = await axios.post(URI + 'books/update/' + bookId, data);
  console.log(response.data.message)
}

export async function deleteBook(bookId){
  await axios.delete(URI + 'books/delete/' + bookId);
}