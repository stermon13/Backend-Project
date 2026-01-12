'use client'

import {Input} from '@/components/ui/input'
import {useFormContext, type Path} from 'react-hook-form'
import type {CharacterFormValues} from '@/schemas/character.schema'
import {cn} from '@/lib/utils'


interface BaseFieldProps {
  name: Path<CharacterFormValues>
  editable: boolean
  className?: string
}

interface StatFieldProps extends BaseFieldProps {
  label: string
}

export function StatField({label, name, editable}: StatFieldProps) {
  const {register, watch} = useFormContext<CharacterFormValues>()
  const value = watch(name) as number | undefined

  return (
    <div className="text-center">
      <div className="text-sm text-muted-foreground">{label}</div>

      {editable ? (
        <Input type="number" {...register(name, {valueAsNumber: true})} />
      ) : (
        <>
          <div className="text-4xl font-bold">{value ?? 0}</div>
          <div className="text-xs text-muted-foreground space-y-1 mt-1">
            <div>Half: {Math.floor((value ?? 0) / 2)}</div>
            <div>Fifth: {Math.floor((value ?? 0) / 5)}</div>
          </div>
        </>
      )}
    </div>
  )
}

export function EditableTextField({name, editable}: BaseFieldProps) {
  const {register, watch} = useFormContext<CharacterFormValues>()
  const value = watch(name) as string | undefined

  return editable ? <Input {...register(name)} /> : <p className="text-foreground">{value || '-'}</p>
}

export function EditableNumberField({name, editable, className}: BaseFieldProps) {
  const {register, watch} = useFormContext<CharacterFormValues>()
  const value = watch(name) as number | undefined

  return editable ? (
    <Input type="number" {...register(name, {valueAsNumber: true})} className={className} />
  ) : (
    <span className={cn('font-bold text-center block', className)}>{value ?? 0}</span>
  )
}



interface EditableTextareaProps {
  name: Path<CharacterFormValues>
  editable: boolean
}

export function EditableTextarea({name, editable}: EditableTextareaProps) {
  const {register, watch} = useFormContext<CharacterFormValues>()
  const value = watch(name) as string | undefined

  return editable ? (
    <textarea className="w-full h-40 p-4 border rounded-lg resize-none" {...register(name)} />
  ) : (
    <p className="text-muted-foreground leading-relaxed">{value || ''}</p>
  )
}

interface EditableCheckboxFieldProps extends BaseFieldProps {
  label: string
}

export function EditableCheckboxField({name, label, editable}: EditableCheckboxFieldProps) {
  const {register, watch} = useFormContext<CharacterFormValues>()
  const value = watch(name) as boolean | undefined

  if (!editable) {
    return value ? <span className="text-sm text-muted-foreground">{label}</span> : null
  }

  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" {...register(name)} className="h-4 w-4" />
      {label}
    </label>
  )
}

interface EditableSkillFieldProps extends BaseFieldProps {
  value?: number
}

export function EditableSkillField({name, editable, value, className}: EditableSkillFieldProps) {
  const {register} = useFormContext<CharacterFormValues>()

  const displayValue = value ?? 0

  // console.log('EditableSkillField render', name, value)
  // console.log('EditableSkillField name:', name)

  return editable ? (
    <div className="flex items-center gap-1">
      <Input
        type="number"
        min={0}
        max={99}
        {...register(name)}
        className={cn('w-20 text-right', className)}
      />
      <span className="text-sm text-muted-foreground">%</span>
    </div>
  ) : (
    <span className={cn('font-bold', className)}>{displayValue}%</span>
  )
}
