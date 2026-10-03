// Mock API simulating server mutations and data fetching with realistic latency

export interface QuoteSubmission {
  service: string;
  industry: string;
  startDate: string;
  coverage: string;
  siteName: string;
  zipCode: string;
  officersNeeded: number;
  notes?: string;
  name: string;
  email: string;
  phone: string;
  preferredContact: 'phone' | 'email';
  consent: boolean;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
  consent: boolean;
  honeypot?: string;
}

export interface ApplicationSubmission {
  roleId: string;
  name: string;
  email: string;
  phone: string;
  experienceYears?: string;
  licenseNumber?: string;
  resumeFileName?: string;
  consent: boolean;
  honeypot?: string;
}

const isFailRequested = (siteName?: string) => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('fail') === '1') return true;
  }
  if (siteName && siteName.toLowerCase().trim() === 'error') {
    return true;
  }
  return false;
};

const delay = (min: number, max: number) => {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const mockApi = {
  async submitQuote(data: QuoteSubmission): Promise<{ success: boolean; referenceNumber: string; message: string }> {
    await delay(900, 1800);
    if (isFailRequested(data.siteName)) {
      throw new Error("We couldn't process that quote request. Your answers are preserved. Please retry or call dispatch.");
    }
    const refNum = 'NPS-' + Math.floor(10000 + Math.random() * 90000);
    return {
      success: true,
      referenceNumber: refNum,
      message: 'Request received. A security consultant will contact you within one business day.'
    };
  },

  async submitContact(data: ContactSubmission): Promise<{ success: boolean; message: string }> {
    await delay(800, 1500);
    // Honeypot check (anti-spam simulation)
    if (data.honeypot) {
      return { success: true, message: 'Message received.' };
    }
    if (isFailRequested()) {
      throw new Error("We couldn't deliver your message right now. Please call us directly.");
    }
    return {
      success: true,
      message: 'Message delivered. Our operations team will respond promptly.'
    };
  },

  async submitApplication(data: ApplicationSubmission): Promise<{ success: boolean; message: string }> {
    await delay(800, 1400);
    if (data.honeypot) {
      return { success: true, message: 'Application recorded.' };
    }
    if (isFailRequested()) {
      throw new Error("We couldn't upload your application. Please try again in a moment.");
    }
    return {
      success: true,
      message: 'Application received. Our recruiting team will review your credentials.'
    };
  }
};
