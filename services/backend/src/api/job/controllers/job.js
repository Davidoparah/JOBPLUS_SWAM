"use strict";

/**
 * job controller
 */

module.exports = ({ strapi }) => ({
  async find(ctx) {
    try {
      const userId = ctx.request.header["x-user-id"];
      ctx.body = await strapi.service("api::job.job").find(ctx.query, userId);
    } catch (error) {
      strapi.log.error(error);
    }
  },
  async findOne(ctx) {
    try {
      const userId = ctx.request.header["x-user-id"];
      ctx.body = await strapi
        .service("api::job.job")
        .findOne(ctx.query, userId);
    } catch (error) {
      strapi.log.error(error);
    }
  },
  async findLocationJobCount(ctx) {
    try {
      ctx.body = await strapi
        .service("api::job.job")
        .findLocationJobCount(ctx.query);
    } catch (error) {
      strapi.log.error(error);
    }
  },
});
