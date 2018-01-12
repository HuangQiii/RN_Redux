## GHY_Menu_Redux版本
光华园移动端左侧活动菜单的Redux版本，考虑了光华园的组织架构，由组织层——项目层——实体（分别对应各大组织——组织下的部门——个人），更好地服务用户。

**Support:react-native 0.50.3 react 16.0.0**

### 功能说明
- 选择用户组织（若已选择了项目再选择组织，会去除项目选择）
- 选择该组织下的项目
- 模拟实体层的下载，可选择性配置

### Getting Started  
1. Install: `npm istall`  
2. Link: `react-native link` . To link react-native-vector-icons.    
3. Run on an Android Phone: `react-native run-android` . Then you can see it.

### Contributing

PRs and issues are welcome
### License

This project is licenced under the [MIT License](http://opensource.org/licenses/mit-license.html).

### TODO List

- [x] 组织——项目——实体层结构搭建
- [x] 切换逻辑和模拟操作
- [x] 网络情况变化情况
- [ ] 搜索
- [ ] 通用对象
- [ ] FlatList替代ListView
- [ ] 模拟数据
- [ ] 彻底解决ListView优化渲染带来的问题
