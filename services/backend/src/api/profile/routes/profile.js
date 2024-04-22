'use strict';

/**
 * profile router
 */

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/profile',
      handler: 'profile.saveProfile'
    },
    {
      method: 'GET',
      path: '/profile',
      handler: 'profile.findOne'
    }
  ]
}
