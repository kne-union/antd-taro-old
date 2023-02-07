import {View, RootPortal} from '@tarojs/components'

const RootPortalView = ({children}) => {
  return <RootPortal><View className="adm-root-portal">{children}</View></RootPortal>
};

export default RootPortalView;
