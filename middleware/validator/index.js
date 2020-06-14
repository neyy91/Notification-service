const rulesList = require('./rules');

const helper = require('../../helpers/index')
const RouteList = require('../../routes/list')


async function rules(req, res, next) {

    const path = req && req.route && req.route.path

    try {

        switch (path) {

            case RouteList.CONFIRM_EMAIL:

                await rulesList.ValidateConfirmEmail(req) 

                break
            default:
                throw helper.PrepareErrorResponse(
                    400,
                    'Invalid path request', {
                        path: path
                    }
                )
        }

        next()
    } catch (err) {
 
        res.status(err.status || 500).json({
            message: err.message,
            errors: (err && err.data) || {}
        });

    }
   


}
module.exports = {
    Rules: rules
}
