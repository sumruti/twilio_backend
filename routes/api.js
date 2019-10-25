const express = require("express")
const router = express.Router()
const accountSid = 'AC4ad0a63399be022f47e28b78884db998';
const authToken = '04f0eada80bf486152b4b0f6ab7fe4cb';
const client = require('twilio')(accountSid, authToken);




router.post('/send_message', function(req, res){
  console.log(req.body);


  client.messages.create({
    to:req.body.number,
    from:'+15005550006',
    body:req.body.message
}, function(error,message) {
    // The HTTP request to Twilio will run asynchronously. This callback
    // function will be called when a response is received from Twilio
    // The "error" variable will contain error information, if any.
    // If the request was successful, this value will be "falsy"

    console.log(error);
    if (!error) {
        // The second argument to the callback will contain the information
        // sent back by Twilio for the request. In this case, it is the
        // information about the text messsage you just sent:
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);

        console.log('Message sent on:');
        console.log(message.dateCreated);
        res.send({status:true,messageID:message.dateCreated})
    } else {
        console.log('Oops! There was an error.');
    }
});

})


module.exports = router
