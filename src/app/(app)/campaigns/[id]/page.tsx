import {redirect} from 'next/navigation'
import {getSessionFromCookie} from '@/lib/sessionUtils'
import CampaignDetail from '@/components/custom/campaigns/campaignDetail'
import {proxyGetCampaignById} from '@/proxy/campaigns'

export default async function CampaignDetailPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params
  const session = await getSessionFromCookie()

  if (!session) redirect('/')

  const campaign = await proxyGetCampaignById(id)

  if (!campaign) redirect('/dashboard')

  return <CampaignDetail campaign={campaign} />
}

