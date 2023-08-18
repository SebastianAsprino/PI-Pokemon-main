//     ___            __    ______                
//    / _ \___  __ __/ /___/_  __/_ _____  ___ ___
//   / , _/ _ \/ // / __/ -_) / / // / _ \/ -_|_-<
//  /_/|_|\___/\_,_/\__/\__/_/  \_, / .__/\__/___/
//                            /__/_/               

const { Router } = require('express');
const { GETType,getDBInfoType } = require('../controllers');

const RTypes = Router();

RTypes.get("/types", async (req, res) => {
  try {
    const data = await GETType();
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

RTypes.get("/types/pokemon", async (req, res) => {
  try {
    const data = await getDBInfoType();
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});












module.exports = RTypes;