import React from 'react'
import clsx from 'clsx'
import { useLocation } from 'react-router'
import { checkIsActive, KTSVG } from '../../../helpers'
import { useLayout } from '../../core'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  userPermissions?: string[]
  childrenPermissions?: string[]
}

const AsideMenuItemWithSub: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet,
  userPermissions = [],
  childrenPermissions = [],
}) => {
  const hasPermission = !childrenPermissions
    || childrenPermissions.length === 0
    || childrenPermissions.some(childrenPermission => userPermissions.includes(childrenPermission))

  const { pathname } = useLocation()
  const isActive = checkIsActive(pathname, to)
  const { config } = useLayout()
  const { aside } = config

  return hasPermission ? (
    <div
      className={clsx('menu-item', { 'here show': isActive }, 'menu-accordion')}
      data-kt-menu-trigger='click'
    >
      <span className='menu-link'>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && (
          <span className="menu-icon">
            <i className={clsx('bi fs-3', fontIcon)}></i>
          </span>
        )}
        <span className='menu-title'>{title}</span>
        <span className='menu-arrow'></span>
      </span>
      <div className={clsx('menu-sub menu-sub-accordion', { 'menu-active-bg': isActive })}>
        {children}
      </div>
    </div>
  ) : (
    <></>
  )
}

export { AsideMenuItemWithSub }
