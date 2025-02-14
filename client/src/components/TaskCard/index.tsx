import React from "react";
import { format } from "date-fns";
import { Task } from "@/state/api";
import Image from "next/image";

type TaskProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskProps) => {
  const taskDetails = [
    { label: "ID", value: task.id },
    { label: "Title", value: task.title },
    {
      label: "Description",
      value: task.description || "No description provided",
    },
    { label: "Status", value: task.status },
    { label: "Priority", value: task.priority },
    { label: "Tags", value: task.tags || "No tags" },
    {
      label: "Start Date",
      value: task.startDate ? format(new Date(task.startDate), "P") : "Not set",
    },
    {
      label: "Due Date",
      value: task.dueDate ? format(new Date(task.dueDate), "P") : "Not set",
    },
    {
      label: "Author",
      value: task.author ? task.author.username : "Unknown",
    },
    {
      label: "Assignee",
      value: task.assignee ? task.assignee.username : "Unknown",
    },
    {
      label: "Tags",
      value: task.tags || "No tags",
    },
  ];

  return (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>Attachements</strong>
          <div className="flex flex-wrap">
            {task.attachments && task.attachments.length > 0 && (
              <Image
                src={`/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName}
                width={400}
                height={200}
                className="rounded-md"
              />
            )}
          </div>
        </div>
      )}
      {taskDetails.map((detail, index) => (
        <p key={index}>
          <strong>{detail.label}:</strong> {detail.value}
        </p>
      ))}
    </div>
  );
};

export default TaskCard;
