# 传智研究院-脚手架
#### 项目简介
> 随着我国人口老龄化问题的日趋严峻，对专业化养老院的需求与日俱增。而大部分的养老院信息化水平较低，现代化服务装备普遍欠缺，管理和服务效率低下，无法满足老人对专业化护理的需求。中州养老系统为养老院量身定制开发专业的养老管理软件产品；涵盖来访管理、入退管理、在住管理、服务管理、财务管理等功能模块，涉及从来访参观到退住办理的完整流程

项目迭代日志：
#### 研发规范遵循：

- 主体使用驼峰命名
- 公共样式使用 - 连接命名
- 内部样式 驼峰命名
- 页面命名 使用小写开头的驼峰命名
- 组件使用大写开头命名

#### 产品原型及设计
- 原型： https://codesign.qq.com/app/prototype/myB3P04r3Qjn7lQ/detail
- 设计稿： https://codesign.qq.com/app/design/Yyg5ZpDye6Z2lKv/board?team_id=6dqN292MdajaBXe

#### 运行环境 - 初始开发环境及工具

- 项目开发环境: Mac + node: v17.8.0 + npm: 8.12.1 || pnpm: 6.32.8 

#### 访问地址
https://zhyl-admin-t.itheima.net/

#### 技术栈应用
Vue 3 + TypeScript +Tdesign + Vite + pinia
#### 项目结构
```html
├── commitlint.config.js              - commintlint 规范
├── docker                            - docker 部署配置文件
│     └── nginx.conf                  - 若开启 browerhistroy 可参考配置
├── docs                              - 项目展示图 - 首页截图      
├── globals.d.ts                      - 通用声明文件        
├── index.html                        - 主 html 文件
├── mock                              - mock 目录
│     └── index.ts
├── node_modules                      - 项目依赖
├── package-lock.json
├── package.json
├── public                            - 公用资源文件  
│     └── favicon.ico
├── shims-vue.d.ts
├── src                               - 页面代码
│   ├── api 请求相关
│   ├── assets 公共资源
│   │   ├── images 图片资源
│   ├── conponents                    - 公用组件
│   │   ├── Delete                    - 删除弹层：只需从父组件传删除的内容提示
│   │   ├── ImageMagnify              - 查看图片弹层
│   │   ├── Message                   - 提示弹层
│   │   │   ├──Success                - 成功通知弹窗
│   │   │   ├──ProdDisabled           - 禁用提示弹窗
│   │   ├── switchBar                 - tab切换
│   │   │   ├──switchBar              - tab切换
│   │   │   ├──switchBarindex         - 首页tab切换
│   │   │   ├──switchBartop           - 线条tab
│   │   ├── ApplyTip                  - tab切换
│   │   ├── Forbidden                 - 禁用
│   │   ├── ImageMagnify              - 查看图片
│   │   ├── noData                    - 无数据
│   │   ├── OldManSelect              - 选择老人
│   │   ├── OperateDialog             - 操作弹层
│   │   │   ├──index                  - 删除
│   │   │   ├──ResetPassword          - 重置密码
│   │   │   ├──disable                - 禁用、启用
│   ├── layouts                       - 页面架构
│   │   ├──components				  - 页面架构公共组件
│   │   │   ├──Breadcrumb			  - 面包屑
│   │   │   ├──Content				  - 内置组件，避免重复渲染DOM
│   │   │   ├──EaseRequest			  - 接口测试工具组件
│   │   │   ├──Footer				  - 底部公司名称
│   │   │   ├──LayoutContentSide	  - 侧边栏
│   │   │   ├──LayoutHeader	  		  - 侧边栏头部
│   │   │   ├──Loginfo	  		  	  - 侧边栏退出区域
│   │   │   ├──Notice	  		  	  - 通知中心，弃用
│   │   │   ├──Search	  		  	  - 搜索功能
│   │   ├──frame					  - 页面架构框架
│   │   ├──simple2Components		  - 框架公用内容
│   │   │   ├──Header				  - 框架顶部
│   │   │   ├──topMenuContent	  	  - 框架复杂版导航
│   │   │   ├──SideNav	  		  	  - 列表菜单
│   │──index.vue					  - 框架布局
│   ├── pages                         - 页面展示目录
│   │   ├──dashboard                  - 首页
│   │   ├──appointment                - 预约管理
│   │   │   ├──comeVisit              - 来访登记
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──DialogFrom	  - 到访登记表单弹层
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   │   ├──subscribe              - 预约登记
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──DialogFrom	  - 到院表单弹层
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   ├──client                     - 客户管理
│   │   │   ├──index                  - 主页
│   │   │   ├──constants              - 列表展示的数据
│   │   │   ├──components             - 组件
│   │   │   │   ├──SearchForm	  	  - 搜索功能
│   │   │   │   ├──TableList	  	  - table列表
│   │   ├──enterQuit                  - 入退管理
│   │   │   ├──enter                  - 入住办理
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──details            - 入住详情
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──ApplyForm	  - 第一步：申请入住(申请信息)
│   │   │   │   │   ├──ApplyBaseInfo  - 申请入住(导入了ApplyBaseInfo1和ApplyBaseInfo2组件)
│   │   │   │   │   ├──ApplyBaseInfo1 - 第一步：申请入住(基本信息、家属信息、资料长传)展示
│   │   │   │   │   ├──ApplyBaseInfo2 - 第二步：健康能力评估(健康评估、能力评估、评估报告)
│   │   │   │   │   ├──AssessmentForm - 第二步：健康能力评估(AssessmentForm1、AssessmentForm2、AssessmentForm3)
│   │   │   │   │   ├──AssessmentForm1 - 健康评估
│   │   │   │   │   ├──AssessmentForm2 - 能力评估
│   │   │   │   │   ├──AssessmentForm3 - 评估报告
│   │   │   │   │   ├──ApplyConfigBase- 第四步：入住配置
│   │   │   │   │   ├──TransactForm   - 第五步：签约办理表单
│   │   │   │   │   ├──RightApply     -右侧审批
│   │   │   │   │   ├──ApplyBase      -需要展示的基本信息
│   │   │   │   │   ├──ApplyApproval  -申请审批记录
│   │   │   │   │   ├──BillDetails    -账单预览
│   │   │   │   │   ├──ApplyConfigBase-入住配置详情
│   │   │   │   │   ├──SignBaseInfo   -签约办理详情
│   │   │   │   │   ├──upload         -资料上传
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   │   ├──quit                   - 退住办理
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   ├──financing                  - 财务管理
│   │   │   ├──bill                   - 账单列表
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──details            - 详情页
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──BaseInfo	      - 账单信息
│   │   │   │   │   ├──BaseInfoDetail - 账单明细
│   │   │   │   │   ├──CancelFrom     - 填写取消原因
│   │   │   │   │   ├──CreatBillFrom  - 生成月度账单
│   │   │   │   │   ├──DialogFrom     - 上传支付凭证
│   │   │   │   │   ├──RecordCancel   - 取消记录
│   │   │   │   │   ├──RecordPay      - 支付记录
│   │   │   │   │   ├──RecordRefund   - 退款记录
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   │   ├──arrearage              - 欠费老人列表
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──DialogForm	  - 查看欠费账单
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   │   ├──prestore               - 预交款列表
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──DialogForm	  - 上传充值凭证
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   │   ├──balance                - 余额查询列表
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   ├──intelligence               - 智能监测
│   │   │   ├──equipment              - 设备管理查询列表
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──details            - 设备详情
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──DialogForm	  - 新增、编辑设备
│   │   │   │   │   ├──LookData	      - 查看设备
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   │   ├──facility               - 报警数据查询列表
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──DialogForm	  - 处理结果
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   │   ├──warn                   - 报警规则查询列表
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──details            - 新增、编辑规则
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   ├──liveIn                     - 在住管理
│   │   │   ├──contract               - 合同管理
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──details            - 合同详情
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   │   ├──bed                    - 床位管理
│   │   │   │   ├──houseType          - 床位房型
│   │   │   │   │   ├──index          - 主页
│   │   │   │   │   ├──constants      - 列表展示的数据
│   │   │   │   │   ├──components     - 组件
│   │   │   │   │   │   ├──AddBed	  - 新增、编辑床位
│   │   │   │   │   │   ├──AddFloor	  - 新增、编辑楼层
│   │   │   │   │   │   ├──AddRoom	  - 新增、编辑房间
│   │   │   │   │   │   ├──CheckRoom  - 查看房间详情
│   │   │   │   │   │   ├──FloorInfo  - 新增楼层按钮
│   │   │   │   │   │   ├──List	      - 房型列表
│   │   │   │   │   │   ├──SwitchBartop	  - 楼层按钮列表
│   │   │   │   ├──houseSet           - 房型设置
│   │   │   │   │   ├──index          - 主页
│   │   │   │   │   ├──constants      - 列表展示的数据
│   │   │   │   │   ├──components     - 组件
│   │   │   │   │   │   ├──DialogFrom - 新增、编辑房型
│   │   │   │   │   │   ├──TableList  - table列表
│   │   │   │   ├──smartBed           - 智能床位
│   │   │   │   │   ├──index          - 主页
│   │   │   │   │   ├──constants      - 列表展示的数据
│   │   │   │   │   ├──components     - 组件
│   │   │   │   │   │   ├──List	      - 房型列表
│   │   │   │   │   │   ├──SwitchBartop	- 楼层按钮列表
│   │   ├──login                      - 登录
│   │   ├──order                      - 订单管理
│   │   │   ├──order                  - 订单管理
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──details            - 订单详情
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──BaseInfo	      - 基本信息
│   │   │   │   │   ├──Cancel     	  - 填写取消原因
│   │   │   │   │   ├──RecordCancel   - 取消记录
│   │   │   │   │   ├──RecordExecutel - 执行记录
│   │   │   │   │   ├──RecordPay      - 支付记录
│   │   │   │   │   ├──RecordRefund   - 退款记录
│   │   │   │   │   ├──Refund         - 退款原因
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   │   ├──refund                 - 退款管理
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──DialogFrom	  - 查看退款记录
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   ├──permission                 - 用户管理
│   │   │   ├──dept                   - 部门管理
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──DialogFrom	  - 新增编辑弹层
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   │   ├──menu                   - 菜单管理
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──btnList	      - 按钮配置
│   │   │   │   │   ├──DialogFrom	  - 菜单新增编辑弹层
│   │   │   │   │   ├──DialogFormBtn  - 按钮新增编辑弹层
│   │   │   │   │   ├──MenuItem       - 左侧菜单树形列表
│   │   │   │   │   ├──MenuList       - 左侧菜单树形列表
│   │   │   ├──post                   - 职位管理
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──DialogFrom	  - 新增编辑弹层
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   │   ├──role                   - 角色管理
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──DialogFrom	  - 新增编辑弹层
│   │   │   │   │   ├──MenuList	      - 角色所对应的菜单设置
│   │   │   │   │   ├──RoleList	      - 左侧角色树列表
│   │   │   ├──user                   - 用户管理
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──DialogFrom	  - 新增编辑弹层
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──Tree	          - 树状列表
│   │   │   │   │   ├──TableList	  - table列表
│   │   ├──serve                      - 服务管理
│   │   │   ├──plan                   - 护理计划
│   │   │   │   ├──grade              - 护理等级
│   │   │   │   │   ├──index              - 主页
│   │   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   │   ├──components         - 组件
│   │   │   │   │   │   ├──DialogFrom	  - 新增编辑护理等级
│   │   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   │   ├──TableList	  - table列表
│   │   │   │   ├──nurse                  - 护理计划
│   │   │   │   │   ├──index              - 主页
│   │   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   │   ├──components         - 组件
│   │   │   │   │   │   ├──DialogFrom	  - 新增编辑护理计划
│   │   │   │   │   │   ├──DialogLook	  - 查看护理计划
│   │   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   │   ├──Select	      - 护理项目下拉菜单
│   │   │   │   │   │   ├──TableList	  - table列表
│   │   │   │   ├──project                - 护理项目
│   │   │   │   │   ├──index              - 主页
│   │   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   │   ├──components         - 组件
│   │   │   │   │   │   ├──DialogFrom	  - 新增编辑护理项目
│   │   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   │   ├──TableList	  - table列表
│   │   │   ├──task                       - 护理任务
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──details            - 任务安排详情
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──BaseInfo  	  - 基本信息
│   │   │   │   │   ├──cancelAccord	  - 取消记录
│   │   │   │   │   ├──DialogFormExecute - 新增执行记录
│   │   │   │   │   ├──DialogFormTime - 修改执行时间
│   │   │   │   │   ├──DialogForm     - 取消原因
│   │   │   │   │   ├──DialogFormTime - 修改执行时间
│   │   │   │   │   ├──excuteAccord   - 执行记录
│   │   │   │   │   ├──serveProject   - 护理项目
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   │   │   ├──oldPeople              - 负责老人
│   │   │   │   │   ├──index              - 主页
│   │   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   │   ├──components         - 组件
│   │   │   │   │   │   ├──CheckRoom	  - 设置护理员
│   │   │   │   │   │   ├──List	          - 房型列表
│   │   │   │   │   │   ├──SwitchBartop	  - 楼层tab列表
│   │   ├──synergy                    - 协同管理
│   │   │   ├──backlog                - 我的待办
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   │   ├──apply                  - 我的申请
│   │   │   │   ├──index              - 主页
│   │   │   │   ├──details            - 详情
│   │   │   │   ├──constants          - 列表展示的数据
│   │   │   │   ├──components         - 组件
│   │   │   │   │   ├──ApplyApproval  - 申请审批（公用：第二、五、六步）
│   │   │   │   │   ├──ApplyBaseInfo  - 基本信息（公用）
│   │   │   │   │   ├──applyClass     - 选择申请单据类别
│   │   │   │   │   ├──ApplyForm      - 申请退住表单（第一步）
│   │   │   │   │   ├──OldManSelect   - 申请退住表单选择老人（第一步）
│   │   │   │   │   ├──ContractForm   - 解除合同（第三步）
│   │   │   │   │   ├──AdjustBill     - 调整费用账单（第四步）
│   │   │   │   │   ├──ApproveBill    - 账单明细（第四、五、六步）
│   │   │   │   │   ├──UploadVoucher  - 上传退款凭证
│   │   │   │   │   ├──Liquidation    - 完成账单清算（第七步）
│   │   │   │   │   ├──RightApply     - 右侧操作记录（公共）
│   │   │   │   │   ├──SearchForm	  - 搜索功能
│   │   │   │   │   ├──TableList	  - table列表
│   │   ├──user                       - 个人中心
│   ├── router                        - 定义路由页面
│   ├── style                         - 样式
│   │   ├──componentsReast            - 组件重置、全局样式
│   │   ├──theme                      - 全局颜色值、公用样式
│   │   index.less                    - 样式总入口
│   │   normal.less                   - 普通框架样式
│   │   noSecondMenu.less             - 普通框架简化版样式
│   │   top.less                      - 上左右布局
│   ├── utils       封装工具目录
│   ├── main.ts						  - 项目入口文件
│   ├── permission.ts				  - 路有权限控制
├── tsconfig.json                     - ts配置文件
├── README.md                         - 说明文档  
└── vite.config.js                    - vite 配置文件
```
#### 安装运行

``` bash
## 安装依赖
npm install || yarn 

## 启动项目 

# 启动链接mock
npm run dev
# 启动链接测试环境
npm run start

## 构建正式环境 - 打包
npm run build

```
#### 插件
nprogress 进度条 

viteMockServe vite 的数据模拟插件

vueJsx 
> 使用jsx 语法 jsx语法可以更好地跟Typescript结合 在阅读UI框架源码时，发现在知名UI组件库Ant Design Vue跟Naive UI皆使用tsx语法开发
vite-svg-loader



#### 参考

vite
vue3
pinia 中文文档 :类vuex 
vue-router
Tdesign
Tdesign-cli

tsconfig.json配置 
#### 文档
tsconfig.json 配置整理
vite.config.js vite配置文件

