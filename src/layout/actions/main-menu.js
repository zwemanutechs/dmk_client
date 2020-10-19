import { OPEN_MENU, CLOSE_MENU, GET, USER_ERROR } from "../action-constants/menu-actionTypes";
import { client } from "../../middleware/axios-middleware";

export const openMenu = name => ({
    type: OPEN_MENU, // mandatory key
    name
});

export const closeMenu = name => ({
    type: CLOSE_MENU, // mandatory key
    name
});

export const getMenu = () => async dispatch => {
  try{
      const response = await client.get('Auth/AccessMenu',{headers : {'AccessToken' : localStorage.getItem('access-data')}});
      if(response && response.status === 200){
          dispatch({
              type: GET,
              payload: response.data.data
          });
      }else{
          dispatch({
              type: USER_ERROR,
              payload: []
          });
      }
  }  catch (e) {
      dispatch({
          type: USER_ERROR,
          payload: []
      });
  }
};
