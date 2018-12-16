/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */
import Immutable from 'immutable';
import {LOCATION_CHANGE} from 'react-router-redux';

const initialState = Immutable.fromJS({
    locationBeforeTransitions: null
});

export default (state = initialState, action) => {
    if (action.type === LOCATION_CHANGE) {
        return state.set('location', action.payload);
    }

    return state;
};