
export const saveTOLocalStorage = (updatedTasks) => {
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}