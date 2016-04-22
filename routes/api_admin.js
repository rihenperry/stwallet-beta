var express = require('express')
var router = express.Router()

var admin = require('../api/admin')

router.post('/addQualifiedSearchesPending', admin.addQualifiedSearchesPending); // Get Increase User Number of Searches (Admin)
router.post('/resetQualifiedSearches', admin.resetTotalNumberOfQualifiedSearches); // Reset Qualified Searches Of All Users (Admin)
router.post('/deductunQualifiedSearches', admin.deductunQualifiedSearches); // Deduct UnQualified Searches For User API (Admin)
router.post('/getExpenceTransactions', admin.getExpenceTransactions) // Get Expence Transactions For Admin API
router.post('/getIncomeTransactions', admin.getIncomeTransactions) // Get Income Transactions For Admin API
router.post('/getActiveEmails', admin.getActiveEmails) // Get Active Users Email
router.post('/userManage', admin.userManage) // Get Specific User Details
router.post('/paymentModeCount', admin.paymentModeCount) // Get User Transaction Count On Payment Mode
router.post('/setUserBalance', admin.setUserBalance) // Set User Balance API
router.post('/getEmailTypeTransactions', admin.getEmailTypeTransactions) // Email And Type Transactions
router.post('/updateUserStatus', admin.updateUserStatus) // Update User Status API
router.post('/latestDeposit', admin.latestDeposit) // latest Deposit API
router.post('/totalCount', admin.totalCount) // Count By Type and Payment Mode
router.post('/userBalanceCalc', admin.userBalanceCalc) // User Balance Calculation By Email
router.post('/allUsersBalance', admin.allUsersBalance); // All User's Total Balance

module.exports = router
