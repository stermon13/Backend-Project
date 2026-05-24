import {redirect} from 'next/navigation'
import {getSessionFromCookie} from '@/lib/sessionUtils'
import {proxyGetCampaignsForUser} from '@/proxy/campaigns'
import CampaignsClient from '@/components/custom/campaigns/campaignsList'
import {deleteCampaignAction} from '@/serverFunctions/campaignFunctions'

export default async function CampaignsPage() {
  const session = await getSessionFromCookie(true)

  if (!session) {
    redirect('/')
  }

  console.log('SESSION USER', JSON.stringify(session.userId, null, 2))


  const campaigns = await proxyGetCampaignsForUser({
    userId: session.user.id,
    role: session.user.role,
  })


  return <CampaignsClient campaigns={campaigns} role={session.user.role} deleteAction={deleteCampaignAction} />
}

