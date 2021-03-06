const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const wizardValidation = require('../../validations/wizard.validation')
const wizardController = require('../../controllers/wizard.controller')

const router = express.Router()

router
  .route('/')
  .get(wizardController.getWizards)
  .post(wizardController.createWizard)
  // .get(function (req, res) {
  //   res.send({ message: 'TODO: return all posts' })
  // })
  // .post(auth('manageWizards'), validate(wizardValidation.createWizard), wizardController.createWizard)
  // .get(auth('getWizards'), validate(wizardValidation.getWizards), wizardController.getWizards)

router
  .route('/:wizardId')
    .get(wizardController.getWizard)
  // .get(auth('getWizards'), validate(wizardValidation.getWizard), wizardController.getWizard)
  // .patch(auth('manageWizards'), validate(wizardValidation.updateWizard), wizardController.updateWizard)
  // .delete(auth('manageWizards'), validate(wizardValidation.deleteWizard), wizardController.deleteWizard)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Wizards
 *   description: Wizard management and retrieval
 */

/**
 * @swagger
 * /wizards:
 *   post:
 *     summary: Create a wizard
 *     description: Only admins can create other wizards.
 *     tags: [Wizards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               role:
 *                  type: string
 *                  enum: [wizard, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: wizard
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Wizard'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all wizards
 *     description: Only admins can retrieve all wizards.
 *     tags: [Wizards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Wizard name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Wizard role
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of wizards
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Wizard'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /wizards/{id}:
 *   get:
 *     summary: Get a wizard
 *     description: Logged in wizards can fetch only their own wizard information. Only admins can fetch other wizards.
 *     tags: [Wizards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wizard id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Wizard'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a wizard
 *     description: Logged in wizards can only update their own information. Only admins can update other wizards.
 *     tags: [Wizards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wizard id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Wizard'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a wizard
 *     description: Logged in wizards can delete only themselves. Only admins can delete other wizards.
 *     tags: [Wizards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wizard id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
