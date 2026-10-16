import { Application, Complaint, AuditLog, User } from '../types';

const API_BASE = '/api/v1';

export const apiClient = {
  async getStatus() {
    try {
      const res = await fetch(`${API_BASE}/status`);
      if (!res.ok) throw new Error('Status fetch failed');
      return await res.json();
    } catch {
      return {
        portalOnline: true,
        uptime: '99.9%',
        integrations: []
      };
    }
  },

  async login(email?: string, requestedRole?: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, requestedRole })
    });
    return await res.json();
  },

  async switchRole(role: string) {
    const res = await fetch(`${API_BASE}/auth/switch-role`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role })
    });
    return await res.json();
  },

  async getApplications(params?: { role?: string; userId?: string; status?: string; search?: string }) {
    const query = new URLSearchParams();
    if (params?.role) query.append('role', params.role);
    if (params?.userId) query.append('userId', params.userId);
    if (params?.status) query.append('status', params.status);
    if (params?.search) query.append('search', params.search);

    const res = await fetch(`${API_BASE}/applications?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch applications');
    return await res.json();
  },

  async getApplicationById(id: string) {
    const res = await fetch(`${API_BASE}/applications/${id}`);
    if (!res.ok) throw new Error('Application not found');
    return await res.json();
  },

  async createApplication(data: Partial<Application>) {
    const res = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Application submission failed');
    return await res.json();
  },

  async updateApplicationStatus(id: string, payload: {
    status: string;
    note: string;
    actorId: string;
    actorName: string;
    actorRole: string;
    hearingDate?: string;
  }) {
    const res = await fetch(`${API_BASE}/applications/${id}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Update failed' }));
      throw new Error(err.error || 'Failed to update status');
    }
    return await res.json();
  },

  async getComplaints(params?: { role?: string; userId?: string }) {
    const query = new URLSearchParams();
    if (params?.role) query.append('role', params.role);
    if (params?.userId) query.append('userId', params.userId);

    const res = await fetch(`${API_BASE}/complaints?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch complaints');
    return await res.json();
  },

  async createComplaint(data: Partial<Complaint>) {
    const res = await fetch(`${API_BASE}/complaints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Complaint submission failed');
    return await res.json();
  },

  async updateComplaintStatus(id: string, payload: {
    status: string;
    resolutionNote?: string;
    actorName?: string;
    actorRole?: string;
  }) {
    const res = await fetch(`${API_BASE}/complaints/${id}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to update complaint');
    return await res.json();
  },

  async getAuditLogs(role?: string) {
    const query = role ? `?role=${role}` : '';
    const res = await fetch(`${API_BASE}/audit-logs${query}`);
    if (!res.ok) throw new Error('Failed to fetch audit logs');
    return await res.json();
  },

  async getStats() {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return await res.json();
  }
};
