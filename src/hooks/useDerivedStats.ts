import {useEffect, useRef} from 'react'
import {shallowEqual} from '@/lib/utils/shallowEqual'
import {deriveCoCStats, type CoCNextDerivedStats} from '@/lib/rules/derivedStats'
import type {UseFormSetValue} from 'react-hook-form'
import type {CharacterFormValues} from '@/lib/validation/character.schema'

// This matches what react-hook-form actually gives you
type CharacteristicsInput = {
  strength?: number
  constitution?: number
  size?: number
  dexterity?: number
  power?: number
}

type DerivedStatsInput = Partial<CoCNextDerivedStats>

type Params = {
  characteristics?: CharacteristicsInput
  derivedStats?: DerivedStatsInput
  setValue: UseFormSetValue<CharacterFormValues>
}

export function useDerivedCoCStats({
                                     characteristics,
                                     derivedStats,
                                     setValue,
                                   }: Params) {
  const didInitRef = useRef(false)

  useEffect(() => {
    if (!characteristics || !derivedStats) return

    const next = deriveCoCStats({
      characteristics: {
        strength: characteristics.strength ?? 0,
        constitution: characteristics.constitution ?? 0,
        size: characteristics.size ?? 0,
        dexterity: characteristics.dexterity ?? 0,
        power: characteristics.power ?? 0,
      },
      current: {
        hitPointsCurrent: derivedStats.hitPointsCurrent ?? 0,
        sanityCurrent: derivedStats.sanityCurrent ?? 0,
        magicPointsCurrent: derivedStats.magicPointsCurrent ?? 0,
        luck: derivedStats.luck ?? 0,
      },
    })

    if (didInitRef.current && shallowEqual(derivedStats, next)) return
    didInitRef.current = true

    setValue('derivedStats', next, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    })
  }, [characteristics, derivedStats, setValue])
}
