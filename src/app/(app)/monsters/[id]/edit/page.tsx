// "use client"
//
// import type React from "react"
//
//
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { ArrowLeft } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
//
// export default function EditMonsterPage({ params }: { params: { id: string } }) {
//   const router = useRouter()
//
//   // Mock data for UI display only
//   const monster = {
//     id: params.id,
//     name: "Deep One",
//     category: "mythos",
//     str: "130",
//     con: "70",
//     siz: "140",
//     dex: "50",
//     int: "50",
//     pow: "50",
//     hp: "21",
//     mp: "10",
//     moveRate: "8 / 10 swimming",
//     damageBonus: "+1D6",
//     build: "2",
//     armor: "2-point scales and hide",
//     attacks: "1 (claw or weapon)",
//     skills: "Fighting 60%, Swim 80%, Stealth 40%",
//     sanityLoss: "0/1D6",
//     spells: "None typically, but some may know Deep One Rituals",
//     description:
//       "Amphibious humanoids that serve the Great Old Ones. They possess fish-like features and an unsettling intelligence.",
//   }
//
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // UI only - backend will handle actual update
//     router.push(`/monsters/${params.id}`)
//   }
//
//   return (
//     <div className="min-h-screen bg-background">
//       <main className="container mx-auto px-4 py-8 max-w-4xl">
//         <div className="mb-6">
//           <Link href={`/monsters/${params.id}`}>
//             <Button variant="ghost" className="gap-2 mb-4">
//               <ArrowLeft className="w-4 h-4" />
//               Back to Monster
//             </Button>
//           </Link>
//           <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Edit Monster</h1>
//           <p className="text-muted-foreground">Update monster details</p>
//         </div>
//
//         <form onSubmit={handleSubmit}>
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="font-serif">Basic Information</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label>Name</Label>
//                   <Input defaultValue={monster.name} />
//                 </div>
//
//                 <div className="space-y-2">
//                   <Label>Category</Label>
//                   <Select defaultValue={monster.category}>
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
//                   <Textarea defaultValue={monster.description} rows={4} />
//                 </div>
//               </CardContent>
//             </Card>
//
//             <Card>
//               <CardHeader>
//                 <CardTitle className="font-serif">Characteristics</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                   <div className="space-y-2">
//                     <Label>STR</Label>
//                     <Input defaultValue={monster.str} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>CON</Label>
//                     <Input defaultValue={monster.con} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>SIZ</Label>
//                     <Input defaultValue={monster.siz} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>DEX</Label>
//                     <Input defaultValue={monster.dex} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>INT</Label>
//                     <Input defaultValue={monster.int} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>POW</Label>
//                     <Input defaultValue={monster.pow} />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//
//             <Card>
//               <CardHeader>
//                 <CardTitle className="font-serif">Combat Statistics</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                   <div className="space-y-2">
//                     <Label>Hit Points</Label>
//                     <Input defaultValue={monster.hp} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Magic Points</Label>
//                     <Input defaultValue={monster.mp} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Move Rate</Label>
//                     <Input defaultValue={monster.moveRate} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Damage Bonus</Label>
//                     <Input defaultValue={monster.damageBonus} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Build</Label>
//                     <Input defaultValue={monster.build} />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Armor</Label>
//                     <Input defaultValue={monster.armor} />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//
//             <Card>
//               <CardHeader>
//                 <CardTitle className="font-serif">Combat & Abilities</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label>Attacks</Label>
//                   <Input defaultValue={monster.attacks} />
//                 </div>
//
//                 <div className="space-y-2">
//                   <Label>Skills</Label>
//                   <Textarea defaultValue={monster.skills} rows={2} />
//                 </div>
//
//                 <div className="space-y-2">
//                   <Label>Spells & Powers</Label>
//                   <Textarea defaultValue={monster.spells} rows={2} />
//                 </div>
//
//                 <div className="space-y-2">
//                   <Label>Sanity Loss</Label>
//                   <Input defaultValue={monster.sanityLoss} />
//                 </div>
//               </CardContent>
//             </Card>
//
//             <div className="flex gap-3 justify-end">
//               <Link href={`/monsters/${params.id}`}>
//                 <Button type="button" variant="outline">
//                   Cancel
//                 </Button>
//               </Link>
//               <Button type="submit">Save Changes</Button>
//             </div>
//           </div>
//         </form>
//       </main>
//     </div>
//   )
// }
import {notFound, redirect} from 'next/navigation'
import {proxyGetMonsterById} from '@/proxy/monsters'
import MonsterForm from '@/components/custom/monsters/monsterForm'
import {updateMonsterAction} from '@/serverFunctions/monsters'
import {proxyGetAllSpells} from '@/proxy/spells'

export default async function EditMonsterPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params
  let monster
  let spells

  try {
    ;[monster, spells] = await Promise.all([proxyGetMonsterById(id), proxyGetAllSpells()])
  } catch {
    redirect('/dashboard')
  }

  if (!monster) {
    notFound()
  }

  return (
    <MonsterForm
      submitLabel="Save Changes"
      defaultValues={{
        ...monster,
        spellIds: (monster.spells ?? []).map(s => s.id),
      }}
      spells={spells}
      action={updateMonsterAction.bind(null, monster.id)}
    />
  )
}
