'use strict';
import { ScrollView, AppState, View, Dimensions, StyleSheet, Text, Image, TouchableOpacity, ListView, TouchableHighlight, DeviceEventEmitter, NetInfo, NativeModules } from 'react-native';

import * as types from '../constants/MenuTypes';

const initialState = {
    dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
    loading1: true
}

export default function SelectProjects(state = initialState, action) {
    switch (action.type) {
        case types.GET_PROJECTS_ING:
            return {
                ...state,
            }
        case types.GET_PROJECTS_Success:
            return {
                ...state,
                loading1: false,
                dataSource: state.dataSource.cloneWithRows(action.projects.slice()),
            }
        default:
            return state;
    }
}
