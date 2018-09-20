import _ from 'lodash';

enum LinkType {
  related = 'related',
  blocks = 'blocks',
  isBlockedBy = 'isBlockedBy'
}

export class IssueLink {

  constructor(private _relatedIssueId: string, private _linkType: LinkType) {}

  get relatedIssueId(): string {
    return this._relatedIssueId;
  }

  get linkType(): LinkType {
    return this._linkType;
  }
}

export class IssueLinkType {
  public static readonly related = new IssueLinkType(LinkType.related, LinkType.related);
  public static readonly blocks = new IssueLinkType(LinkType.blocks, LinkType.isBlockedBy);
  public static readonly isBlockedBy = new IssueLinkType(LinkType.isBlockedBy, LinkType.blocks);
  public static readonly issueLinkTypes = [ IssueLinkType.related, IssueLinkType.blocks, IssueLinkType.isBlockedBy ];

  public static getIssueLinkType(type: string): IssueLinkType {
    console.log('IssueType: input=', type);
    console.log('IssueType: types=', IssueLinkType.issueLinkTypes);
    return _.find(IssueLinkType.issueLinkTypes, t => {
      console.log(' - IssueType: type=', t, t.type === type);
      return t.type === type;
    });
  }

  constructor(private _type: LinkType, private _counterType: LinkType) {}

  get type(): LinkType {
    return this._type;
  }

  get counterType(): LinkType {
    return this._counterType;
  }
}


