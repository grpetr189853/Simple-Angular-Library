import {Book} from "./Book";

export interface Reader {
  id: number;
  fullname: string;
  book: Book;
}
