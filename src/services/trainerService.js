import api from './api';
import { dashboardData, trainer } from '../data/mockData';

const mockMode = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const wait = (value) => new Promise((resolve) => setTimeout(() => resolve(value), 180));

async function request(path, fallback, config) {
  if (mockMode) return wait(fallback);
  const { data } = await api.request({ url: path, ...config });
  return data?.data ?? data;
}

export const getTrainerDashboard = () => request('/trainer/dashboard', dashboardData);
export const getTrainerProfile = () => request('/trainer/profile', trainer);
export const updateTrainerProfile = (payload) =>
  request('/trainer/profile', { ...trainer, ...payload }, { method: 'PATCH', data: payload });
export const getTrainerClasses = (params = {}) =>
  request('/trainer/classes', dashboardData.classes, { params });
export const getTrainerStudents = (params = {}) =>
  request('/trainer/students', dashboardData.students, { params });
export const getTrainerCourses = () =>
  request('/trainer/courses', dashboardData.courses);
export const getTrainerEarnings = (params = {}) =>
  request('/trainer/earnings', { summary: { total: 2845.50, available: 1750.25, month: 620.75, payouts: 1095.25 }, chart: dashboardData.earnings, transactions: dashboardData.transactions }, { params });
export const getTrainerNotifications = () =>
  request('/trainer/notifications', dashboardData.notifications);
export const requestWithdrawal = (payload) =>
  request('/trainer/earnings/withdrawals', { success: true, message: 'Withdrawal request submitted (demo).' }, { method: 'POST', data: payload });
