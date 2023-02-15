import './style.less'
import React from 'react'
import classNames from 'classnames'
import Icon from '../icon';
import withNativeProps from '../../utils/native-props'
import mergeProps from '../../utils/with-default-props'
import {View} from '@tarojs/components'

const classPrefix = `adm-nav-bar`


const defaultProps = {
  backArrow: true,
}

const NavBar = p => {
  const props = mergeProps(defaultProps, p)
  const {back, backArrow} = props

  return withNativeProps(props, <View className={classNames(classPrefix)}>
    <View className={`${classPrefix}-left`} role='button'>
      {back !== null && (<View className={`${classPrefix}-back`} onClick={props.onBack}>
        {backArrow && (<View className={`${classPrefix}-back-arrow`}>
                {backArrow === true ? <Icon type="left-outline"/> : backArrow}
              </View>)}
        <View aria-hidden='true'>{back}</View>
      </View>)}
      {props.left}
    </View>
    <View className={`${classPrefix}-title`}>{props.children}</View>
    <View className={`${classPrefix}-right`}>{props.right}</View>
  </View>)
}

export default NavBar;
