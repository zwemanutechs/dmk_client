import { combineReducers } from "redux";
import itemActions from "../layout/reducer/main-menu-reducer";
import rinseDIItemActions from "../components/rinse-di/reducers/rinseDI-reducer";
import diagItemActions from "../shared/mat-diaglog/reducer/maxDialog-reducer";
import snackItemActions from "../shared/snackbar/reducer/snackbar-reducer";

export default combineReducers({
    itemActions,
    diagItemActions,
    rinseDIItemActions,
    snackItemActions
});
