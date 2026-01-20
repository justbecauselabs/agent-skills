---
summary: "Client-side form validation pattern using HeroUI Native."
read_when:
  - "Validating forms and showing errors"
  - "Displaying validation messages"
---

# Pattern: Form Validation

Use local state to track validation errors and display them with `Description` or `FormField.Description`. Keep error messages close to the related field.

## Basic Validation Flow

```tsx
const [email, setEmail] = useState('');
const [errors, setErrors] = useState<{ email?: string }>({});

function onSubmit() {
  const next: typeof errors = {};
  if (!email.includes('@')) {
    next.email = 'Enter a valid email address.';
  }
  setErrors(next);
  if (Object.keys(next).length === 0) {
    // submit
  }
}
```

## Rendering Errors

```tsx
<FormField>
  <FormField.Label>Email</FormField.Label>
  <TextField value={email} onChangeText={setEmail} />
  {errors.email ? (
    <FormField.Description>
      <Description color="danger" variant="subtle">
        {errors.email}
      </Description>
    </FormField.Description>
  ) : null}
</FormField>

<Button onPress={onSubmit}>Submit</Button>
```

## Tips

- Validate on submit and optionally on blur for better UX.
- Keep messages short and action-oriented.
- Use a consistent error style across fields.
