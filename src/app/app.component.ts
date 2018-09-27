import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IssueService} from './services/issue.service';
import {AssigneeService} from './services/assignee.service';
import {SprintService} from './services/sprint.service';
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public static readonly DRAGABLE = 'dnd-enabled';
  lang;
  title = 'EasyScum';
  contextmenu;

  constructor(public translate: TranslateService,
              private issueService: IssueService,
              private assigneeService: AssigneeService,
              private sprintService: SprintService,
              private dragulaService: DragulaService) {
    this.setUserLanguage();
    this.assigneeService = assigneeService;
    this.sprintService = sprintService;
    this.issueService = issueService;
    this.contextmenu = {
      visible: false,
      posX: 0,
      posY: 0
    };
    // Dragula Einstellungen für drag'n'drop
    dragulaService.setOptions('backlog-issues', {
      // wird das Element ausserhalb der Drop-fähigen Zone fallengelassen, passiert nichts
      revertOnSpill: true,
      // das Verhalten beim Droppen kann definiert werden.
      moves: this.canDrag
    });
    dragulaService.setOptions('sprint-issues', {
      // wird das Element ausserhalb der Drop-fähigen Zone fallengelassen, passiert nichts
      revertOnSpill: true,
      // das Verhalten beim Droppen kann definiert werden.
      moves: this.canDrag
    });
    // TODO: remove later start
    // this.assigneeService.setupDummyData();
    // this.sprintService.setupDummyData();
    // this.issueService.setupDummyData();
  }

  /*
   * nur wenn die Klasse aus AppComponent.DRAGABLE gesetzt ist, kann das Element verschoben werden.
   */
  private canDrag(el: any): any {
    return el.classList.contains(AppComponent.DRAGABLE);
  }

  public switchLang(lang: string): void {
    this.lang = lang;
    this.translate.use(lang);
  }

  private setUserLanguage(): void {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(this.determindUserLanguage());
  }

  private determindUserLanguage(): string {
    switch (navigator.language) {
      case 'de':
      case 'de-DE':
        this.lang = 'de';
        break;
      case 'fr':
      case 'it':
      case 'en':
      default:
        this.lang = 'en';
        break;
    }
    return this.lang;
  }

  onrightClick(event) {
    this.contextmenu.visible = !this.contextmenu.visible;
    if (this.contextmenu.visible) {
      this.contextmenu.posX = event.clientX + 10;
      this.contextmenu.posY = event.clientY + 20;
      this.contextmenu.target = event.item;
      this.contextmenu.source = event.source;
      this.contextmenu.visible = true;
    }
  }

  closeContextMenu() {
    this.contextmenu.visible = false;
  }
}
