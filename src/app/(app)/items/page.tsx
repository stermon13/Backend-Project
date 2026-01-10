import {redirect} from 'next/navigation'
import {proxyGetAllItems} from '@/proxy/items'
import ItemsClient from '@/components/custom/items/items'

export default async function ItemsPage() {
  let items

  try {
    items = await proxyGetAllItems()
  } catch {
    redirect('/dashboard')
  }

  return <ItemsClient items={items} />
}

