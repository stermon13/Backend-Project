'use client'

import {Controller, useForm, useWatch, type Resolver} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar'
import {createCampaignSchema, updateCampaignSchema} from '@/schemas/campaign.schema'
import {useRouter} from 'next/navigation'
import type {CampaignFormValues, CampaignStatus} from '@/types/campaign'
import {getStatPercentage} from '@/lib/utils/stats'
import {Eye} from 'lucide-react'
import {serializeFormData} from '@/lib/serializeFormData'
import type {FormAction} from '@/models/serverFunctions'

type Props = {
  defaultValues?: Partial<CampaignFormValues>
  submitLabel: string
  isEditMode: boolean
  action: FormAction<void>
}

export default function CampaignForm({defaultValues, submitLabel, isEditMode, action}: Props) {
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(isEditMode ? updateCampaignSchema : createCampaignSchema) as Resolver<CampaignFormValues>,
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      title: defaultValues?.title ?? '',
      edition: defaultValues?.edition ?? '',
      description: defaultValues?.description ?? '',
      status: defaultValues?.status ?? 'active',
      startedDate: defaultValues?.startedDate,
      sessionCount: defaultValues?.sessionCount ?? 0,
      keeper: defaultValues?.keeper,
      investigators: defaultValues?.investigators ?? [],
      investigationSessions: defaultValues?.investigationSessions ?? [],
      ...defaultValues,
    },
  })

  const {
    register,
    setValue,
    control,
    getValues,
    handleSubmit,
    formState: {errors},
  } = form
  const router = useRouter()
  const investigators = useWatch({control, name: 'investigators'}) ?? []
  const investigationSessionNpcs = useWatch({control, name: 'investigationSessions.0.npcs'}) ?? []
  const investigationSessionLocations = useWatch({control, name: 'investigationSessions.0.locations'}) ?? []

  const onSubmit = async (formData: CampaignFormValues) => {
    try {
      await action({success: true}, serializeFormData(isEditMode && defaultValues?.id ? {...formData, id: defaultValues.id} : formData))
    } catch (error) {
      if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
        throw error
      }

      console.error('Error in onSubmit:', error)
      alert('Error submitting the form. Please try again later.')
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Back Button */}
      <div className="flex justify-start mb-4">
        <Button type="button" variant="outline" onClick={handleBack}>
          Back
        </Button>
      </div>
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label>Title</Label>
            <Input {...register('title')} />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>

          <div className="space-y-1">
            <Label>Edition</Label>
            <Input {...register('edition')} />
            {errors.edition && <p className="text-sm text-destructive">{errors.edition.message}</p>}
          </div>

          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea {...register('description')} rows={4} />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Status */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Campaign Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <Label>Status</Label>
            <Controller
              control={control}
              name="status"
              render={({field}) => (
                <Select value={field.value} onValueChange={v => field.onChange(v as CampaignStatus)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && <p className="text-sm text-destructive">{errors.status.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Investigators Section */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Investigators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Displaying all the investigators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {investigators.map((investigator, index) => (
              <Card key={index} className="hover:border-primary/50 transition-colors">
                <CardHeader className="text-center pb-3">
                  <Avatar className="w-24 h-24 mx-auto mb-3">
                    <AvatarImage src={investigator.portraitUrl || '/placeholder.svg'} alt={investigator.name} />
                    <AvatarFallback className="text-2xl font-serif">
                      {investigator.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="font-serif text-lg">
                    <Input
                      {...register(`investigators.${index}.name`)}
                      placeholder="Investigator Name"
                      className="w-full text-center"
                    />
                  </CardTitle>
                  <CardDescription className="text-xs">
                    <Input
                      {...register(`investigators.${index}.occupation`)}
                      placeholder="Occupation"
                      className="w-full text-center"
                    />
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    {/* Stats for Investigators (optional) */}
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-destructive transition-all"
                        style={{
                          width: `${getStatPercentage(investigator.derivedStats?.hitPointsCurrent, investigator.derivedStats?.hitPointsMax)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button
                      className="gap-2"
                      variant="secondary"
                      size="sm"
                      onClick={() => router.push(`/characters/${investigator.id}`)}>
                      <Eye className="w-3 h-3" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const currentInvestigators = getValues('investigators') ?? []
              setValue('investigators', [
                ...currentInvestigators,
                {
                  id: '',
                  name: '',
                  occupation: '',
                  portraitUrl: '',
                  derivedStats: {
                    hitPointsCurrent: 0,
                    hitPointsMax: 0,
                    sanityCurrent: 0,
                    sanityMax: 0,
                    magicPointsCurrent: 0,
                    magicPointsMax: 0,
                    luck: 0,
                    movement: 0,
                    build: 0,
                    damageBonus: '',
                  },
                },
              ])
            }}>
            Add Investigator
          </Button>
        </CardContent>
      </Card>

      {/* Investigation Sessions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Investigation Sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="synopsis" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="synopsis">Synopsis</TabsTrigger>
              <TabsTrigger value="situation">Current Situation</TabsTrigger>
              <TabsTrigger value="npcs">Npcs</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
              <TabsTrigger value="clues">Clues</TabsTrigger>
            </TabsList>

            {/* Investigation Session Fields */}
            <TabsContent value="synopsis">
              <div className="space-y-1">
                <Label>Synopsis</Label>
                <Textarea {...register('investigationSessions.0.summary')} rows={4} />
                {errors.investigationSessions?.[0]?.summary && (
                  <p className="text-sm text-destructive">{errors.investigationSessions[0]?.summary?.message}</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="situation">
              <div className="space-y-1">
                <Label>Current Situation</Label>
                <Textarea {...register('investigationSessions.0.details')} rows={4} />
                {errors.investigationSessions?.[0]?.details && (
                  <p className="text-sm text-destructive">{errors.investigationSessions[0]?.details?.message}</p>
                )}
              </div>
            </TabsContent>

            {/* NPCs Section */}
            <TabsContent value="npcs">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {investigationSessionNpcs.map((npc, index) => (
                  <Card key={index} className="hover:border-primary/50 transition-colors">
                    <CardHeader className="text-center pb-3">
                      <Avatar className="w-20 h-20 mx-auto mb-3">
                        <AvatarImage src={npc.portrait || '/placeholder.svg'} alt={npc.name} />
                        <AvatarFallback className="text-xl font-serif">
                          {npc.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="font-serif text-lg">
                        <Input
                          {...register(`investigationSessions.0.npcs.${index}.name`)}
                          placeholder="NPC Name"
                          className="w-full text-center"
                        />
                      </CardTitle>
                      <CardDescription className="text-xs">
                        <Input
                          {...register(`investigationSessions.0.npcs.${index}.role`)}
                          placeholder="Role"
                          className="w-full text-center"
                        />
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Textarea
                        {...register(`investigationSessions.0.npcs.${index}.description`)}
                        placeholder="NPC Description"
                        rows={3}
                      />
                      <Input
                        {...register(`investigationSessions.0.npcs.${index}.portrait`)}
                        placeholder="Portrait URL"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const currentNPCs = getValues('investigationSessions.0.npcs') ?? []
                  setValue('investigationSessions.0.npcs', [
                    ...currentNPCs,
                    {id: '', name: '', role: '', description: '', portrait: '', isNPC: true},
                  ])
                }}>
                Add NPC
              </Button>
            </TabsContent>

            {/* Locations Section */}
            <TabsContent value="locations">
              <div className="space-y-4">
                {investigationSessionLocations.map((location, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="font-serif text-lg">
                        <Input
                          {...register(`investigationSessions.0.locations.${index}.name`)}
                          placeholder="Location Name"
                        />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        {...register(`investigationSessions.0.locations.${index}.description`)}
                        placeholder="Location Description"
                        rows={3}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const currentLocations = getValues('investigationSessions.0.locations') ?? []
                  setValue('investigationSessions.0.locations', [
                    ...currentLocations,
                    {id: '', name: '', description: ''},
                  ])
                }}>
                Add Location
              </Button>
            </TabsContent>

            {/* Clues Section */}
            <TabsContent value="clues">
              <div className="space-y-1">
                <Label>Clues</Label>
                <Controller
                  name="investigationSessions.0.clues"
                  control={control}
                  render={({field}) => {
                    // Convert the array of objects to a comma-separated string for displaying in the Textarea
                    const cluesString = field.value
                      ? field.value.map(clue => clue.description).join(', ') // Join descriptions into a string
                      : ''

                    return (
                      <Textarea
                        {...field}
                        rows={4}
                        placeholder="Enter clues, separated by commas"
                        value={cluesString} // Set value to a string of descriptions
                        onBlur={e => {
                          // Convert the string back into an array of objects on blur
                          const clues = e.target.value
                            .split(',')
                            .map(clue => clue.trim())
                            .filter(Boolean)
                            .map(description => ({
                              id: String(Date.now()), // Generate a unique ID or use another method
                              description,
                            }))

                          // Update the form state with the array of objects
                          setValue('investigationSessions.0.clues', clues)
                        }}
                      />
                    )
                  }}
                />
                {errors.investigationSessions?.[0]?.clues && (
                  <p className="text-sm text-destructive">{errors.investigationSessions[0]?.clues?.message}</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}

