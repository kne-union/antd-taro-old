import React from 'react'

const eventToPropRecord = {
  'click': 'onClick',
}

const withStopPropagation = (events, element) => {
  const props = {...element.props}
  for (const key of events) {
    const prop = eventToPropRecord[key]
    props[prop] = function (e) {
      e.stopPropagation()
      element.props[prop]?.(e)
    }
  }
  return React.cloneElement(element, props)
}

export default withStopPropagation;
