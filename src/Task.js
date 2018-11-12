import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  background-color: ${props =>
    props.isDragDisabled
      ? 'lightgrey'
      : props.isDragging
        ? 'lightgreen'
        : 'white'};
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;

  display: flex;

`

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`

export default class Task extends React.Component {
  render() {
    const isDragDisabled = this.props.task.id === 'task-1'
    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef} // styled-components crap
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
          >
            <Handle
              // used to control the dragging of the whole draggable.
              // to delegate a component as the drag handle, put the following
              // props into it:
              {...provided.dragHandleProps}
            />
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    )
  }
}

// example draggable snapshot obj
// const draggableSnapshot = {
//   isDragging: true,
//   draggingOver: 'column-1',
// }

// and droppable snapshot obj
// const droppableSnapshot = {
//   isDraggingOver: true,
//   draggingOverWith: 'task-1',
// }
