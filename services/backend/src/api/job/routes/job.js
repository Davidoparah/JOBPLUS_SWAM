module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/jobs',
      handler: 'job.find'
    },
    {
      method: 'GET',
      path: '/job',
      handler: 'job.findOne'
    },
    {
      method: 'GET',
      path: '/jobs/location-job-count',
      handler: 'job.findLocationJobCount'
    }
  ]
}
