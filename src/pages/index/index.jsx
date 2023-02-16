import {useState} from 'react'
import {View, Text} from '@tarojs/components'
import Form from '@kne/react-form'
import {
  Button,
  Space,
  Divider,
  Empty,
  Grid,
  List,
  Popup,
  Result,
  Input,
  Switch,
  Slider,
  TextArea,
  SearchBar,
  Selector,
  Tabs,
  Picker,
  DatePicker,
  DatePickerRange,
  Badge,
  SafeArea,
  TabBar,
  SideBar,
  Tag,
  Avatar,
  Dropdown,
  CheckList,
  NavBar
} from '../../antd-taro';
import range from 'lodash/range';
import './index.scss';

const tabs = [{
  key: 'key1', title: '选项一', badge: Badge.dot,
}, {
  key: 'key2', title: '选项二', badge: '5',
}, {
  key: 'key3', title: '选项三', badge: '99+', disabled: true,
},];

const Index = () => {
  const [visible, setVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  return (<View className='index'>
    <SafeArea position='top'/>
    <Switch checkedText="开" uncheckedText="关"/>
    <Text>Hello world!</Text>
    <TextArea/>
    <TabBar>
      <TabBar.Item key="index" title="首页"/>
      <TabBar.Item key="position" title="职位"/>
      <TabBar.Item key="resume" title="简历"/>
    </TabBar>
    <Divider/>
    <NavBar onBack={() => {
      console.log('onClick');
    }}>标题</NavBar>
    <Space direction="vertical">
      <Dropdown>
        <Dropdown.Item key='sorter' title='排序'>
          <View style={{padding: 12}}>
            <View>排序内容</View>
            <View>排序内容</View>
            <View>排序内容</View>
          </View>
        </Dropdown.Item>
        <Dropdown.Item key='bizop' title='商机筛选'>
          <View style={{padding: 12}}>
            <View>商机筛选内容</View>
            <View>商机筛选内容</View>
            <View>商机筛选内容</View>
          </View>
        </Dropdown.Item>
      </Dropdown>
      <Button className="hahaha" color='primary' fill='solid' onClick={() => {
        setVisible(true)
      }}>
        底部弹出
      </Button>
      <Form>
        <List mode="card">
          <List.Item title="点击">
            <Picker
              visible={visible}
              columns={[[{label: "选项一", value: "1"}, {label: "选项二", value: "2"}, {
                label: "选项三", value: "3"
              }], [{label: "选项一", value: "1"}, {label: "选项二", value: "2"}, {label: "选项三", value: "3"}]]}
              onClose={() => {
                console.log('xxxxxxxxxxxxxxxxxxxx');
                setVisible(false);
              }}
            />
          </List.Item>
        </List>
      </Form>
      {/*<DatePickerRange
        soFar
        visible={visible}
        onChange={(value) => {
          console.log(value);
        }}
        onClose={() => {
          setVisible(false);
        }}
      >
        哈哈哈哈哈哈哈哈
      </DatePickerRange>*/}
      {/*<Avatar/>
        <Space>
          <Tag color='primary' fill='outline'>
            Primary
          </Tag>
          <Tag color='#87d068' fill='outline'>
            #87d068
          </Tag>
          <Tag color='#ff6430' fill='outline'>
            #ff6430
          </Tag>
        </Space>
        <Space>
          <Tag color='default'>Default</Tag>
          <Tag color='primary'>测试</Tag>
          <Tag color='success'>Success</Tag>
          <Tag color='warning'>Warning</Tag>
          <Tag color='danger'>Danger</Tag>
        </Space>
        <Space>
          <Tag color='#2db7f5'>#2db7f5</Tag>
          <Tag color='#87d068'>#87d068</Tag>
          <Tag color='#108ee9'>#108ee9</Tag>
        </Space>
        <SideBar>
          {tabs.map(item => (
            <SideBar.Item key={item.key} title={item.title}/>
          ))}
        </SideBar>

        <SideBar>
          {tabs.map(item => (
            <SideBar.Item
              key={item.key}
              title={item.title}
              badge={item.badge}
            />
          ))}
        </SideBar>
        <Space style={{'--gap': '24px'}}>
          <Badge content='5'>
            <View className="box"/>
          </Badge>
          <Badge content='新'>
            <View className="box"/>
          </Badge>
          <Badge content={Badge.dot}>
            <View className="box"/>
          </Badge>
        </Space>
        <Tabs>
          <Tabs.Tab title='水果' key='fruits'>
            菠萝
          </Tabs.Tab>
          <Tabs.Tab title='蔬菜' key='vegetables'>
            西红柿
          </Tabs.Tab>
          <Tabs.Tab title='动物' key='animals'>
            蚂蚁
          </Tabs.Tab>
        </Tabs>
        <Tabs defaultActiveKey='1'>
          <Tabs.Tab title='Espresso' key='1'>
            1
          </Tabs.Tab>
          <Tabs.Tab title='Coffee Latte' key='2'>
            2
          </Tabs.Tab>
          <Tabs.Tab title='Cappuccino' key='3'>
            3
          </Tabs.Tab>
          <Tabs.Tab title='Americano' key='4'>
            4
          </Tabs.Tab>
          <Tabs.Tab title='Flat White' key='5'>
            5
          </Tabs.Tab>
          <Tabs.Tab title='Caramel Macchiato' key='6'>
            6
          </Tabs.Tab>
          <Tabs.Tab title='Cafe Mocha' key='7'>
            7
          </Tabs.Tab>
        </Tabs>
        <Selector
          options={[
            {
              label: '选项一',
              value: '1',
            },
            {
              label: '选项二',
              value: '2',
            },
            {
              label: '选项三',
              value: '3',
            },
          ]}
          defaultValue={['1']}
          onChange={(arr, extend) => console.log(arr, extend.items)}
        />
        <SearchBar placeholder='请输入内容' showCancelButton/>
        <Result
          status='success'
          title='操作成功'
          description='内容详情可折行，建议不超过两行建议不超过两行建议不超过两行'
        />
        <Input placeholder="请输入内容" clearable value={inputText} onChange={(value) => {
          setInputText(value);
        }}/>
        <Button onClick={() => {
          setVisible(true)
        }}>
          底部弹出
        </Button>
        <Popup
          visible={visible}
          onClose={() => {
            setVisible(false)
          }}
          bodyStyle={{height: '40vh'}}
        >
          哈哈哈哈哈哈哈哈
        </Popup>
        <View>
          <Button color='primary' fill='solid' loading loadingText='正在加载'>
            Solid
          </Button>
          <Button color='primary' fill='outline' loading loadingText='正在加载'>
            Outline
          </Button>
          <Button color='primary' fill='none' loading loadingText='正在加载'>
            None
          </Button>
        </View>
        <View>
          <Button block color='primary' size='large'>
            Block Button
          </Button>
        </View>
        <View>
          <Button size='mini' color='primary'>
            Mini
          </Button>
          <Button size='small' color='primary'>
            Small
          </Button>
          <Button size='middle' color='primary'>
            Middle
          </Button>
          <Button size='large' color='primary'>
            Large
          </Button>
        </View>
        <Empty description='暂无数据'/>
        <Grid columns={3} gap={8}>
          <Grid.Item>
            <View>A</View>
          </Grid.Item>
          <Grid.Item>
            <View>B</View>
          </Grid.Item>
          <Grid.Item>
            <View>C</View>
          </Grid.Item>
          <Grid.Item>
            <View>D</View>
          </Grid.Item>
          <Grid.Item>
            <View>E</View>
          </Grid.Item>
        </Grid>
        <List header='基础用法'>
          <List.Item>1</List.Item>
          <List.Item>2</List.Item>
          <List.Item>3</List.Item>
        </List>
        <List header='可点击列表'>
          <List.Item onClick={() => {
          }}>
            账单
          </List.Item>
          <List.Item onClick={() => {
          }}>
            总资产
          </List.Item>
          <List.Item onClick={() => {
          }}>
            设置
          </List.Item>
        </List>

        <List header='复杂列表'>
          <List.Item>新消息通知</List.Item>
          <List.Item extra='未开启' clickable>
            大字号模式
          </List.Item>
          <List.Item description='管理已授权的产品和设备' clickable>
            授权管理
          </List.Item>
          <List.Item title='副标题信息A' description='副标题信息B' clickable>
            这里是主信息
          </List.Item>
        </List>

        <List header='禁用状态'>
          <List.Item disabled clickable>
            账单
          </List.Item>
          <List.Item disabled>
            总资产
          </List.Item>
        </List>*/}
    </Space>
  </View>)
};

export default Index;
