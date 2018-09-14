import {Component, ComponentRef, OnInit} from '@angular/core';
import {IModalDialog, IModalDialogOptions, IModalDialogButton, IModalDialogSettings} from 'ngx-modal-dialog';
import {Sprint} from '../services/sprint';
import {SprintService} from '../services/sprint.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-new-sprint',
  templateUrl: './new-sprint.component.html',
  styleUrls: ['./new-sprint.component.scss']
})
export class NewSprintComponent implements OnInit, IModalDialog {
  settings: IModalDialogSettings[];
  actionButtons: IModalDialogButton[];
  sprintService: SprintService;
  sprint: Sprint;
  private translate: TranslateService;

  constructor(sprintService: SprintService, translate: TranslateService) {
    this.sprintService = sprintService;
    this.translate = translate;
    this.settings = []; // TODO sbs css configuartion???
    this.actionButtons = [
      {
        text: translate.instant('new-sprint.save'),
        buttonClass: 'btn btn-primary',
        onAction: () => {
          this.sprintService.put(this.sprint);
          return true;
        }
      },
      {
        text: translate.instant('new-sprint.cancel'),
        buttonClass: 'btn btn-light',
        onAction: () => {
          console.log('new sprint modal dialog canceled');
          return true;
        }
      }
    ];
  }

  ngOnInit(): void {
    this.sprint = this.sprintService.create();
  }

  dialogInit(reference: ComponentRef<any>, options: Partial<IModalDialogOptions<Sprint>>) {
    // no processing needed
  }

}
