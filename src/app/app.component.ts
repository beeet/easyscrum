import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EasyScum';
  translate;

  constructor(translate: TranslateService) {
    this.translate = translate;
    this.setUserLanguage();
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
