import {DateUtil} from '../utils/date.util';
import {IssuePriority, IssueResolution, IssueState, IssueType} from './Enums';

export let dateUtil = new DateUtil();

export let assigneeData = [
  {
    id: 'ASG18-00001',
    nickname: 'Adrian Aeby',
    avatar: 'batman'
  },
  {
    id: 'ASG18-00002',
    nickname: 'Beat Schumacher',
    avatar: 'wikinger'
  },
  {
    id: 'ASG18-00003',
    nickname: 'Beat Baumann',
    avatar: 'gandalf'
  },
  {
    id: 'ASG18-00004',
    nickname: 'Justine Buckthought',
    avatar: 'eminem'
  },
  {
    id: 'ASG18-00005',
    nickname: 'Patrizius Alven',
    avatar: 'poolboy'
  },
  {
    id: 'ASG18-00006',
    nickname: 'Sayers Mathwin',
    avatar: 'king'
  },
];

export let sprintData = [
  {
    sprintId: 'SPR18-00001',
    name: 'Sprint KW24-25',
    begin: dateUtil.newDate(2018, 7, 11),
    end: dateUtil.newDate(2018, 7, 24)
  },
  {
    sprintId: 'SPR18-00002',
    name: 'Sprint KW26-27',
    begin: dateUtil.newDate(2018, 7, 25),
    end: dateUtil.newDate(2018, 8, 8)
  },
  {
    sprintId: 'SPR18-00003',
    name: 'Sprint KW28-29',
    begin: dateUtil.newDate(2018, 8, 9),
    end: dateUtil.newDate(2018, 8, 22)
  },
  {
    sprintId: 'SPR18-00004',
    name: 'Sprint KW30-31',
    begin: dateUtil.newDate(2018, 8, 23),
    end: dateUtil.newDate(2018, 9, 5)
  },
  {
    sprintId: 'SPR18-00005',
    name: 'Sprint KW32-33',
    begin: dateUtil.newDate(2018, 9, 6),
    end: dateUtil.newDate(2018, 9, 19)
  },
  {
    sprintId: 'SPR18-00006',
    name: 'Sprint KW34-35',
    begin: dateUtil.newDate(2018, 9, 20),
    end: dateUtil.newDate(2018, 10, 2)
  },
  {
    sprintId: 'SPR18-00007',
    name: 'Sprint KW36-37',
    begin: dateUtil.newDate(2018, 10, 3),
    end: dateUtil.newDate(2018, 10, 16)
  },
  {
    sprintId: 'SPR18-00008',
    name: 'Sprint KW38-39',
    begin: dateUtil.newDate(2018, 10, 17),
    end: dateUtil.newDate(2018, 10, 30)
  }
];
export let issueData = [];
issueData = [
  {
  id: 1,
  title: 'Animation not working',
  description: 'Angular 6 Animation is not working in IE',
  type: IssueType.bug,
  priority: IssuePriority.major,
  state: IssueState.done,
  sprintId: 'SPR18-00001',
  assigneeID: 'ASG18-00001',
  creationDate: '2018-08-10',
  dueDate: '2018-08-13',
  estimated: 17,
  elapsed: 2,
  highlighting: false,
  resolution: IssueResolution.fixed,
  resolutionDate: '2018-08-13',
  comments: [
    {comment: 'No Comment #1'},
    {comment: 'No Comment #2'},
    {comment: 'No Comment #3'},
    {comment: 'No Comment #4'}
  ],
  issueLinks: []
},
  {
    id: 2,
    title: '@angular/pwa is failing',
    description: 'ng add @angular/pwa is failing',
    type: IssueType.bug,
    priority: IssuePriority.major,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00002',
    creationDate: '2018-08-10',
    dueDate: '2018-08-13',
    estimated: 19,
    elapsed: 20,
    highlighting: false,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-08-13',
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'}
    ],
    issueLinks: []
  },
  {
    id: 3,
    title: 'Import less file is not working',
    description: 'Import less file from node_modules in angular library is not working',
    type: IssueType.bug,
    priority: IssuePriority.critical,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00003',
    creationDate: '2018-08-10',
    dueDate: '2018-08-22',
    estimated: 12,
    elapsed: 5,
    highlighting: false,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-08-22',
    comments: [],
    issueLinks: []
  },
  {
    id: 4,
    title: 'Test for new changelog.',
    description: 'Test for new changelog.',
    type: IssueType.task,
    priority: IssuePriority.medium,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00004',
    creationDate: '2018-08-10',
    dueDate: '2018-08-18',
    estimated: 6,
    elapsed: 3,
    highlighting: false,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-08-18',
    comments: [
      {comment: 'No Comment #1'}
    ],
    issueLinks: []
  },
  {
    id: 5,
    title: 'specify files or folders',
    description: 'As a power user, I can specify files or folders to backup based on file size, date created and date modified.',
    type: IssueType.story,
    priority: IssuePriority.medium,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00005',
    creationDate: '2018-08-10',
    dueDate: '2018-08-23',
    estimated: 16,
    elapsed: 16,
    highlighting: false,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-08-23',
    comments: [],
    issueLinks: []
  },
  {
    id: 6,
    title: 'integrity checksum failed when using sha1',
    description: 'integrity checksum failed when using sha1',
    type: IssueType.bug,
    priority: IssuePriority.major,
    state: IssueState.done,
    sprintId: 'SPR18-00001',
    assigneeID: 'ASG18-00006',
    creationDate: '2018-08-10',
    dueDate: '2018-08-15',
    estimated: 16,
    elapsed: 18,
    highlighting: true,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-08-15',
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'}
    ],
    issueLinks: []
  },
  {
    id: 7,
    title: 'doc 404 error',
    description: 'the doc readme content link 404 error',
    type: IssueType.bug,
    priority: IssuePriority.medium,
    state: IssueState.done,
    sprintId: 'SPR18-00002',
    assigneeID: 'ASG18-00001',
    creationDate: '2018-08-15',
    dueDate: '2018-08-28',
    estimated: 16,
    elapsed: 12,
    highlighting: true,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-08-28',
    comments: [],
    issueLinks: []
  },
  {
    id: 8,
    title: 'Import of @angular-devkit/core problem',
    description: 'Import of @angular-devkit/core in schematic results in "Cannot find module \'./schema\'"',
    type: IssueType.bug,
    priority: IssuePriority.major,
    state: IssueState.done,
    sprintId: 'SPR18-00002',
    assigneeID: 'ASG18-00002',
    creationDate: '2018-08-15',
    dueDate: '2018-08-27',
    estimated: 3,
    elapsed: 19,
    highlighting: false,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-08-27',
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'},
      {comment: 'No Comment #3'},
      {comment: 'No Comment #4'}
    ],
    issueLinks: []
  },
  {
    id: 9,
    title: 'Incorrect line numbers',
    description: 'Incorrect line numbers highlighted in coverage report',
    type: IssueType.bug,
    priority: IssuePriority.medium,
    state: IssueState.done,
    sprintId: 'SPR18-00002',
    assigneeID: 'ASG18-00003',
    creationDate: '2018-08-15',
    dueDate: '2018-09-01',
    estimated: 14,
    elapsed: 4,
    highlighting: false,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-09-01',
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'},
      {comment: 'No Comment #3'},
      {comment: 'No Comment #4'}
    ],
    issueLinks: []
  },
  {
    id: 10,
    title: 'Provide best support service',
    description: 'As a user, I am able to able to provide best support service to my customer.',
    type: IssueType.story,
    priority: IssuePriority.minor,
    state: IssueState.done,
    sprintId: 'SPR18-00002',
    assigneeID: 'ASG18-00004',
    creationDate: '2018-08-14',
    dueDate: '2018-09-08',
    estimated: 10,
    elapsed: 18,
    highlighting: true,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-09-05',
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'},
      {comment: 'No Comment #3'}
    ],
    issueLinks: [],
    subissues: [
        {
            id: 12,
            title: 'Test hangs if a TSCompiler rule fails',
            description: 'Test hangs if a TSCompiler rule fails',
            type: IssueType.task,
            priority: IssuePriority.low,
            state: IssueState.done,
            sprintId: 'SPR18-00002',
            assigneeID: 'ASG18-00006',
            creationDate: '2018-06-15',
            dueDate: '2018-07-05',
            estimated: 9,
            elapsed: 13,
            highlighting: false,
            resolution: IssueResolution.duplicate,
            resolutionDate: '2018-07-07',
            comments: [
                {comment: 'No Comment #1'},
                {comment: 'No Comment #2'}
            ],
            issueLinks: []
        }
    ]
  },
  {
    id: 11,
    title: 'Tree type is not supported',
    description: '`ng new` error \'Tree type is not supported',
    type: IssueType.bug,
    priority: IssuePriority.minor,
    state: IssueState.done,
    sprintId: 'SPR18-00002',
    assigneeID: 'ASG18-00005',
    creationDate: '2018-08-16',
    dueDate: '2018-09-07',
    estimated: 20,
    elapsed: 4,
    highlighting: true,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-09-06',
    comments: [],
    issueLinks: []
  },
  {
    id: 12,
    title: 'Test hangs if a TSCompiler rule fails',
    description: 'Test hangs if a TSCompiler rule fails',
    type: IssueType.task,
    priority: IssuePriority.minor,
    state: IssueState.done,
    sprintId: 'SPR18-00002',
    assigneeID: 'ASG18-00006',
    creationDate: '2018-08-15',
    dueDate: '2018-09-05',
    estimated: 9,
    elapsed: 13,
    highlighting: false,
    resolution: IssueResolution.duplicate,
    resolutionDate: '2018-09-07',
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'}
    ],
    issueLinks: []
  },
  {
    id: 13,
    title: 'Dynamic load styles for themes',
    description: 'Dynamic load styles for themes',
    type: IssueType.task,
    priority: IssuePriority.minor,
    state: IssueState.done,
    sprintId: 'SPR18-00003',
    assigneeID: 'ASG18-00001',
    creationDate: '2018-08-15',
    dueDate: '2018-11-07',
    estimated: 9,
    elapsed: 14,
    highlighting: true,
    resolution: IssueResolution.wontFix,
    resolutionDate: '2018-09-12',
    comments: [
      {comment: 'No Comment #1'}
    ],
    issueLinks: []
  },
  {
    id: 14,
    title: 'Move CLI npm package.',
    description: 'Move the CLI npm package to "@angular/cli" with the next release.',
    type: IssueType.task,
    priority: IssuePriority.major,
    state: IssueState.done,
    sprintId: 'SPR18-00003',
    assigneeID: 'ASG18-00002',
    creationDate: '2018-08-15',
    dueDate: '2018-09-10',
    estimated: 4,
    elapsed: 8,
    highlighting: true,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-09-17',
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'}
    ],
    issueLinks: []
  },
  {
    id: 15,
    title: 'support LTS version of Node.js, 6.14.3',
    description: 'CLI doesn\'t support LTS version of Node.js, 6.14.3',
    type: IssueType.bug,
    priority: IssuePriority.medium,
    state: IssueState.done,
    sprintId: 'SPR18-00003',
    assigneeID: 'ASG18-00003',
    creationDate: '2018-08-20',
    dueDate: '2018-09-20',
    estimated: 17,
    elapsed: 19,
    highlighting: false,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-09-20',
    comments: [],
    issueLinks: []
  },
  {
    id: 16,
    title: 'Error: Cannot find module \'internal/util/types\'',
    description: 'Error: Cannot find module \'internal/util/types\'',
    type: IssueType.bug,
    priority: IssuePriority.medium,
    state: IssueState.done,
    sprintId: 'SPR18-00003',
    assigneeID: 'ASG18-00004',
    creationDate: '2018-08-20',
    dueDate: '2018-09-17',
    estimated: 9,
    elapsed: 12,
    highlighting: true,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-09-21',
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'},
      {comment: 'No Comment #3'},
      {comment: 'No Comment #4'}
    ],
    issueLinks: []
  },
  {
    id: 17,
    title: 'Version 6.1.0 not downward compatible',
    description: 'Version 6.1.0 not downward compatible',
    type: IssueType.bug,
    priority: IssuePriority.major,
    state: IssueState.done,
    sprintId: 'SPR18-00003',
    assigneeID: 'ASG18-00005',
    creationDate: '2018-08-24',
    dueDate: '2018-09-19',
    estimated: 18,
    elapsed: 3,
    highlighting: false,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-09-19',
    comments: [
      {comment: 'No Comment #1'}
    ],
    issueLinks: []
  },
  {
    id: 18,
    title: 'ng build --prod error',
    description: 'ng build --prod error, Can\'t resolve all parameters for AppService',
    type: IssueType.bug,
    priority: IssuePriority.critical,
    state: IssueState.done,
    sprintId: 'SPR18-00003',
    assigneeID: 'ASG18-00006',
    creationDate: '2018-08-12',
    dueDate: '2018-09-20',
    estimated: 11,
    elapsed: 17,
    highlighting: true,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-09-20',
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'},
      {comment: 'No Comment #3'},
      {comment: 'No Comment #4'}
    ],
    issueLinks: []
  },
  {
    id: 19,
    title: 'ng build problem',
    description: 'ng build --configuration=production hash chunks are always the same',
    type: IssueType.bug,
    priority: IssuePriority.minor,
    state: IssueState.done,
    sprintId: 'SPR18-00004',
    assigneeID: 'ASG18-00001',
    creationDate: '2018-08-20',
    dueDate: '2018-10-05',
    estimated: 14,
    elapsed: 16,
    highlighting: false,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-10-05',
    comments: [],
    issueLinks: []
  },
  {
    id: 20,
    title: 'Setting up PWA',
    description: 'Setting up PWA fails with cli 6.1.0',
    type: IssueType.task,
    priority: IssuePriority.medium,
    state: IssueState.done,
    sprintId: 'SPR18-00004',
    assigneeID: 'ASG18-00002',
    creationDate: '2018-08-25',
    dueDate: '2018-09-25',
    estimated: 18,
    elapsed: 16,
    highlighting: false,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-09-25',
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'}
    ],
    issueLinks: []
  },
  {
    id: 21,
    title: 'TypeScript 2.9.2 Warnings',
    description: 'Warning message is displayed when using TypeScript 2.9.2',
    type: IssueType.bug,
    priority: IssuePriority.minor,
    state: IssueState.done,
    sprintId: 'SPR18-00004',
    assigneeID: 'ASG18-00003',
    creationDate: '2018-09-01',
    dueDate: '2018-09-25',
    estimated: 15,
    elapsed: 17,
    highlighting: false,
    resolution: IssueResolution.duplicate,
    resolutionDate: '2018-09-26',
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'},
      {comment: 'No Comment #3'},
      {comment: 'No Comment #4'}
    ],
    issueLinks: []
  },
  {
    id: 22,
    title: 'Build production environment Error',
    description: 'Build production environment Error',
    type: IssueType.bug,
    priority: IssuePriority.critical,
    state: IssueState.done,
    sprintId: 'SPR18-00004',
    assigneeID: 'ASG18-00004',
    creationDate: '2018-09-17',
    dueDate: '2018-10-01',
    estimated: 1,
    elapsed: 1,
    highlighting: false,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-10-01',
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'},
      {comment: 'No Comment #3'},
      {comment: 'No Comment #4'},
      {comment: 'No Comment #5'},
      {comment: 'No Comment #6'}
    ],
    issueLinks: []
  },
  {
    id: 23,
    title: 'Android-Recycler lags',
    description: 'Android-Recycler lags when scrolling with Glide',
    type: IssueType.bug,
    priority: IssuePriority.minor,
    state: IssueState.done,
    sprintId: 'SPR18-00004',
    assigneeID: 'ASG18-00005',
    creationDate: '2018-09-17',
    dueDate: '2018-10-04',
    estimated: 9,
    elapsed: 5,
    highlighting: false,
    resolution: IssueResolution.wontFix,
    resolutionDate: '2018-10-04',
    comments: [],
    issueLinks: []
  },
  {
    id: 24,
    title: 'ng update --all not working',
    description: 'ng update --all not working',
    type: IssueType.bug,
    priority: IssuePriority.medium,
    state: IssueState.done,
    sprintId: 'SPR18-00004',
    assigneeID: 'ASG18-00006',
    creationDate: '2018-09-17',
    dueDate: '2018-10-02',
    estimated: 12,
    elapsed: 5,
    highlighting: false,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-10-02',
    comments: [
      {comment: 'No Comment #1'}
    ],
    issueLinks: []
  },
  {
    id: 25,
    title: 'Build specific lazy loaded user chunks',
    description: 'Build specific lazy loaded user chunks',
    type: IssueType.task,
    priority: IssuePriority.minor,
    state: IssueState.done,
    sprintId: 'SPR18-00005',
    assigneeID: 'ASG18-00001',
    creationDate: '2018-09-18',
    dueDate: '2018-10-07',
    estimated: 17,
    elapsed: 20,
    highlighting: true,
    resolution: IssueResolution.fixed,
    resolutionDate: '2018-10-07',
    comments: [
      {comment: 'No Comment #1'}
    ],
    issueLinks: []
  },
  {
    id: 26,
    title: 'ng build --watch not working',
    description: 'ng build --watch does not work when building a library',
    type: IssueType.bug,
    priority: IssuePriority.medium,
    state: IssueState.inWork,
    sprintId: 'SPR18-00005',
    assigneeID: 'ASG18-00002',
    creationDate: '2018-09-20',
    dueDate: undefined,
    estimated: 7,
    elapsed: 14,
    highlighting: true,
    resolution: IssueResolution.incomplete,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  },
  {
    id: 27,
    title: 'Bring back ng init',
    description: 'bring back ng init to initialize a new blank workspace',
    type: IssueType.task,
    priority: IssuePriority.minor,
    state: IssueState.inWork,
    sprintId: 'SPR18-00005',
    assigneeID: 'ASG18-00003',
    creationDate: '2018-09-29',
    dueDate: undefined,
    estimated: 8,
    elapsed: 18,
    highlighting: false,
    resolution: IssueResolution.incomplete,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  },
  {
    id: 28,
    title: 'Breadcrumbs in Angular material\'s latest version.',
    description: 'Do we have breadcrumbs in Angular material\'s latest version.',
    type: IssueType.task,
    priority: IssuePriority.minor,
    state: IssueState.inWork,
    sprintId: 'SPR18-00005',
    assigneeID: 'ASG18-00004',
    creationDate: '2018-09-29',
    dueDate: undefined,
    estimated: 19,
    elapsed: 19,
    highlighting: true,
    resolution: IssueResolution.incomplete,
    resolutionDate: undefined,
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'}
    ],
    issueLinks: []
  },
  {
    id: 29,
    title: 'Run ng test in prod mode `ng test --prod`',
    description: 'Run ng test in prod mode `ng test --prod`',
    type: IssueType.bug,
    priority: IssuePriority.minor,
    state: IssueState.inTest,
    sprintId: 'SPR18-00005',
    assigneeID: 'ASG18-00005',
    creationDate: '2018-09-29',
    dueDate: undefined,
    estimated: 14,
    elapsed: 5,
    highlighting: true,
    resolution: IssueResolution.incomplete,
    resolutionDate: undefined,
    comments: [
      {comment: 'No Comment #1'}
    ],
    issueLinks: []
  },
  {
    id: 30,
    title: 'Cannot read property \'controls\' of null',
    description: 'Cannot read property \'controls\' of null',
    type: IssueType.bug,
    priority: IssuePriority.medium,
    state: IssueState.inWork,
    sprintId: 'SPR18-00005',
    assigneeID: 'ASG18-00006',
    creationDate: '2018-09-29',
    dueDate: undefined,
    estimated: 19,
    elapsed: 19,
    highlighting: true,
    resolution: IssueResolution.incomplete,
    resolutionDate: undefined,
    comments: [
      {comment: 'No Comment #1'}
    ],
    issueLinks: []
  },
  {
    id: 31,
    title: 'Deprecated Switches',
    description: 'Deprecated Switches are not updated in Continuous Integration Story Wiki',
    type: IssueType.task,
    priority: IssuePriority.major,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-09-30',
    dueDate: undefined,
    estimated: 18,
    elapsed: 8,
    highlighting: true,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  },
  {
    id: 32,
    title: 'Wrong NPM package',
    description: 'Wrong NPM package for @angular-devkit/build-webpack',
    type: IssueType.bug,
    priority: IssuePriority.minor,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-10-02',
    dueDate: undefined,
    estimated: 8,
    elapsed: 1,
    highlighting: true,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'},
      {comment: 'No Comment #3'},
      {comment: 'No Comment #4'}
    ],
    issueLinks: []
  },
  {
    id: 33,
    title: 'Router children path is not working',
    description: 'Router children path is not working',
    type: IssueType.story,
    priority: IssuePriority.minor,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-10-02',
    dueDate: undefined,
    estimated: 4,
    elapsed: 18,
    highlighting: true,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'}
    ],
    issueLinks: []
  },
  {
    id: 34,
    title: 'Angular cli Installation error via npm cmd',
    description: 'Angular cli Installation error via npm cmd',
    type: IssueType.task,
    priority: IssuePriority.medium,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-10-02',
    dueDate: undefined,
    estimated: 1,
    elapsed: 19,
    highlighting: false,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'},
      {comment: 'No Comment #3'}
    ],
    issueLinks: []
  },
  {
    id: 35,
    title: 'Can\'t create new project after installed latest NPM',
    description: 'Can\'t create new project after installed latest NPM',
    type: IssueType.story,
    priority: IssuePriority.minor,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-10-03',
    dueDate: undefined,
    estimated: 13,
    elapsed: 15,
    highlighting: true,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  },
  {
    id: 36,
    title: 'ng: command not found',
    description: 'ng: command not found',
    type: IssueType.task,
    priority: IssuePriority.critical,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-10-04',
    dueDate: undefined,
    estimated: 17,
    elapsed: 14,
    highlighting: false,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [
      {comment: 'No Comment #1'}
    ],
    issueLinks: []
  },
  {
    id: 37,
    title: 'Lint shows template errors in typescript files',
    description: 'Lint shows template errors in typescript files',
    type: IssueType.task,
    priority: IssuePriority.major,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-10-02',
    dueDate: undefined,
    estimated: 11,
    elapsed: 20,
    highlighting: true,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [
      {comment: 'No Comment #1'}
    ],
    issueLinks: []
  },
  {
    id: 38,
    title: 'CLI installation fails',
    description: 'CLI installation fails',
    type: IssueType.bug,
    priority: IssuePriority.critical,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-10-04',
    dueDate: undefined,
    estimated: 2,
    elapsed: 6,
    highlighting: false,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  },
  {
    id: 39,
    title: 'Javascript code fails',
    description: 'Javascript code fails to compile, but compiles with a preexisting `ng serve`',
    type: IssueType.bug,
    priority: IssuePriority.critical,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-10-02',
    dueDate: undefined,
    estimated: 9,
    elapsed: 19,
    highlighting: true,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  },
  {
    id: 40,
    title: 'Ignore Plugin not after updating Angular.',
    description: 'Ignore Plugin not after updating Angular.',
    type: IssueType.story,
    priority: IssuePriority.minor,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-10-02',
    dueDate: undefined,
    estimated: 8,
    elapsed: 15,
    highlighting: false,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [
      {comment: 'No Comment #1'}
    ],
    issueLinks: []
  },
  {
    id: 41,
    title: 'Testing (ng test) fails on docker',
    description: 'Testing (ng test) fails on docker only',
    type: IssueType.bug,
    priority: IssuePriority.critical,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-10-02',
    dueDate: undefined,
    estimated: 14,
    elapsed: 20,
    highlighting: false,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'}
    ],
    issueLinks: []
  },
  {
    id: 42,
    title: 'Uncaught TypeError',
    description: 'Uncaught TypeError: Cannot read property \'defineProperty\' of undefined after building project',
    type: IssueType.task,
    priority: IssuePriority.minor,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-10-02',
    dueDate: undefined,
    estimated: 15,
    elapsed: 9,
    highlighting: false,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  },
  {
    id: 43,
    title: 'ERROR in compiler_factory.d.ts',
    description: 'ERROR in node_modules/@angular/platform-browser-dynamic/src/compiler_factory.d.ts',
    type: IssueType.bug,
    priority: IssuePriority.critical,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-10-02',
    dueDate: undefined,
    estimated: 14,
    elapsed: 20,
    highlighting: true,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'},
      {comment: 'No Comment #3'},
      {comment: 'No Comment #4'}
    ],
    issueLinks: []
  },
  {
    id: 44,
    title: 'Specified module does not exist',
    description: 'Specified module does not exist - Angular 6',
    type: IssueType.bug,
    priority: IssuePriority.major,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-10-02',
    dueDate: undefined,
    estimated: 8,
    elapsed: 5,
    highlighting: false,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  },
  {
    id: 45,
    title: 'Exception with spdy and lighthouse',
    description: 'Exception with spdy and lighthouse',
    type: IssueType.bug,
    priority: IssuePriority.major,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-10-03',
    dueDate: undefined,
    estimated: 18,
    elapsed: 15,
    highlighting: true,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  },
  {
    id: 46,
    title: 'Provide better error',
    description: 'Provide better error location information (ng build --prod)',
    type: IssueType.task,
    priority: IssuePriority.minor,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-09-28',
    dueDate: undefined,
    estimated: 19,
    elapsed: 14,
    highlighting: true,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  },
  {
    id: 47,
    title: 'karma jsdom launcher hangs',
    description: 'karma jsdom launcher hangs',
    type: IssueType.bug,
    priority: IssuePriority.medium,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-10-02',
    dueDate: undefined,
    estimated: 19,
    elapsed: 4,
    highlighting: true,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [
      {comment: 'No Comment #1'}
    ],
    issueLinks: []
  },
  {
    id: 48,
    title: 'complete documentation',
    description: 'Where is the complete documentation, including dos and donts for Angular.json ?',
    type: IssueType.task,
    priority: IssuePriority.medium,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-10-04',
    dueDate: undefined,
    estimated: 6,
    elapsed: 14,
    highlighting: true,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [
      {comment: 'No Comment #1'}
    ],
    issueLinks: []
  },
  {
    id: 49,
    title: 'service workers files are not minified',
    description: 'service workers files are not minified',
    type: IssueType.bug,
    priority: IssuePriority.major,
    state: IssueState.open,
    sprintId: undefined,
    assigneeID: undefined,
    creationDate: '2018-09-30',
    dueDate: undefined,
    estimated: 13,
    elapsed: 17,
    highlighting: true,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [
      {comment: 'No Comment #1'},
      {comment: 'No Comment #2'}
    ],
    issueLinks: []
  },
  {
    id: 50,
    title: 'ng generate problem',
    description: 'ng generate on Windows do not interpret correctly the path separator',
    type: IssueType.story,
    priority: IssuePriority.minor,
    state: IssueState.open,
    sprintId: 'SPR18-00008',
    assigneeID: undefined,
    creationDate: '2018-10-02',
    dueDate: undefined,
    estimated: 4,
    elapsed: 1,
    highlighting: true,
    resolution: IssueResolution.unresolved,
    resolutionDate: undefined,
    comments: [],
    issueLinks: []
  }
];
