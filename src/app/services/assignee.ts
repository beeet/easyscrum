export class Assignee {
    id: string;
    private _nickname: string;
    private _avatar: string;


    get nickname(): string {
        return this._nickname;
    }

    set nickname(value: string) {
        this._nickname = value;
    }

    get avatar(): string {
        return this._avatar;
    }

    set avatar(value: string) {
        this._avatar = value;
    }
}
