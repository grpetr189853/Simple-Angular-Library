import { Component, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type, OnInit, OnDestroy } from '@angular/core';
import {Book} from "../models/Book";
import {Reader} from "../models/Reader";
import {BookServiceService} from "../../services/book-service.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  bookReaderArray = [
  ];
  @ViewChild('componentsContainer', {read: ViewContainerRef}) componentsContainer: ViewContainerRef;
  private innerRef: ComponentRef<any>;
  public data: Array<any>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private myService: BookServiceService
  ) {
    this.myService.myMethod$.subscribe((data) => {
        this.data = data;
        data.forEach((value) => {
          console.log(value);
          this.bookReaderArray.push(value);
        });

        console.log(data);

      }
    );
  }
  takeBook(event) {
    this.bookReaderArray.push(event.id, event.book , event.reader);
    console.log(this.bookReaderArray);
    console.log(event);
    localStorage.setItem('data', JSON.stringify(event));
  }
  createChildComponent(event) {
    const factories = Array.from(this.resolver['_factories'].keys());
    const factoryClass = <Type<any>> factories.find((factory: any) => factory.name === 'BookComponent');
    const innerComponentFactory = this.resolver.resolveComponentFactory(factoryClass);
    this.innerRef = this.componentsContainer.createComponent(innerComponentFactory);
  }
  showBooks() {
    console.log(this.bookReaderArray);
    this.bookReaderArray.forEach((value) => {
      document.write(value.book," | ", value.reader,'</br>');
    });
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
    if(this.innerRef){
      this.innerRef.destroy();
    }
  }
}
