import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import HttpUtil from '../utils/RequestUtil';

const { width, height } = Dimensions.get('window');
export default class UseTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.getMessage();
    }

    getMessage() {
        //复杂调用
        HttpUtil.request('http://gateway.devops.saas.hand-china.com/operation/v1/operation/dashboard/list', 'Bearer c077cb26-dd0d-43ef-8e57-7d1c083215c')
            .then((result) => {
                if (result.status != undefined) {
                    console.log(result.status)
                    Promise.resolve(result.json())
                        .then((responseData) => {
                            console.log(responseData);
                        })
                } else {
                    console.log(result);
                }
            });
        //一般调用
        // HttpUtil.request('http://gateway.devops.saas.hand-china.com/operation/v1/operation/dashboard/list', 'Bearer c077cb26-dd0d-43ef-8e57-7d1c083215ce')
        //     .then((result) => {
        //         console.log(result);
        //     });
    }


    render() {
        return (
            <View style={styles.container}>
            </View >
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        backgroundColor: '#F1F1F2',
        flexDirection: 'column'
    },
});