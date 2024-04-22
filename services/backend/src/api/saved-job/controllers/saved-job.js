"use strict";

module.exports = ({ strapi }) => ({
  async saveJob(ctx) {
    try {
      ctx.body = await strapi
        .service("api::saved-job.saved-job")
        .saveJob(ctx.request.body);
    } catch (error) {
      strapi.log.error(error);
    }
  },
  async removeSavedJob(ctx) {
    try {
      const { jobId, userId } = ctx.params;
      ctx.body = await strapi
        .service("api::saved-job.saved-job")
        .removeSavedJob(jobId, userId);
    } catch (error) {
      strapi.log.error(error);
    }
  },
  async getSavedJobsCount(ctx) {
    try {
      const { userId } = ctx.params;
      ctx.body = await strapi
        .service("api::saved-job.saved-job")
        .getSavedJobsCount(userId);
    } catch (error) {
      strapi.log.error(error);
    }
  },
});