
import React, { useState } from 'react';
import { 
  PaymentMethod, 
  validateCardNumber, 
  validateCardExpiry, 
  validateCardCvc,
  formatCurrency 
} from '@/services/paymentService';
import { CreditCard, Paypal, ShoppingBag, CreditCard as CreditCardIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentFormProps {
  amount: number;
  onSubmit: (paymentMethod: PaymentMethod, cardDetails?: { number: string, expiry: string, cvc: string }) => void;
  isProcessing: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  amount, 
  onSubmit, 
  isProcessing 
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    const newErrors = {
      cardNumber: '',
      cardExpiry: '',
      cardCvc: ''
    };
    
    // Validate card details if credit card is selected
    let isValid = true;
    
    if (paymentMethod === 'credit_card') {
      if (!validateCardNumber(cardNumber)) {
        newErrors.cardNumber = 'Please enter a valid card number';
        isValid = false;
      }
      
      if (!validateCardExpiry(cardExpiry)) {
        newErrors.cardExpiry = 'Please enter a valid expiry date (MM/YY)';
        isValid = false;
      }
      
      if (!validateCardCvc(cardCvc)) {
        newErrors.cardCvc = 'Please enter a valid CVC/CVV';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    
    if (isValid) {
      if (paymentMethod === 'credit_card') {
        onSubmit(paymentMethod, {
          number: cardNumber,
          expiry: cardExpiry,
          cvc: cardCvc
        });
      } else {
        onSubmit(paymentMethod);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-sand-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Payment Details</h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Total Amount</span>
          <span className="font-bold text-xl text-terracotta-600 dark:text-terracotta-400">
            {formatCurrency(amount)}
          </span>
        </div>
        <div className="h-1 w-full bg-sand-200 dark:bg-sand-700 rounded-full"></div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <Label className="mb-2 block">Payment Method</Label>
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
            className="grid grid-cols-2 gap-4"
          >
            <div className={`flex flex-col items-center justify-center p-4 rounded-lg border border-sand-200 dark:border-sand-700 cursor-pointer ${paymentMethod === 'credit_card' ? 'bg-terracotta-50 dark:bg-terracotta-900/30 border-terracotta-300 dark:border-terracotta-700' : ''}`}>
              <RadioGroupItem value="credit_card" id="credit_card" className="sr-only" />
              <CreditCardIcon className={`w-6 h-6 mb-2 ${paymentMethod === 'credit_card' ? 'text-terracotta-600 dark:text-terracotta-400' : 'text-sand-500'}`} />
              <Label htmlFor="credit_card" className="cursor-pointer text-sm">Credit Card</Label>
            </div>
            
            <div className={`flex flex-col items-center justify-center p-4 rounded-lg border border-sand-200 dark:border-sand-700 cursor-pointer ${paymentMethod === 'paypal' ? 'bg-terracotta-50 dark:bg-terracotta-900/30 border-terracotta-300 dark:border-terracotta-700' : ''}`}>
              <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
              <Paypal className={`w-6 h-6 mb-2 ${paymentMethod === 'paypal' ? 'text-terracotta-600 dark:text-terracotta-400' : 'text-sand-500'}`} />
              <Label htmlFor="paypal" className="cursor-pointer text-sm">PayPal</Label>
            </div>
          </RadioGroup>
        </div>
        
        {paymentMethod === 'credit_card' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">{errors.cardNumber}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(formatExpiryDate(e.target.value))}
                  maxLength={5}
                />
                {errors.cardExpiry && (
                  <p className="text-red-500 text-sm">{errors.cardExpiry}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC/CVV</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength={4}
                />
                {errors.cardCvc && (
                  <p className="text-red-500 text-sm">{errors.cardCvc}</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {paymentMethod === 'paypal' && (
          <div className="mb-4 text-center p-4 bg-sand-50 dark:bg-sand-800 rounded-lg">
            <p className="text-sm text-sand-600 dark:text-sand-400">
              You will be redirected to PayPal to complete your payment securely.
            </p>
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full mt-6 bg-terracotta-600 hover:bg-terracotta-700"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <ShoppingBag className="animate-pulse mr-2 h-4 w-4" />
              Processing...
            </span>
          ) : (
            <span>Complete Payment</span>
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-sand-500 dark:text-sand-400">
          Your payment is secured by industry-standard encryption.
        </p>
      </div>
    </div>
  );
};

export default PaymentForm;
