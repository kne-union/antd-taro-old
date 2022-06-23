import './tabs.less'
import React, {useRef} from 'react'
import classNames from 'classnames'
import {useSpring, animated} from '@tarojsx/library/dist/react-spring'
import withNativeProps from '../../utils/native-props'
import {usePropsValue} from '../../utils/use-props-value'
import bound from '../../utils/bound'
import {useThrottleFn} from 'ahooks'
import useMutationEffect from '../../utils/use-mutation-effect'
import useResizeEffect from '../../utils/use-resize-effect'
import mergeProps from '../../utils/with-default-props'
import {ShouldRender} from '../../utils/should-render'
import traverseReactNode from '../../utils/traverse-react-node'
import {View} from '@tarojs/components'

const classPrefix = `adm-tabs`


const Tab = () => {
  return null
}

const defaultProps = {
  activeLineMode: 'auto',
  stretch: true,
}

const Tabs = p => {
  const props = mergeProps(defaultProps, p)
  const tabListContainerRef = useRef(null)
  const activeLineRef = useRef(null)
  const keyToIndexRecord = {}
  let firstActiveKey = null

  const panes = []

  traverseReactNode(props.children, (child, index) => {
    if (!React.isValidElement(child)) return
    const key = child.key
    if (typeof key !== 'string') return
    if (index === 0) {
      firstActiveKey = key
    }
    const length = panes.push(child)
    keyToIndexRecord[key] = length - 1
  })

  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey,
    defaultValue: props.defaultActiveKey ? props.defaultActiveKey : firstActiveKey,
    onChange: v => {
      if (v === null) return
      props.onChange && props.onChange(v)
    },
  })

  const [{x, width}, api] = useSpring(() => ({
    x: 0,
    width: 0,
    config: {
      tension: 300,
      clamp: true,
    },
  }))

  const [{scrollLeft}, scrollApi] = useSpring(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: true,
    },
  }))

  const [{leftMaskOpacity, rightMaskOpacity}, maskApi] = useSpring(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: true,
    },
  }))

  function animate(immediate = false) {
    const container = tabListContainerRef.current
    if (!container) return
    const activeIndex = keyToIndexRecord[activeKey]
    if (activeIndex === undefined) {
      api.start({
        x: 0,
        width: 0,
        immediate: true,
      })
      return
    }
    const activeLine = activeLineRef.current
    if (!activeLine) return

    const activeTabWrapper = container.children[activeIndex + 1]
    const activeTab = activeTabWrapper.children[0]
    const activeTabLeft = activeTab.offsetLeft
    const activeTabWidth = activeTab.offsetWidth
    const activeTabWrapperLeft = activeTabWrapper.offsetLeft
    const activeTabWrapperWidth = activeTabWrapper.offsetWidth

    const containerWidth = container.offsetWidth
    const containerScrollWidth = container.scrollWidth
    const containerScrollLeft = container.scrollLeft

    const activeLineWidth = activeLine.offsetWidth

    let x = 0
    let width = 0
    if (props.activeLineMode === 'auto') {
      x = activeTabLeft
      width = activeTabWidth
    } else if (props.activeLineMode === 'full') {
      x = activeTabWrapperLeft
      width = activeTabWrapperWidth
    } else {
      x = activeTabLeft + (activeTabWidth - activeLineWidth) / 2
    }
    api.start({
      x,
      width,
      immediate,
    })

    const maxScrollDistance = containerScrollWidth - containerWidth
    if (maxScrollDistance <= 0) return

    const nextScrollLeft = bound(
      activeTabLeft - (containerWidth - activeTabWidth) / 2,
      0,
      containerScrollWidth - containerWidth
    )

    scrollApi.start({
      scrollLeft: nextScrollLeft,
      from: {scrollLeft: containerScrollLeft},
      immediate,
    })
  }

  useResizeEffect(() => {
    animate(!x.isAnimating)
  }, tabListContainerRef)

  useMutationEffect(
    () => {
      animate(!x.isAnimating)
    },
    tabListContainerRef,
    {
      subtree: true,
      childList: true,
      characterData: true,
    }
  )

  const {run: updateMask} = useThrottleFn(
    (immediate = false) => {
      const container = tabListContainerRef.current
      if (!container) return

      const scrollLeft = container.scrollLeft
      const showLeftMask = scrollLeft > 0
      const showRightMask =
        scrollLeft + container.offsetWidth < container.scrollWidth

      maskApi.start({
        leftMaskOpacity: showLeftMask ? 1 : 0,
        rightMaskOpacity: showRightMask ? 1 : 0,
        immediate,
      })
    },
    {
      wait: 100,
      trailing: true,
      leading: true,
    }
  )

  return withNativeProps(
    props,
    <View className={classPrefix}>
      <View className={`${classPrefix}-header`}>
        <animated.View
          className={classNames(
            `${classPrefix}-header-mask`,
            `${classPrefix}-header-mask-left`
          )}
          style={{
            opacity: leftMaskOpacity,
          }}
        />
        <animated.View
          className={classNames(
            `${classPrefix}-header-mask`,
            `${classPrefix}-header-mask-right`
          )}
          style={{
            opacity: rightMaskOpacity,
          }}
        />
        <animated.View
          className={`${classPrefix}-tab-list`}
          ref={tabListContainerRef}
          scrollLeft={scrollLeft}
          onScroll={updateMask}
        >
          <animated.View
            ref={activeLineRef}
            className={`${classPrefix}-tab-line`}
            style={{
              width:
                props.activeLineMode === 'fixed'
                  ? 'var(--fixed-active-line-width, 60px)'
                  : width,
              x,
            }}
          />
          {panes.map(pane =>
            withNativeProps(
              pane.props,
              <View
                key={pane.key}
                className={classNames(`${classPrefix}-tab-wrapper`, {
                  [`${classPrefix}-tab-wrapper-stretch`]: props.stretch,
                })}
              >
                <View
                  onClick={() => {
                    const {key} = pane
                    if (pane.props.disabled) return
                    if (key === undefined || key === null) {
                      return
                    }
                    setActiveKey(key.toString())
                  }}
                  className={classNames(`${classPrefix}-tab`, {
                    [`${classPrefix}-tab-active`]: pane.key === activeKey,
                    [`${classPrefix}-tab-disabled`]: pane.props.disabled,
                  })}
                >
                  {pane.props.title}
                </View>
              </View>
            )
          )}
        </animated.View>
      </View>
      {panes.map(pane => {
        if (pane.props.children === undefined) {
          return null
        }
        const active = pane.key === activeKey
        return (
          <ShouldRender
            key={pane.key}
            active={active}
            forceRender={pane.props.forceRender}
            destroyOnClose={pane.props.destroyOnClose}
          >
            <View
              className={`${classPrefix}-content`}
              style={{display: active ? 'block' : 'none'}}
            >
              {pane.props.children}
            </View>
          </ShouldRender>
        )
      })}
    </View>
  )
}

Tabs.Tab = Tab;

export default Tabs;
