import { forwardRef, type ElementType, type ReactNode } from 'react';
import {
	PolymorphicComponentProps,
	PolymorphicComponentPropsWithRef,
	PolymorphicRef,
} from './types';
import { View } from './View';

type Props<C extends ElementType> = PolymorphicComponentProps<C> & {
	size?: string;
	variant?: string;
};

export type ButtonType = <C extends ElementType>(
	props: PolymorphicComponentPropsWithRef<C, Props<C>>,
) => ReactNode | null;

export const Button: ButtonType = forwardRef(function Button<
	C extends ElementType = 'button',
>(props: Props<C>, ref?: PolymorphicRef<C>) {
	const { children, className, as, variant, size, ...rest } = props;

	const ComponentAs = as || 'button';

	return (
		<View
			ref={ref}
			as={ComponentAs}
			className={className}
			{...(rest as PolymorphicComponentProps<C>)}
		>
			{children}
		</View>
	);
});
