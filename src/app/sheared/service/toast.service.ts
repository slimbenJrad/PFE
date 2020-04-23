import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastr: ToastrService) { }
  showInfo(message, title){
    this.toastr.info(message, title)
}
  showSuccess(message, title){
      this.toastr.success(message, title)
  }
}
