---
summary: "HeroUI Native InputOTP component documentation."
read_when:
  - "Using the HeroUI Native InputOTP component"
  - "Building one-time password or code entry flows"
---

# InputOTP

InputOTP provides a multi-slot input for one-time passwords and verification codes.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the Quick Start guide.

```tsx
import { InputOTP } from 'heroui-native';
```

## Usage

### Basic Usage

```tsx
import { useState } from 'react';

const [code, setCode] = useState('');

<InputOTP
  length={6}
  value={code}
  onChange={setCode}
  onComplete={(value) => verifyCode(value)}
/>
```

### Custom Slot Rendering

```tsx
<InputOTP
  length={4}
  renderSlot={(index, char, isActive) => (
    <View
      key={index}
      className={cn(
        'h-12 w-12 items-center justify-center rounded-md border',
        isActive && 'border-accent'
      )}
    >
      <Text className="text-lg">{char}</Text>
    </View>
  )}
/>
```

## API Reference

### InputOTP

| prop          | type                        | default | description                                   |
| ------------- | --------------------------- | ------- | --------------------------------------------- |
| `length`      | `number`                    | -       | Number of slots to render                     |
| `value`       | `string`                    | -       | Controlled value for the OTP input            |
| `onChange`    | `(value: string) => void`   | -       | Called when the value changes                 |
| `onComplete`  | `(value: string) => void`   | -       | Called when all slots are filled              |
| `renderSlot`  | `(index, char, isActive) => React.ReactNode` | - | Custom renderer for a slot                    |
