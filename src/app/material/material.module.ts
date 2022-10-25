import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';

const MaterialModules = [
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatDialogModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatRadioModule,
  MatExpansionModule,
];
@NgModule({
  imports: [MaterialModules],
  exports: [MaterialModules],
})
export class MaterialModule {}
