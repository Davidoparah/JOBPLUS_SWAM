'use strict';

/**
 * notified-job controller
 */

module.exports = ({ strapi }) => ({
  async saveJob(ctx) {
    try {
      const userId = ctx.request.header["x-user-id"];
      ctx.body = await strapi
        .service("api::notified-job.notified-job")
        .saveJob(ctx.request.body, userId);
    } catch (error) {
      strapi.log.error(error);
    }
  },
  async removeNotifiedJob(ctx) {
    try {
      const { jobId } = ctx.params;
      const userId = ctx.request.header["x-user-id"];
      ctx.body = await strapi
        .service("api::notified-job.notified-job")
        .removeNotifiedJob({jobId, userId});
    } catch (error) {
      strapi.log.error(error);
    }
  },
  async getNotifiedJobsCount(ctx) {
    try {
      const userId = ctx.request.header["x-user-id"];
      ctx.body = await strapi
        .service("api::notified-job.notified-job")
        .getNotifiedJobsCount(userId);
    } catch (error) {
      strapi.log.error(error);
    }
  },
});
