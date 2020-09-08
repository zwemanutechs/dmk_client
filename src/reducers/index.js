import { combineReducers } from "redux";
import itemActions from "../layout/reducer/main-menu-reducer";
import rinseDIItemActions from "../components/rinse-di/reducers/rinseDI-reducer";
import diagItemActions from "../shared/mat-diaglog/reducer/maxDialog-reducer";

export default combineReducers({
    itemActions,
    diagItemActions,
    rinseDIItemActions
});
