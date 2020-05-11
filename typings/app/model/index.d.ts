// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle from '../../../app/model/article';
import ExportGroup from '../../../app/model/group';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Article: ReturnType<typeof ExportArticle>;
    Group: ReturnType<typeof ExportGroup>;
    User: ReturnType<typeof ExportUser>;
  }
}
