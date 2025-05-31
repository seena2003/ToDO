
import React from 'react';
import { TaskPriority } from '../types';
import { PRIORITY_STYLES } from '../constants';
import { PriorityLowIcon, PriorityMediumIcon, PriorityHighIcon } from './Icons';

interface PriorityBadgeProps {
  priority: TaskPriority;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const style = PRIORITY_STYLES[priority];

  const IconComponent = () => {
    switch (priority) {
      case TaskPriority.LOW: return <PriorityLowIcon className={`w-3 h-3 mr-1 ${style.iconClass}`} />;
      case TaskPriority.MEDIUM: return <PriorityMediumIcon className={`w-3 h-3 mr-1 ${style.iconClass}`} />;
      case TaskPriority.HIGH: return <PriorityHighIcon className={`w-3 h-3 mr-1 ${style.iconClass}`} />;
      default: return null;
    }
  };

  return (
    <span className={`px-2 py-0.5 inline-flex items-center text-xs font-medium rounded-full ${style.badgeClass}`}>
      <IconComponent />
      {style.name}
    </span>
  );
};

export default PriorityBadge;
