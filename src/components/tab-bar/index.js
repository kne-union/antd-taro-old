import './tab-bar.less'
import React from 'react'
import classNames from 'classnames'
import withNativeProps from '../../utils/native-props'
import mergeProps from '../../utils/with-default-props'
import Badge from '../badge'
import SafeArea from '../safe-area'
import {usePropsValue} from '../../utils/use-props-value'
import traverseReactNode from '../../utils/traverse-react-node'
import {View} from '@tarojs/components'

/* istanbul ignore next */
export const TabBarItem = () => {
  return null
}

const classPrefix = `adm-tab-bar`

const defaultProps = {
  safeArea: false,
}

const TabBar = p => {
  const props = mergeProps(defaultProps, p)

  let firstActiveKey = null

  const items = []

  traverseReactNode(props.children, (child, index) => {
    if (!React.isValidElement(child)) return
    const key = child.key
    if (typeof key !== 'string') return
    if (index === 0) {
      firstActiveKey = key
    }
    items.push(child)
  })

  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey,
    defaultValue: props.defaultActiveKey ?? firstActiveKey,
    onChange: v => {
      if (v === null) return
      props.onChange?.(v)
    },
  })

  return withNativeProps(
    props,
    <View className={classPrefix}>
      <View className={`${classPrefix}-wrap`}>
        {items.map(item => {
          const active = item.key === activeKey

          function renderContent() {
            const iconElement = item.props.icon && (
              <View className={`${classPrefix}-item-icon`}>
                {typeof item.props.icon === 'function'
                  ? item.props.icon(active)
                  : item.props.icon}
              </View>
            )
            const titleElement = item.props.title && (
              <View
                className={classNames(
                  `${classPrefix}-item-title`,
                  Boolean(iconElement) && `${classPrefix}-item-title-with-icon`
                )}
              >
                {typeof item.props.title === 'function'
                  ? item.props.title(active)
                  : item.props.title}
              </View>
            )
            if (iconElement) {
              return (
                <>
                  <Badge
                    content={item.props.badge}
                    className={`${classPrefix}-icon-badge`}
                  >
                    {iconElement}
                  </Badge>
                  {titleElement}
                </>
              )
            } else if (titleElement) {
              return (
                <Badge
                  content={item.props.badge}
                  className={`${classPrefix}-title-badge`}
                >
                  {titleElement}
                </Badge>
              )
            }
            return null
          }

          return withNativeProps(
            item.props,
            <View
              key={item.key}
              onClick={() => {
                const {key} = item
                if (key === undefined || key === null) return
                setActiveKey(key.toString())
              }}
              className={classNames(`${classPrefix}-item`, {
                [`${classPrefix}-item-active`]: active,
              })}
            >
              {renderContent()}
            </View>
          )
        })}
      </View>

      {props.safeArea && <SafeArea position='bottom'/>}
    </View>
  )
}

export default TabBar
