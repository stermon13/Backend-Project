import {redirect} from 'next/navigation'
import {getSessionFromCookie} from '@/lib/sessionUtils'
import CampaignForm from '@/components/custom/campaigns/campaignForm'
import {createCampaignAction} from '@/serverFunctions/campaignFunctions'

export default async function CampaignNewPage() {
  const session = await getSessionFromCookie()

  if (!session) {
    redirect('/')
  }

  return (
    <CampaignForm
      defaultValues={{
        startedDate: new Date(),
        sessionCount: 0,
        keeper: session.user,
        investigators: [],
        investigationSessions: [],
      }}
      submitLabel="Create Campaign"
      isEditMode={false}
      action={createCampaignAction}
    />
  )
}



