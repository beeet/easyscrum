import {DateUtil} from '../utils/date.util';
import {IssuePriority, IssueResolution, IssueState, IssueType} from './Enums';

export let dateUtil = new DateUtil();

export let assigneeData = [
  {
    id: 'ASG18-00001',
    nickname: 'Bruce Wayne',
    avatar: 'batman'
  },
  {
    id: 'ASG18-00002',
    nickname: 'Gandalf the white',
    avatar: 'gandalf'
  },
  {
    id: 'ASG18-00003',
    nickname: 'John Rambo',
    avatar: 'rambo'
  },
  {
    id: 'ASG18-00004',
    nickname: 'Lucky Luke',
    avatar: 'cowboy'
  },
  {
    id: 'ASG18-00005',
    nickname: 'Robert Stark',
    avatar: 'king'
  },
  {
    id: 'ASG18-00006',
    nickname: 'Jack Sparrow',
    avatar: 'pirat'
  },
];

export let sprintData = [
  {
    sprintId: 'SPR18-00001',
    name: 'Sprint KW37-38',
    begin: dateUtil.newDate(2018, 8, 10),
    end: dateUtil.newDate(2018, 8, 23)
  },
  {
    sprintId: 'SPR18-00002',
    name: 'Sprint KW39-40',
    begin: dateUtil.newDate(2018, 8, 24),
    end: dateUtil.newDate(2018, 9, 7)
  },
  {
    sprintId: 'SPR18-00003',
    name: 'Sprint KW41-42',
    begin: dateUtil.newDate(2018, 9, 8),
    end: dateUtil.newDate(2018, 9, 21)
  },
  {
    sprintId: 'SPR18-00004',
    name: 'Sprint KW43-44',
    begin: dateUtil.newDate(2018, 9, 22),
    end: dateUtil.newDate(2018, 10, 4)
  }
];
export let issueData = [];
issueData = [
  {
    id: '1',
    title: 'Defending Gotham',
    description: 'Defend Gotham city from Joker.',
    type: IssueType.story,
    priority: IssuePriority.major,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00001',
    creationDate: '2018-09-01',
    dueDate: '2018-09-13',
    estimated: 16,
    elapsed: 12,
    highlighting: false,
    resolution: IssueResolution.done,
    resolutionDate: '2018-09-11',
    comments: [],
    issueLinks: []
  },
  {
    id: '2',
    title: 'Lock up Joker',
    description: 'Catch Joker and put him behind bars.',
    type: IssueType.task,
    priority: IssuePriority.medium,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00001',
    creationDate: '2018-09-01',
    dueDate: '2018-09-15',
    estimated: 20,
    elapsed: 18,
    highlighting: false,
    resolution: IssueResolution.done,
    resolutionDate: '2018-09-13',
    comments: [],
    issueLinks: []
  },
  {
    id: '3',
    title: 'Catch Two-Face',
    description: 'Put Two-Face out of action.',
    type: IssueType.bug,
    priority: IssuePriority.critical,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00001',
    creationDate: '2018-09-01',
    dueDate: '2018-09-20',
    estimated: 24,
    elapsed: 20,
    highlighting: false,
    resolution: IssueResolution.done,
    resolutionDate: '2018-09-19',
    comments: [],
    issueLinks: []
  },
  {
    id: '4',
    title: 'Cleant the Batmobil',
    description: 'Batmobil wash and clean inside.',
    type: IssueType.task,
    priority: IssuePriority.trivial,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00001',
    creationDate: '2018-08-01',
    dueDate: '2018-21-31',
    estimated: 4,
    elapsed: 3,
    highlighting: false,
    resolution: IssueResolution.done,
    resolutionDate: '2018-09-20',
    comments: [],
    issueLinks: []
  },
  {
    id: '5',
    title: 'Defuse the Bomb',
    description: 'Disarm the bomb in the subway.',
    type: IssueType.bug,
    priority: IssuePriority.critical,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00001',
    creationDate: '2018-09-21',
    dueDate: '2018-09-21',
    estimated: 8,
    elapsed: 8,
    highlighting: false,
    resolution: IssueResolution.done,
    resolutionDate: '2018-09-21',
    comments: [],
    issueLinks: []
  },
  {
    id: '6',
    title: 'Destroy Sauron',
    description: 'Find Sauron and destroy him.',
    type: IssueType.story,
    priority: IssuePriority.major,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00002',
    creationDate: '2018-09-01',
    dueDate: '2018-09-23',
    estimated: 80,
    elapsed: 72,
    highlighting: false,
    resolution: IssueResolution.done,
    resolutionDate: '2018-09-21',
    comments: [],
    issueLinks: []
  },
  {
    id: '7',
    title: 'Grind the knife',
    description: 'Knife to grind.',
    type: IssueType.task,
    priority: IssuePriority.trivial,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00003',
    creationDate: '2018-08-01',
    dueDate: '2018-09-23',
    estimated: 4,
    elapsed: 4,
    highlighting: false,
    resolution: IssueResolution.done,
    resolutionDate: '2018-09-10',
    comments: [],
    issueLinks: []
  },
  {
    id: '8',
    title: 'Pick up the knife',
    description: 'Pick up the ground knife.',
    type: IssueType.task,
    priority: IssuePriority.trivial,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00003',
    creationDate: '2018-09-10',
    dueDate: '2018-09-12',
    estimated: 4,
    elapsed: 4,
    highlighting: false,
    resolution: IssueResolution.done,
    resolutionDate: '2018-09-12',
    comments: [],
    issueLinks: []
  },
  {
    id: '9',
    title: 'Make arrows',
    description: 'Fill the quiver.',
    type: IssueType.story,
    priority: IssuePriority.medium,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00003',
    creationDate: '2018-09-01',
    dueDate: '2018-09-23',
    estimated: 32,
    elapsed: 30,
    highlighting: false,
    resolution: IssueResolution.done,
    resolutionDate: '2018-09-21',
    comments: [],
    issueLinks: []
  },
  {
    id: '10',
    title: 'Veterinarian visit with Rantanplan',
    description: 'Take Rantanplan to the vet an have him vaccinated.',
    type: IssueType.story,
    priority: IssuePriority.minor,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00004',
    creationDate: '2018-09-01',
    dueDate: '2018-09-21',
    estimated: 10,
    elapsed: 8,
    highlighting: true,
    resolution: IssueResolution.done,
    resolutionDate: '2018-09-21',
    comments: [],
    issueLinks: []
  },
  {
    id: '11',
    title: 'Inspect the bank',
    description: 'Search the bank for traces of the Daltons.',
    type: IssueType.bug,
    priority: IssuePriority.critical,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00004',
    creationDate: '2018-09-20',
    dueDate: '2018-09-20',
    estimated: 10,
    elapsed: 8,
    highlighting: false,
    resolution: IssueResolution.done,
    resolutionDate: '2018-09-20',
    comments: [],
    issueLinks: []
  },
  {
    id: '12',
    title: 'Become king of the north',
    description: 'To be elected king of the north.',
    type: IssueType.task,
    priority: IssuePriority.minor,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00006',
    creationDate: '2018-09-01',
    dueDate: '2018-09-16',
    estimated: 40,
    elapsed: 30,
    highlighting: false,
    resolution: IssueResolution.done,
    resolutionDate: '2018-09-14',
    comments: [],
    issueLinks: []
  },
  {
    id: '13',
    title: 'Attack King\'s Landing',
    description: 'Attack King\'s Landing and decapiatet the Lannisters.',
    type: IssueType.story,
    priority: IssuePriority.major,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00006',
    creationDate: '2018-09-15',
    dueDate: '2018-09-30',
    estimated: 40,
    elapsed: 20,
    highlighting: false,
    resolution: IssueResolution.wontFix,
    resolutionDate: '2018-09-23',
    comments: [],
    issueLinks: []
  },
  {
    id: '14',
    title: 'Conquer Casterlystein',
    description: 'Conquer and destroy Casterlystein.',
    type: IssueType.task,
    priority: IssuePriority.major,
    state: IssueState.inWork,
    sprintId: 'SPR18-00002',
    assigneeID: 'ASG18-00005',
    creationDate: '2018-09-23',
    dueDate: '2018-10-07',
    estimated: 40,
    elapsed: 8,
    highlighting: false,
    resolution: undefined,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  },
  {
    id: '15',
    title: 'Stop the Riddler',
    description: 'Find and stop the insane Riddler.',
    type: IssueType.story,
    priority: IssuePriority.medium,
    state: IssueState.inWork,
    sprintId: 'SPR18-00002',
    assigneeID: 'ASG18-00001',
    creationDate: '2018-09-20',
    dueDate: '2018-09-30',
    estimated: 17,
    elapsed: 0,
    highlighting: false,
    resolution: undefined,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  },
  {
    id: '16',
    title: 'Destroy the ring',
    description: 'Help Frodo to destroy the ring',
    type: IssueType.task,
    priority: IssuePriority.medium,
    state: IssueState.open,
    sprintId: 'SPR18-00002',
    assigneeID: 'ASG18-00002',
    creationDate: '2018-09-28',
    dueDate: '2018-09-17',
    estimated: 9,
    elapsed: 0,
    highlighting: false,
    resolution: undefined,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  },
  {
    id: '17',
    title: 'Defend Winterfell',
    description: 'Go back an defend Winterfell against Theon.',
    type: IssueType.story,
    priority: IssuePriority.critical,
    state: IssueState.open,
    sprintId: 'SPR18-00002',
    assigneeID: 'ASG18-00005',
    creationDate: '2018-09-24',
    dueDate: '2018-09-19',
    estimated: 18,
    elapsed: 0,
    highlighting: false,
    resolution: undefined,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  },
  {
    id: '18',
    title: 'Sink the Pearl',
    description: 'Find and sink the Black Pearl.',
    type: IssueType.bug,
    priority: IssuePriority.critical,
    state: IssueState.open,
    sprintId: 'SPR18-00002',
    assigneeID: 'ASG18-00006',
    creationDate: '2018-09-12',
    dueDate: '2018-09-20',
    estimated: 11,
    elapsed: 0,
    highlighting: false,
    resolution: undefined,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  },
  {
    id: '19',
    title: 'Bring frodo back',
    description: 'Bring frodo back to the shire.',
    type: IssueType.story,
    priority: IssuePriority.major,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: 'ASG18-00002',
    creationDate: '2018-09-01',
    dueDate: '2018-10-26',
    estimated: 24,
    elapsed: 0,
    highlighting: false,
    resolution: undefined,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  },
  {
    id: '20',
    title: 'Feed Jolly Jumper',
    description: 'Do not feed a horse that you can not ride.',
    type: IssueType.task,
    priority: IssuePriority.medium,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: 'ASG18-00002',
    creationDate: '2018-09-10',
    dueDate: '2018-10-25',
    estimated: 8,
    elapsed: 0,
    highlighting: false,
    resolution: undefined,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  }
];
issueData[1].issueLinks = [
  issueData[2],
  issueData[3]
];
