---
paths: src/components/**/*.tsx, src/app/**/*.tsx
---

# UI Component Rules

## Icon Imports
ALWAYS use react-icons/pi. NEVER use lucide-react.
```tsx
import { PiArrowRight, PiSpinner, PiCheck } from 'react-icons/pi'
```

Common icon mappings:
- Close/X → PiX
- Check → PiCheck  
- Arrow → PiArrowRight, PiArrowLeft
- Loading → PiSpinner (animate-spin)
- User → PiUser, PiUsers
- Settings → PiGear
- Plus → PiPlus
- Trash → PiTrash
- Edit → PiPencil
- Search → PiMagnifyingGlass
- Warning → PiWarning
- Info → PiInfo
- Code → PiCode
- GitHub → PiGithubLogo
- Sprint/Sprint → PiCalendar
- Standup → PiMicrophone
- AI/Magic → PiSparkle
- Send → PiPaperPlaneRight

## Framer Motion Patterns
Always import at top of file:
```tsx
import { motion, AnimatePresence } from 'framer-motion'
```

### Card hover (use on ALL clickable cards):
```tsx
<motion.div
  whileHover={{ y: -2, transition: { duration: 0.2 } }}
  className="..."
>
```

### Staggered list (use for any list of items):
```tsx
const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => <motion.li key={i.id} variants={item}>...</motion.li>)}
</motion.ul>
```

### Page entry (use on main page containers):
```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
```

### Modal/Dialog entry:
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.15 }}
>
```

## ShadCN Color Overrides
When using ANY ShadCN component, replace colors:
- `bg-primary` → `bg-primary-solid`
- `text-primary-foreground` → `text-primary-on-primary`
- `text-muted-foreground` → `text-canvas-text`
- `border` (default) → `border-canvas-border/50`
- `bg-background` → `bg-canvas-base`
- `bg-card` → `bg-canvas-bg-subtle`
- `bg-secondary` → `bg-canvas-bg`
- `ring-ring` → `ring-primary-solid`
- `text-destructive` → `text-alert-text`
- `bg-destructive` → `bg-alert-solid`

## Border Rule
ALL borders must have /50 opacity:
```
border-canvas-border/50      ✅
border-primary-border/50     ✅
border-canvas-border         ❌ too strong
```

## Typography Pattern
```tsx
<h1 className="text-canvas-text-contrast font-semibold text-2xl">Title</h1>
<p className="text-canvas-text text-sm">Muted description</p>
<span className="text-primary-text text-sm font-medium">Brand accent</span>
```
