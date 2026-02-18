import { createFileRoute, Link } from '@tanstack/react-router'
import { useGetItemsByItemId } from '@/lib/api/generated/hooks'
import { DetailScreenLayout } from '@/components/layout/detail-screen-layout'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert } from '@/components/primitives/alert'

export const Route = createFileRoute('/items/$itemId')({
  component: ItemDetail,
})

function ItemDetail() {
  const { itemId } = Route.useParams()
  const { data, isLoading, error } = useGetItemsByItemId({ path: { item_id: parseInt(itemId, 10) } })

  if (isLoading) {
    return (
      <div className="p-6 space-y-4" data-testid="item-detail.loading">
        <Skeleton width="w-48" height="h-8" />
        <Skeleton width="w-96" height="h-4" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="error" testId="item-detail.error">
          Failed to load item: {error.message}
        </Alert>
      </div>
    )
  }

  const item = data as any

  return (
    <DetailScreenLayout
      title={item?.name || 'Item'}
      breadcrumbs={
        <>
          <Link to="/items" className="hover:text-foreground">Items</Link>
          <span>/</span>
          <span>{item?.name || 'Loading...'}</span>
        </>
      }
    >
      <div className="p-6 space-y-4" data-testid="item-detail.content">
        {item?.description && (
          <p className="text-muted-foreground">{item.description}</p>
        )}
      </div>
    </DetailScreenLayout>
  )
}
