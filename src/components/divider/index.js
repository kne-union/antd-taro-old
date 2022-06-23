import './divider.less';
import React from 'react'
import classNames from 'classnames'
import withNativeProps from '../../utils/native-props'
import mergeProps from '../../utils/with-default-props'
import {View} from '@tarojs/components'

const classPrefix = `adm-divider`

const defaultProps = {
  contentPosition: 'center',
  direction: 'horizontal',
}

const Divider = p => {
  const props = mergeProps(defaultProps, p)
  return withNativeProps(
    props,
    <View
      className={classNames(
        classPrefix,
        `${classPrefix}-${props.direction}`,
        `${classPrefix}-${props.contentPosition}`
      )}
    >
      {props.children && (
        <View className={`${classPrefix}-content`}>{props.children}</View>
      )}
    </View>
  )
}

export default Divider;
