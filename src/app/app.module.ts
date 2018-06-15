import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

// import Routing
import { RouterModule, Routes } from '@angular/router';

// import App Components
import { AppComponent } from './app.component';
import { SprintBacklogComponent } from './sprint-backlog/sprint-backlog.component';
import { IssueBoardComponent } from './issue-board/issue-board.component';
import { BurndownChartComponent } from './burndown-chart/burndown-chart.component';
import { ProductBacklogComponent } from './product-backlog/product-backlog.component';


const appRoutes: Routes = [
  { path: 'sprint-backlog', component: SprintBacklogComponent },
  { path: 'issue-board', component: IssueBoardComponent },
  { path: 'burndown-chart', component: BurndownChartComponent },
  { path: 'product-backlog', component: ProductBacklogComponent },
  ];

@NgModule({
  declarations: [
    AppComponent,
    SprintBacklogComponent,
    IssueBoardComponent,
    BurndownChartComponent,
    ProductBacklogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
