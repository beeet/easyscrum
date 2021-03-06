// angular core
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// import Translation FW
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

// import Bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// import Charts
import {ChartsModule} from 'ng2-charts/ng2-charts';

// import drag'n'drop
import {DragulaModule} from 'ng2-dragula';

// import Modal Dialog
import { ModalDialogModule } from 'ngx-modal-dialog';

// Routing
import {AppRouting} from './app.routing.module';

// Service Worker
import {environment} from '../environments/environment';
import {ServiceWorkerModule} from '@angular/service-worker';

// import App Components
import {AppComponent} from './app.component';
import {SprintBacklogComponent} from './pages/sprint-backlog/sprint-backlog.component';
import {IssueBoardComponent} from './pages/issue-board/issue-board.component';
import {ProductBacklogComponent} from './pages/product-backlog/product-backlog.component';
import {ChartBoardComponent} from './pages/chart-board/chart-board.component';
import {BurndownChartComponent} from './pages/chart-board/burndown-chart/burndown-chart.component';
import {SprintIssueRatioComponent} from './pages/chart-board/sprint-issue-ratio/sprint-issue-ratio.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {FilterTableComponent} from './directives/filter-table/filter-table.component';
import {ContextMenuComponent} from './directives/context-menu/context-menu.component';
import {NewSprintComponent} from './directives/new-sprint/new-sprint.component';
import {NewIssueLinkComponent} from './directives/new-issue-link/new-issue-link.component';
import {SetResolutionComponent} from './directives/set-resolution/set-resolution.component';
import {SetSprintComponent} from './directives/set-sprint/set-sprint.component';

// directives & pipes
import {HighlightDirective} from './directives/highlight/highlight.directive';
import {LetDirective} from './directives/ngLet/LetDirective';
import {SprintLabelPipe} from './pipes/sprint-label.pipe';

// services
import {IssueService} from './services/issue.service';
import {AssigneeService} from './services/assignee.service';
import {SprintService} from './services/sprint.service';
import {PersistenceService} from './services/persistence.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    HighlightDirective,
    SprintLabelPipe,
    NewSprintComponent,
    SetResolutionComponent,
    SetSprintComponent,
    NewIssueLinkComponent,
    SetResolutionComponent,
    LetDirective
  ],
  imports: [
    BrowserModule,
    AppRouting,
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
    DragulaModule,
    ModalDialogModule.forRoot(),
    ServiceWorkerModule.register(
      '/ngsw-worker.js',
      {enabled: environment.production}),
    BrowserAnimationsModule
  ],
  entryComponents: [
    NewSprintComponent,
    NewIssueLinkComponent,
    SetResolutionComponent,
    SetSprintComponent
  ],
  exports: [
    CommonModule
  ],
  providers: [
    IssueService,
    AssigneeService,
    SprintService,
    PersistenceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
