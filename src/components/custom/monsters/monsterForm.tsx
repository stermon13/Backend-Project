'use client'

import {Controller, useForm, useWatch, type Resolver} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Checkbox} from '@/components/ui/checkbox'
import {createMonsterSchema} from '@/schemas/monster.schema'
import type {MonsterFormValues} from '@/types/monster-form'
import type {SpellDto} from '@/types/spell'
import type {FormAction} from '@/models/serverFunctions'
import {serializeFormData} from '@/lib/serializeFormData'

type Props = {
  defaultValues?: Partial<MonsterFormValues>
  monsterId?: string
  submitLabel: string
  action: FormAction<void>
  spells: SpellDto[]
}

export default function MonsterForm({defaultValues, monsterId, submitLabel, action, spells}: Props) {
  const form = useForm<MonsterFormValues>({
    resolver: zodResolver(createMonsterSchema) as Resolver<MonsterFormValues>,
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      spellIds: [],
      category: defaultValues?.category ?? 'minor',
      ...defaultValues,
    },
  })

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: {errors},
  } = form

  const selectedSpellIds = useWatch({control, name: 'spellIds'}) ?? []

  const onSubmit = async (formData: MonsterFormValues) => {
    try {
      const payload = monsterId ? {...formData, id: monsterId} : formData
      await action({success: true}, serializeFormData(payload))
    } catch (error) {
      if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
        throw error
      }

      console.error('Error submitting monster form:', error)
      alert('Error submitting monster form. Please try again later.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">

        {/* BASIC INFO */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            {/* NAME */}
            <div className="space-y-1">
              <Label>Name</Label>
              <Input {...register('name')} />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* CATEGORY */}
            <div className="space-y-1">
              <Label>Category</Label>

              {/* hidden input so RHF + FormData work */}
              <input type="hidden" {...register('category')} />

              <Controller
                control={control}
                name="category"
                render={({field}) => (
                  <Select value={field.value} onValueChange={v => field.onChange(v as MonsterFormValues['category'])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minor">Minor Creature</SelectItem>
                      <SelectItem value="major">Major Threat</SelectItem>
                      <SelectItem value="mythos">Mythos Entity</SelectItem>
                      <SelectItem value="humanoid">Humanoid</SelectItem>
                      <SelectItem value="undead">Undead</SelectItem>
                      <SelectItem value="beast">Beast</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.category && (
                <p className="text-sm text-destructive">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea {...register('description')} rows={4} />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* CHARACTERISTICS */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Characteristics</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(['str', 'con', 'siz', 'dex', 'int', 'pow'] as const).map(stat => (
              <div key={stat} className="space-y-1">
                <Label>{stat.toUpperCase()}</Label>
                <Input
                  type="number"
                  {...register(stat, {valueAsNumber: true})}
                />
                {errors[stat] && (
                  <p className="text-sm text-destructive">
                    {errors[stat]?.message}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* COMBAT */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Combat Statistics</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {(['hp', 'mp', 'build'] as const).map(key => (
              <div key={key} className="space-y-1">
                <Label>{key.toUpperCase()}</Label>
                <Input
                  type="number"
                  {...register(key, {valueAsNumber: true})}
                />
                {errors[key] && (
                  <p className="text-sm text-destructive">
                    {errors[key]?.message}
                  </p>
                )}
              </div>
            ))}

            {(['moveRate', 'damageBonus', 'armor'] as const).map(key => (
              <div key={key} className="space-y-1">
                <Label>{key}</Label>
                <Input {...register(key)} />
                {errors[key] && (
                  <p className="text-sm text-destructive">
                    {errors[key]?.message}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ABILITIES */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Combat & Abilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            {(['attacks', 'skills', 'sanityLoss'] as const).map(key => (
              <div key={key} className="space-y-1">
                <Label>{key}</Label>
                {key === 'skills' ? (
                  <Textarea {...register(key)} rows={2} />
                ) : (
                  <Input {...register(key)} />
                )}
                {errors[key] && (
                  <p className="text-sm text-destructive">
                    {errors[key]?.message}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* SPELLS */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Spells</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">

            {spells.length === 0 ? (
              <p className="text-muted-foreground italic">
                No spells available.
              </p>
            ) : (
              spells.map(spell => {
                const checked = selectedSpellIds.includes(spell.id)

                return (
                  <div key={spell.id} className="flex gap-3">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={val => {
                        const next = val
                          ? [...selectedSpellIds, spell.id]
                          : selectedSpellIds.filter(id => id !== spell.id)

                        setValue('spellIds', next, {shouldValidate: true})
                      }}
                    />

                    <div>
                      <div className="font-medium">{spell.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {spell.description}
                      </div>
                    </div>

                    {checked && (
                      <input
                        type="hidden"
                        name="spellIds"
                        value={spell.id}
                      />
                    )}
                  </div>
                )
              })
            )}

            {errors.spellIds && (
              <p className="text-sm text-destructive">
                {errors.spellIds.message}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">{submitLabel}</Button>
        </div>
      </div>
    </form>
  )
}