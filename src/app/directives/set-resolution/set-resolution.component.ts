import {Component, ComponentRef, OnInit} from '@angular/core';
import {IModalDialog, IModalDialogButton, IModalDialogOptions, IModalDialogSettings} from 'ngx-modal-dialog';
import {Sprint} from '../../services/sprint';
import {TranslateService} from '@ngx-translate/core';
import {IssueResolution, IssueState} from '../../services/Enums';
import {Issue} from '../../services/issue';


@Component({
  selector: 'app-set-resolution',
  templateUrl: './set-resolution.component.html',
  styleUrls: ['./set-resolution.component.scss']
})
export class SetResolutionComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];

  resolution;
  issueResolutions = IssueResolution.IssueResolutions;
  private issue: Issue;

  constructor(public translate: TranslateService) {
    this.actionButtons = [
      {
        text: this.translate.instant('set-resolution.save'),
        buttonClass: 'btn btn-primary',
        onAction: () => {
          if (this.resolution) {
            this.issue.state = IssueState.done;
            this.issue.resolution = IssueResolution.get(this.resolution);
            return true;
          } else {
            return false;
          }
        }
      }
    ];
  }

  dialogInit(reference: ComponentRef<any>, options: Partial<IModalDialogOptions<Sprint>>) {
    this.issue = options.data['issue'];
  }
}
