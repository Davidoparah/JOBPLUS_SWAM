'use strict';

/**
 * sector router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/sectors',
      handler: 'sector.find'
    
    },
    {
      method: 'GET',
      path: '/sectors/jobCount',
      handler: 'sector.sectorJobCount'
    }
  ]
}
