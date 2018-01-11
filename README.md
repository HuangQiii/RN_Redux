# GHY_Menu_Redux版本
光华园移动端左侧活动菜单的Redux版本，考虑了光华园的组织架构，由组织层——项目层——实体（分别对应各大组织——组织下的部门——个人），更好地服务用户。

**Support:react-native 0.50.3 react 16.0.0**

## 功能说明
- 选择用户组织（若已选择了项目再选择组织，会去除项目选择）
- 选择该组织下的项目
- 模拟实体层的下载，可选择性配置

## Build
#### Step One

```
npm install
```
#### Step Two

```
react-native link
```
#### Run

```
react-native run-android
```
## Contributing

PRs and issues are welcome
## License

This project is licenced under the [MIT License](http://opensource.org/licenses/mit-license.html).
