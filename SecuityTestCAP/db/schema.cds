namespace db;

using { cuid,managed } from '@sap/cds/common';


entity Materials : cuid,managed {
    Name:String(100);
    Group:String(10)
}