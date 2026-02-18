import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/primitives/card'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="space-y-8 p-6" data-testid="about.page">
      <div className="text-center py-12" data-testid="about.hero">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Test Application
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A minimal frontend generated from the ModernAppTemplate.
        </p>
      </div>

      <Card data-testid="about.info">
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is a test application used to validate the frontend template.
            It includes a simple Items CRUD interface backed by the backend test-app.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
