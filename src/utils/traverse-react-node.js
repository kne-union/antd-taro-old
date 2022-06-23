import React from 'react'
import {isFragment} from 'react-is'

const traverseReactNode = (children, fn) => {
  let i = 0

  function handle(target) {
    React.Children.forEach(target, child => {
      if (!isFragment(child)) {
        fn(child, i)
        i += 1
      } else {
        handle(child.props.children)
      }
    })
  }

  handle(children)
}

export default traverseReactNode
