const SendController = require('../controllers/sendController');


async function confirmEmailHandred(req, res, next) {
    // return res.json({})
    return SendController.ConfirmEmail(req)
        .then(result => {
            return res.json({
                error: false,
                code: 200,
                data: result
            });
        })
        .catch(e => {
            next(e)
        })
}

async function inviteLinkHandler(req, res, next) {
    return res.json({})
    //to do
    
    // try {
    //     res.json({
    //       error: false,
    //       code: 200,
    //       data: await SendController.InviteEmail(req)
    //     });
    //   } catch (e) {
    //     next(e)
    //   }
}

async function resetPasswordHandler(req, res, next) {
    return res.json({})
    //to do 

    // try {
    //     res.json({
    //       error: false,
    //       code: 200,
    //       data: await SendController.ResetPasswordEmail(req)
    //     });
    //   } catch (e) {
    //     next(e)
    //   }
}

module.exports = {
    ConfirmEmailHandred: confirmEmailHandred,
    InviteLinkHandler: inviteLinkHandler,
    ResetPasswordHandler: resetPasswordHandler
}