import {redirect} from 'next/navigation'
import {getSessionFromCookie} from '@/lib/sessionUtils'
import {proxyGetCampaignById} from '@/proxy/campaigns'
import CampaignForm from '@/components/custom/campaigns/campaignForm'

export default async function CampaignEditPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params
  const session = await getSessionFromCookie()

  if (!session) {
    redirect('/')
  }

  const campaign = await proxyGetCampaignById(id)

  if (!campaign) {
    redirect('/dashboard')
  }

  return (
    <CampaignForm
      defaultValues={campaign}
      submitLabel="Update Campaign"
      isEditMode={true}
    />
  )
}

