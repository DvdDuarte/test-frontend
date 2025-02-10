import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GameListComponent } from './components/game-list/game-list.component';
import { SlotMachineComponent } from './components/slot-machine/slot-machine.component';

const appRoutes: Routes = [
  { path: '', component: GameListComponent }, 
  { path: 'slot-machine', component: SlotMachineComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), 
    provideAnimations(),
    provideRouter(appRoutes),
    importProvidersFrom(
      MatToolbarModule, 
      MatButtonModule, 
      MatFormFieldModule, 
      MatInputModule
    )
  ]
};
