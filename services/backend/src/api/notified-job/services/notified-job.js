'use strict';

/**
 * notified-job service
 */

module.exports = ({ strapi }) => ({
  async saveJob(data, userId) {
    try {
      const notifiedJob = await strapi.entityService.create("api::notified-job.notified-job", {
        data: {
          ...data,
          user: userId,
        },
        populate: {
          user: true,
          job: true,
        },
      });

      return notifiedJob;
    } catch (error) {
      strapi.log.error(error);
    }
  },
  async removeNotifiedJob({ jobId, userId }) {
    try {
      const notifiedJob = await strapi.db.query('api::notified-job.notified-job').findOne({
        where: { 
          user: userId,
          job: jobId,
        },
      });

      if (notifiedJob) {
        await strapi.entityService.delete("api::notified-job.notified-job", notifiedJob.id);
      }

      return notifiedJob;
    } catch (error) {
      strapi.log.error(error);
    }
  },
  async getNotifiedJobsCount(userId) {
    try {
      const count = await strapi.entityService.count("api::notified-job.notified-job", {
        filters: {
          user: userId,
        },
      });

      return count;
    } catch (error) {
      strapi.log.error(error);
    }
  },
});
