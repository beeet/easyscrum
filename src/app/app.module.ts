import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// import App Components
import { AppComponent } from './app.component';
import { SprintBacklogComponent } from './sprint-backlog/sprint-backlog.component';
import { IssueBoardComponent } from './issue-board/issue-board.component';
import { BurndownChartComponent } from './burndown-chart/burndown-chart.component';
import { ProductBacklogComponent } from './product-backlog/product-backlog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// import Translation FW
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';

// import Bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IssueService} from './services/issue.service';

const appRoutes: Routes = [
  { path: 'sprint-backlog', component: SprintBacklogComponent },
  { path: 'issue-board', component: IssueBoardComponent },
  { path: 'issue-board/:id', component: IssueBoardComponent },
  { path: 'burndown-chart', component: BurndownChartComponent },
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
    BurndownChartComponent,
    ProductBacklogComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
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
    FormsModule
  ],
  exports: [
    CommonModule
  ],
  providers: [
    IssueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
