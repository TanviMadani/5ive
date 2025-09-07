import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbs = [];
    
    // Always start with home
    breadcrumbs.push({
      name: 'Home',
      path: '/',
      icon: <Home className="w-4 h-4" />
    });
    
    // Build breadcrumb trail
    let currentPath = '';
    pathnames.forEach((name, index) => {
      currentPath += `/${name}`;
      
      // Skip dashboard as it's redundant
      if (name === 'dashboard') return;
      
      // Format the name for display
      const displayName = name.charAt(0).toUpperCase() + name.slice(1);
      
      breadcrumbs.push({
        name: displayName,
        path: currentPath,
        isLast: index === pathnames.length - 1
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
              
              {breadcrumb.isLast ? (
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {breadcrumb.icon && <span className="inline-block mr-1">{breadcrumb.icon}</span>}
                  {breadcrumb.name}
                </span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 flex items-center"
                >
                  {breadcrumb.icon && <span className="inline-block mr-1">{breadcrumb.icon}</span>}
                  {breadcrumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
