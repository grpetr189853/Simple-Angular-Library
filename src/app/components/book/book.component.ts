import { Input, Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Book} from "../models/Book";
import {BookServiceService} from "../../services/book-service.service";
import {MainComponent} from "../main/main.component";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  static bookReaderArray = [
  ];
  componentId = 0;
  book: string;
  reader: string;
  books: Book[] = [
    {
      id: 1,
      name: 'Angular'
    },
    {
      id: 2,
      name: 'PHP'
    },
    {
      id: 3,
      name: 'C++'
    },
    {
      id: 4,
      name: 'C#'
    },
    {
      id: 5,
      name: 'Python'
    },
    {
      id: 6,
      name: 'Java'
    },
    {
      id: 7,
      name: 'SQL'
    }
  ];
  readers: ({ id: number; fullname: string; book: number })[] = [
    {
      id: 1,
      fullname: 'Petrenko1',
      book: 1,
    },
    {
      id: 2,
      fullname: 'Petrenko2',
      book: 2,
    },
    {
      id: 3,
      fullname: 'Petrenko3',
      book: 3,
    },
    {
      id: 4,
      fullname: 'Petrenko4',
      book: 2,
    }
  ];
  public data: Array<any> = [];
  constructor(
    private myService: BookServiceService
  ) {
    this.componentId = this.getRandom();
  }

  ngOnInit() {
  }

  takeBook(event) {
    const bookList = document.getElementById('booksSelect' + this.componentId) as HTMLSelectElement;
    const readerList = document.getElementById('readerSelect' + this.componentId) as HTMLSelectElement;
    console.log(bookList.options[bookList.selectedIndex].text);
    this.book = bookList.options[bookList.selectedIndex].text;
    this.reader = readerList.options[readerList.selectedIndex].text;
    BookComponent.bookReaderArray.push({id: this.componentId, book: this.book, reader: this.reader});
    this.data.push({id: this.componentId, book: this.book, reader: this.reader});
    this.myService.myMethod(this.data);
  }

  getRandom() {
    return Math.round(Math.random() * 100 );
  }
}
