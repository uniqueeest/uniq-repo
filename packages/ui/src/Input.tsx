import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
} from 'react';
import { cva } from 'class-variance-authority';

import { View } from './View';
import { cn } from './utils/cn';

const inputVariant = cva('w-full focus:outline-none border border-gray-200 ');

export const Input = forwardRef<
  ElementRef<'input'>,
  ComponentPropsWithoutRef<'input'> & {
    leftSlot?: ReactNode;
    rightSlot?: ReactNode;
  }
>(function Input(props, ref) {
  const { className, leftSlot, rightSlot, ...rest } = props;
  const leftCss = leftSlot ? 'pl-36' : '';
  const rightCss = rightSlot ? 'pr-36' : '';

  return (
    <View className="relative">
      <View className="absolute top-[50%] translate-y-[-50%] translate-x-[12px] flex justify-center items-center overflow-clip">
        {leftSlot}
      </View>
      <input
        ref={ref}
        type="text"
        className={cn(inputVariant(), leftCss, rightCss, className)}
        {...rest}
      />
      <View className="absolute top-[50%] translate-y-[-50%] translate-x-[-12px] right-0  justify-center items-center overflow-clip">
        {rightSlot}
      </View>
    </View>
  );
});
