'use strict';

/**
 * sector controller
 */

module.exports = ({ strapi }) => ({
  async find(ctx) {
    try {
      ctx.body = await strapi
        .service("api::sector.sector")
        .find();
    } catch (error) {
      strapi.log.error(error);
    }
  },
  async sectorJobCount(ctx) {
    try {
      ctx.body = await strapi
        .service("api::sector.sector")
        .sectorJobCount();
    } catch (error) {
      strapi.log.error(error);
    }
  },
});

