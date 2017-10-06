import { Component, OnInit } from '@angular/core';
import { Person } from '../person'
import { PeopleService } from '../people.service';
import { Observable} from 'rxjs/Observable'

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})

export class PeopleListComponent implements OnInit {
  people: Person[];
  selectedPerson: Person
  errorMessage: string
  constructor(private peopleServce: PeopleService) {
  }

  ngOnInit() {
    this.peopleServce
    .getAll()
      .subscribe(
        p => this.people = p,
        e => this.errorMessage = e);
  }
  selectPerson(person) {
    this.selectedPerson = person;
  }
}
