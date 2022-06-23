import './dot-loading.less';
import React, {memo} from 'react'
import mergeProps from '../../utils/with-default-props'
import withNativeProps from '../../utils/native-props'
import {View, Image} from '@tarojs/components'
import loadingWhite from './loading-white.svg';
import classNames from 'classnames'

const classPrefix = `adm-dot-loading`

const defaultProps = {
  color: 'default',
}

const DotLoading = memo(p => {
  const props = mergeProps(defaultProps, p)
  return withNativeProps(
    props,
    <View
      style={props.hasOwnProperty('color') ? {
        color: props.color,
      } : {}}
      className={classNames('adm-loading', classPrefix)}
    >
      <Image className="adm-dot-loading-image" src={loadingWhite}/>
    </View>
  )
})

export default DotLoading;
