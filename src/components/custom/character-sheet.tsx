"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface CharacterSheetProps {
  character: {
    name: string
    occupation: string
    age: number
    hp: { current: number; max: number }
    sanity: { current: number; max: number }
    mp: { current: number; max: number }
  }
}

export function CharacterSheet({ character }: CharacterSheetProps) {
  return (
    <Tabs defaultValue="stats" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="stats">Stats</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="combat">Combat</TabsTrigger>
        <TabsTrigger value="background">Background</TabsTrigger>
      </TabsList>

      <TabsContent value="stats" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Characteristics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">STR (Strength)</Label>
                  <Input type="number" defaultValue="65" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">CON (Constitution)</Label>
                  <Input type="number" defaultValue="70" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">DEX (Dexterity)</Label>
                  <Input type="number" defaultValue="60" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">INT (Intelligence)</Label>
                  <Input type="number" defaultValue="75" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">POW (Power)</Label>
                  <Input type="number" defaultValue="65" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">APP (Appearance)</Label>
                  <Input type="number" defaultValue="55" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">SIZ (Size)</Label>
                  <Input type="number" defaultValue="60" className="h-8" />
                </div>
                <div>
                  <Label className="text-xs">EDU (Education)</Label>
                  <Input type="number" defaultValue="80" className="h-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Vital Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Current HP</Label>
                    <Input type="number" value={character.hp.current} className="h-8" />
                  </div>
                  <div>
                    <Label className="text-xs">Max HP</Label>
                    <Input type="number" value={character.hp.max} className="h-8" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Current Sanity</Label>
                    <Input type="number" value={character.sanity.current} className="h-8" />
                  </div>
                  <div>
                    <Label className="text-xs">Max Sanity</Label>
                    <Input type="number" value={character.sanity.max} className="h-8" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Current MP</Label>
                    <Input type="number" value={character.mp.current} className="h-8" />
                  </div>
                  <div>
                    <Label className="text-xs">Max MP</Label>
                    <Input type="number" value={character.mp.max} className="h-8" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Luck</Label>
                  <Input type="number" defaultValue="50" className="h-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="skills" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Investigation Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Accounting", "Anthropology", "Archaeology", "History", "Library Use", "Occult", "Psychology"].map(
                (skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <Label className="text-xs flex-1">{skill}</Label>
                    <Input type="number" defaultValue="45" className="h-8 w-20" />
                  </div>
                ),
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Physical Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Climb", "Dodge", "Jump", "Stealth", "Swim", "Throw", "Track"].map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <Label className="text-xs flex-1">{skill}</Label>
                  <Input type="number" defaultValue="40" className="h-8 w-20" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="combat" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Weapons & Combat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground">
                <div>Weapon</div>
                <div>Skill</div>
                <div>Damage</div>
                <div>Range</div>
              </div>
              {[
                { name: ".38 Revolver", skill: "45", damage: "1D10", range: "15 yds" },
                { name: "Fist/Punch", skill: "50", damage: "1D3", range: "Touch" },
                { name: "Knife", skill: "25", damage: "1D4", range: "Touch" },
              ].map((weapon, i) => (
                <div key={i} className="grid grid-cols-4 gap-2">
                  <Input defaultValue={weapon.name} className="h-8" />
                  <Input defaultValue={weapon.skill} className="h-8" />
                  <Input defaultValue={weapon.damage} className="h-8" />
                  <Input defaultValue={weapon.range} className="h-8" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Damage Bonus</CardTitle>
            </CardHeader>
            <CardContent>
              <Input defaultValue="+1D4" className="h-8" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Build</CardTitle>
            </CardHeader>
            <CardContent>
              <Input defaultValue="1" className="h-8" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Move Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <Input defaultValue="8" className="h-8" />
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="background" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Birthplace</Label>
                <Input defaultValue="Boston, Massachusetts" className="h-8" />
              </div>
              <div>
                <Label className="text-xs">Residence</Label>
                <Input defaultValue="Arkham, Massachusetts" className="h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Backstory</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write your character's backstory here..."
              className="min-h-32"
              defaultValue="A renowned archaeologist specializing in ancient civilizations, Dr. Blackwood has spent years uncovering artifacts that hint at knowledge humanity was never meant to possess..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ideologies & Beliefs</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="What does your character believe in?" className="min-h-24" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Significant People</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Who matters most to your character?" className="min-h-24" />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
