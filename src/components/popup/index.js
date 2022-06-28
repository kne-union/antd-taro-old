import './popup.less'
import classNames from 'classnames'
import React, {useState, useRef} from 'react'
import {useUnmountedRef} from 'ahooks'
import withNativeProps from '../../utils/native-props'
import mergeProps from '../../utils/with-default-props'
import Mask from '../mask'
import {useSpring, animated} from '@tarojsx/library/dist/react-spring'
import withStopPropagation from '../../utils/with-stop-propagation'
import {ShouldRender} from '../../utils/should-render'
import closeOutline from './closeOutline.svg'
import useInnerVisible from '../../utils/use-inner-visible'
import {View, Image} from '@tarojs/components'

const classPrefix = `adm-popup`

const defaultProps = {
  closeOnMaskClick: false,
  destroyOnClose: false,
  disableBodyScroll: true,
  forceRender: false,
  mask: true,
  showCloseButton: false,
  stopPropagation: ['click'],
  visible: false,
  position: 'bottom',
}

const Popup = p => {
  const props = mergeProps(defaultProps, p)

  const bodyCls = classNames(
    `${classPrefix}-body`,
    props.bodyClassName,
    `${classPrefix}-body-position-${props.position}`
  )

  const [active, setActive] = useState(props.visible)

  const ref = useRef(null)

  const unmountedRef = useUnmountedRef()
  const {percent} = useSpring({
    percent: props.visible ? 0 : 100,
    config: {
      precision: 0.1,
      mass: 0.4,
      tension: 1000,
      friction: 30,
    },
    onRest: () => {
      if (unmountedRef.current) return
      setActive(props.visible)
      if (props.visible) {
        props.afterShow?.()
      } else {
        props.afterClose?.()
      }
    },
  })

  const maskVisible = useInnerVisible(active && props.visible)

  const node = withStopPropagation(
    props.stopPropagation,
    withNativeProps(
      props,
      <View
        className={classPrefix}
        catchMove
        onClick={props.onClick}
        style={{display: active ? undefined : 'none'}}
      >
        {props.mask && (
          <Mask
            visible={maskVisible}
            forceRender={props.forceRender}
            destroyOnClose={props.destroyOnClose}
            onMaskClick={e => {
              props.onMaskClick?.(e)
              if (props.closeOnMaskClick) {
                props.onClose?.()
              }
            }}
            className={props.maskClassName}
            style={props.maskStyle}
            disableBodyScroll={false}
            stopPropagation={props.stopPropagation}
          />
        )}
        <animated.View
          className={bodyCls}
          style={{
            ...props.bodyStyle,
            transform: percent.to(v => {
              if (props.position === 'bottom') {
                return `translate(0, ${v}%)`
              }
              if (props.position === 'top') {
                return `translate(0, -${v}%)`
              }
              if (props.position === 'left') {
                return `translate(-${v}%, 0)`
              }
              if (props.position === 'right') {
                return `translate(${v}%, 0)`
              }
              return 'none'
            }),
          }}
          ref={ref}
        >
          {props.showCloseButton && (
            <View
              className={classNames(
                `${classPrefix}-close-icon`,
                'adm-plain-anchor'
              )}
              onClick={() => {
                props.onClose?.()
              }}
            >
              <Image src={closeOutline}/>
            </View>
          )}
          {props.children}
        </animated.View>
      </View>
    )
  )

  return (
    <ShouldRender
      active={active}
      forceRender={props.forceRender}
      destroyOnClose={props.destroyOnClose}
    >
      {node}
    </ShouldRender>
  )
}

export default Popup;
