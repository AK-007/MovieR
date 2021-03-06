/*jshint esversion: 6 */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
exports.addAdminRole = functions.https.onCall((data, context) => {
    if(context.auth.token.admin !== true){
        return { error: 'only admin allowed to add'};
    }
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made a admin`
        }
    }).catch(err => {
        return err;
    });
});