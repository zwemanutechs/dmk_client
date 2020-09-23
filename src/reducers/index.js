import { combineReducers } from "redux";
import itemActions from "../layout/reducer/main-menu-reducer";
import rinseDIItemActions from "../components/rinse-di/reducers/rinseDI-reducer";
import rinse1ItemActions from "../components/rinse1/reducers/rinse1-reducer";
import rinse2ItemActions from "../components/rinse2/reducers/rinse2-reducer";
import rinse3ItemActions from "../components/rinse3/reducers/rinse3-reducer";
import degreasingItemActions from "../components/degreasing/reducers/degreasing-reducer";
import paintBoothItemActions from "../components/paintBooth/reducers/paintBooth-reducer";
import neuEvaporatorItemActions from "../components/neuEvaporator/reducers/neuEvaporator-reducer";
import passivationItemActions from "../components/passivation/reducers/passivation-reducer";
import paintCabinetItemActions from "../components/paintCabinet/reducers/paintCabinet-reducer";
import diagItemActions from "../shared/mat-diaglog/reducer/maxDialog-reducer";
import snackItemActions from "../shared/snackbar/reducer/snackbar-reducer";
import spinnerItemActions from "../shared/spinner/reducer/spinner-reducer";

export default combineReducers({
    itemActions,
    diagItemActions,
    rinseDIItemActions,
    rinse1ItemActions,
    rinse2ItemActions,
    rinse3ItemActions,
    degreasingItemActions,
    paintBoothItemActions,
    neuEvaporatorItemActions,
    passivationItemActions,
    paintCabinetItemActions,
    snackItemActions,
    spinnerItemActions
});
