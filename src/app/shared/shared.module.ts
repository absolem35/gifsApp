import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FavoritosDirective } from './directives/favoritos.directive';



@NgModule({
  declarations: [
    SidebarComponent,
    FavoritosDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    FavoritosDirective
  ]

})
export class SharedModule { }
