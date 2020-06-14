const express = require('express');
const router = express.Router();

// middleware
const validatorMid = require('../middleware/validator');
const authMid = require('../middleware/authentication');

// handler request
const handler = require('./handler')

// route list
const routeList = require('./list')



router.post(routeList.CONFIRM_EMAIL, [validatorMid.Rules, authMid.Auth], handler.ConfirmEmailHandred)
router.post(routeList.INVITE_LINK, [validatorMid.Rules], handler.InviteLinkHandler)
router.post(routeList.RESET_PASSWORD, [validatorMid.Rules], handler.ResetPasswordHandler)



module.exports = router;
