'use client';

import { ViewButton } from './view-button';
import { EditButton } from './edit-button';
import { DeleteButton } from './delete-button';
import { ButtonGroup } from './button-group';

export interface ActionButtonsProps {
  id: number | string;
  onView?: (id: number | string) => void;
  onEdit?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  viewTooltip?: string;
  editTooltip?: string;
  deleteTooltip?: string;
  className?: string;
  spacing?: 'tight' | 'normal' | 'wide';
  align?: 'start' | 'center' | 'end';
  confirmDeleteMessage?: string;
}

export function ActionButtons({
  id,
  onView,
  onEdit,
  onDelete,
  showView = true,
  showEdit = true,
  showDelete = true,
  viewTooltip = "View",
  editTooltip = "Edit",
  deleteTooltip = "Delete",
  className,
  spacing = 'normal',
  align = 'center',
  confirmDeleteMessage
}: ActionButtonsProps) {
  return (
    <ButtonGroup className={className} spacing={spacing} align={align}>
      {showView && onView && (
        <ViewButton
          id={id}
          onView={onView}
          tooltip={viewTooltip}
        />
      )}
      
      {showEdit && onEdit && (
        <EditButton
          id={id}
          onEdit={onEdit}
          tooltip={editTooltip}
        />
      )}
      
      {showDelete && onDelete && (
        <DeleteButton
          id={id}
          onDelete={onDelete}
          tooltip={deleteTooltip}
          confirmMessage={confirmDeleteMessage}
        />
      )}
    </ButtonGroup>
  );
}
