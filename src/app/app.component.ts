import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IssueService} from './services/issue.service';
import {AssigneeService} from './services/assignee.service';
import {SprintService} from './services/sprint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EasyScum';

  constructor(public translate: TranslateService,
              private issueService: IssueService,
              private assigneeService: AssigneeService,
              private sprintService: SprintService) {
    this.setUserLanguage();
    this.assigneeService = assigneeService;
    this.sprintService = sprintService;
    this.issueService = issueService;
    // TODO remove later
    this.assigneeService.setupDummyData();
    this.sprintService.setupDummyData();
    this.issueService.setupDummyData();
  }

  public switchLang(lang: string): void {
    this.translate.use(lang);
  }

  private setUserLanguage(): void {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(this.determindUserLanguage());
  }

  private determindUserLanguage(): string {
    let lang;
    switch (navigator.language) {
      case 'de':
      case 'de-DE':
        lang = 'de';
        break;
      case 'fr':
      case 'it':
      case 'en':
      default:
        lang = 'en';
        break;
    }
    return lang;
  }
}
