import React from 'react'
import {View, RootPortal} from '@tarojs/components'

const RootPortalView = ({className, children}) => {
  return <RootPortal>
    <View className="adm-root-portal">
      <View className={className}>{children}</View>
    </View>
  </RootPortal>
};

export default RootPortalView;
