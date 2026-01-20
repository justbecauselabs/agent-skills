---
summary: "Dashboard layout pattern using HeroUI Native components."
read_when:
  - "Building a dashboard screen"
  - "Combining cards, tabs, and loading states"
---

# Pattern: Dashboard

Dashboards typically combine summary cards, filters, and data sections. Use `Card`, `Tabs`, and `Skeleton` to structure the screen and handle loading states.

## Summary Section

```tsx
<View className="gap-3">
  <Card>
    <Card.Header>Revenue</Card.Header>
    <Card.Body>$24,900</Card.Body>
  </Card>
  <Card>
    <Card.Header>Active Users</Card.Header>
    <Card.Body>1,240</Card.Body>
  </Card>
</View>
```

## Filters with Tabs

```tsx
<Tabs defaultValue="week">
  <Tabs.List>
    <Tabs.Trigger value="week">Week</Tabs.Trigger>
    <Tabs.Trigger value="month">Month</Tabs.Trigger>
    <Tabs.Trigger value="year">Year</Tabs.Trigger>
  </Tabs.List>
</Tabs>
```

## Loading State

```tsx
<SkeletonGroup>
  <Skeleton className="h-16" />
  <Skeleton className="h-32" />
</SkeletonGroup>
```

## Tips

- Use consistent spacing and alignment for visual rhythm.
- Start with skeletons to reduce perceived load time.
- Group related metrics inside `Card` blocks.
