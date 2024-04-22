'use strict';

/**
 * profile service
 */

module.exports = ({ strapi }) => ({
  async saveProfile(data, userId) {
    // check if user profile exists
    const existingProfile = await strapi.db.query('api::profile.profile').findOne({
      where: { user: userId },
      populate: { user: true },
    });

    const profile = existingProfile
    ? await strapi.db.query('api::profile.profile').update({
        where: { id: existingProfile.id },
        data: data,
      })
    : await strapi.db.query('api::profile.profile').create({
        data: {
          ...data,
          user: userId,
        },
      });

    return profile;
  },
  async findOne(userId) {
    const profile = await strapi.db.query('api::profile.profile').findOne({
      where: { user: userId },
      populate: { 
        user: true,
        sector: true,
        job_types: true,
      },
    });

    return profile;
  },
});
