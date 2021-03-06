const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { wizardService } = require('../services')
// const { wizardImage } = require('../models/wizardImage')

const createWizard = catchAsync(async (req, res) => {
  const wizard = await wizardService.createWizard(req.body)
  res.status(httpStatus.CREATED).send(wizard)
});

const getWizards = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role'])
  const options = pick(req.query, ['sortBy', 'limit', 'page'])
  const result = await wizardService.queryWizards(filter, options)
  res.send(result)
});

const getWizard = catchAsync(async (req, res) => {
  const wizard = await wizardService.getWizardById(req.params.wizardId)
  if (!wizard) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wizard not found')
  }
  res.send(wizard)
});

const updateWizard = catchAsync(async (req, res) => {
  const wizard = await wizardService.updateWizardById(req.params.wizardId, req.body)
  res.send(wizard)
});

const deleteWizard = catchAsync(async (req, res) => {
  await wizardService.deleteWizardById(req.params.wizardId);
  res.status(httpStatus.NO_CONTENT).send()
});

module.exports = {
  createWizard,
  getWizards,
  getWizard,
  updateWizard,
  deleteWizard,
}
