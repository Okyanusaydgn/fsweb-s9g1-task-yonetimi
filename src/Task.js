import React from "react";

const Task = ({ taskObj, updateStatus }) => {
  return (
    <div className="task">
      <h3>{taskObj.title}</h3>
      <p>{taskObj.description}</p>
      <div>
        {taskObj.people.map((p) => (
          <span className="pill" key={p}>
            {p}
          </span>
        ))}
      </div> 

      <button 
        onClick={() => 
          updateStatus(
            taskObj.id, 
            taskObj.status === "yapılacak" ? "yapıldı": "yapılacak"
          )
        }
      >
          {taskObj.status === "yapılacak" ? "Tamamlandı": "Yapılacaklar kısmına tekrar döndür"}
        </button>


      {/* {taskObj.status === "yapılacak" && (
        <button onClick={() => updateStatus(taskObj.id, "yapıldı")}>Tamamlandı</button>
      )}
      {taskObj.status === "yapıldı" && (
        <button onClick={() => updateStatus(taskObj.id, "yapılacak")}>
          Yapılacaklar kısmına tekrar döndür{" "}
        </button>
      )} */}
    </div>
  );
};

export default Task;
