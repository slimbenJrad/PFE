import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {
  isMenuOpen = true;
  contentMargin = 240;
  droppedList = false;
  droppedempl = false;
  constructor() { }

  ngOnInit(): void {
  }
  onToolbarMenuToggle() {
    console.log('On toolbar toggled', this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;

    if(!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }
  dropped(){
    this.droppedList = !this.droppedList;
  }
  dropemploie(){
    this.droppedempl = !this.droppedempl;
  }
}
