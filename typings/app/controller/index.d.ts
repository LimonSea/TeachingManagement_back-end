// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGroup from '../../../app/controller/group';
import ExportProject from '../../../app/controller/project';
import ExportTools from '../../../app/controller/tools';
import ExportUser from '../../../app/controller/user';
import ExportWriting from '../../../app/controller/writing';

declare module 'egg' {
  interface IController {
    group: ExportGroup;
    project: ExportProject;
    tools: ExportTools;
    user: ExportUser;
    writing: ExportWriting;
  }
}
