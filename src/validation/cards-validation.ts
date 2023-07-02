import { Joi, celebrate } from 'celebrate';
import { urlValid } from './user-validation';

const validationCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlValid),
  }).unknown(true),
});

export default {
  validationCard,
  validationCreateCard,
};
