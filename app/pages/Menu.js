import React, { Component } from 'react';
import { ScrollView, AppState, View, Dimensions, StyleSheet, Text, Image, TouchableOpacity, ListView, TouchableHighlight, DeviceEventEmitter, NetInfo, NativeModules } from 'react-native';
import List from '../components/List';
import Loading from '../components/Loading';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import *as loginAction from '../actions/loginAction';

let CONNECT_BOOL;
const { width, height } = Dimensions.get('window');
class Menu extends Component {

    componentWillMount() {
        AppState.addEventListener(
            'change',
            (appState) => { this.handleAppStateChange(appState) }
        );
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            (isConnected) => { this.handleIsConnectedChange(isConnected) }
        );
    }

    componentDidMount() {
        this.props.getMessage();
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleIsConnectedChange);
    }

    handleIsConnectedChange(isConnected) {
        if (CONNECT_BOOL === false && isConnected === true) {
            console.log('网络发生变化了，当前为' + isConnected);
        }
        CONNECT_BOOL = isConnected;
    }

    handleAppStateChange(appState) {
        if (appState != 'active') {
            console.log('应用处于后台状态')
        }
    }

    selectOrganization(organization) {
        this.props.selectOrganization(organization);
        if (this.props.list != "") {
            this.openFromMenu(this.props.list, organization, '', true);
        }
    }

    selectProject(project) {
        this.props.selectProject(project)
        if (this.props.list != '') {
            this.openFromMenu(this.props.list, this.props.currentOrganization, project, true);
        }

    }

    selectList(list) {
        this.props.selectList(list);
        if (this.props.currentOrganization != '' && this.props.currentProject != '') {
            this.openFromMenu(list.name, this.props.currentOrganization, this.props.currentProject, true);
        } else if (this.props.currentOrganization != '' && this.props.currentProject === '') {
            this.openFromMenu(list.name, this.props.currentOrganization, '', true);
        }
    }

    renderOrg(organization) {
        const bgColor = organization == this.props.currentOrganization ? '#F3F3F3' : '#FEFEFE';
        return (
            <List
                text={organization}
                bgColor={bgColor}
                onPress={() => this.selectOrganization(organization)}
            />
        );
    }

    renderListLatestOpen(project) {
        const bgColor = project == this.props.currentProject ? '#F3F3F3' : '#FEFEFE';
        const disable = project == this.props.currentProject ? true : false;
        return (
            <List
                text={project}
                bgColor={bgColor}
                disable={disable}
                onPress={() => {
                    this.setState({
                        currentProject: project
                    });
                    this.selectProject(project);
                }}
            />
        )
    }

    renderList(list) {
        const bgColor = list.name == this.props.list ? '#F3F3F3' : '#FEFEFE';
        const disable = list.name == this.props.list ? true : false;
        const downloading = this.props.downloading.indexOf(list.name) >= 0 ? true : false;
        return (
            <List
                text={list.name}
                downloading={downloading}
                disable={disable}
                leftIconName={list.icon}
                listHeight={46}
                bgColor={bgColor}
                onPress={() => {
                    this.selectList(list)
                }}
            />
        );
    }

    openFromMenu(listName, orgId, proId, isClose) {
        if (proId != '') {
            console.log('组织：' + orgId + ',项目：' + proId + ',模块：' + listName + '【组织层】');
        } else {
            console.log('组织：' + orgId + ',项目：' + proId + ',模块：' + listName + '【项目层】');
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {
                    this.props.organizationShow &&

                    <ScrollView style={{ position: 'absolute', marginTop: 137, top: 0, left: 0, width: width, height: height - 137, backgroundColor: '#FEFEFE', zIndex: 99 }}>
                        <ListView
                            dataSource={this.props.dataOrgSource}
                            renderRow={this.renderOrg.bind(this)}
                        />
                    </ScrollView>

                }
                <ScrollView
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    style={{ flex: 1, flexDirection: 'column' }}
                >
                    <View style={styles.topArea}>
                        <View style={styles.topAreaBasicInformation}>
                            <View style={[styles.topAreaBasicInformationUserImage, { height: 81 }]}>
                                <Image
                                    source={{ uri: this.props.userHeadImage }}
                                    style={styles.imageStyle}
                                />
                            </View>
                            <View style={[styles.topAreaBasicInformationUserInformation, { height: 81, justifyContent: 'flex-end' }]} >
                                <Text
                                    style={[styles.fontColorFFF, { fontSize: 16 }]}
                                    numberOfLines={1}
                                >
                                    {this.props.userName}
                                </Text>
                                <Text
                                    style={[styles.fontColorFFF, { fontSize: 14 }]}
                                    numberOfLines={1}
                                >
                                    {this.props.userEmail}
                                </Text>
                            </View>
                            <View style={{ justifyContent: 'space-between', height: 81, paddingTop: 16 }}>
                                <TouchableOpacity onPress={() => console.log('refresh')}>
                                    <View style={styles.topAreaBasicInformationSetting}>
                                        <Icon name="md-refresh" size={20} color={'#FFF'} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('sign-out')}>
                                    <View style={styles.topAreaBasicInformationSetting}>
                                        <Icon name="md-log-out" size={20} color={'#FFF'} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                //if (!this.props.organizationShow) { this.getOrganizations(); }
                                //this.setState({
                                //    organizationShow: !this.props.organizationShow
                                //});
                                this.props.changeOrganizationShow()
                                _scrollView.scrollTo({ x: 0, y: 0, animated: true })
                            }}
                        >
                            <View style={styles.topAreaOrganizationInformation}>
                                <View style={[styles.verticalCenter, { flex: 1, }]}>
                                    <Text style={[styles.fontColorFFF, { fontSize: 14, marginLeft: 16 }]}>{this.props.currentOrganization}</Text>
                                </View>
                                <View style={[styles.verticalCenter, { width: 28, }]}>
                                    <Icon name="md-arrow-dropdown" size={30} color={'#FFF'} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomArea}>
                        <List
                            text={'最近打开的项目'}
                            overlayMarginTop={4}
                            textColor={'rgba(0,0,0,0.54)'}
                            underlayColor={'transparent'}
                            activeOpacity={1}
                        />
                        <View>
                            <ListView
                                dataSource={this.props.dataLatestOpenSource}
                                renderRow={this.renderListLatestOpen.bind(this)}
                            />
                        </View>
                        <List
                            text={'全部项目'}
                            listHeight={62}
                            leftIconName={'md-menu'}
                            rightIconName={'ios-arrow-forward'}
                            onPress={() => this.props.navigation.navigate('SelectProjects', { org: this.props.currentOrganization })}
                        />
                        <View>
                            <View style={styles.listBottomBorder}></View>
                            {
                                this.props.loading &&
                                <Loading />
                            }
                            <ListView
                                dataSource={this.props.dataListSource}
                                renderRow={this.renderList.bind(this)}
                            />
                        </View>
                    </View >
                </ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
        flexDirection: 'column',
    },
    topArea: {
        height: 137,
        backgroundColor: '#Fab614'
    },
    bottomArea: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    topAreaBasicInformation: {
        flex: 1,
        height: 81,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    topAreaOrganizationInformation: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topAreaBasicInformationUserImage: {
        width: 81,
        paddingLeft: 16,
        justifyContent: 'flex-end'
    },
    topAreaBasicInformationUserInformation: {
        flex: 1,
        paddingLeft: 11,
        paddingRight: 11
    },
    topAreaBasicInformationSetting: {
        width: 28
    },
    userName: {
        flex: 1,
        height: height * 0.2,
        paddingTop: 40,
        paddingLeft: 20
    },
    userImage: {
        width: 65,
        height: 65,
        alignSelf: 'center',
        marginRight: 30
    },
    imageStyle: {
        width: 65,
        height: 65,
        borderRadius: 32.5
    },
    fontColorFFF: {
        color: '#FFF'
    },
    verticalCenter: {
        justifyContent: 'center'
    },
    listBottomBorder: {
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3',
        marginBottom: 8
    }
});

export default connect(
    (state) => ({
        userHeadImage: state.loginIn.userHeadImage,
        userName: state.loginIn.userName,
        userEmail: state.loginIn.userEmail,
        organizationShow: state.loginIn.organizationShow,
        currentOrganization: state.loginIn.currentOrganization,
        dataOrgSource: state.loginIn.dataOrgSource,
        currentProject: state.loginIn.currentProject,
        dataLatestOpenSource: state.loginIn.dataLatestOpenSource,
        list: state.loginIn.list,
        dataListSource: state.loginIn.dataListSource,
        downloading: state.loginIn.downloading,
        loading: state.loginIn.loading,
    }),
    (dispatch) => ({
        getMessage: () => dispatch(loginAction.getMessage()),
        selectOrganization: (organization) => dispatch(loginAction.selectOrganization(organization)),
        selectProject: (project) => dispatch(loginAction.selectProject(project)),
        selectList: (list) => dispatch(loginAction.selectList(list)),
        changeOrganizationShow: () => dispatch(loginAction.changeOrganizationShow()),
    })
)(Menu)
