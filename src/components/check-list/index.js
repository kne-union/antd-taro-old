import './style.less'
import React from 'react'
import withNativeProps from '../../utils/native-props'
import List from '../list'
import mergeProps from '../../utils/with-default-props'
import {CheckListContext} from './context'
import {usePropsValue} from '../../utils/use-props-value'
import Icon from '../icon'
import {CheckListItem} from './check-list-item'
/*import Popup from '../popup'
import Button from '../button'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import useControlValue from "@kne/use-control-value"
import SafeArea from "../safe-area";
import NavBar from '../nav-bar';
import {ScrollView} from '@tarojs/components'*/

const classPrefix = 'adm-check-list'

const defaultProps = {
  multiple: false, defaultValue: [], activeIcon: <Icon type="checkout"/>,
}

const CheckList = p => {
  const props = mergeProps(defaultProps, p)

  const [value, setValue] = usePropsValue(props)

  function check(val) {
    if (props.multiple) {
      setValue([...value, val])
    } else {
      setValue([val])
    }
  }

  function uncheck(val) {
    setValue(value.filter(item => item !== val))
  }

  const {activeIcon, disabled, readOnly} = props

  return (<CheckListContext.Provider
    value={{
      value, check, uncheck, activeIcon, disabled, readOnly,
    }}
  >
    {withNativeProps(props, <List mode={props.mode} className={classPrefix}>
      {props.children}
    </List>)}
  </CheckListContext.Provider>)
}

CheckList.Item = CheckListItem;

/*CheckList.Popup = (props) => {
  const [value, onChange] = useControlValue(props);
  const [innerValue, setInnerValue] = useState(value);

  const checkListKeys = ['value', 'defaultValue', 'onChange', 'multiple', 'activeIcon', 'children'];
  return <Popup {...omit(props, checkListKeys)} hasSafeArea={false}
                position="right" onVisibleChange={(visible) => {
    if (visible) {
      setInnerValue(value);
    }
    props?.onChange(visible);
  }}>
    <NavBar backArrow={<Button color='primary' fill='none'>返回</Button>}
            right={<Button color='primary' fill='none' onClick={() => {
              onChange(innerValue);
              props?.onClose();
            }}>确定</Button>} onBack={() => {
      props?.onClose();
    }}>{props.placeholder || '请选择'}</NavBar>
    <ScrollView className={`${classPrefix}-popup-inner`} scrollY>
      <SafeArea position="top"/>
      <CheckList {...pick(props, checkListKeys)} value={innerValue} onChange={(...args) => {
        setInnerValue(...args);
      }}/>
      <SafeArea position="bottom"/>
    </ScrollView>
  </Popup>
};*/

export default CheckList;
