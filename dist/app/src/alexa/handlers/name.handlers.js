
const Alexa = require('alexa-sdk');
const States = require('./states.const');
const SpeechOutputUtils = require('../utils/speech-output.utils');
var User = require('../models/user');

module.exports = Alexa.CreateStateHandler(States.NAME, {

    'NameIntent': function() {

        var myName = this.event.request.intent.slots.my_name.value;
        var userID = this.event.session.user.userId;

        console.log(userID);


        User.findOneAndUpdate(
            {userId: userID},
            {$set: {name: myName}},
            {upsert: true, new: true, runValidators: true},

            function (err, doc) {

                if (err) {
                    console.log("Something wrong when updating data!");
                }
                console.log(doc);

            });

        this.attributes['Name'] = myName;

        this.response.speak("Nice, "+myName+" Nice to see you! Do you want to save your first exercise?")
            .listen("Do you want to save your first exercise?");

        this.emit(':responseReady');
    },

    // Unhandled Intent:

    'Unhandled': function () {
        this.handler.state = States.NONE;
        this.emit('Unhandled'); // emit in newSession handlers
    },

    // Built-In Intents:

    'AMAZON.HelpIntent': function () {
        this.handler.state = States.NONE;
        this.emit(':ask', SpeechOutputUtils.pickRandom(this.t('HELP')));
    },

    'AMAZON.NoIntent': function() {
        this.handler.state = States.NONE;
        this.emit('AMAZON.CancelIntent');
    },


    'AMAZON.YesIntent': function() {
    this.handler.state = States.SETTINGS;
    this.emit('QuestionExerciseIntent');
    },

    'AMAZON.StopIntent': function () {
        this.handler.state = States.NONE;
        this.emit('AMAZON.StopIntent');
    },

    'AMAZON.CancelIntent': function () {
        this.handler.state = States.NONE;
        this.emit('AMAZON.CancelIntent');
    }

});
