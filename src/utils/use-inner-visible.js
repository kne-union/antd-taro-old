import {useState} from 'react'
import {useIsomorphicLayoutEffect} from 'ahooks'

const useInnerVisible = (outerVisible) => {
  const [innerVisible, setInnerVisible] = useState(outerVisible)
  useIsomorphicLayoutEffect(() => {
    setInnerVisible(outerVisible)
  }, [outerVisible])
  return innerVisible
}

export default useInnerVisible;
