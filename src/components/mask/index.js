import './mask.less';
import withNativeProps from '../../utils/native-props'
import React, {useMemo, useRef, useState} from 'react'
import {useUnmountedRef} from 'ahooks'
import {useSpring, animated} from '@tarojsx/library/dist/react-spring'
import mergeProps from '../../utils/with-default-props'
import {ShouldRender} from '../../utils/should-render'
import withStopPropagation from '../../utils/with-stop-propagation'
import {View} from '@tarojs/components'

const classPrefix = `adm-mask`

const opacityRecord = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75,
}

const defaultProps = {
  visible: true,
  destroyOnClose: false,
  forceRender: false,
  color: 'black',
  opacity: 'default',
  disableBodyScroll: true,
  getContainer: null,
  stopPropagation: ['click'],
}

const Mask = p => {
  const props = mergeProps(defaultProps, p)
  const ref = useRef(null)

  const background = useMemo(() => {
    const opacity = opacityRecord.hasOwnProperty(props.opacity) ? opacityRecord[props.opacity] : props.opacity
    const rgb = props.color === 'white' ? '255, 255, 255' : '0, 0, 0'
    return `rgba(${rgb}, ${opacity})`
  }, [props.color, props.opacity])

  const [active, setActive] = useState(props.visible)

  const unmountedRef = useUnmountedRef()
  const {opacity} = useSpring({
    opacity: props.visible ? 1 : 0,
    config: {
      precision: 0.01,
      mass: 1,
      tension: 600,
      friction: 30,
      clamp: true,
    },
    onStart: () => {
      setActive(true)
    },
    onRest: () => {
      if (unmountedRef.current) return
      setActive(props.visible)
      if (props.visible) {
        props.afterShow && props.afterShow();
      } else {
        props.afterClose && props.afterClose();
      }
    },
  })

  const node = withStopPropagation(
    props.stopPropagation,
    withNativeProps(
      props,
      <animated.View
        className={classPrefix}
        ref={ref}
        catchMove
        style={{
          ...props.style,
          background,
          opacity,
          display: active ? undefined : 'none',
        }}
        onClick={e => {
          props.onMaskClick && props.onMaskClick(e);
        }}
      >
        <View className={`${classPrefix}-content`}>{props.children}</View>
      </animated.View>
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

export default Mask
