import { Component, OnInit } from '@angular/core';
import { User } from '../app/models/users'
import { UserService } from './services/user.service';
import { pathServices } from './services/pathServices';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'examen angular + node';
  public user = new User("", "", "", "", "", "view", null);
  public userReg = new User("", "", "", "", "", "view", null);
  public identity;
  public token;
  public url = pathServices.url;
  public imagenUser;
  public usersLists;
  public userRead;
  public userEdit: boolean = false;

  constructor(private _userService: UserService) { };

  ngOnInit() {
    // aca verifica si el usuario tenia la sesion abierta localmente
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    if (this.identity != null) {
      this.allUsers(this.token);
    }

  }

  //function para cerrar sesion del usuario
  logout() {
    // borramos la sesion localmente
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this.clearUser();
  }

  // en esta funcion creamos o logeamos un usuario
  onSubmit(type) {
    if (type === 'login') {
      // aca se va  a logear el usuario
      this._userService.loginUser(this.user).subscribe(data => {
        this.identity = data;
        // aca seteamos una imagen por default si el usuario no tiene una imagen cargada
        if (this.identity.image === 'undefined' || this.identity.image === undefined || this.identity.image === null || this.identity.image === 'null' || this.identity.image === '' || this.identity.image === ' ') {
          this.identity.image = 'unknown.png';
        }
        // aca guardamos la sesion del usuario localmente
        localStorage.setItem('identity', JSON.stringify(this.identity));
        this._userService.loginUser(this.user, true).subscribe(data => {
          // aca generamos un token del usuario logeado
          this.token = data;
          // aca guardamos el token del usuario localmente
          localStorage.setItem('token', this.token.value);
          // llamamos esta funcion para limpiar los inputs
          this.clearUser();
          this.allUsers(this.token.value);
        }, err => {
          alert("Tiro Error de token");
        });
      }, err => {
        alert("Tiro Error");
      });
    } else {
      // en esta funcion creamos un nuevo usuario
      this._userService.createUser(this.userReg).subscribe(data => {
        // llamamos esta funcion para limpiar los inputs luego de crear el usuario
        this.clearUser();
      }, err => {
        alert("no se pudo crear el usuario");
      });
    };
  }

  // esta funcion es para limiar los inputs
  clearUser() {
    this.user = new User("", "", "", "", "", "view", null);
    this.userReg = new User("", "", "", "", "", "view", null);
  }
  //habilitar la actualizacion del usuario
  updateUser(userId) {
    this.userEdit = !this.userEdit;
    if (this.userEdit !== false) {
      this._userService.getUser(userId, this.token).subscribe(data => {
        this.userRead = data;
      });
    }
  }

  // cancelar actualizacion del usuario
  cancelEdit() {
    this.userEdit = false;
  }

  // actualizar usuario
  aceptEdit(user) {
    this._userService.updateUser(user._id, user, this.token).subscribe(data => {
      this.allUsers(this.token);
    });

  };
  //eliminar usuario
  deleteUser(userId) {
    this._userService.deleteUser(userId, this.token).subscribe(data => {
      this.allUsers(this.token);
    });
  }

  // obtener todos los usuarios
  allUsers(token) {
    this._userService.getAllUser(token).subscribe(data => {
      this.usersLists = data;
    });
  }

  // dar admin al usuario
  adminUser(userId) {
    this._userService.getUser(userId, this.token).subscribe(data => {
      let user = data;
      if (user) {
        user.role = 'admin';
        this._userService.updateUser(userId, user, this.token).subscribe(data => {
          this.allUsers(this.token);
        });
      }
    })

  }

  // sacar admin al usuario
  viewUser(userId) {
    this._userService.getUser(userId, this.token).subscribe(data => {
      let user = data;
      if (user) {
        user.role = 'view';
        this._userService.updateUser(userId, user, this.token).subscribe(data => {
          this.allUsers(this.token);
        });
      }
    })
  }

}
