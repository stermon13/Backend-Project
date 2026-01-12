// 'use client'
//
// import {useForm} from 'react-hook-form'
// import {zodResolver} from '@hookform/resolvers/zod'
//
// import {Button} from '@/components/ui/button'
// import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
// import {Input} from '@/components/ui/input'
// import {Label} from '@/components/ui/label'
// import {Textarea} from '@/components/ui/textarea'
// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
//
// import {ArrowLeft} from 'lucide-react'
// import Link from 'next/link'
//
// import {createMonsterSchema, type CreateMonsterInput} from '@/schemas/monster.schema'
// import {createMonsterAction} from '@/serverFunctions/monsters'
//
// export default function NewMonsterPage() {
//   const form = useForm<CreateMonsterInput>({
//     resolver: zodResolver(createMonsterSchema),
//     defaultValues: {
//       category: 'minor',
//     },
//   })
//
//   return (
//     <div className="min-h-screen bg-background">
//       <main className="container mx-auto px-4 py-8 max-w-4xl">
//         <div className="mb-6">
//           <Link href="/monsters">
//             <Button variant="ghost" className="gap-2 mb-4">
//               <ArrowLeft className="w-4 h-4" />
//               Back to Monsters
//             </Button>
//           </Link>
//           <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Add New Monster</h1>
//           <p className="text-muted-foreground">Create a new creature for your compendium</p>
//         </div>
//
//         {/* IMPORTANT: server action */}
//         <form action={createMonsterAction}>
//           <div className="space-y-6">
//             {/* BASIC INFO */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="font-serif">Basic Information</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label>Name</Label>
//                   <Input {...form.register('name')} />
//                 </div>
//
//                 <div className="space-y-2">
//                   <Label>Category</Label>
//                   <Select defaultValue="minor" onValueChange={value => form.setValue('category', value)}>
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="minor">Minor Creature</SelectItem>
//                       <SelectItem value="major">Major Threat</SelectItem>
//                       <SelectItem value="mythos">Mythos Entity</SelectItem>
//                       <SelectItem value="humanoid">Humanoid</SelectItem>
//                       <SelectItem value="undead">Undead</SelectItem>
//                       <SelectItem value="beast">Beast/Animal</SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//
//                 <div className="space-y-2">
//                   <Label>Description</Label>
//                   <Textarea {...form.register('description')} rows={4} />
//                 </div>
//               </CardContent>
//             </Card>
//
//             {/* CHARACTERISTICS */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="font-serif">Characteristics</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                   {(['str', 'con', 'siz', 'dex', 'int', 'pow'] as const).map(stat => (
//                     <div key={stat} className="space-y-2">
//                       <Label>{stat.toUpperCase()}</Label>
//                       <Input type="number" {...form.register(stat, {valueAsNumber: true})} />
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//
//             {/* COMBAT STATS */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="font-serif">Combat Statistics</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                   <div className="space-y-2">
//                     <Label>Hit Points</Label>
//                     <Input type="number" {...form.register('hp', {valueAsNumber: true})} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Magic Points</Label>
//                     <Input type="number" {...form.register('mp', {valueAsNumber: true})} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Move Rate</Label>
//                     <Input {...form.register('moveRate')} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Damage Bonus</Label>
//                     <Input {...form.register('damageBonus')} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Build</Label>
//                     <Input type="number" {...form.register('build', {valueAsNumber: true})} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Armor</Label>
//                     <Input {...form.register('armor')} />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//
//             {/* COMBAT & ABILITIES */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="font-serif">Combat & Abilities</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label>Attacks</Label>
//                   <Input {...form.register('attacks')} />
//                 </div>
//
//                 <div className="space-y-2">
//                   <Label>Skills</Label>
//                   <Textarea {...form.register('skills')} rows={2} />
//                 </div>
//
//                 {/* NOTE: spells handled later via relation */}
//                 <div className="space-y-2">
//                   <Label>Sanity Loss</Label>
//                   <Input {...form.register('sanityLoss')} />
//                 </div>
//               </CardContent>
//             </Card>
//
//             {/* ACTIONS */}
//             <div className="flex gap-3 justify-end">
//               <Link href="/monsters">
//                 <Button type="button" variant="outline">
//                   Cancel
//                 </Button>
//               </Link>
//               <Button type="submit">Create Monster</Button>
//             </div>
//           </div>
//         </form>
//       </main>
//     </div>
//   )
// }
import {redirect} from 'next/navigation'
import MonsterForm from '@/components/custom/monsters/monsterForm'
import {createMonsterAction} from '@/serverFunctions/monsters'
import {getSessionFromCookie} from '@/lib/sessionUtils'
import {proxyGetAllSpells} from '@/proxy/spells'

export default async function NewMonsterPage() {
  const session = await getSessionFromCookie(false)

  if (!session || (session.user.role !== 'Admin' && session.user.role !== 'Keeper')) {
    redirect('/dashboard')
  }

  let spells
  try {
    spells = await proxyGetAllSpells()
  } catch {
    redirect('/dashboard')
  }

  return <MonsterForm submitLabel="Create Monster" action={createMonsterAction} spells={spells} />
}


