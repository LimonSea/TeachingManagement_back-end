// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/middleware/admin';

declare module 'egg' {
  interface IMiddleware {
    admin: typeof ExportAdmin;
  }
}
