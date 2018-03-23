import { Component } from '@angular/core';
import * as _ from "lodash";
import { UserService } from '../user.service';
import { Upload } from '../../models/upload';
import { pathServices } from '../pathServices';


@Component({
  selector: 'upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent {

  imageUpload: Upload;
  dropzoneActive: boolean = false;
  public identity;
  public token;
  private url: string;

  constructor(private _userService: UserService) { }

  // hover image true 
  dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }

  // subir y actualizar la imagen al usuario
  handleDrop(fileList: FileList) {
    // aca verifica si el usuario tenia la sesion abierta localmente
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    let filesIndex = _.range(fileList.length)
    _.each(filesIndex, (idx) => {
      // validamos los formatos de imagen
      if (fileList[idx].type === 'image/jpeg' || fileList[idx].type === 'image/png' || fileList[idx].type === 'image/gif') {
        this.imageUpload = new Upload(fileList[idx]);
        // en este servicio subimos la imagen y se la seteamos al usuario
        this._userService.imageUpload(this.identity._id, this.token, this.imageUpload).subscribe(data => {
          // luego de subir la imagen obtenemos el usuario con la nueva configuracion
          this._userService.getUser(this.identity._id, this.token).subscribe(data => {
            this.identity = data;
            // guardamos la imagen nueva del usuario en el localStorage
            localStorage.setItem('identity', JSON.stringify(this.identity));
            this.url = pathServices.url + 'users/img/' + this.identity.image;
            // aca mostramos el logo en el momento del usuario
            document.getElementById('avatarUser').setAttribute('src', this.url);
          });
        }, err => {
          console.log(err);
        });
      }
    });
  }
}