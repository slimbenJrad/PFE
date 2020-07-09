const functions = require('firebase-functions');
const nodemailer =require('nodemailer');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.sendMail= functions.database.ref('/reunion/{pushId}')
    .onUpdate((change, context) => {
      // Grab the current value of what was written to the Realtime Database.
      console.log('hello');
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'slimjrad@gmail.com',
            pass: '24055341'
        }
    });
      const before = change.before.val();
      const after = change.after.val();
      const mailOptions = {
        from: `${before.nom_prof} "" ${before.prenom_prof}`,  // You can write any mail Adress you want this doesn't effect anything
        to: before.mail_parent, // This mail adress should be filled with any mail you want to read it
        subject: 'Reunion', // Sample Subject for you template
        html:`<p> L'enseignant ${before.nom_prof} ${before.prenom_prof} a ${after.etat} votre reunion
        le ${before.date} à ${before.heure}</p>`
      }
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
    });
    exports.sendMsg = functions.database.ref('/chat/solo/parents/{parentId}/{enfantId}/{converId}')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Convo', original);
      const newData = {
        sender_name:original.name,
        sender_lastname:original.lastname,
        sender_id:original.user,
        dest:original.dest,
        touched:false,
        date:original.date
    };
    console.log(newData);
      return snapshot.ref.parent.parent.parent.parent.parent.parent.child('Notification').child(original.dest).push(newData);
    });
    exports.profMsg = functions.database.ref('/chat/solo/profs/{profId}/{eleveId}/{converId}')
    .onCreate((snapshot, context) => {
      const original = snapshot.val();
      console.log('Convo', original );
      const newData = {
        sender_name:original.name,
        sender_lastname:original.lastname,
        sender_id:original.user,
        dest:original.dest,
        touched:false,
        date:original.date
    };
    console.log(newData);
      return snapshot.ref.parent.parent.parent.parent.parent.parent.child('Notification').child(original.dest).push(newData);
    });
    exports.getEvent = functions.database.ref('/event/{eventId}')
    .onCreate((snapshot, context) => {
      console.log('hello');
      const event = snapshot.val();
      const newData = {
        titre:event.title,
        date_ev:event.date_event,
        date_creation:event.date_creation,
    };
    console.log(newData);
      return snapshot.ref.parent.parent.child('Event_notif').push(newData);
    });
    exports.getsugg = functions.database.ref('/suggestion/{suggId}')
    .onUpdate((snapshot, context) => {
      const before = snapshot.before.val();
      const after = snapshot.after.val();
      console.log('after', after);
      const newData = {
        sujet:before.sujet,
        date_rep:after.date_rep,
        reponse:after.reponse,
        touched:false
    };
    console.log(newData);
      return snapshot.after.ref.parent.parent.child('Notif_parent/suggestion').child(before.auteur).push(newData);
    });
    exports.reclam = functions.database.ref('/reclamaion/{suggId}')
    .onUpdate((snapshot, context) => {
      const before = snapshot.before.val();
      const after = snapshot.after.val();
      console.log('after', after);
      const newData = {
        sujet:before.sujet,
        date:after.date,
        reponse:after.reponse,
        touched:false
    };
    console.log(newData);
      return snapshot.after.ref.parent.parent.child('Notif_parent/reclamaion').child(before.auteur).push(newData);
    });
    exports.question = functions.database.ref('/Question/{suggId}')
    .onUpdate((snapshot, context) => {
      const before = snapshot.before.val();
      const after = snapshot.after.val();
      console.log('after', after);
      const newData = {
        sujet:before.sujet,
        date:after.date,
        reponse:after.reponse,
        touched:false
    };
    console.log(newData);
      return snapshot.after.ref.parent.parent.child('Notif_parent/Question').child(before.auteur).push(newData);
    });
    exports.reunion = functions.database.ref('/reunion/{reunionId}')
    .onCreate((snapshot, context) => {
      const reunion = snapshot.val();
      console.log('reunion', context.params.reunionId );
      const newData = {
        nom_parent:reunion.nom_parent,
        prenom_parent:reunion.prenom_parent,
        date:reunion.date,
        heure:reunion.heure,
        eleve:reunion.nom_eleve,
        etat:reunion.etat,
        id_prof:reunion.prof,
    };
    console.log(newData);
      return snapshot.ref.parent.parent.child('prof_reunion').child(reunion.prof).push(newData);
    });
    exports.publication = functions.database.ref('/publication/{publiId}')
    .onCreate((snapshot, context) => {
      const publi = snapshot.val();
      console.log('publi', publi );
      const newData = {
        nom_prof:publi.nom_prof,
        prenom_prof:publi.prenom_prof,
        date:publi.date_creation,
        titre:publi.titre,
        type:publi.type,
        classe:publi.classe,
        touched:false
    };
    console.log(newData);
      return snapshot.ref.parent.parent.child('publi_notif').child(publi.type).push(newData);
    });
    exports.groupchat = functions.database.ref('/chat/group/{groupId}/{msgId}')
    .onCreate((snapshot, context) => {
      const group = snapshot.val();
      console.log('group', group );
      const newData = {
        prenom_eleve:group.name,
        nom_eleve:group.lastname,
        date:group.date,
    };
    console.log(newData);
      return snapshot.ref.parent.parent.parent.parent.child('group_notif').child(context.params.groupId).push(newData);
    });

