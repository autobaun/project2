import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import OptionsDrawer from './components/OptionsDrawer';
import ProjectView from './components/ProjectView';
import Column from './components/Column';
import CardComponent from './components/CardComponent';
import AddColumn from './components/AddColumn';
import Timeline from './components/Timeline';
import TaskModal from './components/TaskModal';
import { AutoProvider } from './AutoContext';
import './styles/style.css';
const axios = require('axios');

function App() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    axios.get('/api/task/get/all/1').then((tasks) => {
      setTasks(tasks.data);
    });
  }, []);

  const [drawer, setDrawer] = useState({
    open: false,
    timeline: false,
    type: 'settings',
  });

  const [columns, setColumns] = useState([
    'Would Be Nice',
    'MVP',
    'In Progress',
  ]);

  const [modal, setModal] = useState({
    show: false,
    column: null,
  });

  const dummy = [
    {
      title: 'Task Title',
      id: 0,
      column: 0,
      description:
        'What is the description of this task? What is your exit criteria?',
    },
    {
      title: 'Task Title 2',
      id: 1,
      column: 0,
      description:
        'What is the description of this task? What is your strategy?',
    },
    {
      title: 'Task Title 2',
      id: 1,
      column: 1,
      description:
        'What is the description of this task? What is your strategy?',
    },
  ];

  return (
    <AutoProvider
      value={[
        drawer,
        setDrawer,
        columns,
        setColumns,
        modal,
        setModal,
        tasks,
        setTasks,
      ]}
    >
      <div style={{ height: '100vh' }}>
        {modal.show && <TaskModal />}

        <Navbar />

        <ProjectView>
          {/* if toggle is set to project view */}
          {!drawer.timeline ? (
            <>
              {/* map through columns array and render each column with the title */}
              {columns.map((item, i) => {
                return (
                  <Column title={item} key={i} id={i}>
                    {/* inside each column, map through the cards and render each one that matches the column index */}
                    {tasks !== null &&
                      tasks.map(
                        (card) =>
                          card.id_column === i && (
                            <CardComponent
                              title={card.task_title}
                              description={card.task_description}
                              key={card.id_task}
                            />
                          ),
                      )}
                  </Column>
                );
              })}
              <AddColumn columns={columns} setcolumns={setColumns} />
            </>
          ) : (
            <Timeline />
          )}
          <OptionsDrawer />
        </ProjectView>
      </div>
    </AutoProvider>
  );
}

export default App;
