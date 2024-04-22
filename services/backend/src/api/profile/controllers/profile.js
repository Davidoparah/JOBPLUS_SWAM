'use strict';

/**
 * profile controller
 */

module.exports = ({ strapi }) => ({
  async saveProfile(ctx) {
    try {
      const userId = ctx.request.header["x-user-id"];
      ctx.body = await strapi
        .service("api::profile.profile")
        .saveProfile(ctx.request.body, userId);
    } catch (error) {
      strapi.log.error(error);
    }
  },
  async findOne(ctx) {
    try {
      const userId = ctx.request.header["x-user-id"];
      ctx.body = await strapi
        .service("api::profile.profile")
        .findOne(userId);
    } catch (error) {
      strapi.log.error(error);
    }
  },
});
