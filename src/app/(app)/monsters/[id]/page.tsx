"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function MonsterDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Mock data for UI display only
  const monster = {
    id: params.id,
    name: "Deep One",
    category: "mythos",
    str: "130",
    con: "70",
    siz: "140",
    dex: "50",
    int: "50",
    pow: "50",
    hp: "21",
    mp: "10",
    moveRate: "8 / 10 swimming",
    damageBonus: "+1D6",
    build: "2",
    armor: "2-point scales and hide",
    attacks: "1 (claw or weapon)",
    skills: "Fighting 60%, Swim 80%, Stealth 40%",
    sanityLoss: "0/1D6",
    spells: "None typically, but some may know Deep One Rituals",
    description:
      "Amphibious humanoids that serve the Great Old Ones, particularly Cthulhu and Dagon. They possess fish-like features including scales, webbed hands and feet, bulging eyes, and gills. Despite their monstrous appearance, they retain a disturbing intelligence and often interbreed with coastal human populations.",
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "mythos":
        return "bg-destructive text-destructive-foreground"
      case "major":
        return "bg-chart-4 text-primary-foreground"
      case "minor":
        return "bg-chart-2 text-primary-foreground"
      case "humanoid":
        return "bg-chart-3 text-primary-foreground"
      case "undead":
        return "bg-chart-5 text-primary-foreground"
      case "beast":
        return "bg-chart-1 text-primary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const handleDelete = () => {
    // UI only - backend will handle actual deletion
    router.push("/monsters")
  }

  return (
    <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6">
          <Link href="/monsters">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Monsters
            </Button>
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-serif font-bold text-foreground">{monster.name}</h1>
                <Badge className={getCategoryColor(monster.category)}>{monster.category}</Badge>
              </div>
              <p className="text-muted-foreground">{monster.description}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/monsters/${monster.id}/edit`}>
                <Button variant="outline" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon" className="text-destructive bg-transparent">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Monster?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{monster.name}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Characteristics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">STR (Strength)</div>
                  <div className="text-2xl font-semibold">{monster.str}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">CON (Constitution)</div>
                  <div className="text-2xl font-semibold">{monster.con}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">SIZ (Size)</div>
                  <div className="text-2xl font-semibold">{monster.siz}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">DEX (Dexterity)</div>
                  <div className="text-2xl font-semibold">{monster.dex}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">INT (Intelligence)</div>
                  <div className="text-2xl font-semibold">{monster.int}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">POW (Power)</div>
                  <div className="text-2xl font-semibold">{monster.pow}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Combat Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Hit Points</div>
                  <div className="text-xl font-semibold">{monster.hp}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Magic Points</div>
                  <div className="text-xl font-semibold">{monster.mp}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Move Rate</div>
                  <div className="text-xl font-semibold">{monster.moveRate}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Damage Bonus</div>
                  <div className="text-xl font-semibold">{monster.damageBonus}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Build</div>
                  <div className="text-xl font-semibold">{monster.build}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Armor</div>
                  <div className="text-xl font-semibold">{monster.armor}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Attacks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{monster.attacks}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Sanity Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground text-xl font-semibold">{monster.sanityLoss}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{monster.skills}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Spells & Powers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{monster.spells}</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
