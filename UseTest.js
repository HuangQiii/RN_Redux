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
        //一般调用,返回200
        // HttpUtil.request(url, token)
        //     .then((result) => {
        //         console.log(result);
        //     });
        //一般调用,返回非200的正常返回值(200~299),如执行操作判断状态码是否为214（虚构），若是，则提示，否（为200），正常显示
        // HttpUtil.request(url, token)
        //     .then((result) => {
        //         if (result.status === 214) {
        //             Promise.resolve(result.json())
        //                 .then((responseData) => {
        //                     console.log('214 , need do something')
        //                     console.log(responseData);
        //                 })
        //         } else {
        //             //200
        //             console.log(result);
        //         }
        //     });
        //复杂调用,catch自定义操作
        // HttpUtil.request(url, token)
        //     .then((result) => {
        //         console.log(result);
        //     })
        //     .catch((error) => {
        //         console.log(error.status);
        //         //do something
        //         //or need {error:xxx,des:xxx}
        //         Promise.resolve(error.json())
        //             .then((responseData) => {
        //                 console.log(responseData);
        //             })
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