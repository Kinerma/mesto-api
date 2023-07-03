import { Joi, celebrate } from 'celebrate';

export const urlValid = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=-]+(#)?$/;
const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validationReturnUsersId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});

const validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(urlValid),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().regex(emailValid).required(),
    password: Joi.string().required().min(8),
  }),
});

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().regex(urlValid),
    email: Joi.string().required().regex(emailValid),
    password: Joi.string().min(8).required(),
  }),
});

export default {
  validationReturnUsersId,
  validationUpdateUser,
  validationUpdateAvatar,
  validationLogin,
  validationCreateUser,
};
