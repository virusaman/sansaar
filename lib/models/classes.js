const { Model } = require('objection');
const Joi = require('@hapi/joi');
const ModelBase = require('./helpers/ModelBase');

module.exports = class Classes extends ModelBase {
  static get tableName() {
    return 'main.classes';
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer().greater(0),
      title: Joi.string().required(),
      description: Joi.string().required(),
      facilitator_id: Joi.number().integer().greater(0).required(),
      start_time: Joi.date().required(),
      end_time: Joi.date().required(),
      exercise_id: Joi.number().integer(),
      course_id: Joi.number().integer(),
      category_id: Joi.number().integer().required(),
      video_id: Joi.string(),
      lang: Joi.string().valid('hi', 'en', 'te', 'ta').lowercase().required(),
      class_type: Joi.string().valid('workshop', 'doubt_class').required(),
    });
  }

  static get relationMappings() {
    // eslint-disable-next-line global-require
    const Courses = require('./courses');
    return {
      courses: {
        relation: Model.HasOneRelation,
        modelClass: Courses,
        join: {
          from: 'main.classes.exercise_id',
          to: 'main.courses.id',
        },
      },
    };
  }
};