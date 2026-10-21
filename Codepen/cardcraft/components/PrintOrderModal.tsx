import React, { useState, useMemo, useEffect } from 'react';
import { Button } from './common/Button';
import { Loader } from './common/Loader';

interface PrintOrderModalProps {
  onClose: () => void;
}

type View = 'form' | 'processing' | 'confirmation' | 'status';
type OrderStatus = 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';

const PrintOrderModal: React.FC<PrintOrderModalProps> = ({ onClose }) => {
  const [view, setView] = useState<View>('form');
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('Processing');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [options, setOptions] = useState({
    quantity: 100,
    paper: 'standard',
    sides: 'single',
    shipping: 'standard',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setOptions(prev => ({ ...prev, [name]: name === 'quantity' ? parseInt(value) : value }));
  };

  const price = useMemo(() => {
    let base = 0;
    if (options.quantity <= 100) base = 20;
    else if (options.quantity <= 250) base = 45;
    else base = 80;
    if (options.paper === 'premium') base *= 1.5;
    if (options.sides === 'double') base *= 1.4;
    if (options.shipping === 'express') base += 15;
    else base += 5;
    return base.toFixed(2);
  }, [options]);

  useEffect(() => {
    if (view === 'status') {
      const timers = [
        setTimeout(() => setOrderStatus('Shipped'), 3000),
        setTimeout(() => setOrderStatus('Out for Delivery'), 6000),
        setTimeout(() => setOrderStatus('Delivered'), 9000),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [view]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) return;
    
    setView('processing');
    const newOrderId = `CC-${Date.now()}`;
    setOrderId(newOrderId);
    
    setTimeout(() => {
      setView('confirmation');
    }, 2500);
  };

  const renderContent = () => {
    switch(view) {
        case 'processing':
            return (
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="w-12 h-12 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg font-semibold tracking-wider text-white">Processing Payment...</p>
                </div>
            );
        case 'confirmation':
            return (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2 text-green-400">Thank You For Your Order!</h2>
                    <p className="text-indigo-300 mb-4">Your business cards are on their way. A confirmation has been sent to your email.</p>
                    <div className="bg-brand-dark p-4 rounded-md text-left space-y-2 mb-6">
                        <p><strong>Order ID:</strong> <span className="font-mono">{orderId}</span></p>
                        <p><strong>Total:</strong> <span className="font-mono">${price}</span></p>
                        <p><strong>Items:</strong> {options.quantity} Cards ({options.paper}, {options.sides}-sided)</p>
                    </div>
                    <Button onClick={() => setView('status')} className="w-full">Track Order Status</Button>
                </div>
            );
        case 'status':
            return (
                 <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Delivery Status</h2>
                     <p className="text-sm text-indigo-300 mb-6">Order ID: <span className="font-mono">{orderId}</span></p>
                    <div className="relative pt-2">
                        <div className="flex mb-2 items-center justify-between text-xs">
                           <div><span className={`px-2 py-1 rounded-full ${orderStatus === 'Processing' ? 'bg-indigo-500' : 'bg-gray-600'}`}>Processing</span></div>
                           <div><span className={`px-2 py-1 rounded-full ${orderStatus === 'Shipped' ? 'bg-indigo-500' : 'bg-gray-600'}`}>Shipped</span></div>
                           <div><span className={`px-2 py-1 rounded-full ${orderStatus === 'Out for Delivery' ? 'bg-indigo-500' : 'bg-gray-600'}`}>In Transit</span></div>
                           <div><span className={`px-2 py-1 rounded-full ${orderStatus === 'Delivered' ? 'bg-green-500' : 'bg-gray-600'}`}>Delivered</span></div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-brand-dark">
                            <div style={{ width: orderStatus === 'Processing' ? '12.5%' : orderStatus === 'Shipped' ? '37.5%' : orderStatus === 'Out for Delivery' ? '62.5%' : '100%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-accent transition-all duration-1000"></div>
                        </div>
                    </div>
                    <p className="mt-6 text-lg font-semibold">Current Status: <span className="text-indigo-300">{orderStatus}</span></p>
                </div>
            );
        case 'form':
        default:
            return (
                 <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-2xl font-bold mb-2">Order Prints</h2>
                    <div>
                        <label className="text-sm font-semibold text-indigo-300">Quantity</label>
                        <select name="quantity" value={options.quantity} onChange={handleChange} className="w-full bg-brand-dark p-2 rounded-md mt-1">
                        <option value="100">100 Cards</option>
                        <option value="250">250 Cards</option>
                        <option value="500">500 Cards</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-indigo-300">Paper Type</label>
                        <select name="paper" value={options.paper} onChange={handleChange} className="w-full bg-brand-dark p-2 rounded-md mt-1">
                        <option value="standard">Standard Matte</option>
                        <option value="premium">Premium Glossy</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-indigo-300">Printing</label>
                        <select name="sides" value={options.sides} onChange={handleChange} className="w-full bg-brand-dark p-2 rounded-md mt-1">
                        <option value="single">Single-Sided</option>
                        <option value="double">Double-Sided</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-indigo-300">Shipping</label>
                        <select name="shipping" value={options.shipping} onChange={handleChange} className="w-full bg-brand-dark p-2 rounded-md mt-1">
                        <option value="standard">Standard (5-7 days)</option>
                        <option value="express">Express (2-3 days)</option>
                        </select>
                    </div>
                    <div className="flex items-start space-x-2 pt-2">
                        <input
                            id="terms"
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-400">
                            I agree to the <a href="#" className="underline hover:text-indigo-400">Terms and Conditions</a> and acknowledge this is a simulated purchase.
                        </label>
                    </div>
                    <hr className="border-white/10" />
                    <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total:</span>
                        <span>${price}</span>
                    </div>
                    <Button type="submit" className="w-full" disabled={!termsAccepted}>Confirm Order</Button>
                </form>
            )
    }
  }


  return (
    <div className="fixed inset-0 bg-brand-dark/80 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-dark-accent rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
        {renderContent()}
      </div>
    </div>
  );
};

export default PrintOrderModal;