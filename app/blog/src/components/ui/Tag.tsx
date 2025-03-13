import { cn } from '@uniqueeest/utils';

interface TagProps {
  tag: string;
  color?: 'red' | 'green' | 'blue' | 'yellow' | 'gray';
  className?: string;
}

const COLORS = {
  red: 'bg-red-7',
  green: 'bg-green-7',
  blue: ' bg-blue-7',
  yellow: 'bg-yellow-7',
  gray: 'bg-gray-7',
};

export const Tag = ({ tag, color = 'blue', className }: TagProps) => {
  return (
    <div
      className={cn(
        'py-1 px-2 w-fit h-fit',
        'text-xs lg:text-sm text-white rounded-[4px]',
        color && COLORS[color],
        className,
      )}
    >
      {tag}
    </div>
  );
};
