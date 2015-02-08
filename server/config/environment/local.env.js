'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'cornerfind-secret',

  FACEBOOK_ID:      'app-id',
  FACEBOOK_SECRET:  'secret',

  TWITTER_ID:       'app-id',
  TWITTER_SECRET:   'secret',

  GOOGLE_ID:        'app-id',
  GOOGLE_SECRET:    'secret',
  TWILIO_ACCOUNT_SID: 'AC065d1a64e1e3baf863d35c46ce7e3aef',
  TWILIO_AUTH_TOKEN: '6d994780ae0aebbd3457ecca78a25d39',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
