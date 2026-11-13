//     ___            __    ______
//    / _ \___  __ __/ /___/_  __/_ _____  ___ ___
//   / , _/ _ \/ // / __/ -_) / / // / _ \/ -_|_-<
//  /_/|_|\___/\_,_/\__/\__/_/  \_, / .__/\__/___/
//                            /__/_/

const { Router } = require('express');
const { GETType, getDBInfoType } = require('../controllers');
const asyncHandler = require('../utils/asyncHandler');

const RTypes = Router();

RTypes.get('/types', asyncHandler(async (req, res) => {
  res.json(await GETType());
}));

RTypes.get('/types/pokemon', asyncHandler(async (req, res) => {
  res.json(await getDBInfoType());
}));

module.exports = RTypes;
