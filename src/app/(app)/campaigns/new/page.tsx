import {redirect} from 'next/navigation'
import {getSessionFromCookie} from '@/lib/sessionUtils'
import CampaignForm from '@/components/custom/campaigns/campaignForm'

export default async function CampaignNewPage() {
  const session = await getSessionFromCookie()

  if (!session) {
    redirect('/')
  }

  return (
    <CampaignForm
      submitLabel="Create Campaign"
      isEditMode={false}
    />
  )
}



