import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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

// import App Components
import { AppComponent } from './app.component';
import { SprintBacklogComponent } from './pages/sprint-backlog/sprint-backlog.component';
import { IssueBoardComponent } from './pages/issue-board/issue-board.component';
import { ProductBacklogComponent } from './pages/product-backlog/product-backlog.component';
import { ChartBoardComponent } from './pages/chart-board/chart-board.component';
import { BurndownChartComponent } from './pages/chart-board/burndown-chart/burndown-chart.component';
import { SprintIssueRatioComponent } from './pages/chart-board/sprint-issue-ratio/sprint-issue-ratio.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { IssueService } from './services/issue.service';
import { AssigneeService } from './services/assignee.service';
import { SprintService } from './services/sprint.service';
import { FilterTableComponent } from './directives/filter-table/filter-table.component';
import { ContextMenuComponent } from './directives/context-menu/context-menu.component';
import { HighlightDirective } from './directives/highlight/highlight.directive';

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
    FilterTableComponent,
    ContextMenuComponent,
    HighlightDirective
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
    ReactiveFormsModule,
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
