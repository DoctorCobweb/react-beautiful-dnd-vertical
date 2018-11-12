const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'take out the garbage'},
    'task-2': { id: 'task-2', content: 'watch tv show'},
    'task-3': { id: 'task-3', content: 'charge phone'},
    'task-4': { id: 'task-4', content: 'cook dinner'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'todo',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'in progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'done',
      taskIds: [],
    },
  },
  // faciliatate reordering of the columns
  columnOrder: ['column-1', 'column-2'],
}

export default initialData
