import {redirect} from 'next/navigation'
import {CampaignNav} from '@/components/custom/campaign-nav'
import {getSessionProfileFromCookie} from '@/lib/sessionUtils'

export default async function AppLayout({children}: {children: React.ReactNode}) {
  const profile = await getSessionProfileFromCookie()

  if (!profile) {
    redirect('/')
  }

  return (
    <>
      <CampaignNav profile={profile} />
      <main>{children}</main>
    </>
  )
}

