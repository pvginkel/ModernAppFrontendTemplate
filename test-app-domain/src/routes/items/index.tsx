import { createFileRoute, Link } from '@tanstack/react-router'
import { useGetItems } from '@/lib/api/generated/hooks'
import { ListScreenLayout } from '@/components/layout/list-screen-layout'
import { Button } from '@/components/primitives/button'
import { Card, CardContent } from '@/components/primitives/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert } from '@/components/primitives/alert'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/items/')({
  component: ItemsList,
})

function ItemsList() {
  const { data: rawData, isLoading, error } = useGetItems()
  const items = (rawData as any[] | undefined) ?? []

  return (
    <ListScreenLayout
      title="Items"
      actions={
        <Link to="/items/new">
          <Button data-testid="items.create-button">
            <Plus className="mr-2 h-4 w-4" />
            New Item
          </Button>
        </Link>
      }
    >
      <div className="space-y-4 p-4" data-testid="items.list">
        {isLoading && (
          <div className="space-y-3" data-testid="items.loading">
            <Skeleton width="w-full" height="h-20" />
            <Skeleton width="w-full" height="h-20" />
            <Skeleton width="w-full" height="h-20" />
          </div>
        )}

        {error && (
          <Alert variant="error" testId="items.error">
            Failed to load items: {error.message}
          </Alert>
        )}

        {items.map((item: any) => (
          <Link key={item.id} to="/items/$itemId" params={{ itemId: String(item.id) }}>
            <Card className="hover:bg-accent/50 transition-colors" data-testid="items.item">
              <CardContent className="p-4">
                <h3 className="font-medium">{item.name}</h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}

        {!isLoading && !error && items.length === 0 && (
          <div className="text-center py-12 text-muted-foreground" data-testid="items.empty">
            No items yet. Create your first item to get started.
          </div>
        )}
      </div>
    </ListScreenLayout>
  )
}
