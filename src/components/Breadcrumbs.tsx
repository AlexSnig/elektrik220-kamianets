import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav
      aria-label="Хлібні крихти"
      className="bg-gray-50 border-b border-gray-200 py-3"
    >
      <div className="container mx-auto px-4">
        <ol
          className="flex items-center gap-2 text-sm flex-wrap"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {/* Home */}
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="flex items-center"
          >
            <Link
              to="/"
              itemProp="item"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
              aria-label="Головна сторінка"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              <span itemProp="name">Головна</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>

          {/* Dynamic breadcrumb items */}
          {items.map((item, index) => {
            const position = index + 2;
            const isLast = index === items.length - 1;

            return (
              <React.Fragment key={index}>
                <ChevronRight
                  className="w-4 h-4 text-gray-400"
                  aria-hidden="true"
                />
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className="flex items-center"
                >
                  {isLast ? (
                    <span
                      itemProp="name"
                      className="text-gray-700 font-medium"
                      aria-current="page"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      to={item.path!}
                      itemProp="item"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <span itemProp="name">{item.label}</span>
                    </Link>
                  )}
                  <meta itemProp="position" content={position.toString()} />
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
