'use strict';

/**
 * notified-job router
 */

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/notified-jobs',
      handler: 'notified-job.saveJob'
    },
    {
      method: 'DELETE',
      path: '/notified-jobs/:jobId',
      handler: 'notified-job.removeNotifiedJob'
    },
    {
      method: 'GET',
      path: '/notified-jobs-count',
      handler: 'notified-job.getNotifiedJobsCount'
    }
  ]
}
