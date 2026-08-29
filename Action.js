import axios from "axios";
import api, { API_BASE_URL } from "../config/api";

// ==========================================
// 1. AUTHENTICATION ACTIONS
// ==========================================
export const register = (userData) => async (dispatch) => {
  dispatch({ type: "REGISTER_REQUEST" });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: "REGISTER_SUCCESS", payload: data });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: "REGISTER_FAILURE", payload: error.message });
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOGIN_FAILURE", payload: error.message });
  }
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: "GET_USER_REQUEST" });
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "GET_USER_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_USER_FAILURE", payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.clear();
  dispatch({ type: "LOGOUT" });
};

// ==========================================
// 2. PROJECT ACTIONS
// ==========================================
export const fetchProjects = ({ category, tag }) => async (dispatch) => {
  dispatch({ type: "FETCH_PROJECTS_REQUEST" });
  try {
    const { data } = await api.get("/api/projects", {
      params: { category, tag },
    });
    dispatch({ type: "FETCH_PROJECTS_SUCCESS", projects: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "FETCH_PROJECTS_FAILURE", error: error.message });
  }
};

export const searchProjects = (keyword) => async (dispatch) => {
  dispatch({ type: "SEARCH_PROJECT_REQUEST" });
  try {
    const { data } = await api.get(`/api/projects/search?keyword=${keyword}`);
    dispatch({ type: "SEARCH_PROJECT_SUCCESS", projects: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "SEARCH_PROJECT_FAILURE", error: error.message });
  }
};

export const createProject = (projectData) => async (dispatch) => {
  dispatch({ type: "CREATE_PROJECT_REQUEST" });
  try {
    const { data } = await api.post("/api/projects", projectData);
    dispatch({ type: "CREATE_PROJECT_SUCCESS", project: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "CREATE_PROJECT_FAILURE", error: error.message });
  }
};

export const fetchProjectById = (id) => async (dispatch) => {
  dispatch({ type: "FETCH_PROJECT_BY_ID_REQUEST" });
  try {
    const { data } = await api.get(`/api/projects/${id}`);
    dispatch({ type: "FETCH_PROJECT_BY_ID_SUCCESS", project: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "FETCH_PROJECT_BY_ID_FAILURE", error: error.message });
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  dispatch({ type: "DELETE_PROJECT_REQUEST" });
  try {
    await api.delete(`/api/projects/${projectId}`);
    dispatch({ type: "DELETE_PROJECT_SUCCESS", projectId });
  } catch (error) {
    console.log(error);
    dispatch({ type: "DELETE_PROJECT_FAILURE", error: error.message });
  }
};

export const inviteToProject = ({ email, projectId }) => async (dispatch) => {
  dispatch({ type: "INVITE_TO_PROJECT_REQUEST" });
  try {
    const { data } = await api.post("/api/projects/invite", { email, projectId });
    dispatch({ type: "INVITE_TO_PROJECT_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "INVITE_TO_PROJECT_FAILURE", error: error.message });
  }
};

export const acceptInvitation = ({ token, navigate }) => async (dispatch) => {
  dispatch({ type: "ACCEPT_INVITATION_REQUEST" });
  try {
    const { data } = await api.get("/api/projects/accept_invitation", {
      params: { token },
    });
    navigate(`/project/${data.projectId}`);
    dispatch({ type: "ACCEPT_INVITATION_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ACCEPT_INVITATION_FAILURE", error: error.message });
  }
};

// ==========================================
// 3. ISSUE ACTIONS
// ==========================================
export const fetchIssues = (id) => async (dispatch) => {
  dispatch({ type: "FETCH_ISSUES_REQUEST" });
  try {
    const { data } = await api.get(`/api/issues/project/${id}`);
    dispatch({ type: "FETCH_ISSUES_SUCCESS", issues: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "FETCH_ISSUES_FAILURE", error: error.message });
  }
};

export const fetchIssueById = (id) => async (dispatch) => {
  dispatch({ type: "FETCH_ISSUE_BY_ID_REQUEST" });
  try {
    const { data } = await api.get(`/api/issues/${id}`);
    dispatch({ type: "FETCH_ISSUE_BY_ID_SUCCESS", issue: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "FETCH_ISSUE_BY_ID_FAILURE", error: error.message });
  }
};

export const createIssue = (issueData) => async (dispatch) => {
  dispatch({ type: "CREATE_ISSUE_REQUEST" });
  try {
    const { data } = await api.post("/api/issues", issueData);
    dispatch({ type: "CREATE_ISSUE_SUCCESS", issue: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "CREATE_ISSUE_FAILURE", error: error.message });
  }
};

export const updateIssueStatus = ({ id, status }) => async (dispatch) => {
  dispatch({ type: "UPDATE_ISSUE_STATUS_REQUEST" });
  try {
    const { data } = await api.put(`/api/issues/${id}/status/${status}`);
    dispatch({ type: "UPDATE_ISSUE_STATUS_SUCCESS", issue: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPDATE_ISSUE_STATUS_FAILURE", error: error.message });
  }
};

export const assignedUserToIssue = ({ issueId, userId }) => async (dispatch) => {
  dispatch({ type: "ASSIGNED_ISSUE_TO_USER_REQUEST" });
  try {
    const { data } = await api.put(`/api/issues/${issueId}/assignee/${userId}`);
    dispatch({ type: "ASSIGNED_ISSUE_TO_USER_SUCCESS", issue: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ASSIGNED_ISSUE_TO_USER_FAILURE", error: error.message });
  }
};

export const deleteIssue = (id) => async (dispatch) => {
  dispatch({ type: "DELETE_ISSUE_REQUEST" });
  try {
    await api.delete(`/api/issues/${id}`);
    dispatch({ type: "DELETE_ISSUE_SUCCESS", issueId: id });
  } catch (error) {
    console.log(error);
    dispatch({ type: "DELETE_ISSUE_FAILURE", error: error.message });
  }
};

// ==========================================
// 4. COMMENT ACTIONS
// ==========================================
export const createComment = (commentData) => async (dispatch) => {
  dispatch({ type: "CREATE_COMMENT_REQUEST" });
  try {
    const { data } = await api.post("/api/comments", commentData);
    dispatch({ type: "CREATE_COMMENT_SUCCESS", comment: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "CREATE_COMMENT_FAILURE", error: error.message });
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  dispatch({ type: "DELETE_COMMENT_REQUEST" });
  try {
    await api.delete(`/api/comments/${commentId}`);
    dispatch({ type: "DELETE_COMMENT_SUCCESS", commentId });
  } catch (error) {
    console.log(error);
    dispatch({ type: "DELETE_COMMENT_FAILURE", error: error.message });
  }
};

export const fetchComments = (issueId) => async (dispatch) => {
  dispatch({ type: "FETCH_COMMENTS_REQUEST" });
  try {
    const { data } = await api.get(`/api/comments/${issueId}`);
    dispatch({ type: "FETCH_COMMENTS_SUCCESS", comments: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "FETCH_COMMENTS_FAILURE", error: error.message });
  }
};

// ==========================================
// 5. CHAT ACTIONS
// ==========================================
export const sendMessage = (messageData) => async (dispatch) => {
  dispatch({ type: "SEND_MESSAGE_REQUEST" });
  try {
    const { data } = await api.post("/api/messages/send", messageData);
    dispatch({ type: "SEND_MESSAGE_SUCCESS", message: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "SEND_MESSAGE_FAILURE", error: error.message });
  }
};

export const fetchChatByProject = (projectId) => async (dispatch) => {
  dispatch({ type: "FETCH_CHAT_BY_PROJECT_REQUEST" });
  try {
    const { data } = await api.get(`/api/projects/${projectId}/chat`);
    dispatch({ type: "FETCH_CHAT_BY_PROJECT_SUCCESS", chat: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "FETCH_CHAT_BY_PROJECT_FAILURE", error: error.message });
  }
};

export const fetchChatMessages = (chatId) => async (dispatch) => {
  dispatch({ type: "FETCH_CHAT_MESSAGES_REQUEST" });
  try {
    const { data } = await api.get(`/api/messages/chat/${chatId}`);
    dispatch({ type: "FETCH_CHAT_MESSAGES_SUCCESS", chatId, messages: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "FETCH_CHAT_MESSAGES_FAILURE", error: error.message });
  }
};

// ==========================================
// 6. SUBSCRIPTION & PAYMENT ACTIONS
// ==========================================
export const getUserSubscription = () => async (dispatch) => {
  dispatch({ type: "GET_USER_SUBSCRIPTION_REQUEST" });
  try {
    const { data } = await api.get("/api/subscriptions/user");
    dispatch({ type: "GET_USER_SUBSCRIPTION_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_USER_SUBSCRIPTION_FAILURE", error: error.message });
  }
};

export const upgradeSubscription = ({ planType }) => async (dispatch) => {
  dispatch({ type: "UPGRADE_SUBSCRIPTION_REQUEST" });
  try {
    const { data } = await api.patch("/api/subscriptions/upgrade", null, {
      params: { planType },
    });
    dispatch({ type: "UPGRADE_SUBSCRIPTION_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPGRADE_SUBSCRIPTION_FAILURE", error: error.message });
  }
};

export const createPayment = async ({ planType }) => {
  try {
    const { data } = await api.post(`/api/payments/${planType}`);
    if (data.payment_link_url) {
      window.location.href = data.payment_link_url;
    }
  } catch (error) {
    console.log(error);
  }
};
