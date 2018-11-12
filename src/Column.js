import React from 'react'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Task from './Task'


const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  background-color: ${props => (props.isDraggingOver ? 'skyblue': 'inherit')}
  padding: 8px;
  flex-grow: 1; // so row grows to full container height when no items present => can drop stuff on there still
  min-height: 100px;
`

export default class Column extends React.Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.column.id}
        index={this.props.index}
      >
        {(provided) => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Title {...provided.dragHandleProps}>
              {this.props.column.title}
            </Title>
            <Droppable
              droppableId={this.props.column.id}
              type="task"

              // WAY 2: control droppable columns
              //isDropDisabled={this.props.isDropDisabled}

              //
              // WAY 1: control droppable columns.
              // columns with the same type (col 1 and 2)
              // can have items moved between them. col 3 has 'done' type (which is
              // different to others), so no movement of items to it can happen.
              //type={this.props.column.id === 'column-3' ? 'done': 'active'}
            >
              { (provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef} // styled-components crap
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    )
  }
}
