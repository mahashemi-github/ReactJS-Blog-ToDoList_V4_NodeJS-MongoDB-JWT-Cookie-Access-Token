const express = require('express')
const blogController = require('../controllers/blogController')
const todoController = require('../controllers/todoController')
const authController = require('../controllers/authController')
const { requireAuth } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/blogs', blogController.get_allblogs)
router.get('/blogs/:id', blogController.get_details)
router.post('/blogs/create', requireAuth, blogController.post_newblog)
router.patch('/blogs/:id', requireAuth, blogController.update_blog)
router.delete('/blogs/:id', requireAuth, blogController.delete_blog)

router.get('/todo', todoController.get_alltodos)
router.post('/todo', todoController.post_newtodo)
router.delete('/todo/:id', todoController.delete_todo)

router.post('/signup', authController.post_signup)
router.post('/login', authController.post_login)
router.get('/logout', authController.get_logout)
router.post('/forgetpassemail', authController.post_forgetpassemail)
router.patch('/resetpass/:id', authController.patch_resetpass)
router.delete('/deleteaccount', authController.delete_account)

router.get('/onloadauth', authController.get_onloadauth)

module.exports = router