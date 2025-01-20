import { writable, get } from 'svelte/store';
import { createEventDispatcher } from 'svelte';

export function createTableStore(initialData, keyField) {
  const dispatcher = createEventDispatcher();

  // Writable stores for table state
  const sortedData = writable([...initialData]);
  const selectedRows = writable(new Set());
  const selectAll = writable(false);
  const expandedRows = writable(new Set());
  let draggedRowIndex = null;

  // Sorting and filtering utilities
  const sortData = (key) => {
    sortedData.update((current) => 
      [...current].sort((a, b) => (a[key] > b[key] ? 1 : -1))
    );
  };

  const filterData = (query) => {
    sortedData.set(
      initialData.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  };

  // Row selection management
  const toggleRowSelection = (rowKey) => {
    selectedRows.update((current) => {
      const updated = new Set(current);
      const selectedRow = initialData.find((row) => row[keyField] === rowKey);

      if (updated.has(rowKey)) {
        updated.delete(rowKey);
      } else {
        updated.add(rowKey);
      }

      const selectedData = initialData.filter((row) => updated.has(row[keyField]));
      dispatcher('rowsSelect', selectedData);

      selectAll.set(updated.size === initialData.length);
      return updated;
    });
  };

  const toggleSelectAll = () => {
    selectAll.update((value) => {
      const newValue = !value;
      const updated = newValue
        ? new Set(initialData.map((row) => row[keyField]))
        : new Set();

      selectedRows.set(updated);
      const selectedData = newValue ? initialData : [];
      dispatcher('rowsSelect', selectedData);

      return newValue;
    });
  };

  const toggleRowSelectionRadio = (rowKey) => {
    selectedRows.update(() => {
      const updated = new Set();
      const selectedRow = initialData.find((row) => row[keyField] === rowKey);

      if (selectedRow) {
        updated.add(rowKey);
      }

      const selectedData = initialData.filter((row) => updated.has(row[keyField]));
      dispatcher('rowsSelect', selectedData);

      selectAll.set(false);
      return updated;
    });
  };

  // Row expansion management
  const toggleRowExpansion = (rowKey) => {
    expandedRows.update((current) => {
      const updated = new Set(current);
      if (updated.has(rowKey)) {
        updated.delete(rowKey);
      } else {
        updated.add(rowKey);
      }
      return updated;
    });
  };

  // Drag and drop functionality
  const handleDragStart = (index) => {
    draggedRowIndex = index;
  };

  const handleDrop = (index) => {
    if (draggedRowIndex !== null && draggedRowIndex !== index) {
      sortedData.update((rows) => {
        const updatedRows = [...rows];
        const [movedRow] = updatedRows.splice(draggedRowIndex, 1);
        updatedRows.splice(index, 0, movedRow);
        return updatedRows;
      });
      dispatcher('rowsReordered', get(sortedData));
    }
    draggedRowIndex = null;
  };

  // Expose store and helper methods
  return {
    sortedData,
    selectedRows,
    selectAll,
    expandedRows,
    sortData,
    filterData,
    toggleRowSelection,
    toggleSelectAll,
    toggleRowSelectionRadio,
    toggleRowExpansion,
    handleDragStart,
    handleDrop,
  };
}
