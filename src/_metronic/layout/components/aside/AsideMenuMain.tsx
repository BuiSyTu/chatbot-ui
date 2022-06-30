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
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
      />
      <AsideMenuItem
        to='/builder'
        icon='/media/icons/duotune/art/art004.svg'
        title='Huấn luyện - Kiểm tra'
      />

      <AsideHeaderMenu title='Dữ liệu' />
      <AsideMenuItem
        to='/categories/bot'
        icon='/media/icons/duotune/art/art005.svg'
        title='Bot'
      />
      <AsideMenuItem
        to='/categories/intent'
        icon='/media/icons/duotune/art/art006.svg'
        title='Ý định'
      />
      <AsideMenuItem
        to='/categories/sentence'
        icon='/media/icons/duotune/art/art007.svg'
        title='Câu mẫu'
      />
      <AsideMenuItem
        to='/categories/entity'
        icon='/media/icons/duotune/art/art008.svg'
        title='Loại thực thể'
      />
      <AsideMenuItem
        to='/categories/keyword'
        icon='/media/icons/duotune/art/art009.svg'
        title='Từ khóa'
      />

      <AsideHeaderMenu title='Cấu hình' />
      <AsideMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div>
    </>
  )
}
