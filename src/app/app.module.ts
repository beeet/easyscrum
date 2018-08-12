import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// import App Components
import { AppComponent } from './app.component';
import { SprintBacklogComponent } from './sprint-backlog/sprint-backlog.component';
import { IssueBoardComponent } from './issue-board/issue-board.component';
import { ProductBacklogComponent } from './product-backlog/product-backlog.component';
import { ChartBoardComponent } from './chart-board/chart-board.component';
import { BurndownChartComponent } from './chart-board/burndown-chart/burndown-chart.component';
import { SprintIssueRatioComponent } from './chart-board/sprint-issue-ratio/sprint-issue-ratio.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IssueService } from './services/issue.service';
import { AssigneeService } from './services/assignee.service';
import { SprintService } from './services/sprint.service';

// import Translation FW
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// import Bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// import Charts
import { ChartsModule } from 'ng2-charts/ng2-charts';

// import drag'n'drop
import {DragulaModule} from 'ng2-dragula';
import { FilterTableComponent } from './filter-table/filter-table.component';

const appRoutes: Routes = [
  { path: '', component: SprintBacklogComponent },
  { path: 'sprint-backlog', component: SprintBacklogComponent },
  { path: 'issue-board', component: IssueBoardComponent },
  { path: 'issue-board/:id', component: IssueBoardComponent },
  { path: 'chart-board', component: ChartBoardComponent },
  { path: 'product-backlog', component: ProductBacklogComponent },
  { path: '**', component: PageNotFoundComponent }
  ];

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SprintBacklogComponent,
    IssueBoardComponent,
    ProductBacklogComponent,
    ChartBoardComponent,
    BurndownChartComponent,
    PageNotFoundComponent,
    SprintIssueRatioComponent,
    FilterTableComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- true: debugging purposes only
    ),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgbModule.forRoot(),
    FormsModule,
    ChartsModule,
    DragulaModule
  ],
  exports: [
    CommonModule
  ],
  providers: [
    IssueService,
    AssigneeService,
    SprintService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
