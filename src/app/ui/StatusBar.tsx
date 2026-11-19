import React from 'react';

export interface StatusBarField {
  id: string;
  content: React.ReactNode;
  /** Fixed width in px. Fields without a width share the remaining space. */
  width?: number;
}

interface StatusBarProps {
  fields: StatusBarField[];
}

const StatusBar: React.FC<StatusBarProps> = ({ fields }) => (
  <div className="flex gap-0.5 mt-0.5 text-black text-xs select-none">
    {fields.map((field) => (
      <div
        key={field.id}
        className={`flex items-center gap-1 px-1 h-5 truncate border border-t-win98-dark-gray border-l-win98-dark-gray border-b-white border-r-white
          ${field.width ? 'shrink-0' : 'flex-1'}`}
        style={field.width ? { width: field.width } : undefined}
      >
        {field.content}
      </div>
    ))}
  </div>
);

export default StatusBar;
