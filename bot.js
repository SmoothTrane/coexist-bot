var twit = require('twit'),
 config = require('./config'),
 Twitter = new twit(config),
  twitterAccounts = require('./accounts')

var retweetPost = function() {

    var randomAccount = twitterAccounts[Math.floor(twitterAccounts.length * Math.random())];

    var params = {
        q: 'from:' + randomAccount,
        result_type: 'recent',
        lang: 'en'
    }

    Twitter.get('search/tweets', params, function(err, data) {
        if (!err) {
          var tweetId = data.statuses[0].id_str;
            Twitter.post('statuses/retweet/:id', {
                id: tweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweet');
                }
                if (err) {
                    console.log('A post error has occured');
                }
            });
        }//tst
        else {
          console.log('A query error has occured')

        }
    });
}

retweetPost();
