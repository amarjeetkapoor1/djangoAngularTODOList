import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './lists/list/list.component';
import { ListsService } from './shared/lists.service';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './lists/list/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    ListComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ListsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
