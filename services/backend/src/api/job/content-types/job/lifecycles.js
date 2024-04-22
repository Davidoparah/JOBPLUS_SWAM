
module.exports = {
  async afterUpdate({ result }) {
    // check if published
    if (!result.publishedAt) return;

    // fetch one record matching result.id
    const job = await strapi.entityService.findOne("api::job.job", result.id, {
      populate: {
        job_types: true,
        category: {
          populate: {
            sector: true
          }
        }
      }
    });

    // Find matching profiles
    const matching_profiles = await strapi.entityService.findMany("api::profile.profile", {
      filters: {
        desired_job_title: { $containsi: job.title},
        min_per_anum_salary: { $lte: job.salary},
        job_types: { id: { $in: job.job_types.map((jt) => jt.id)}},
        sector: { id: job.category.sector.id }
      },
      populate: ['user']
    });

    // Ensure matchingProfiles is an array before iterating
    const profiles = Array.isArray(matching_profiles) ? matching_profiles : [matching_profiles];

    // Create notified jobs for each matching profile
    for (const profile of profiles) {
      await strapi.entityService.create("api::notified-job.notified-job", {
        data: {
          user: profile.user.id,
          job: job.id
        }
      });
    }
  }
};