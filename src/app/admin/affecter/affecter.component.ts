import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/app/sheared/service/publication.service';
import { MatiereService } from 'src/app/sheared/service/matiere.service';
import { ClasseService } from 'src/app/sheared/service/classe.service';

@Component({
  selector: 'app-affecter',
  templateUrl: './affecter.component.html',
  styleUrls: ['./affecter.component.css']
})
export class AffecterComponent implements OnInit {
  prof:any;
  selectedValue:any;
  matiere:any;
  classe:any;
  selectedMatiere:any;
  selectedClasse;
  selectedProf;
  constructor(private group: ClasseService,private publication: PublicationService,private mat:MatiereService) { }

  ngOnInit(): void {
    
    this.prof=this.publication.getAllprof();
    this.prof.subscribe(data=>{
      this.prof = data
      console.log("prof",this.prof)
    })
    this.matiere=this.mat.getAllMatiere();
    this.matiere.subscribe(data=>{
      let log =data 
      console.log("log",log)
    })
    console.log("mat",this.matiere)
    this.classe=this.group.getclasse();

  }
affecter(){
  console.log("selectedMatiere",this.selectedMatiere.val.nom)
  this.mat.Affectation(this.selectedProf,this.selectedClasse,this.selectedMatiere.key,this.selectedMatiere.val.nom)
}
}
