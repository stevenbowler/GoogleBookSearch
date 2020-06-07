//@ts-check
/**@module 
 * @requires hapi/joi
*/
const Joi = require('@hapi/joi');


// nameValidation 
/**@name nameValidation */
const nameValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(8).required().trim()

    });
    return schema.validate(data);
}

/**@name emaileValidation */
// emailValidation   THIS ONLY ACCEPTS .com and .net EXTENSIONS NEED TO FIND SOLUTION AND FIX validation.js on Server side
const emailValidation = data => {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "*"] } }).min(8).required().trim()

    });
    return schema.validate(data);
}


// passwordValidation    this extension did not work  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
// .pattern testing .pattern('^[a-zA-Z0-9]{3,30}$')
/**@name passwordValidation */
const passwordValidation = data => {
    const schema = Joi.object({
        password: Joi.string().min(8).required().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

    });
    return schema.validate(data);
}

module.exports.nameValidation = nameValidation;
module.exports.emailValidation = emailValidation;
module.exports.passwordValidation = passwordValidation;

