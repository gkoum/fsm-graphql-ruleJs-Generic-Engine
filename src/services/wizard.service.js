const httpStatus = require('http-status')
const { Wizard } = require('../models/mongo')
const ApiError = require('../utils/ApiError')

/**
 * Create a wizard
 * @param {Object} wizardBody
 * @returns {Promise<Wizard>}
 */
const createWizard = async (wizardBody) => {
  // if (await Wizard.isEmailTaken(wizardBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  console.log(wizardBody)
  console.log(wizardBody.states[0].ui)
  console.log(wizardBody.states[0].ui[0])
  console.log(typeof wizardBody.states[0].ui[0][0])
  const wizard = await Wizard.create(wizardBody)
  return wizard
}

/**
 * Query for wizards
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryWizards = async (filter, options) => {
  const wizards = await Wizard.paginate(filter, options)
  return wizards
}

/**
 * Get wizard by id
 * @param {ObjectId} id
 * @returns {Promise<Wizard>}
 */
const getWizardById = async (id) => {
  return Wizard.findById(id);
}

/**
 * Get wizard by name
 * @param {string} name
 * @returns {Promise<Wizard>}
 */
const getWizardByName = async (name) => {
  return Wizard.findOne({ name })
}

/**
 * Update wizard by id
 * @param {ObjectId} wizardId
 * @param {Object} updateBody
 * @returns {Promise<Wizard>}
 */
const updateWizardById = async (wizardId, updateBody) => {
  const wizard = await getWizardById(wizardId)
  if (!wizard) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wizard not found')
  }
  // if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  Object.assign(wizard, updateBody)
  await wizard.save()
  return wizard
}

/**
 * Delete wizard by id
 * @param {ObjectId} wizardId
 * @returns {Promise<Wizard>}
 */
const deleteWizardById = async (wizardId) => {
  const wizard = await getWizardById(wizardId)
  if (!wizard) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wizard not found')
  }
  await wizard.remove()
  return wizard
}

module.exports = {
  createWizard,
  queryWizards,
  getWizardById,
  getWizardByName,
  updateWizardById,
  deleteWizardById,
}
