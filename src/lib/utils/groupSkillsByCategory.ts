import type { FormSkill } from '@/types/skill'

export function groupSkillsByCategory(skills: FormSkill[]) {
  return skills.reduce<Record<string, FormSkill[]>>((acc, cs) => {
    if (!cs.skill?.category) return acc

    const category = cs.skill.category
    acc[category] ??= []
    acc[category].push(cs)

    return acc
  }, {})
}

