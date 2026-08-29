import * as types from "./ActionTypes";

const initialState = {
  projects: [],
  projectDetails: null,
  searchProjects: [],
  loading: false,
  error: null,
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PROJECTS_REQUEST:
    case types.CREATE_PROJECT_REQUEST:
    case types.DELETE_PROJECT_REQUEST:
      return { ...state, loading: true, error: null };

    case types.FETCH_PROJECTS_SUCCESS:
      return { ...state, loading: false, projects: action.projects };

    case types.CREATE_PROJECT_SUCCESS:
      return { ...state, loading: false, projects: [...state.projects, action.project] };

    case types.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.filter((p) => p.id !== action.projectId),
      };

    default:
      return state;
  }
};
