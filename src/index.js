import React from 'react'
import ReactDOM from 'react-dom'
import '@atlaskit/css-reset'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import initialData from './initial-data'
import Column from './Column'

const Container = styled.div`
  display: flex;
`

class App extends React.Component {
  state = initialData

  onDragStart = start => {
    // you can update styles even from these callbacks. using snapshot vals is better tho
    // document.body.style.color = 'orange'


    const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId)

    this.setState({
      homeIndex
    })

  }


  onDragUpdate = update => {
    // you can update styles even from these callbacks. using snapshot vals is better tho
    // const { destination } = update
    // const opacity = destination
    //   ? destination.index / Object.keys(this.state.tasks).length
    //   : 0
    //   document.body.style.backgroundColor = `rgba(153,141,217, ${opacity})`

  }

  onDragEnd = result => {

    this.setState({
      homeIndex: null
    })



    // document.body.style.color = 'inherit'
    // typical result obj
    // const result = {
    //   draggableId: 'task-1',
    //   type: 'TYPE',
    //   reason: 'DROP',
    //   source: {
    //     droppableId: 'column-1',
    //     index:0,
    //   },
    //   destination: {
    //     droppableId: 'column-1',
    //     index: 1,
    //   }
    // }
    const { destination, source, draggableId, type } = result

    if (!destination) {
      // sometimes destination is null. ie when dragged outside
      // a droppable area
      // => do nothing
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      // dragged to the same place
      // => do nothing
      return
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)
      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      }
      this.setState(newState)
      return
    }


    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      // remove 1 item from source.index
      newTaskIds.splice(source.index, 1)

      // at destination.index, dont remove anything, insert draggableId there
      newTaskIds.splice(destination.index, 0, draggableId)

      // now create a new columns
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn, // the [] is a computed property name ES6
        },
      }

      this.setState(newState)
      return
    }

    // moving from one list to another
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index,1)
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index,0,draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    }
    this.setState(newState)
  }

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Droppable
          droppableId="all-columns"
          direction="horizontal" type="column"
        >
        {(provided) => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {this.state.columnOrder.map((columnId, index) => {
              const column = this.state.columns[columnId]
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

              // => cannot drag an item backwards
              const isDropDisabled = index < this.state.homeIndex
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  isDropDisabled={isDropDisabled}
                  index={index}
                />
              )
            })}
            {provided.placeholder}
          </Container>
        )}
        </Droppable>
      </DragDropContext>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'));





// typical example data supplied to onDragStart and onDrageUpate and onDrageEnd:
//
// // onDragStart
// const start = {
//   draggableId: 'task-1',
//   type: 'TYPE',
//   source: {
//     droppableId: 'column-1',
//     index: 0,
//   },
// }
//
// // onDragUpdate
// const update = {
//   ...start,
//
//   // destination may be null if not over a droppable
//   destination: {
//     droppableId: 'column-1',
//     index: 1, //current location of the draggable in the system
//   },
// }
//
// // onDragEnd
// const result = {
//   ...update,
//   reason: 'DROP',
// }
