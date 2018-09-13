import {RouterModule, Routes} from '@angular/router';
import {SprintBacklogComponent} from './pages/sprint-backlog/sprint-backlog.component';
import {IssueBoardComponent} from './pages/issue-board/issue-board.component';
import {ChartBoardComponent} from './pages/chart-board/chart-board.component';
import {ProductBacklogComponent} from './pages/product-backlog/product-backlog.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: '', component: SprintBacklogComponent},
  {path: 'sprint-backlog', component: SprintBacklogComponent},
  {path: 'issue-board', component: IssueBoardComponent},
  {path: 'issue-board/:id', component: IssueBoardComponent},
  {path: 'chart-board', component: ChartBoardComponent},
  {path: 'product-backlog', component: ProductBacklogComponent},
  {path: '**', component: PageNotFoundComponent}
];

export const routing = RouterModule.forRoot(
  appRoutes,
  {enableTracing: false} // <-- true: debugging purposes only
);
