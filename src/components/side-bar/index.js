import './side-bar.less'
import React from 'react'
import classNames from 'classnames'
import Badge from '../badge'
import withNativeProps from '../../utils/native-props'
import {usePropsValue} from '../../utils/use-props-value'
import corner from './corner.svg'
import traverseReactNode from '../../utils/traverse-react-node'
import {View, Image} from "@tarojs/components"

const classPrefix = `adm-side-bar`

/* istanbul ignore next */
const SideBarItem = () => {
  return null
}

const SideBar = props => {
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

  const lastItem = items[items.length - 1]
  const isLastItemActive = lastItem && lastItem.key === activeKey

  return withNativeProps(
    props,
    <View className={classPrefix}>
      <View className={`${classPrefix}-items`}>
        {items.map((item, index) => {
          const active = item.key === activeKey
          const isActiveNextSibling =
            items[index - 1] && items[index - 1].key === activeKey
          const isActivePreviousSibling =
            items[index + 1] && items[index + 1].key === activeKey
          return withNativeProps(
            item.props,
            <View
              key={item.key}
              onClick={() => {
                const {key} = item
                if (key === undefined || key === null || item.props.disabled)
                  return
                setActiveKey(key.toString())
              }}
              className={classNames(`${classPrefix}-item`, {
                [`${classPrefix}-item-active`]: active,
                [`${classPrefix}-item-disabled`]: item.props.disabled,
              })}
            >
              <>
                {isActiveNextSibling && (
                  <Image
                    className={`${classPrefix}-item-corner ${classPrefix}-item-corner-top`}
                    src={corner}
                  />
                )}
                {isActivePreviousSibling && (
                  <Image
                    className={`${classPrefix}-item-corner ${classPrefix}-item-corner-bottom`}
                    src={corner}
                  />
                )}
              </>
              <Badge
                content={item.props.badge}
                className={`${classPrefix}-badge`}
              >
                <View className={`${classPrefix}-item-title`}>
                  {active && (
                    <View className={`${classPrefix}-item-highlight`}/>
                  )}
                  {item.props.title}
                </View>
              </Badge>
            </View>
          )
        })}
      </View>
      <View
        className={classNames(
          `${classPrefix}-extra-space`,
          isLastItemActive && `${classPrefix}-item-active-next-sibling`
        )}
      >
        {isLastItemActive && (
          <Image
            className={`${classPrefix}-item-corner ${classPrefix}-item-corner-top`}
            src={corner}
          />
        )}
      </View>
    </View>
  )
}

SideBar.SideBarItem = SideBarItem

export default SideBar
