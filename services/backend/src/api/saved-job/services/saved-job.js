"use strict";

/**
 * job service
 */

module.exports = ({ strapi }) => ({
  async saveJob(data) {
    try {
      const entity = await strapi.entityService.create(
        "api::saved-job.saved-job",
        {
          data: data,
          populate: {
            user: true,
            job: true,
          },
        }
      );
      return entity;
    } catch (error) {
      strapi.log.error(`Error: ${error.message}`, {
        data,
      });
      throw error;
    }
  },
  async removeSavedJob(jobId, userId) {
    try {
      const savedJobs = await strapi.entityService.findMany("api::saved-job.saved-job", {
        filters: {
          job: jobId,
          user: userId,
        },
        populate: {
          user: {
            fields: ['id', 'username', 'email']
          },
          job: {
            fields: ['id', 'title']
          },
        },
      });

      // delete saved job
      savedJobs.map(savedJob =>
        strapi.entityService.delete("api::saved-job.saved-job", savedJob.id)
      );

      // return deleted saved job
      return savedJobs;

    } catch (error) {
      strapi.log.error(`Error: ${error.message}`);
      throw error;
    }
  },
  async getSavedJobsCount(userId) {
    try {
      const count = await strapi.entityService.count("api::saved-job.saved-job", {
        filters: {
          user: userId,
        },
      });

      return count;
    } catch (error) {
      strapi.log.error(`Error: ${error.message}`);
      throw error;
    }
  },
});