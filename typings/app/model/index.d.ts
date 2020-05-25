// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/model/article';
import ExportComment from '../../../app/model/comment';
import ExportGroup from '../../../app/model/group';
import ExportProject from '../../../app/model/project';
import ExportResource from '../../../app/model/resource';
import ExportTask from '../../../app/model/task';
import ExportUser from '../../../app/model/user';
import ExportUserProject from '../../../app/model/userProject';
import ExportUserTask from '../../../app/model/userTask';

declare module 'egg' {
  interface IModel {
    Article: ReturnType<typeof ExportArticle>;
    Comment: ReturnType<typeof ExportComment>;
    Group: ReturnType<typeof ExportGroup>;
    Project: ReturnType<typeof ExportProject>;
    Resource: ReturnType<typeof ExportResource>;
    Task: ReturnType<typeof ExportTask>;
    User: ReturnType<typeof ExportUser>;
    UserProject: ReturnType<typeof ExportUserProject>;
    UserTask: ReturnType<typeof ExportUserTask>;
  }
}
