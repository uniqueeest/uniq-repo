import { type ElementType, type ReactNode, forwardRef } from 'react';
import { VariantProps } from 'class-variance-authority';

import { stackVariants } from './utils/stack-variants';
import type {
	PolymorphicComponentProps,
	PolymorphicComponentPropsWithRef,
	PolymorphicRef,
} from './types';
import { cn } from './utils/cn';

type Props<C extends ElementType> = PolymorphicComponentProps<
	C,
	{
		className?: string;
	}
> &
	Pick<VariantProps<typeof stackVariants>, 'w' | 'h'>;

type SpacingType = <C extends ElementType>(
	props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => ReactNode | null;

export const Spacing: SpacingType = forwardRef(function Spacing<
	C extends ElementType = 'div',
>(
	{ children, as, className, w, h, ...rest }: Props<C>,
	ref?: PolymorphicRef<C>,
) {
	const Component = as || 'div';

	return (
		<Component
			ref={ref}
			className={cn(stackVariants({ w, h }), className)}
			{...rest}
		>
			{children}
		</Component>
	);
});
