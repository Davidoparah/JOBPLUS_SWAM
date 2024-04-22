"use strict";

/**
 * job service
 */

module.exports = ({ strapi }) => ({
  async apply(data) {
    try {
      const entity = await strapi.entityService.create(
        "api::applied-job.applied-job",
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
  async withdrawApplication(jobId, userId) {
    try {
      const appliedJobs = await strapi.entityService.findMany("api::applied-job.applied-job", {
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

      // delete applied job
      appliedJobs.map(job =>
        strapi.entityService.delete("api::applied-job.applied-job", job.id)
      );

      // return deleted applied job
      return appliedJobs;

    } catch (error) {
      strapi.log.error(`Error: ${error.message}`);
      throw error;
    }
  },
});