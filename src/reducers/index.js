import { combineReducers } from "redux";
import itemActions from "../layout/reducer/main-menu-reducer";
import paintBoothItemActions from "../components/paintBooth/reducers/paintBooth-reducer";
import paintCabinetItemActions from "../components/paintCabinet/reducers/paintCabinet-reducer";
import diagItemActions from "../shared/mat-diaglog/reducer/maxDialog-reducer";
import snackItemActions from "../shared/snackbar/reducer/snackbar-reducer";
import spinnerItemActions from "../shared/spinner/reducer/spinner-reducer";
import lineChartItemActions from "../shared/charts/line/reducers/lineChart-reducer"
import notificationCardItemActions from "../shared/notification-card/reducers/notificationCard-reducer"

export default combineReducers({
    itemActions,
    diagItemActions,
    paintBoothItemActions,
    paintCabinetItemActions,
    snackItemActions,
    spinnerItemActions,
    lineChartItemActions,
    notificationCardItemActions,
});
