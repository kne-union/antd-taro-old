import './safe-area.less'
import withNativeProps from '../../utils/native-props'
import React from 'react'
import classNames from 'classnames'
import {View} from '@tarojs/components'

const classPrefix = 'adm-safe-area'

const SafeArea = props => {
  console.log(props);
  return withNativeProps(
    props,
    <View
      className={classNames(
        classPrefix,
        `${classPrefix}-position-${props.position}`
      )}
    />
  )
}

export default SafeArea
