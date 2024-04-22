"use strict";

module.exports = ({ strapi }) => ({
  async apply(ctx) {
    try {
      ctx.body = await strapi
        .service("api::applied-job.applied-job")
        .apply(ctx.request.body);
    } catch (error) {
      strapi.log.error(error);
    }
  },
  async withdrawApplication(ctx) {
    try {
      const { jobId, userId } = ctx.params;
      ctx.body = await strapi
        .service("api::applied-job.applied-job")
        .withdrawApplication(jobId, userId);
    } catch (error) {
      strapi.log.error(error);
    }
  },
});