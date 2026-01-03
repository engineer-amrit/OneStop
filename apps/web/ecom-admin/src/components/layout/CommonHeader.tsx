import { Header } from '@/components/layout/header'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'
export const CommonHeader = ({ fixed }: { fixed?: boolean }) => {
    return (
        <Header fixed={fixed}>
            <Search />
            <div className='ms-auto flex items-center gap-4'>
                <ThemeSwitch />
                <ConfigDrawer />
                <ProfileDropdown />
            </div>
        </Header>
    )
}

