# Custom Components

This folder contains custom reusable components built specifically for our application, separate from ShadCN UI components.

## Table Components

### 🔧 **SortableHeader**
**Path:** `@/components/custom/sortable-header`

A reusable table header component with sorting functionality.

**Features:**
- Generic TypeScript support for any data type
- Visual sort indicators (chevron up/down)
- Customizable styling
- Click handling for sorting

**Usage:**
```tsx
<SortableHeader 
  field="name" 
  sortField={sortField} 
  sortDirection={sortDirection} 
  onSort={handleSort}
>
  Name
</SortableHeader>
```

### 📄 **TablePagination**
**Path:** `@/components/custom/table-pagination`

A reusable pagination component for tables.

**Features:**
- Shows current page information
- Previous/Next navigation
- Numbered page buttons
- Automatic hiding when not needed

**Usage:**
```tsx
<TablePagination
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={totalItems}
  itemsPerPage={itemsPerPage}
  onPageChange={setCurrentPage}
/>
```

### 🔍 **SearchInput**
**Path:** `@/components/custom/search-input`

A reusable search input component with integrated search icon.

**Features:**
- Built-in search icon
- Customizable placeholder
- Change and search callbacks
- Consistent styling

**Usage:**
```tsx
<SearchInput
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="Search users..."
/>
```

## Action Button Components

### 🎯 **ActionButtons** (Composite)
**Path:** `@/components/custom/action-buttons`

A composite component that provides common table row actions (view, edit, delete) grouped together.

**Features:**
- Configurable button visibility
- Customizable tooltips
- Icon-based buttons with accessibility
- Flexible spacing and alignment options
- Built using individual button components for consistency

**Usage:**
```tsx
<ActionButtons
  id={user.id}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
  spacing="normal"
  align="center"
  confirmDeleteMessage="Are you sure you want to delete this user?"
/>
```

### 👁️ **ViewButton** (Individual)
**Path:** `@/components/custom/view-button`

Individual view button with eye icon for viewing items.

**Features:**
- Eye icon from Lucide React
- Tooltip support
- Configurable size and variant
- TypeScript support with item ID

**Usage:**
```tsx
<ViewButton
  id={item.id}
  onView={handleView}
  tooltip="View details"
  size="sm"
  variant="outline"
/>
```

### ✏️ **EditButton** (Individual)
**Path:** `@/components/custom/edit-button`

Individual edit button with edit icon for editing items.

**Features:**
- Edit icon from Lucide React
- Tooltip support
- Configurable size and variant
- TypeScript support with item ID

**Usage:**
```tsx
<EditButton
  id={item.id}
  onEdit={handleEdit}
  tooltip="Edit item"
  variant="default"
/>
```

### 🗑️ **DeleteButton** (Individual)
**Path:** `@/components/custom/delete-button`

Individual delete button with trash icon and optional confirmation.

**Features:**
- Trash2 icon from Lucide React
- Optional confirmation dialog
- Red styling for destructive actions
- Tooltip support
- Configurable size and variant

**Usage:**
```tsx
<DeleteButton
  id={item.id}
  onDelete={handleDelete}
  tooltip="Delete item"
  confirmMessage="Are you sure you want to delete this item?"
/>
```

### ⚡ **ActionButton** (Generic)
**Path:** `@/components/custom/action-button`

Generic action button that accepts any Lucide icon for maximum flexibility.

**Features:**
- Accepts any Lucide React icon
- Optional confirmation dialog
- Tooltip support
- Fully configurable styling
- Generic click handler

**Usage:**
```tsx
import { Download, Share, Archive } from 'lucide-react';

<ActionButton
  id={item.id}
  onClick={handleDownload}
  icon={Download}
  tooltip="Download file"
  variant="outline"
/>

<ActionButton
  id={item.id}
  onClick={handleArchive}
  icon={Archive}
  tooltip="Archive item"
  confirmMessage="Archive this item?"
/>
```

### � **ButtonGroup** (Layout)
**Path:** `@/components/custom/button-group`

Layout component for organizing multiple buttons with consistent spacing and alignment.

**Features:**
- Horizontal and vertical orientations
- Configurable spacing (tight, normal, wide)
- Alignment options (start, center, end)
- Responsive design support

**Usage:**
```tsx
<ButtonGroup spacing="wide" align="end" orientation="horizontal">
  <ViewButton id={item.id} onView={handleView} />
  <EditButton id={item.id} onEdit={handleEdit} />
  <ActionButton id={item.id} onClick={handleDownload} icon={Download} />
  <DeleteButton id={item.id} onDelete={handleDelete} />
</ButtonGroup>
```

## Design Patterns & Usage Examples

### Pattern 1: Standard Table Actions
Use the composite ActionButtons component for typical table scenarios:
```tsx
<ActionButtons
  id={user.id}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### Pattern 2: Custom Button Combinations
Use individual buttons with ButtonGroup for custom arrangements:
```tsx
<ButtonGroup spacing="tight">
  <ViewButton id={item.id} onView={handleView} />
  <ActionButton id={item.id} onClick={handleDownload} icon={Download} tooltip="Download" />
  <ActionButton id={item.id} onClick={handleShare} icon={Share} tooltip="Share" />
</ButtonGroup>
```

### Pattern 3: Single Action Buttons
Use individual buttons when you only need one action:
```tsx
<EditButton id={item.id} onEdit={handleEdit} variant="default" />
```

### Pattern 4: Custom Actions with Generic Button
Use ActionButton for actions not covered by standard buttons:
```tsx
<ActionButton
  id={item.id}
  onClick={handleCustomAction}
  icon={CustomIcon}
  tooltip="Custom action"
  confirmMessage="Perform this action?"
/>
```

## Import Structure

### Individual Imports
```tsx
import { SortableHeader } from '@/components/custom/sortable-header';
import { ViewButton } from '@/components/custom/view-button';
import { ActionButton } from '@/components/custom/action-button';
```

### Barrel Imports (Recommended)
```tsx
import { 
  SortableHeader, 
  ActionButtons,
  ViewButton,
  EditButton,
  DeleteButton,
  ActionButton,
  ButtonGroup,
  TablePagination, 
  SearchInput 
} from '@/components/custom';
```

## Folder Structure

```
components/
├── ui/                    # ShadCN UI Components
│   ├── button.tsx
│   ├── table.tsx
│   ├── input.tsx
│   └── ...
├── custom/                # Our Custom Components
│   ├── index.ts          # Barrel export
│   ├── sortable-header.tsx
│   ├── action-buttons.tsx      # Composite component
│   ├── view-button.tsx         # Individual components
│   ├── edit-button.tsx
│   ├── delete-button.tsx
│   ├── action-button.tsx       # Generic component
│   ├── button-group.tsx        # Layout component
│   ├── table-pagination.tsx
│   ├── search-input.tsx
│   └── README.md
└── layouts/
    └── DashboardLayout.tsx
```

## TypeScript Support

All components export their TypeScript interfaces:

```tsx
import type { 
  ActionButtonsProps,
  ViewButtonProps,
  EditButtonProps,
  DeleteButtonProps,
  ActionButtonProps,
  ButtonGroupProps 
} from '@/components/custom';
```

## Design Principles

1. **Modularity**: Individual components can be used separately or composed together
2. **Flexibility**: Generic ActionButton supports any custom action with any icon
3. **Consistency**: All buttons follow the same design patterns and prop structures
4. **Composition**: ButtonGroup enables flexible layouts and arrangements
5. **Type Safety**: Full TypeScript support with exported interfaces
6. **Accessibility**: All components include proper ARIA attributes and tooltips
7. **Reusability**: Components are designed to work across different contexts

## Best Practices

1. **Choose the right level**: Use ActionButtons for standard cases, individual buttons for specific needs
2. **Leverage composition**: Use ButtonGroup to create custom arrangements
3. **Type safety**: Import and use the exported TypeScript interfaces
4. **Confirmation for destructive actions**: Always use confirmMessage for delete operations
5. **Consistent icons**: Use Lucide React icons for consistency
6. **Tooltip accessibility**: Provide meaningful tooltips for better UX
7. **Import from barrel**: Use `@/components/custom` for cleaner imports

## Migration Guide

If you're upgrading from the old ActionButtons component:

**Before:**
```tsx
<ActionButtons
  id={item.id}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
  className="custom-spacing"
/>
```

**After (Backward Compatible):**
```tsx
<ActionButtons
  id={item.id}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
  spacing="normal"
  align="center"
  confirmDeleteMessage="Are you sure?"
/>
```

**Or New Individual Approach:**
```tsx
<ButtonGroup spacing="normal" align="center">
  <ViewButton id={item.id} onView={handleView} />
  <EditButton id={item.id} onEdit={handleEdit} />
  <DeleteButton 
    id={item.id} 
    onDelete={handleDelete} 
    confirmMessage="Are you sure?" 
  />
</ButtonGroup>
```
