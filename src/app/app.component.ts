import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IssueService} from './services/issue.service';
import {AssigneeService} from './services/assignee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EasyScum';
  translate;
  private issueService: IssueService;
  private assigneeService: AssigneeService;

  constructor(translate: TranslateService, issueService: IssueService, assigneeService: AssigneeService) {
    this.translate = translate;
    this.setUserLanguage();
    this.issueService = issueService;
    this.issueService.setupDummyData(); // TODO remove later
    this.assigneeService = assigneeService;
    this.assigneeService.setupDummyData(); // TODO remove later
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
