"use client"

import { useState , useEffect} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Package } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
} from '@/components/ui/alert-dialog'
import type {ItemDto} from '@/types/item'

type Props = {
  items: ItemDto[]
}

type ItemFormData = Omit<ItemDto, 'id' | 'createdAt' | 'updatedAt'>

export default function ItemsClient({items: initialItems}: Props) {
  const [items, setItems] = useState(initialItems)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ItemDto | null>(null)
  const [formData, setFormData] = useState<ItemFormData>({
    name: '',
    category: 'equipment',
    description: '',
    value: '',
    weight: '',
    damage: '',
    range: '',
    attacks: 0,
    ammo: 0,
  })


  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleAddItem = async () => {
    const newItem = {...formData}
    console.info('Form data being sent:', newItem)

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      })
      if (response.ok) {
        const createdItem = (await response.json()) as ItemDto
        setItems([...items, createdItem])
        setIsDialogOpen(false)
        resetForm()
        console.info(`Created new item: ${createdItem.name}`)
      } else {
        console.error('Failed to create item')
      }
    } catch (error) {
      console.error('Error creating item:', error)
    }
  }

  const handleEditItem = async () => {
    if (!editingItem) return

    const updatedItem = {...editingItem, ...formData}
    console.info('Editing item:', updatedItem)

    try {
      const response = await fetch(`/api/items`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      })
      if (response.ok) {
        const updatedItemData = (await response.json()) as ItemDto
        setItems(items.map(item => (item.id === updatedItemData.id ? updatedItemData : item)))
        setEditingItem(null)
        setIsDialogOpen(false)
        resetForm()
        console.info(`Updated item: ${updatedItemData.name}`)
      } else {
        console.error('Failed to update item')
      }
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  const handleDeleteItem = async (id: string) => {
    try {
      const response = await fetch('/api/items', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
      })

      if (!response.ok) {
        throw new Error('Failed to delete item')
      }

      setItems(prev => prev.filter(item => item.id !== id))
      console.info(`Deleted item with id: ${id}`)
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'equipment',
      description: '',
      value: '',
      weight: '',
      damage: '',
      range: '',
      attacks: 0,
      ammo: 0,
    })
  }

  const openEditDialog = (item: ItemDto) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      category: item.category,
      description: item.description,
      value: item.value,
      weight: item.weight,
    })
    setIsDialogOpen(true)
  }

  const getCategoryColor = (category: ItemDto['category']) => {
    switch (category) {
      case 'weapon':
        return 'bg-destructive text-destructive-foreground'
      case 'equipment':
        return 'bg-chart-2 text-primary-foreground'
      case 'book':
        return 'bg-chart-5 text-primary-foreground'
      case 'artifact':
        return 'bg-chart-4 text-primary-foreground'
      case 'consumable':
        return 'bg-chart-3 text-primary-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const filterByCategory = (category: string) => {
    if (category === 'all') return items
    return items.filter(item => item.category === category)
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Item Library</h1>
            <p className="text-muted-foreground">Manage items, equipment, and artifacts for your campaigns</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="gap-2"
                onClick={() => {
                  setEditingItem(null)
                  resetForm()
                }}>
                <Plus className="w-4 h-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-serif">{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
                <DialogDescription>
                  {editingItem ? 'Update the item details below.' : 'Add a new item to your library.'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Item Name</Label>
                  <Input
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Flashlight, Revolver, Ancient Tome"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={value => setFormData({...formData, category: value as ItemDto['category']})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weapon">Weapon</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="book">Book</SelectItem>
                      <SelectItem value="artifact">Artifact</SelectItem>
                      <SelectItem value="consumable">Consumable</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the item's appearance, purpose, or special properties..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Value</Label>
                    <Input
                      value={formData.value}
                      onChange={e => setFormData({...formData, value: e.target.value})}
                      placeholder="e.g., $25, Priceless"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Weight</Label>
                    <Input
                      value={formData.weight}
                      onChange={e => setFormData({...formData, weight: e.target.value})}
                      placeholder="e.g., 2 lbs, 0.5 kg"
                    />
                  </div>
                </div>

                {formData.category === 'weapon' && (
                  <>
                    <div className="space-y-2">
                      <Label>Damage (Optional)</Label>
                      <Input
                        value={formData.damage}
                        onChange={e => setFormData({...formData, damage: e.target.value})}
                        placeholder="e.g., 10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Range (Optional)</Label>
                      <Input
                        value={formData.range}
                        onChange={e => setFormData({...formData, range: e.target.value})}
                        placeholder="e.g., 30 ft"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Attacks (Optional)</Label>
                      <Input
                        type="number"
                        value={formData.attacks}
                        onChange={e => setFormData({...formData, attacks: parseInt(e.target.value)})}
                        placeholder="e.g., 3"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Ammo (Optional)</Label>
                      <Input
                        type="number"
                        value={formData.ammo}
                        onChange={e => setFormData({...formData, ammo: parseInt(e.target.value)})}
                        placeholder="e.g., 5"
                      />
                    </div>
                  </>
                )}
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false)
                    setEditingItem(null)
                    resetForm()
                  }}>
                  Cancel
                </Button>
                <Button onClick={editingItem ? handleEditItem : handleAddItem}>
                  {editingItem ? 'Save Changes' : 'Add Item'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <Label className="mb-2 block">Filter by Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="weapon">Weapons</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
              <SelectItem value="book">Books</SelectItem>
              <SelectItem value="artifact">Artifacts</SelectItem>
              <SelectItem value="consumable">Consumables</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterByCategory(selectedCategory).length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No items in this category yet.</p>
            </div>
          ) : (
            filterByCategory(selectedCategory).map(item => (
              <Card key={item.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(item)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Item?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{item.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteItem(item.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <CardTitle className="font-serif text-lg">{item.name}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Value:</span> {item.value}
                    </div>
                    <div>
                      <span className="font-medium">Weight:</span> {item.weight}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}