import React, { useMemo } from 'react';
import { useContent } from '../../context/ContentContext';
import { DollarSign, TrendingUp, TrendingDown, Package, CreditCard, ArrowRightLeft } from 'lucide-react';

export default function AdminAccounting() {
  const { content } = useContent();

  const orders = content.orders || [];

  const {
    totalRevenue,
    totalWalletInstapay,
    totalCOD,
    accruedToShippingCompany,
    accruedFromShippingCompany,
    shippingCompanyOwesUs,
    weOweShippingCompany,
    breakdown
  } = useMemo(() => {
    let _totalRevenue = 0;
    let _totalWalletInstapay = 0;
    let _totalCOD = 0;
    let _accruedToShippingCompany = 0;
    let _accruedFromShippingCompany = 0;
    let _shippingCompanyOwesUs = 0;
    let _weOweShippingCompany = 0;
    const _breakdown: Record<string, { count: number, total: number }> = {};

    orders.forEach(order => {
      // Only count non-canceled orders
      if (order.status === 'Canceled') return;

      const orderTotal = order.total;
      const orderShippingCost = order.shippingCost || 0;

      // Track breakdown by sub-method
      const methodKey = order.paymentMethod === 'Wallet' && order.paymentAccountName 
        ? `Wallet: ${order.paymentAccountName}` 
        : order.paymentMethod === 'InstaPay' && order.paymentAccountName 
        ? `InstaPay: ${order.paymentAccountName}`
        : order.paymentMethod || 'Card';

      if (!_breakdown[methodKey]) _breakdown[methodKey] = { count: 0, total: 0 };
      _breakdown[methodKey].count++;
      _breakdown[methodKey].total += orderTotal;

      _totalRevenue += orderTotal;

      if (order.paymentMethod === 'COD') {
        _totalCOD += orderTotal;
        // In COD, shipping company collects the entire total.
        // They keep their shipping cost, and owe us the rest.
        _accruedFromShippingCompany += orderTotal;
        
        // If payment is purely 'Pending', the company hasn't remitted yet.
        // Actually, let's just track the raw owed amounts based on completed deliveries / collected state.
        
        if (order.paymentStatus !== 'Collected') {
           _shippingCompanyOwesUs += (orderTotal - orderShippingCost);
        }

      } else {
        // Wallet, Card, Instapay
        _totalWalletInstapay += orderTotal;
        // We received the money. We owe the shipping company their shipping cost.
        _accruedToShippingCompany += orderShippingCost;
        
        if (order.status !== 'Delivered' || order.paymentStatus === 'Pending') {
           // Wait, usually we pay shipping company after delivery, or it's a running balance
           _weOweShippingCompany += orderShippingCost;
        }
      }
    });

    return {
      totalRevenue: _totalRevenue,
      totalWalletInstapay: _totalWalletInstapay,
      totalCOD: _totalCOD,
      accruedToShippingCompany: _accruedToShippingCompany,
      accruedFromShippingCompany: _accruedFromShippingCompany,
      shippingCompanyOwesUs: _shippingCompanyOwesUs,
      weOweShippingCompany: _weOweShippingCompany,
      breakdown: _breakdown
    };
  }, [orders]);

  const netBalance = shippingCompanyOwesUs - weOweShippingCompany;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-serif font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-gray-600" />
        Accounting & Settlements
      </h2>
      
      <p className="text-sm text-gray-500 mb-8 max-w-3xl leading-relaxed">
        Track money-in and money-out for all orders. For Cash on Delivery (COD) orders, the shipping company collects the cash; they keep the shipping fee and owe you the rest. For pre-paid orders (Card/Wallet/Instapay), you collect the cash and owe the shipping company their fee.
      </p>

      {/* High-Level Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-md bg-gray-50 border border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1"><DollarSign className="w-3 h-3"/> Total Setup Revenue</p>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="p-4 rounded-md bg-gray-50 border border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1"><CreditCard className="w-3 h-3"/> Pre-Paid (Collected)</p>
          <p className="text-2xl font-bold text-gray-900">${totalWalletInstapay.toFixed(2)}</p>
        </div>
        <div className="p-4 rounded-md bg-gray-50 border border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1"><Package className="w-3 h-3"/> COD (Awaiting/Collected)</p>
          <p className="text-2xl font-bold text-gray-900">${totalCOD.toFixed(2)}</p>
        </div>
        <div className={`p-4 rounded-md border ${netBalance > 0 ? 'bg-green-50 border-green-100' : netBalance < 0 ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
          <p className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1"><ArrowRightLeft className="w-3 h-3"/> Net Shipping Balance</p>
          <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            ${Math.abs(netBalance).toFixed(2)} {netBalance >= 0 ? '(Owed to You)' : '(You Owe)'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Methods Breakdown */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Revenue by Payment Method</h3>
          <div className="space-y-3 mb-8">
            {(Object.entries(breakdown) as [string, { count: number, total: number }][]).sort((a, b) => b[1].total - a[1].total).map(([method, data]) => (
              <div key={method} className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-md shadow-sm">
                <div>
                  <p className="text-sm font-medium text-gray-900">{method}</p>
                  <p className="text-xs text-gray-500">{data.count} {data.count === 1 ? 'order' : 'orders'}</p>
                </div>
                <p className="text-sm font-bold text-gray-900">${data.total.toFixed(2)}</p>
              </div>
            ))}
            {Object.keys(breakdown).length === 0 && (
              <p className="text-sm text-gray-500 italic p-3 text-center">No transactions yet.</p>
            )}
          </div>

          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Shipping Company Accounting</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div>
                <p className="text-sm font-medium text-gray-900">Total Pre-paid Orders Shipping Cost</p>
                <p className="text-xs text-gray-500">Fees you owe to the shipping company</p>
              </div>
              <p className="text-sm font-bold text-red-600">-${weOweShippingCompany.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div>
                <p className="text-sm font-medium text-gray-900">Total COD Collected by Shipping</p>
                <p className="text-xs text-gray-500">Cash they collected, minus their shipping fee</p>
              </div>
              <p className="text-sm font-bold text-green-600">+${shippingCompanyOwesUs.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div>
           <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Recent Order Breakdowns</h3>
           <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
             {orders.slice(0, 10).map(order => {
               if (order.status === 'Canceled') return null;
               
               const isCOD = order.paymentMethod === 'COD';
               const cost = order.shippingCost || 0;
               const total = order.total;
               const net = isCOD ? (total - cost) : -cost;
               const isPositive = net > 0;

               return (
                 <div key={order.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md border border-transparent hover:border-gray-100 transition-colors">
                   <div>
                     <p className="text-xs font-bold text-gray-900">{order.id} <span className="font-normal text-gray-500">({order.paymentMethod || 'Card'})</span></p>
                     <p className="text-[10px] text-gray-500 uppercase tracking-wider">{order.date}</p>
                   </div>
                   <div className="text-right">
                     <p className={`text-xs font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                       {isPositive ? '+' : ''}{net.toFixed(2)}
                     </p>
                     <p className="text-[10px] text-gray-500">Shipping cut: ${cost.toFixed(2)}</p>
                   </div>
                 </div>
               )
             })}
           </div>
        </div>
      </div>
    </div>
  );
}
