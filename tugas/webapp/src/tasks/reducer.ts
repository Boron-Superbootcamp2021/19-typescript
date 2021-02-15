import { SERVICE_BASEURL } from './config';

// setup state
interface Task{
  id:number;
  job:string;
  assignee:any;
  attachment:string;
  done:boolean;
}
interface State{
  loading:boolean;
  error:any;
  workers:[];
  tasks:Task[];
}
interface ActionObject{
  type:string;
}
interface ActionObjectError extends ActionObject{
  payload:any;
}
interface ActionObjectAdd extends ActionObject{
  payload:Task
}
interface ActionObjectDone extends ActionObject{
  payload:number;
}
type ActionObjectCancel = ActionObjectDone;
const initialState:State = {
  loading: false,
  error: null,
  workers: [],
  tasks: [],
};

function loading(state:State) {
  state.loading = true;
  state.error = null;
}

function error(state:State, action:ActionObjectError) {
  state.loading = false;
  state.error = action.payload;
}

function clearError(state:State) {
  state.error = null;
}

function added(state:State, action:ActionObjectAdd):State {
  const task = action.payload;
  state.tasks.push({
    id: task.id,
    job: task.job,
    assignee: task?.assignee?.name,
    attachment: `${SERVICE_BASEURL}/attachment/${task.attachment}`,
    done: false,
  });
  state.loading = false;
  state.error = null;
  return state;
}

function done(state:State, action:ActionObjectDone):State {
  const idx = state.tasks.findIndex((t) => t.id === action.payload);
  state.tasks[idx].done = true;
  state.loading = false;
  state.error = null;
  return state;
}

function canceled(state:State, action:ActionObjectCancel):State {
  const idx = state.tasks.findIndex((t) => t.id === action.payload);
  state.tasks.splice(idx, 1);
  state.loading = false;
  state.error = null;
  return state;
}

function tasksLoaded(state, action) {
  state.tasks = action.payload
    .filter((t) => !t.cancelled)
    .map((task) => ({
      id: task.id,
      job: task.job,
      assignee: task.assignee.name,
      attachment: `${SERVICE_BASEURL}/attachment/${task.attachment}`,
      done: task.done,
    }));
  state.loading = false;
  state.error = null;
  return state;
}

function workersLoaded(state, action) {
  state.workers = action.payload.map((worker) => ({
    id: worker.id,
    name: worker.name,
  }));
  state.loading = false;
  state.error = null;
  return state;
}

module.exports = {
  initialState,
  added,
  done,
  canceled,
  tasksLoaded,
  workersLoaded,
  error,
  loading,
  clearError,
};
