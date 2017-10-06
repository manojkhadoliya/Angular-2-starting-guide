import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PeopleService } from '../people.service';
import { Person } from '../person'

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})

export class PersonDetailsComponent implements OnInit {
  person: Person;
  sub: any;
  errorMessage:string
  constructor(private peopleService: PeopleService,
    private routes: ActivatedRoute) { }

  professions: string[] = ['jedi', 'bounty hunter', 'princess', 'sith lord'];

  ngOnInit() {
    this.sub = this.routes.params.subscribe(params => {
      let id = Number.parseInt(params["id"]);
      this.peopleService
      .get(id)
      .subscribe(
        p => this.person = p,
        e => this.errorMessage = e);
    })
  }
  goToPeopleList() {
    window.history.back();
  }

  savePersonDetails() {
    this.peopleService.save(this.person)
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
