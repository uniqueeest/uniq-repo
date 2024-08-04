import { ElementType, forwardRef, ReactNode } from 'react';

import {
	PolymorphicComponentProps,
	PolymorphicComponentPropsWithRef,
	PolymorphicRef,
} from './types';

export type ViewType = <C extends ElementType = ElementType>(
	props: PolymorphicComponentPropsWithRef<C, PolymorphicComponentProps<C>>,
) => ReactNode | null;

export const View: ViewType = forwardRef(function View<
	C extends ElementType = 'div',
>(
	{ children, as, ...rest }: PolymorphicComponentProps<C>,
	ref?: PolymorphicRef<C>,
) {
	const Component = as || 'div';

	return (
		<Component as={Component} ref={ref} {...rest}>
			{children}
		</Component>
	);
});
