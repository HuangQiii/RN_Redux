import React, { Component } from 'react';
import { View, StyleSheet, ListView, DeviceEventEmitter, NativeModules, FlatList } from 'react-native';
import List from '../components/List';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import *as MenuAction from '../actions/MenuAction';
import *as SelectProjectsAction from '../actions/SelectProjectsAction';

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

    keyExtractor = (project, index) => index

    chooseProject(project) {
        this.props.selectProject(project);
        this.props.navigation.dispatch({
            key: 'Menu',
            type: 'BcakToCurrentScreen',
            routeName: 'Menu',
        });
    }

    renderProject = (project) => {
        return (
            <List
                text={project.item}
                onPress={() => this.chooseProject(project.item)}
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

                {/*<ListView
                    dataSource={this.props.dataSource}
                    renderRow={this.renderProject.bind(this)}
                />*/}
                <FlatList
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderProject}
                    data={this.props.dataSource}
                >

                </FlatList>
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
        loading1: state.SelectProjects.loading1,
        dataSource: state.SelectProjects.dataSource,
    }),
    (dispatch) => ({
        getProjects: () => dispatch(SelectProjectsAction.getProjects()),
        selectProject: (project) => dispatch(MenuAction.selectProject(project)),
    })
)(SelectProjects)