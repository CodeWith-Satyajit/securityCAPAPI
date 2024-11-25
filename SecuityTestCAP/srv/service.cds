using {db} from '../db/schema';


service Materials {

    entity Materials
     @(restrict: [
        {
            grant: 'READ',
            to   : 'Viewer'
        },
        {
            grant: [
                'READ',
                'WRITE'
            ],
            to   : 'Admin'
        }
    ])
     as projection on db.Materials;

}