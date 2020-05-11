// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUser from '../../../app/controller/user';
import ExportWriting from '../../../app/controller/writing';

declare module 'egg' {
  interface IController {
    user: ExportUser;
    writing: ExportWriting;
  }
}
