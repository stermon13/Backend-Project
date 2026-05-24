"use client"

import {useMemo, useState} from 'react'
import {Package, Plus, Edit, Trash2} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Textarea} from '@/components/ui/textarea'
import {Badge} from '@/components/ui/badge'
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
import {serializeFormData} from '@/lib/serializeFormData'
import type {FormAction} from '@/models/serverFunctions'
import {useRouter} from 'next/navigation'

type Props = {
  items: ItemDto[]
  createAction: FormAction<void>
  updateAction: FormAction<void>
  deleteAction: FormAction<void>
}

type ItemFormData = Omit<ItemDto, 'id' | 'createdAt' | 'updatedAt'>

const emptyFormData: ItemFormData = {
  name: '',
  category: 'equipment',
  description: '',
  value: '',
  weight: '',
  damage: '',
  range: '',
  attacks: 0,
  ammo: 0,
}

export default function ItemsClient({items, createAction, updateAction, deleteAction}: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ItemDto | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [formData, setFormData] = useState<ItemFormData>(emptyFormData)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  const visibleItems = useMemo(() => {
    if (selectedCategory === 'all') return items
    return items.filter(item => item.category === selectedCategory)
  }, [items, selectedCategory])

  const resetForm = () => {
    setFormData(emptyFormData)
  }

  const openAddDialog = () => {
    setEditingItem(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (item: ItemDto) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      category: item.category,
      description: item.description,
      value: item.value,
      weight: item.weight,
      damage: item.damage ?? '',
      range: item.range ?? '',
      attacks: item.attacks ?? 0,
      ammo: item.ammo ?? 0,
    })
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    const payload = editingItem ? {...formData, id: editingItem.id} : formData
    const action = editingItem ? updateAction : createAction

    try {
      setErrorMessage(null)
      const result = await action({success: true}, serializeFormData(payload))

      if (!result.success) {
        setErrorMessage(result.errors?.errors?.[0] ?? 'Unable to save item.')
        return
      }

      setIsDialogOpen(false)
      setEditingItem(null)
      resetForm()
      router.refresh()
    } catch (error) {
      console.error('Error saving item:', error)
      setErrorMessage('Error saving item. Please try again.')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setErrorMessage(null)
      const result = await deleteAction({success: true}, serializeFormData({id}))

      if (!result.success) {
        setErrorMessage(result.errors?.errors?.[0] ?? 'Unable to delete item.')
        return
      }

      router.refresh()
    } catch (error) {
      console.error('Error deleting item:', error)
      setErrorMessage('Error deleting item. Please try again.')
    }
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
              <Button className="gap-2" onClick={openAddDialog}>
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
                  <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={value => setFormData({...formData, category: value as ItemDto['category']})}>
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
                  <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Value</Label>
                    <Input value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Weight</Label>
                    <Input value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
                  </div>
                </div>

                {formData.category === 'weapon' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Damage</Label>
                      <Input value={formData.damage} onChange={e => setFormData({...formData, damage: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Range</Label>
                      <Input value={formData.range} onChange={e => setFormData({...formData, range: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Attacks</Label>
                      <Input type="number" value={formData.attacks} onChange={e => setFormData({...formData, attacks: Number(e.target.value)})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Ammo</Label>
                      <Input type="number" value={formData.ammo} onChange={e => setFormData({...formData, ammo: Number(e.target.value)})} />
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleSave}>
                  {editingItem ? 'Save Changes' : 'Add Item'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {errorMessage && (
          <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {errorMessage}
          </div>
        )}

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
          {visibleItems.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No items in this category yet.</p>
            </div>
          ) : (
            visibleItems.map(item => (
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
                            <AlertDialogAction onClick={() => handleDelete(item.id)}>Delete</AlertDialogAction>
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
                    <div><span className="font-medium">Value:</span> {item.value}</div>
                    <div><span className="font-medium">Weight:</span> {item.weight}</div>
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