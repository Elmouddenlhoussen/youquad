
// Payment service for handling payment processing
import { toast } from "sonner";

export type PaymentMethod = 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay';

export interface PaymentData {
  cardNumber?: string;
  cardExpiry?: string; 
  cardCvc?: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  email: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message: string;
  date: Date;
}

// This is a mock payment service for demonstration
// In a real application, this would connect to a payment processor API
export const processPayment = async (paymentData: PaymentData): Promise<PaymentResult> => {
  console.log("Processing payment:", paymentData);
  
  // Simulate API call to payment processor
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful payment (in production, this would be a real API call)
      const success = true; // For demo purposes, always succeed
      
      if (success) {
        resolve({
          success: true,
          transactionId: 'txn_' + Math.random().toString(36).substring(2, 15),
          message: 'Payment processed successfully',
          date: new Date()
        });
      } else {
        resolve({
          success: false,
          message: 'Payment failed. Please try again.',
          date: new Date()
        });
      }
    }, 1500); // Simulate network delay
  });
};

// Format currency for display
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Validate credit card number (basic validation)
export const validateCardNumber = (cardNumber: string): boolean => {
  const sanitizedNumber = cardNumber.replace(/\s+/g, '');
  return /^\d{16}$/.test(sanitizedNumber);
};

// Validate credit card expiry date (MM/YY format)
export const validateCardExpiry = (expiry: string): boolean => {
  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    return false;
  }

  const [monthStr, yearStr] = expiry.split('/');
  const month = parseInt(monthStr, 10);
  const year = 2000 + parseInt(yearStr, 10);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (month < 1 || month > 12) {
    return false;
  }

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }

  return true;
};

// Validate CVC/CVV (3-4 digits)
export const validateCardCvc = (cvc: string): boolean => {
  return /^\d{3,4}$/.test(cvc);
};
