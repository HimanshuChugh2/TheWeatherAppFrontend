import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { WeatherService } from './services/weather.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms'; // Import this line
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HttpErrorInterceptor } from './ErrorHanding/error-interceptor.service';
import { IonicModule } from '@ionic/angular'; // Adjust the import path


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSlideToggleModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FontAwesomeModule,
    FormsModule,
    MatProgressBarModule,
    IonicModule.forRoot(),
    
  ],
  providers: [
    WeatherService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
