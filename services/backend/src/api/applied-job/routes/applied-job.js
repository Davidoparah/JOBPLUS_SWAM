module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/applied-jobs',
      handler: 'applied-job.apply'
    },
    {
      method: 'DELETE',
      path: '/applied-jobs/:jobId/:userId',
      handler: 'applied-job.withdrawApplication'
    }
  ]
}
