import {Component, OnInit} from "@angular/core";

import {AnimalService} from "../shared/services/animal.service";
import {Status} from "../shared/interfaces/status";
import {Animal} from "../shared/interfaces/animal";
import {ActivatedRoute, Route, Router} from "@angular/router";


@Component({
	template: require("./success.stories.template.html")
})

export class SuccessStoriesComponent implements OnInit{
	status: Status = {status: null, message: null, type: null};
	animals: Animal[] = [];
	animalParameter: string;
	animalValue: string;

	constructor(protected animalService: AnimalService, protected route: ActivatedRoute, protected router: Router){}

	ngOnInit(){
		window.sessionStorage.setItem('url', window.location.pathname);
		this.loadResults();
	}

	loadResults(){
		this.animalParameter = this.route.snapshot.params["animalParameter"];
		this.animalValue = this.route.snapshot.params["animalValue"];
		if(this.animalParameter === "animalStatus"){
			this.loadStatus(this.animalValue);
		}
	}

	loadStatus(animalStatus: string){
		this.animalService.getAnimalByAnimalStatus(animalStatus).subscribe(animals => this.animals = animals);
	}

	sortFunc(a: any, b: any){
		return b.animalDate = a.animalDate
	}
}
