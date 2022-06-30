type AsideHeaderMenuProps = {
    title: string
}

const AsideHeaderMenu: React.FC<AsideHeaderMenuProps> = ({ title }) => {
    return (
        <div className='menu-item'>
            <div className='menu-content pt-8 pb-2'>
                <span className='menu-section text-uppercase fs-8 ls-1'>{title}</span>
            </div>
        </div>
    )
}

export { AsideHeaderMenu }