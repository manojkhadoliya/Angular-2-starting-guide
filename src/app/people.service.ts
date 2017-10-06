import { Injectable } from '@angular/core';
import { Person } from './person'
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


const PEOPLE: Person[] = [
  { id: 1, name: 'Luke Skywalker', height: 177, weight: 70, profession: '' },
  { id: 2, name: 'Darth Vader', height: 200, weight: 100, profession: '' },
  { id: 3, name: 'Han Solo', height: 185, weight: 85, profession: '' },
];

@Injectable()
export class PeopleService {
  
  baseUrl: string = 'https://swapi.co/api';

  constructor( private http: Http) { }

  getAll(): Observable<Person[]>{
    let people$ = this.http
                .get(`${this.baseUrl}/people`, { headers: this.getHeaders()})
                .map(mapPersons)
                .catch(handleError);
    return people$;
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers
  }


  get(id: number): Observable<Person> {
    let person = this.http
                .get(`${this.baseUrl}/people/${id}`,  {headers: this.getHeaders()})
                .map(mapPerson)
                .catch(handleError);
    return person;
  }
  save(person: Person) {
    let originalPerson = PEOPLE.find(p => p.id === person.id);
    if (originalPerson) {
      Object.assign(originalPerson, person)
    }
    alert(`saved temp ${person.name}`)
  }
  clone(p) {
    return JSON.parse(JSON.stringify(p));
  }
}

function handleError(error: any){
  let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
function mapPersons(response: Response){
    return response.json().results.map(toPerson);
}

function mapPerson(response:Response): Person{
  return toPerson(response.json());
}

function toPerson(rPerson){
  let person = <Person>({
    id : extractId(rPerson),
    url: rPerson.url,
    name: rPerson.name,
    height: Number.parseInt(rPerson.height),
    weight: Number.parseInt(rPerson.mass)
  });
  console.log('Parsed person:', rPerson);
  return person;
}

function extractId(personData:any){
  let extractedId = personData.url.replace('https://swapi.co/api/people/','').replace('/','');
  return parseInt(extractedId);
}