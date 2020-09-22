import { combineReducers } from "redux";
import itemActions from "../layout/reducer/main-menu-reducer";
import rinseDIItemActions from "../components/rinse-di/reducers/rinseDI-reducer";
import rinse1ItemActions from "../components/rinse1/reducers/rinse1-reducer";
import rinse2ItemActions from "../components/rinse2/reducers/rinse2-reducer";
import rinse3ItemActions from "../components/rinse3/reducers/rinse3-reducer";
import degreasingItemActions from "../components/degreasing/reducers/degreasing-reducer";
import diagItemActions from "../shared/mat-diaglog/reducer/maxDialog-reducer";
import snackItemActions from "../shared/snackbar/reducer/snackbar-reducer";

export default combineReducers({
    itemActions,
    diagItemActions,
    rinseDIItemActions,
    rinse1ItemActions,
    rinse2ItemActions,
    rinse3ItemActions,
    degreasingItemActions,
    snackItemActions
});
