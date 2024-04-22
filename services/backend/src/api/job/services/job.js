"use strict";

/**
 * job service
 */

module.exports = ({ strapi }) => ({
  async find(params, userId) {
    const { start = 0, limit = 10, what='', where='', ...rest } = params;

    // extract filters from rest
    const { filters: additionalFilters = {}, ...restParams } = rest;

    // build the what query
    const whatQuery = what 
    ? {
      $or: [
        { title: { $containsi: what } },
        { skills: { title: { $containsi: what } } },
        { company: { name: { $containsi: what } } },
      ]
    }:{}

    // build the where query
    const whereQuery = where
    ? {
      $or: [
        { location: { $containsi: where } },
        { company: {
          $or: [
            { name: { $containsi: where } },
            { town: { $containsi: where } },
            { city: { $containsi: where } },
            { postcode: { $containsi: where } },
          ]
        }}
      ]
    }:{}

    const filters = {
      $and: [whatQuery, whereQuery, additionalFilters]
    }

    try {
      const [entries, totalCount] = await Promise.all([
        strapi.entityService.findMany("api::job.job", {
          start,
          limit,
          filters,
          ...restParams, // rest of the params like populate, fields, etc
        }),
        strapi.entityService.count("api::job.job", { filters }),
      ]);

      // fetch ids from the entries
      const jobIds = entries.map((job) => job.id);

      // run our queries in parallel
      const [appliedJobs, savedJobs] = await Promise.all([
        await strapi.entityService.findMany(
          "api::applied-job.applied-job",
          {
            filters: {
              user: userId,
              job: { id: { $in: jobIds } }
            },
            populate: {
              job: true,
              user: true,
            },
          }
        ),
        await strapi.entityService.findMany(
          "api::saved-job.saved-job",
          {
            filters: {
              user: userId,
              job: { id: { $in: jobIds } }
            },
            populate: {
              job: true,
              user: true,
            },
          }
        )
      ]);

      // Create a set of applied job IDs for efficient lookup
      const appliedJobIds = new Set(appliedJobs.map((appliedJob) => appliedJob.job.id));

      // Create a set of saved job IDs for efficient lookup
      const savedJobIds = new Set(savedJobs.map((savedJob) => savedJob.job.id));

      // Add the 'hasApplied' field to each job entry
      const updatedEntries = entries.map((job) => ({
        ...job,
        hasApplied: appliedJobIds.has(job.id),
        isSaved: savedJobIds.has(job.id)
      }));

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / limit);
      // const currentPage = Math.min(totalPages, Math.max(1, start));
      const currentPage = start / limit + 1;
      const hasPrevPage = currentPage > 1;
      const hasNextPage = currentPage < totalPages;

      return {
        entries: updatedEntries,
        meta: {
          paginate: {
            totalCount,
            totalPages,
            currentPage,
            hasPrevPage,
            hasNextPage,
          },
        },
      };
    } catch (error) {
      strapi.log.error(error);
      throw error;
    }
  },
  async findOne(params, userId) {
    const { id, ...rest } = params;
    try {
      // Fetch job matching supplied id
      const job = await strapi.entityService.findOne("api::job.job", id, {
        ...rest
      });

      // fetch applied jobs for the current user
      const appliedJobs = await strapi.entityService.findMany(
        "api::applied-job.applied-job",
        {
          filters: {
            user: userId,
            job: id,
          }
        }
      );
      

      // Add the 'hasApplied' field to the job entry
      job.hasApplied = appliedJobs.length > 0;

      return job;
    } catch (error) {
      strapi.log.error(error);
      throw error;
    }
  },
  async findLocationJobCount(params) {
    // Fetch all jobs with their locations
    const jobs = await strapi.entityService.findMany("api::job.job", {
      fields: ['location'], // Only select the location field
    });

    // count the number of jobs in each location
    const locationCounts = jobs.reduce((acc, job) => {
      acc[job.location] = (acc[job.location] || 0) + 1;
      return acc;
    }, {});

    // convert it an array of objects
    const result = Object.entries(locationCounts).map(([location, count]) => ({
      location,
      count
    }));

    return result
  },
});
