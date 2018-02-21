
const Alexa = require('alexa-sdk');
const States = require('./states.const');
const SpeechOutputUtils = require('../utils/speech-output.utils');
var User = require('../models/user');

module.exports = Alexa.CreateStateHandler(States.SETTINGS, {

    'QuestionExerciseIntent': function() {

        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        console.log(this.attributes['Name']);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        this.attributes['Name'] = myName;
        this.response.speak("What do you like to do firstly?!")
            .listen("Im waiting!");

        this.emit(':responseReady');
    },

    // Unhandled Intent:

    'SaveExerciseIntent': function () {
        var myExercise = this.event.request.intent.slots.my_exercise.value;

        this.response.speak("Wow!")
            .listen("Im waiting!");

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
    this.emit('SaveExerciseIntent');
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
