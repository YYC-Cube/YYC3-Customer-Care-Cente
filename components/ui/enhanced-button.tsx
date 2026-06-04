'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface EnhancedButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
  icon?: React.ReactNode | React.ElementType;
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, children, loading, icon, disabled, ...props }, ref) => {
    const IconEl = typeof icon === 'function' ? icon : null;
    return (
      <Button
        className={cn(className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : IconEl ? (
          <span className="mr-2">
            <IconEl className="h-4 w-4" />
          </span>
        ) : icon ? (
          <span className="mr-2">{icon as React.ReactNode}</span>
        ) : null}
        {children}
      </Button>
    );
  }
);
EnhancedButton.displayName = 'EnhancedButton';

export { EnhancedButton, type EnhancedButtonProps };
