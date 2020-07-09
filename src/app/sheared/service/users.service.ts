import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { query } from '@angular/animations';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user: Observable<any>
  event: Observable<any>
  constructor(private afDatabase: AngularFireDatabase,private toaste : ToastService) { }

  getUsers(name: string) {
    //recupere l'objet de user ou son nom egal a la variable name
    this.user = this.afDatabase.list(`user`, ref =>
      ref.orderByChild('role').equalTo(name)
    ).snapshotChanges().pipe(
      //map a diviser l'objet en key et val()
      map(chang =>
        chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
      )
    )
    return this.user;
  }
    getUserId(id : any) {
     return this.afDatabase.object(`user/${id}`).valueChanges();
    }
    getenfant(parent) {
      this.user = this.afDatabase.list(`user/`, ref =>
      ref.orderByChild('parent').equalTo(parent)
    ).snapshotChanges().pipe(
      //map a diviser l'objet en key et val()
      map(chang =>
        chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
      )
    )
    return this.user;
     }
     changeprenom(id,nom){
      this.afDatabase.object(`user/`+id).update({
        firstName:nom,
      })
    }
    changenom(id,pren){
      this.afDatabase.object(`user/`+id).update({
        lastName:pren,
      })
    }
    changemail(id,mail){
      this.afDatabase.object(`user/`+id).update({
        email:mail,
      })
    }
    changenum(id,num){
      this.afDatabase.object(`user/`+id).update({
        num_Tel:num,
      })
    }
    changeclasse(id,num){
      this.afDatabase.object(`user/`+id).update({
        code:num,
      })
    }
    allclasse(id){
      this.user = this.afDatabase.list(`Affectation/`+id).snapshotChanges().pipe(
      //map a diviser l'objet en key et val()
      map(chang =>
        chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
      )
    )
    return this.user;
    }
    deleteclasse(id,id_classe){
      this.afDatabase.list(`Affectation/`+id).remove(id_classe)
  this.toaste.showSuccess("suppresion avec success " , "success")
    }
    getevent(){
      this.event = this.afDatabase.list('Event_notif').snapshotChanges().pipe(
        map(chang =>
          chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
        )
      )
      return this.event;
    }
    getreunion(id){
      this.event = this.afDatabase.list('prof_reunion/'+id).snapshotChanges().pipe(
        map(chang =>
          chang.map(c => ({ key: c.payload.key, val: c.payload.val() }))
        )
      )
      return this.event;
    }
  }



