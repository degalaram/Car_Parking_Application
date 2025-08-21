import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MapResizeHandle = ({ 
  onResize, 
  initialMapHeight = 60,
  className = '' 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [mapHeight, setMapHeight] = useState(initialMapHeight);
  const handleRef = useRef(null);
  const startY = useRef(0);
  const startHeight = useRef(initialMapHeight);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const deltaY = e?.clientY - startY?.current;
      const containerHeight = window.innerHeight - 200; // Account for headers
      const newHeight = Math.max(30, Math.min(80, startHeight?.current - (deltaY / containerHeight) * 100));
      
      setMapHeight(newHeight);
      onResize(newHeight);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      
      const touch = e?.touches?.[0];
      const deltaY = touch?.clientY - startY?.current;
      const containerHeight = window.innerHeight - 200;
      const newHeight = Math.max(30, Math.min(80, startHeight?.current - (deltaY / containerHeight) * 100));
      
      setMapHeight(newHeight);
      onResize(newHeight);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      
      document.body.style.cursor = 'ns-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, onResize]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startY.current = e?.clientY;
    startHeight.current = mapHeight;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    startY.current = e?.touches?.[0]?.clientY;
    startHeight.current = mapHeight;
  };

  return (
    <div
      ref={handleRef}
      className={`relative bg-border hover:bg-border/80 transition-colors cursor-ns-resize ${className}`}
      style={{ height: '8px' }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Visual Handle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-12 h-1 bg-muted-foreground/40 rounded-full transition-all ${
          isDragging ? 'bg-primary scale-110' : 'hover:bg-muted-foreground/60'
        }`} />
      </div>

      {/* Drag Indicator */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity">
        <div className="flex flex-col items-center gap-0.5">
          <Icon name="ChevronUp" size={12} className="text-muted-foreground" />
          <Icon name="ChevronDown" size={12} className="text-muted-foreground" />
        </div>
      </div>

      {/* Touch Target for Mobile */}
      <div className="absolute inset-x-0 -inset-y-2 md:hidden" />
    </div>
  );
};

export default MapResizeHandle;