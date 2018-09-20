import _ from 'lodash';
import {UUID} from 'angular2-uuid';

enum LinkType {
  related = 'related',
  blocks = 'blocks',
  isBlockedBy = 'isBlockedBy'
}

export class IssueLinkPair {
  baseIssueLink;
  relatedIssueLink;

  constructor(issueLinkTypeString: string, baseIssueId: string, relatedIssueId: string) {
    const issueLinkType = IssueLinkType.getIssueLinkType(issueLinkTypeString);
    this.baseIssueLink = new IssueLink(relatedIssueId, issueLinkType.type);
    this.relatedIssueLink = new IssueLink(baseIssueId, issueLinkType.counterType);
    this.baseIssueLink.relatedIssueLinkId = this.relatedIssueLink.id;
    this.relatedIssueLink.relatedIssueLinkId = this.baseIssueLink.id;
  }
}

export class IssueLink {
  private _id;
  private _relatedIssueLinkId;

  constructor(private _relatedIssueId: string, private _linkType: LinkType) {
    this._id = UUID.UUID();
  }

  get id() {
    return this._id;
  }

  get relatedIssueLinkId() {
    return this._relatedIssueLinkId;
  }

  set relatedIssueLinkId(value) {
    this._relatedIssueLinkId = value;
  }

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
    return _.find(IssueLinkType.issueLinkTypes, t => t.type === type);
  }

  constructor(private _type: LinkType, private _counterType: LinkType) {}

  get type(): LinkType {
    return this._type;
  }

  get counterType(): LinkType {
    return this._counterType;
  }
}


