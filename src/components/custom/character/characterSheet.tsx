'use client'

import React from 'react'
import {FormProvider, useForm, useWatch, useFieldArray, type FieldErrors, type Resolver} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Separator} from '@/components/ui/separator'
import {Progress} from '@/components/ui/progress'
import {Label} from '@/components/ui/label'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import {ArrowLeft, Skull, Brain, Heart, Zap, Plus, MoreVertical} from 'lucide-react'
import {
  characterSchema,
  createCharacterSchema,
  type CharacterFormValues,
  type CharacterFormResolved,
} from '@/schemas/character.schema'
import type {CharacterWithRelations} from '@/types/character'
import {
  StatField,
  EditableTextField,
  EditableNumberField,
  EditableTextarea,
  EditableCheckboxField,
  EditableSkillField,
} from './field'
import {characterToForm} from '@/lib/mapper/characterToForm'
import {useDerivedCoCStats} from '@/hooks/useDerivedStats'
import {groupSkillsByCategory} from '@/lib/utils/groupSkillsByCategory'
import type {Mode} from '@/types/mode'
import {getCombatViewModel as buildCombat} from '@/lib/utils/combatViewModel'
import {getStatPercentage, getSkillColor} from '@/lib/utils/stats'
import type {ItemDto} from '@/types/item'
import {createCharacterAction, updateCharacterAction} from '@/serverFunctions/characterFunctions'
import {serializeFormData} from '@/lib/serializeFormData'
import {useActionState, useTransition} from 'react'
import {useRouter} from 'next/navigation'
import {AlertCircle, CheckCircle} from 'lucide-react'
import {Alert, AlertDescription} from '@/components/ui/alert'

interface CharacterSheetProps {
  character: CharacterWithRelations
  items: ItemDto[]
  mode: Mode
  onSubmit?: (data: CharacterFormValues) => void
  onBack?: () => void
  onEditClick?: () => void
}


// Use the standard serializer which produces dotted paths compatible with convertFormData on the server
// (e.g. "characteristics.strength", "possessions.0.item.name", etc.)
// This ensures Zod validation receives the expected object shape.


function getFirstValidationMessage(errors: unknown): string | null {
  if (!errors || typeof errors !== 'object') {
    return null
  }

  const queue: unknown[] = [errors]

  while (queue.length > 0) {
    const current = queue.shift()

    if (!current || typeof current !== 'object') {
      continue
    }

    // RHF field error shape
    if ('message' in current && typeof (current as {message?: unknown}).message === 'string') {
      return (current as {message: string}).message
    }

    for (const value of Object.values(current as Record<string, unknown>)) {
      // server action error shape: {errors: string[]}
      if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
        return value[0]
      }

      if (value && typeof value === 'object') {
        queue.push(value)
      }
    }
  }

  return null
}

export function CharacterSheet({character, items, mode, onBack, onEditClick}: CharacterSheetProps) {
  const isEditable = mode !== 'view'
  const router = useRouter()

  const [createCharacterState, createCharacterFormAction] = useActionState(createCharacterAction, {success: false})
  const [updateCharacterState, updateCharacterFormAction] = useActionState(updateCharacterAction, {success: false})


  const form = useForm<CharacterFormValues>({
    resolver: zodResolver(mode === 'create' ? createCharacterSchema : characterSchema) as unknown as Resolver<CharacterFormValues>,
    defaultValues: characterToForm(character),
  })

  const [isPending, startTransition] = useTransition()
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  // Watch the state from the server actions
  React.useEffect(() => {
    if (mode !== 'create') {
      return
    }

    if (createCharacterState.success) {
      setSuccessMessage('Character created successfully!')
      setErrorMessage(null)
      setTimeout(() => {
        router.refresh()
        router.push('/characters')
      }, 500)
      return
    }

    const serverError = getFirstValidationMessage(createCharacterState.errors)
    if (serverError) {
      setErrorMessage(serverError)
      setSuccessMessage(null)
    }
  }, [createCharacterState, mode, router])

  React.useEffect(() => {
    if (mode !== 'edit') {
      return
    }

    if (updateCharacterState.success) {
      setSuccessMessage('Character updated successfully!')
      setErrorMessage(null)
      setTimeout(() => {
        router.refresh()
      }, 500)
      return
    }

    const serverError = getFirstValidationMessage(updateCharacterState.errors)
    if (serverError) {
      setErrorMessage(serverError)
      setSuccessMessage(null)
    }
  }, [updateCharacterState, mode, router])

  const handleSubmit = (data: CharacterFormValues) => {
    setSuccessMessage(null)
    setErrorMessage(null)
    const formData = serializeFormData(data)
    startTransition(() => {
      if (mode === 'create') {
        createCharacterFormAction(formData)
      } else if (mode === 'edit') {
        updateCharacterFormAction(formData)
      }
    })
  }

  const handleInvalidSubmit = (errors: FieldErrors<CharacterFormValues>) => {
    setSuccessMessage(null)
    setErrorMessage(getFirstValidationMessage(errors) ?? 'Please fix the highlighted form fields and try again.')
  }

  const {append, remove} = useFieldArray({
    control: form.control,
    name: 'possessions',
  })

  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({
    control: form.control,
    name: 'contacts',
  })


  const values = useWatch({
    control: form.control,
  }) as CharacterFormResolved

  useDerivedCoCStats({
    characteristics: values.characteristics,
    derivedStats: values.derivedStats,
    setValue: form.setValue,
  })

  const skillsByCategory = groupSkillsByCategory(values.skills ?? [])

  const combat = buildCombat(character, values.derivedStats?.movement ?? 0)

  const backgroundFields = [
    {label: 'Ideology & Beliefs', name: 'ideologyBeliefs'},
    {label: 'Significant People', name: 'significantPeople'},
    {label: 'Meaningful Locations', name: 'meaningfulLocations'},
    {label: 'Treasured Possessions', name: 'treasuredPossessions'},
    {label: 'Traits', name: 'traits'},
    {label: 'Injuries & Scars', name: 'injuriesScars'},
    {label: 'Phobias & Manias', name: 'phobiasManias'},
  ] as const


  const content = (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Status Messages */}
        {isPending && (
          <Alert className="mb-6 border-blue-500 bg-blue-50">
            <Zap className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Saving your changes...
            </AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="mb-6 border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {errorMessage && (
          <Alert className="mb-6 border-red-500 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4 gap-2" onClick={onBack} type="button">
            <ArrowLeft className="w-4 h-4" />
            Back to Characters
          </Button>

          <div className="flex items-start gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={values.portraitUrl || '/placeholder.svg'} alt={values.name} />
              <AvatarFallback className="text-3xl font-serif">
                {values.name
                  ?.split(' ')
                  .map(n => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className="w-full max-w-xl">
                  {/* Name */}
                  {isEditable ? (
                    <div>
                      <Label className="text-xs text-muted-foreground">Name</Label>
                      <EditableTextField name="name" editable={isEditable} />
                    </div>
                  ) : (
                    <h1 className="text-4xl font-serif font-bold text-foreground mb-1">{values.name}</h1>
                  )}

                  {/* Occupation */}
                  {isEditable ? (
                    <div className="mt-3">
                      <Label className="text-xs text-muted-foreground">Occupation</Label>
                      <EditableTextField name="occupation" editable={isEditable} />
                    </div>
                  ) : (
                    <p className="text-xl text-muted-foreground">{values.occupation}</p>
                  )}

                  {isEditable && (
                    <div className="mt-3">
                      <EditableCheckboxField name="isNpc" label="NPC" editable={isEditable} />
                    </div>
                  )}
                </div>

                {!isEditable ? (
                  <Button onClick={onEditClick} type="button">
                    Edit Character
                  </Button>
                ) : (
                  <Button type="submit" disabled={isPending}>
                    {isPending ? 'Saving...' : mode === 'create' ? 'Create Character' : 'Save Changes'}
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                <div>
                  <Label className="text-xs text-muted-foreground">Age</Label>
                  <EditableNumberField name="age" editable={isEditable} />
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Sex</Label>
                  <EditableTextField name="sex" editable={isEditable} />
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Residence</Label>
                  <EditableTextField name="residence" editable={isEditable} />
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Birthplace</Label>
                  <EditableTextField name="birthplace" editable={isEditable} />
                </div>
              </div>

              {values.campaignName ? <Badge className="mt-4 bg-primary">Campaign: {values.campaignName}</Badge> : null}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Heart className="w-4 h-4 text-destructive" />
                Hit Points
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex items-baseline gap-2 text-3xl font-bold mb-2">
                <span className="text-center">{values.derivedStats?.hitPointsCurrent ?? 0}</span>
                <span>/ {values.derivedStats?.hitPointsMax ?? 0}</span>
              </div>

              <Progress
                value={getStatPercentage(
                  values.derivedStats?.hitPointsCurrent ?? 0,
                  values.derivedStats?.hitPointsMax ?? 0,
                )}
                className="h-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Brain className="w-4 h-4 text-chart-5" />
                Sanity Points
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex items-baseline gap-2 text-3xl font-bold mb-2">
                <span className="text-center">{values.derivedStats?.sanityCurrent ?? 0}</span>
                <span>/ {values.derivedStats?.sanityMax ?? 0}</span>
              </div>

              <Progress
                value={getStatPercentage(values.derivedStats?.sanityCurrent ?? 0, values.derivedStats?.sanityMax ?? 0)}
                className="h-2"
              />

              <p className="text-xs text-muted-foreground mt-2">Starting: {values.derivedStats?.sanityMax ?? 0}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                Magic Points
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex items-baseline gap-2 text-3xl font-bold mb-2">
                <span className="text-center">{values.derivedStats?.magicPointsCurrent ?? 0}</span>
                <span>/ {values.derivedStats?.magicPointsMax ?? 0}</span>
              </div>

              <Progress
                value={getStatPercentage(
                  values.derivedStats?.magicPointsCurrent ?? 0,
                  values.derivedStats?.magicPointsMax ?? 0,
                )}
                className="h-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Skull className="w-4 h-4" />
                Luck
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold">{values.derivedStats?.luck ?? 0}</div>

              <div className="text-xs text-muted-foreground mt-2">
                <div>Movement: {values.derivedStats?.movement ?? 0}</div>
                <div>Build: {values.derivedStats?.build ?? 0}</div>
                <div>DB: {values.derivedStats?.damageBonus ?? '-'}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="stats" className="w-full space-y-6">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="combat">Combat</TabsTrigger>
            <TabsTrigger value="background">Background</TabsTrigger>
            <TabsTrigger value="possessions">Possessions</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Characteristics */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Characteristics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <StatField label="STR" name="characteristics.strength" editable={isEditable} />
                    <StatField label="CON" name="characteristics.constitution" editable={isEditable} />
                    <StatField label="SIZ" name="characteristics.size" editable={isEditable} />
                    <StatField label="DEX" name="characteristics.dexterity" editable={isEditable} />
                    <StatField label="APP" name="characteristics.appearance" editable={isEditable} />
                    <StatField label="INT" name="characteristics.intelligence" editable={isEditable} />
                    <StatField label="POW" name="characteristics.power" editable={isEditable} />
                    <StatField label="EDU" name="characteristics.education" editable={isEditable} />
                  </div>
                </CardContent>
              </Card>

              {/* Derived Attributes */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Derived Attributes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-[1fr_96px_64px] gap-y-3 gap-x-4 items-center">
                    {/* Header row */}
                    <div />
                    <div className="text-xs text-muted-foreground text-center">Current</div>
                    <div className="text-xs text-muted-foreground text-center">Max</div>

                    {/* Hit Points */}
                    <span className="text-sm">Hit Points</span>
                    <EditableNumberField
                      name="derivedStats.hitPointsCurrent"
                      editable={isEditable}
                      className="text-center"
                    />
                    <span className="text-sm font-bold text-center">{values.derivedStats?.hitPointsMax ?? 0}</span>

                    {/* Sanity */}
                    <span className="text-sm">Sanity Points</span>
                    <EditableNumberField
                      name="derivedStats.sanityCurrent"
                      editable={isEditable}
                      className="text-center"
                    />
                    <span className="text-sm font-bold text-center">{values.derivedStats?.sanityMax ?? 0}</span>

                    {/* Magic */}
                    <span className="text-sm">Magic Points</span>
                    <EditableNumberField
                      name="derivedStats.magicPointsCurrent"
                      editable={isEditable}
                      className="text-center"
                    />
                    <span className="text-sm font-bold text-center">{values.derivedStats?.magicPointsMax ?? 0}</span>

                    {/* Luck */}
                    <span className="text-sm">Luck</span>
                    <EditableNumberField name="derivedStats.luck" editable={isEditable} className="text-center" />
                    <span />

                    {/* Movement */}
                    <span className="text-sm">Movement</span>
                    <span />
                    <span className="text-sm font-bold text-center">{values.derivedStats?.movement ?? 0}</span>

                    {/* Build */}
                    <span className="text-sm">Build</span>
                    <span />
                    <span className="text-sm font-bold text-center">{values.derivedStats?.build ?? 0}</span>

                    {/* Damage Bonus */}
                    <span className="text-sm">Damage Bonus</span>
                    <span />
                    <span className="text-sm font-bold text-center">{values.derivedStats?.damageBonus ?? 0}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg capitalize">{category}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    {skills.map(cs => {
                      const skillIndex = values.skills?.findIndex(s => s.skillId === cs.skillId)

                      if (skillIndex === -1) return null

                      return (
                        <div key={cs.skill.name} className="flex items-center justify-between">
                          <span className="text-sm">{cs.skill?.name ?? 'Skill'}</span>

                          <EditableSkillField
                            name={`skills.${skillIndex}.value`}
                            editable={isEditable}
                            value={cs.value}
                            className={getSkillColor(cs.value ?? 0)}
                          />
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Combat Tab */}
          <TabsContent value="combat">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Weapons & Combat</CardTitle>
              </CardHeader>

              <CardContent>
                {/* Dodge */}
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground">Dodge</div>
                  <div className="text-2xl font-bold">{combat.dodge}%</div>
                </div>

                <Separator className="my-4" />

                {/* Weapons */}
                <div className="space-y-4">
                  {combat.weapons.length === 0 && <p className="text-sm text-muted-foreground">No weapons equipped.</p>}

                  {combat.weapons.map((weapon, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="font-semibold mb-2">{weapon.name}</div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Skill:</span> {weapon.skill}%
                        </div>
                        <div>
                          <span className="text-muted-foreground">Damage:</span> {weapon.damage}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Range:</span> {weapon.range}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Attacks:</span> {weapon.attacks}/round
                        </div>
                        {weapon.ammo !== undefined && (
                          <div>
                            <span className="text-muted-foreground">Ammo:</span> {weapon.ammo}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Background Tab */}
          <TabsContent value="background">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Backstory</CardTitle>
                </CardHeader>
                <CardContent>
                  <EditableTextarea name="backstory" editable={isEditable} />
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {backgroundFields.map(field => (
                  <Card key={field.name}>
                    <CardHeader>
                      <CardTitle className="font-serif text-lg">{field.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <EditableTextField name={field.name} editable={isEditable} />
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Contacts */}
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="font-serif">Contacts</CardTitle>

                  {isEditable && (
                    <Button
                      size="sm"
                      type="button"
                      onClick={() =>
                        appendContact({
                          id: 'new',
                          name: '',
                          relationship: '',
                          description: '',
                        })
                      }>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Contact
                    </Button>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  {contactFields.length === 0 && <p className="text-sm text-muted-foreground">No contacts added.</p>}

                  {contactFields.map((contact, index) => (
                    <div key={`${contact.id}-${index}`} className="p-3 rounded-lg border space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div>
                            <Label className="text-xs">Name</Label>
                            <EditableTextField name={`contacts.${index}.name`} editable={isEditable} />
                          </div>

                          <div>
                            <Label className="text-xs">Relationship</Label>
                            <EditableTextField name={`contacts.${index}.relationship`} editable={isEditable} />
                          </div>

                          <div>
                            <Label className="text-xs">Description</Label>
                            <EditableTextarea name={`contacts.${index}.description`} editable={isEditable} />
                          </div>
                        </div>

                        {isEditable && (
                          <Button variant="ghost" size="icon" type="button" onClick={() => removeContact(index)}>
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Possessions Tab (read-only) */}
          <TabsContent value="possessions">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="font-serif">Inventory</CardTitle>
                      <CardDescription>Carried items and equipment</CardDescription>
                    </div>
                    {isEditable && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" className="gap-2" type="button">
                            <Plus className="w-4 h-4" />
                            Add Item
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="max-h-80 overflow-y-auto">
                          {items.map(item => (
                            <DropdownMenuItem
                              disabled={values.possessions?.some(p => p.itemId === item.id)}
                              key={item.id}
                              onClick={() =>
                                append({
                                  id: 'new',
                                  itemId: item.id,
                                  quantity: 1,
                                  item: {
                                    id: item.id,
                                    name: item.name,
                                    category: item.category,
                                    description: item.description,
                                    damage: item.damage ?? undefined,
                                    range: item.range ?? undefined,
                                    attacks: item.attacks ?? undefined,
                                    ammo: item.ammo ?? undefined,
                                    value: item.value,
                                    weight: item.weight,
                                    createdAt: item.createdAt,
                                    updatedAt: item.updatedAt,
                                  },
                                })
                              }>
                              <span className="flex flex-col">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-xs text-muted-foreground capitalize">{item.category}</span>
                              </span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(values.possessions ?? []).map((p, index) => (
                        <div
                          key={`${p.id}-${index}`}
                          className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">{p.item?.name ?? 'Item'}</span>

                              <EditableNumberField
                                name={`possessions.${index}.quantity`}
                                editable={isEditable}
                                className="w-16"
                              />

                              {p.item?.category && (
                                <Badge variant="outline" className="text-xs capitalize">
                                  {p.item.category}
                                </Badge>
                              )}
                            </div>

                            <p className="text-xs text-muted-foreground">{p.item?.description ?? ''}</p>
                          </div>

                          {isEditable && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => remove(index)}>
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Cash & Assets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Cash on Hand</Label>
                      <EditableTextField name="cash" editable={isEditable} />
                    </div>

                    <div className="pt-4 border-t">
                      <Label className="text-xs text-muted-foreground">Assets</Label>
                      <EditableTextField name="assets" editable={isEditable} />
                    </div>
                  </CardContent>
                </Card>

                {isEditable && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-serif text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full justify-start bg-transparent" type="button">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Money
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" type="button">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Asset
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <EditableTextarea name="notes" editable={isEditable} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )

  return (
    <FormProvider {...form}>
      {isEditable ? (
        <form onSubmit={form.handleSubmit(handleSubmit, handleInvalidSubmit)}>
          {content}
        </form>
      ) : (
        content
      )}
    </FormProvider>
  )
}
