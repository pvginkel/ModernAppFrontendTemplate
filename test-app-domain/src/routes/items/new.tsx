import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { usePostItems } from '@/lib/api/generated/hooks'
import { FormScreenLayout } from '@/components/layout/form-screen-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useFormState } from '@/hooks/use-form-state'

export const Route = createFileRoute('/items/new')({
  component: NewItem,
})

function NewItem() {
  const navigate = useNavigate()
  const { showSuccess, showError } = useToast()
  const createItem = usePostItems()

  const form = useFormState({
    initialValues: { name: '', description: '' },
    validationRules: {
      name: (value: string) => value.trim() ? undefined : 'Name is required',
    },
    onSubmit: async (values) => {
      try {
        await (createItem as any).mutateAsync({ body: values })
        showSuccess('Item created')
        navigate({ to: '/items' })
      } catch (err) {
        showError('Failed to create item')
        throw err
      }
    },
  })

  return (
    <FormScreenLayout
      title="New Item"
      breadcrumbs={
        <>
          <Link to="/items" className="hover:text-foreground">Items</Link>
          <span>/</span>
          <span>New</span>
        </>
      }
      footer={
        <div className="flex gap-2">
          <Button
            type="submit"
            form="item-form"
            disabled={form.isSubmitting}
            data-testid="items.create.submit"
          >
            Create
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate({ to: '/items' })}
            data-testid="items.create.cancel"
          >
            Cancel
          </Button>
        </div>
      }
    >
      <form id="item-form" onSubmit={form.handleSubmit} className="space-y-4 p-6" data-testid="items.create.form">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...form.getFieldProps('name')}
            data-testid="items.create.name"
          />
          {form.touched.name && form.errors.name && (
            <p className="text-sm text-destructive">{form.errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            {...form.getFieldProps('description')}
            data-testid="items.create.description"
          />
        </div>
      </form>
    </FormScreenLayout>
  )
}
