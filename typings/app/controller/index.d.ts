// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGroup from '../../../app/controller/group';
import ExportHome from '../../../app/controller/home';
import ExportProject from '../../../app/controller/project';
import ExportResource from '../../../app/controller/resource';
import ExportTask from '../../../app/controller/task';
import ExportTools from '../../../app/controller/tools';
import ExportUser from '../../../app/controller/user';
import ExportWriting from '../../../app/controller/writing';

declare module 'egg' {
  interface IController {
    group: ExportGroup;
    home: ExportHome;
    project: ExportProject;
    resource: ExportResource;
    task: ExportTask;
    tools: ExportTools;
    user: ExportUser;
    writing: ExportWriting;
  }
}
