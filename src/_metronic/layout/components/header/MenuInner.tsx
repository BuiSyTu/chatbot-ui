import React from 'react'
import { MenuItem } from './MenuItem'
import { MenuInnerWithSub } from './MenuInnerWithSub'
import { useIntl } from 'react-intl'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({ id: 'MENU.DASHBOARD' })} to='/dashboard' />
      <MenuItem title='Huấn luyện - Kiểm tra' to='/builder' />
      <MenuInnerWithSub
        title='Dữ liệu'
        to='/categories'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MenuItem title='Bot' to='/categories/bot' fontIcon='bi-robot' />
        <MenuItem title='Ý định' to='/categories/intent' fontIcon='bi-person' />
        <MenuItem title='Câu mẫu' to='/categories/sentence' fontIcon='bi-sticky' />
        <MenuItem title='Loại thực thể' to='/categories/entity' fontIcon='bi-layers' />
        <MenuItem title='Từ khóa' to='/categories/keyword' fontIcon='bi-app' />
      </MenuInnerWithSub>

      <MenuInnerWithSub title='Cấu hình' to='/apps' menuPlacement='bottom-start' menuTrigger='click'>
        <MenuInnerWithSub
          title='Chat'
          to='/apps/chat'
          fontIcon='bi-chat-left-text'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
          <MenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
          <MenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
        </MenuInnerWithSub>
      </MenuInnerWithSub>
    </>
  )
}
