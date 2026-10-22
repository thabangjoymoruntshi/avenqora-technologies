
"use client";

import { useCallback, useEffect, useState } from "react";

type Task = {
  id: string;
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED";
  reason: string;
  dueAt: string;
  createdAt: string;
  inquiry: {
    name: string;
    email: string;
    project: string;
    salesStatus: string;
  };
};

export default function CEOTaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ceo/automation/tasks", {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to load tasks.");
      }

      setTasks(data.tasks);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load tasks."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  async function updateStatus(id: string, status: Task["status"]) {
    setSavingId(id);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/ceo/automation/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to update task.");
      }

      setTasks((current) =>
        current.map((task) =>
          task.id === id ? { ...task, status: data.task.status } : task
        )
      );
      setNotice("Task status saved.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update task."
      );
    } finally {
      setSavingId("");
    }
  }

  const overdueCount = tasks.filter(
    (task) =>
      task.status !== "COMPLETED" &&
      new Date(task.dueAt).getTime() < Date.now()
  ).length;

  return (
    <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-widest text-emerald-400">
            TASK OPERATIONS
          </p>
          <h2 className="mt-2 text-xl font-semibold">
            Follow-up task management
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Review saved tasks and update their progress.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadTasks()}
          disabled={loading}
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Refresh tasks"}
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 p-4">
          <p className="text-sm text-slate-400">Total tasks</p>
          <p className="mt-2 text-2xl font-bold">{tasks.length}</p>
        </div>
        <div className="rounded-xl border border-slate-800 p-4">
          <p className="text-sm text-slate-400">Open tasks</p>
          <p className="mt-2 text-2xl font-bold">
            {tasks.filter((task) => task.status === "OPEN").length}
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 p-4">
          <p className="text-sm text-slate-400">Overdue tasks</p>
          <p className="mt-2 text-2xl font-bold">{overdueCount}</p>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      {notice && (
        <p role="status" className="mt-4 text-sm text-emerald-400">
          {notice}
        </p>
      )}

      {!loading && !error && tasks.length === 0 && (
        <p className="mt-5 text-sm text-slate-400">
          No follow-up tasks have been saved yet.
        </p>
      )}

      {tasks.length > 0 && (
        <div className="mt-5 space-y-4">
          {tasks.map((task) => {
            const overdue =
              task.status !== "COMPLETED" &&
              new Date(task.dueAt).getTime() < Date.now();

            return (
              <article
                key={task.id}
                className="rounded-xl border border-slate-800 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{task.inquiry.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {task.inquiry.email}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Project: {task.inquiry.project}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      overdue
                        ? "bg-red-950 text-red-300"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {overdue ? "Overdue" : task.status.replace("_", " ")}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-300">{task.reason}</p>
                <p className="mt-2 text-xs text-slate-500">
                  Due:{" "}
                  {new Date(task.dueAt).toLocaleString("en-ZA", {
                    timeZone: "Africa/Johannesburg",
                  })}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <label
                    htmlFor={`task-status-${task.id}`}
                    className="text-sm text-slate-400"
                  >
                    Status
                  </label>

                  <select
                    id={`task-status-${task.id}`}
                    value={task.status}
                    disabled={savingId === task.id}
                    onChange={(event) =>
                      void updateStatus(
                        task.id,
                        event.target.value as Task["status"]
                      )
                    }
                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm disabled:opacity-50"
                  >
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>

                  {savingId === task.id && (
                    <span className="text-xs text-slate-400">
                      Saving...
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
