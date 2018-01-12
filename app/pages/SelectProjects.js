import React, { Component } from 'react';
import { View, StyleSheet, ListView, DeviceEventEmitter, NativeModules } from 'react-native';
import List from '../components/List';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import *as MenuAction from '../actions/MenuAction';

const PRE_PRO = ['A', 'B', 'C', 'D', 'E', 'F'];
class SelectProjects extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.org}下的所有项目`,
        headerRight: (
            <Icon.Button
                name="md-search"
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.8}
                onPress={() => alert("Qyellow")}
            />
        )
    });

    componentDidMount() {
        this.props.getProjects();
    }

    chooseProject(project) {
        this.props.selectProject(project);
        this.props.navigation.dispatch({
            key: 'Menu',
            type: 'BcakToCurrentScreen',
            routeName: 'Menu',
        });
    }

    renderProject(project) {
        return (
            <List
                text={project}
                onPress={() => this.chooseProject(project)}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.loading1 &&
                    <Loading />
                }

                <ListView
                    dataSource={this.props.dataSource}
                    renderRow={this.renderProject.bind(this)}
                />
            </View >
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
    }
});

export default connect(
    (state) => ({
        loading1: state.Menu.loading1,
        dataSource: state.Menu.dataSource,
    }),
    (dispatch) => ({
        getProjects: () => dispatch(MenuAction.getProjects()),
        selectProject: (project) => dispatch(MenuAction.selectProject(project)),
    })
)(SelectProjects)