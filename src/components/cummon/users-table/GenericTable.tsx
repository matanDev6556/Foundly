import React from 'react';
import { FaBell, FaTrashAlt } from 'react-icons/fa';
import './GenericTable.css';

interface TableItem {
  [key: string]: any;
}

interface Column<T extends TableItem> {
  header: string;
  render: (item: T) => React.ReactNode;
}

interface UsersTableProps<T extends TableItem> {
  data: T[];
  columns: Column<T>[];
  onDelete?: (id: string) => void;
  onRowClick?: (item: T) => void;
  isUserTable?: boolean;
  isAdmin?: boolean;
}

function GenericUsersTable<T extends TableItem>({
  data,
  columns,
  onDelete,
  onRowClick,
  isUserTable = false,
  isAdmin = true,
}: UsersTableProps<T>) {
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="users-table-container">
      <table>
        <thead>
          <tr>
            <th></th>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr 
              key={item.id || item.uid || index} 
              onClick={() => onRowClick && onRowClick(item)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              <td onClick={(e) => e.stopPropagation()}>
                <button className="delete-button">
                  {isAdmin && onDelete && (
                    <FaTrashAlt
                      onClick={(e) => handleDelete(e, item.id || item.uid)}
                      size={23}
                    />
                  )}
                  {isUserTable && <FaBell color="#39958c" size={23} />}
                </button>
              </td>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} data-label={column.header}>
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GenericUsersTable;