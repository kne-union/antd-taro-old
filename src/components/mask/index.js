import './mask.less';
import withNativeProps from '../../utils/native-props'
import React from 'react'
import mergeProps from '../../utils/with-default-props'
import withStopPropagation from '../../utils/with-stop-propagation'
import {View} from '@tarojs/components'
import classnames from 'classnames'

const classPrefix = `adm-mask`

const defaultProps = {
  visible: true, stopPropagation: ['click'],
}

const Mask = p => {
  const props = mergeProps(defaultProps, p)

  return withStopPropagation(props.stopPropagation, withNativeProps(props, <View
    className={classnames(classPrefix, {
      'is-active': props.visible
    })}
    catchMove
    style={{
      ...props.style
    }}
    onClick={e => {
      props.onMaskClick && props.onMaskClick(e);
    }}
  >
    <View className={`${classPrefix}-content`}>{props.children}</View>
  </View>))
}

export default Mask
