import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BreadcrumbNavigation = ({ facility, className = '' }) => {
  const navigate = useNavigate();

  const breadcrumbs = [
    { label: 'Search', path: '/location-search-map' },
    { label: facility?.name, path: null, current: true }
  ];

  const handleNavigate = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav className={`bg-muted/50 border-b border-border ${className}`}>
      <div className="container-app py-3">
        <div className="flex items-center gap-2 text-sm">
          {breadcrumbs?.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              )}
              {breadcrumb?.current ? (
                <span className="text-foreground font-medium truncate">
                  {breadcrumb?.label}
                </span>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigate(breadcrumb?.path)}
                  className="text-muted-foreground hover:text-foreground p-0 h-auto font-normal"
                >
                  {breadcrumb?.label}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BreadcrumbNavigation;