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
  isUserTable?: boolean;
  isAdmin?: boolean;
}

function GenericUsersTable<T extends TableItem>({
  data,
  columns,
  onDelete,
  isUserTable = false,
  isAdmin = true,
}: UsersTableProps<T>) {
  const handleDelete = (id: string) => {
    if (onDelete && window.confirm('האם אתה בטוח שברצונך למחוק פריט זה?')) {
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
            <tr key={index}>
              <td>
                <button
                  onClick={() =>
                    handleDelete(item.id || item.uid || item.investId)
                  }
                  className="delete-button"
                >
                  {isAdmin? <FaTrashAlt size={23} />:null}
      
                  {isUserTable ? <FaBell color="#39958c" size={23} /> : ''}
                </button>
              </td>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{column.render(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GenericUsersTable;
