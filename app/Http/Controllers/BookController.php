<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    public function getBooks()
    {
        return response()->json(Book::all());
    }

    public function createBook(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'image' => 'mimes:jpeg,jpg,png,gif',
            'price' => 'required'
        ]);

        try {
            $input = $request->all();
            
            // Save file
            $fileName = $request->file('image')->getClientOriginalName();
            $file = $request->file('image')->storeAs('books', $fileName);

            $input['image'] = $file;

            Book::create($input);
        } catch (\Exception $e) {
            return response()->json(['message' => $e], 500);
        }

        return response()->json(['message' => 'book created successfully'], 200);
    }

    public function updateBook(Request $request, Book $bookId)
    {
        try {
            $request->validate([
                'title' => 'required',
                'image' => 'mimes:jpeg,jpg,png,gif',
                'price' => 'required'
            ]);
            $input = $request->all();

            if (!empty($request->file('image'))) {
                // Delete existing file
                if (Storage::exists($bookId->image)) {
                    Storage::delete($bookId->image);
                }

                // Save new file
                $fileName = $request->file('image')->getClientOriginalName();
                $file = $request->file('image')->storeAs('books', $fileName);

                $input['image'] = $file;
            }


            $bookId->update($input);
        } catch (\Exception $e) {
            return response()->json(['message' => $e], 500);
        }

        return response()->json(['message' => 'book updated successfully'], 200);
    }

    public function deleteBook(Book $bookId)
    {
        try {
            // Delete existing file
            if (Storage::exists($bookId->image)) {
                Storage::delete($bookId->image);
            }

            $bookId->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => $e], 500);
        }
        return response()->json(['message' => 'book deleted successfully'], 200);
    }
}
