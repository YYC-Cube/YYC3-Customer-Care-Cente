'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface EnhancedCardProps extends React.ComponentProps<typeof Card> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: 'default' | 'glass' | 'outline' | 'elevated' | 'gradient';
}

function EnhancedCard({
  className,
  children,
  title,
  description,
  icon,
  actions,
  variant = 'default',
  ...props
}: EnhancedCardProps) {
  const variantClasses: Record<string, string> = {
    default: '',
    glass: 'bg-white/80 backdrop-blur-sm border-white/20',
    outline: 'border-2',
    elevated: 'shadow-lg',
    gradient: 'bg-gradient-to-br from-white to-slate-50',
  };

  return (
    <Card className={cn(variantClasses[variant], className)} {...props}>
      {(title || description || icon || actions) && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {icon}
              {title && <CardTitle>{title}</CardTitle>}
            </div>
            {actions}
          </div>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export { EnhancedCard, type EnhancedCardProps };
