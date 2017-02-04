// var plaid = require('plaid');
// var fetch = require('isomorphic-fetch')
//
// var PLAID_CLIENT_ID = process.env.client_id;
// var PLAID_SECRET = process.env.secret;
//
// var plaidClient =
//     new plaid.Client(PLAID_CLIENT_ID, PLAID_SECRET, plaid.environments.tartan);

// Parse.Cloud.define('getTransactions', function(request,response){
//       const user = request.user;



Parse.Cloud.define('addCharity', function(request, response){
  const charityId = request.params.charityId;
  const user = request.user;

  if(charityId == null){
    response.error('No charityId');
  }
  if(user == null){
    response.error('Either no session token or session token has expired');
  }
  const Charity = Parse.Object.extend('Charity');
  const charityQuery = new Parse.Query(Charity);
  charityQuery.get(charityId).then(function(charity){
    const relation = user.relation('charities');
    relation.add(charity);
    return user.save(null, {sessionToken: user.getSessionToken()});
  }).then(function(user){
    response.success('Save successful');
  }, function(error){
    console.error(error);
    response.error(error);
  })
});


Parse.Cloud.define('removeCharity', function(request, response){
  const charityId = request.params.charityId;
  const user = request.user;

  if(charityId == null){
    response.error('No charityId');
  }
  if(user == null){
    response.error('Either no session token or session token has expired');
  }

  const Charity = Parse.Object.extend('Charity');
  const charityQuery = new Parse.Query(Charity);
  charityQuery.get(charityId).then(function(charity){
    const relation = user.relation('charities');
    relation.remoove(charity);
    return user.save(null, {sessionToken: user.getSessionToken()});
  }).then(function(user){
    response.success('Save successful');
  }, function(error){
    console.error(error);
    response.error(error);
  })
});

//Plaid API Calls
//
// Parse.Cloud.define('getTransactions', function(request,response){
//   const user = request.user;
//
//   if(user == null){
//     response.error('Either no session token or session token has expired');
//   }
//   const bankUserName = request.params.username;
//   const password = request.params.password;
//   const bank = request.params.bank;
  // const pin = request.parans.pin;

  // const client_id = process.env.client_id;
  // const secret = process.env.secret;
  // process.env.
//   fetch("https://tartan.plaid.com/connect", {
//     method: 'POST',
//     body: JSON.stringify({
//       "client_id":client_id,
//       "secret":secret,
//       "username":bankUserName,
//       "password":password,
//       "type":bank
//     })
//   }).then(function(resp){
//     response.success(resp);
//   }, function(error){
//     console.error(error);
//     response.error(error);
//   })
// });
