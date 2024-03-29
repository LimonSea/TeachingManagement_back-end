// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportArticle from '../../../app/service/article';
import ExportComment from '../../../app/service/comment';
import ExportGroup from '../../../app/service/group';
import ExportProject from '../../../app/service/project';
import ExportResource from '../../../app/service/resource';
import ExportTask from '../../../app/service/task';
import ExportTools from '../../../app/service/tools';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    article: AutoInstanceType<typeof ExportArticle>;
    comment: AutoInstanceType<typeof ExportComment>;
    group: AutoInstanceType<typeof ExportGroup>;
    project: AutoInstanceType<typeof ExportProject>;
    resource: AutoInstanceType<typeof ExportResource>;
    task: AutoInstanceType<typeof ExportTask>;
    tools: AutoInstanceType<typeof ExportTools>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
