//               &&
//             &&&&&
//           &&&\/& &&&
//          &&|,/  |/& &&
//           &&/   /  /_&  &&
//             \  {  |_____/_&
//             {  / /          &&&
//             `, \{___________/_&&
//              } }{       \
//              }{{         \____&
//             {}{           `&\&&
//             {{}             &&
//       , -=-~{ .-^- _
//  routes     `}
//              {

const { Router } = require("express");
const RoutePokemon  = require ('./Rpokemon')
const RouteType = require ('./RType')
const router = Router();

router.use(RoutePokemon);
router.use(RouteType);

module.exports = router;
