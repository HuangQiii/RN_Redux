## GHY_Menu_Redux版本
光华园移动端左侧活动菜单的Redux版本，考虑了光华园的组织架构，由组织层——项目层——实体（分别对应各大组织——组织下的部门——个人），更好地服务用户。

**Support:react-native 0.52.2 react 16.2.0**

### 功能说明
- 选择用户组织（若已选择了项目再选择组织，会去除项目选择）
- 选择该组织下的项目
- 模拟实体层的下载，可选择性配置

### Getting Started  
1. Install: `npm istall`  
2. Link: `react-native link` . To link react-native-vector-icons.    
3. Run on an Android Phone: `react-native run-android` . Then you can see it.

### Use RequestUtil

1. import: `import HttpUtil from '../utils/RequestUtil';`(use your owm path)
2. Use: `HttpUtil.request(url, token).then(...)` .Like fetch. 

- base

```
HttpUtil.request(url, token)
  .then((result) => {
  console.log(result);
});
```

- complex cases

```
HttpUtil.request(url, token)
  .then((result) => {
    if (result.status === 214) {
      Promise.resolve(result.json())
      .then((responseData) => {
        console.log('214 , need do something')
        console.log(responseData);
      })
    } else {
      //200
      console.log(result);
    }
  });
```

if the response status is 200,do something, if the stauts is 2xx(the fetch response.ok should be true),do other thing

- complex cases catch

```
HttpUtil.request(url, token)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error.status);
    //do something
    //or need {error:xxx,des:xxx}
    Promise.resolve(error.json())
      .then((responseData) => {
        console.log(responseData);
      })
  });
```

### Contributing

PRs and issues are welcome
### License

This project is licenced under the [MIT License](http://opensource.org/licenses/mit-license.html).

### TODO List

- [x] 组织——项目——实体层结构搭建
- [x] 切换逻辑和模拟操作
- [x] 网络情况变化情况
- [x] 拆分Reducer
- [ ] 搜索
- [x] 通用对象
- [ ] FlatList替代ListView
- [ ] 模拟数据
- [ ] 彻底解决ListView优化渲染带来的问题
- [ ] 更多逻辑...

### 2018-1-28 commit log

upgrade to react native 0.52.2

Error: While resolving module react-native-vector-icons/MaterialIcons, the Haste package react-native-vector-icons was found.

`
rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json
`

and restart