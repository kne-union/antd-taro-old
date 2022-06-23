import './popup.less';
import classNames from 'classnames'
import React, {useEffect, useState} from 'react'
import withNativeProps from '../../utils/native-props'
import mergeProps from '../../utils/with-default-props'
import withStopPropagation from '../../utils/with-stop-propagation'
import closeOutline from './closeOutline.svg'
import useInnerVisible from '../../utils/use-inner-visible'
import {View, Image, PageContainer} from '@tarojs/components'

const classPrefix = `adm-popup`

const defaultPopupBaseProps = {
  closeOnMaskClick: false,
  mask: true,
  showCloseButton: false,
  stopPropagation: ['click'],
  visible: false,
  round: false
}

const defaultProps = {
  ...defaultPopupBaseProps,
  position: 'bottom',
}

const Popup = p => {
  const props = mergeProps(defaultProps, p)

  const bodyCls = classNames(
    `${classPrefix}-body`,
    props.bodyClassName,
    `${classPrefix}-body-position-${props.position}`
  )

  const active = props.visible;

  const maskVisible = useInnerVisible(active && props.visible)
  return withStopPropagation(
    props.stopPropagation,
    withNativeProps(
      props,
      <PageContainer
        className={classPrefix}
        onClick={props.onClick}
        show={active}
        overlay={maskVisible}
        round={props.round}
        position={props.position}
        onAfterLeave={() => {
          props.onClose && props.onClose()
        }}
        onClickOverlay={() => {
          props.onMaskClick && props.onMaskClick()
          props.onClose && props.onClose()
        }}
      >
        <View className={bodyCls} style={props.bodyStyle ? props.bodyStyle : {}}>
          {props.showCloseButton && (
            <View
              className={classNames(
                `${classPrefix}-close-icon`,
                'adm-plain-anchor'
              )}
              onClick={() => {
                props.onClose && props.onClose()
              }}
            >
              <Image src={closeOutline}/>
            </View>
          )}
          {props.children}
        </View>
      </PageContainer>
    )
  )
}

export default Popup;
