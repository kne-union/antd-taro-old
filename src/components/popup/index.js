import './popup.less'
import classnames from 'classnames'
import React from 'react'
import withNativeProps from '../../utils/native-props'
import mergeProps from '../../utils/with-default-props'
import Mask from '../mask'
import withStopPropagation from '../../utils/with-stop-propagation'
import closeOutline from './closeOutline.svg'
import useInnerVisible from '../../utils/use-inner-visible'
import {View, Image} from '@tarojs/components'
import useControlValue from '@kne/use-control-value'
import SafeArea from '../safe-area'

const classPrefix = `adm-popup`

const defaultProps = {
  closeOnMaskClick: true,
  disableBodyScroll: true,
  mask: true,
  showCloseButton: false,
  stopPropagation: ['click'],
  visible: false,
  hasSafeArea: true,
  position: 'bottom',
}

const Popup = p => {
  const props = mergeProps(defaultProps, p)
  const [active, setActive] = useControlValue(props, {
    defaultValue: 'defaultVisible', value: 'visible', onChange: 'onVisibleChange'
  })


  const bodyCls = classnames(`${classPrefix}-body`, props.bodyClassName, `${classPrefix}-body-position-${props.position}`)

  const maskVisible = useInnerVisible(active && props.visible)

  const node = withStopPropagation(props.stopPropagation, withNativeProps(props, <View
    className={classnames(classPrefix, {
      'is-active': active
    })}
    catchMove
    onClick={props.onClick}
  >
    {props.mask && (<Mask
      visible={maskVisible}
      destroyOnClose={props.destroyOnClose}
      onMaskClick={props.onMaskClick ? props.onMaskClick : e => {
        setActive(false);
        if (props.closeOnMaskClick) {
          props.onClose?.()
        }
      }}
      className={props.maskClassName}
      style={props.maskStyle}
      disableBodyScroll={false}
      stopPropagation={props.stopPropagation}
    />)}
    <View
      className={bodyCls}
      style={props.bodyStyle}
    >
      {props.showCloseButton && (<View
        className={classnames(`${classPrefix}-close-icon`, 'adm-plain-anchor')}
        onClick={() => {
          setActive(false);
          props.onClose?.()
        }}
      >
        <Image src={closeOutline}/>
      </View>)}
      {props.hasSafeArea && <SafeArea position="top"/>}

      {props.children}
      {props.hasSafeArea && <SafeArea position="bottom"/>}
    </View>
  </View>))

  return (node)
}

export default Popup;
