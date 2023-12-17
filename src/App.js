import { useState } from "react";
import "./app.css";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks]);
    toast.success(`${yeniTask.title} görevi başarıyla eklenmiştir...`);
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi]);
  }

  // function handleComplete(id) {
  //   console.log("tamamlama fonksiyonunu buraya yazın")
  //   const newTasks = [...tasks];
  //   newTasks.forEach(task => {
  //     if(task.id === id) {
  //       task.status = "yapıldı"
  //     } 
  //   });
  //   setTasks(newTasks);
  // }

  const updateStatus = (id, status) => {
    const newTasks = [...tasks];
    let taskRec;
    newTasks.forEach(task => {
      if(task.id === id) {
        taskRec = task;
        task.status = status;
      } 
    });
    setTasks(newTasks);

    toast.warn(`${taskRec.title} taskının durumu durumu ${taskRec.status} olarak güncellenmiştir.`)
  }


  return (
    <div className="app">
      <div className="formColumn">
        <div className="form-container">
          <h2>Yeni Task</h2>
          {/* <TaskForm kisiler={team} submitFn={handleTaskSubmit} /> */}
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div className="form-container">
          <h2>Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="column-title">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapılacak")
              .map((t) => (
                <Task key={t.id} taskObj={t} updateStatus={updateStatus} />
              ))}
          </div>
        </div>
        <div className="column">
          <h2 className="column-title">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapıldı")
              .map((t) => (
                <Task key={t.id} taskObj={t} updateStatus={updateStatus} />
              ))}
          </div>
        </div>
      </div>
      {/* ToastContainer daima ekranda kalmalı */}
      <ToastContainer/>
    </div>
  );
}

export default App;
