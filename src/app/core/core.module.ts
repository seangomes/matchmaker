import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

//MODULES
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { CoreRoutingModule } from './core-routing.module';
import { RouterModule } from '@angular/router';

//SERVICES
import { AuthService } from './providers/auth/auth.service';
import { UploadService } from "./providers/upload/upload.service";
import { AuthGuard } from './providers/guard/auth.guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, AuthGuard, UploadService],
  exports: [RouterModule]
})
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
 }
