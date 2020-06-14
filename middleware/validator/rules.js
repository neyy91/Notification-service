const {
    validationResult,
    check,
    body,
    
} = require('express-validator');

const helper = require('../../helpers/index')

async function validateConfirmEmail(req) {

    return Promise.all([

            body(['to']).exists().isEmail().run(req),
            // body(['message']).exists().isLength({
            //     min: 6, max: 30,
            // }).run(req),
            // check('subject').isLength({
            //     min: 6, max: 30,
            // }).run(req)

        ])
        .then(() => {

            const result = validationResult(req);

            if (!result.isEmpty()) {

                throw helper.PrepareErrorResponse(
                    422, "Invalid input params", result.array()
                )
            }

            return true
        })
        .catch(e => {
            console.log("[validateConfirmEmail] : \n", e)
            throw e
        })
}

module.exports = {
    ValidateConfirmEmail: validateConfirmEmail
}