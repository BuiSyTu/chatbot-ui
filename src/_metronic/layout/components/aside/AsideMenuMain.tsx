/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useIntl } from 'react-intl'
import { KTSVG } from '../../../helpers'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'
import { AsideHeaderMenu } from './AsideHeaderMenu'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        fontIcon='bi-clipboard-data'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
      />
      <AsideMenuItem
        to='/builder'
        fontIcon='bi-display'
        title='Huấn luyện - Kiểm tra'
      />

      <AsideHeaderMenu title='Dữ liệu' />
      <AsideMenuItem
        to='/categories/bot'
        fontIcon='bi-robot'
        title='Bot'
      />
      <AsideMenuItem
        to='/categories/intent'
        fontIcon='bi-person'
        title='Ý định'
      />
      <AsideMenuItem
        to='/categories/sentence'
        fontIcon='bi-sticky'
        title='Câu mẫu'
      />
      <AsideMenuItem
        to='/categories/entity'
        fontIcon='bi-layers'
        title='Loại thực thể'
      />
      <AsideMenuItem
        to='/categories/keyword'
        fontIcon='bi-app'
        title='Từ khóa'
      />

      <AsideHeaderMenu title='Cấu hình' />
      <AsideMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left-text'
      >
        <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </AsideMenuItemWithSub>
    </>
  )
}
